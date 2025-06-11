import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// プロジェクト作成のスキーマ
const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  companyId: z.string().optional(),
  leadId: z.string().optional(),
  projectType: z.enum(['AI_DEVELOPMENT', 'TOOL_CREATION', 'CONSULTATION', 'MUSIC_PRODUCTION', 'COLLABORATION']),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().optional(),
  assignedCharacter: z.enum(['YUYA', 'AOBA', 'SHARED']),
  projectManagerId: z.string().optional(),
})

// GET: プロジェクト一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const assignedCharacter = searchParams.get('assignedCharacter')

    const where: any = {}
    if (status) {
      where.status = status
    }
    if (assignedCharacter) {
      where.assignedCharacter = assignedCharacter
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              domain: true,
            },
          },
          lead: {
            select: {
              id: true,
              name: true,
              email: true,
              company: true,
            },
          },
          projectManager: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          deliverables: {
            select: {
              id: true,
              status: true,
            },
          },
          _count: {
            select: {
              activities: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where }),
    ])

    // 進捗率を計算
    const projectsWithProgress = projects.map(project => {
      const totalDeliverables = project.deliverables.length
      const completedDeliverables = project.deliverables.filter(d => d.status === 'DELIVERED' || d.status === 'APPROVED').length
      const progress = totalDeliverables > 0 ? Math.round((completedDeliverables / totalDeliverables) * 100) : 0

      return {
        ...project,
        progress,
        client: {
          name: project.lead?.name || project.company?.name || 'Unknown',
          company: project.company?.name || project.lead?.company || '',
        },
      }
    })

    return NextResponse.json({
      projects: projectsWithProgress,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: プロジェクト作成
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createProjectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
      include: {
        company: true,
        lead: true,
        projectManager: true,
      },
    })

    // プロジェクト作成アクティビティを記録
    await prisma.projectActivity.create({
      data: {
        projectId: project.id,
        userId: session.user?.id,
        activityType: 'CREATED',
        description: `プロジェクト「${project.name}」を作成しました`,
        metadata: {
          projectType: project.projectType,
          assignedCharacter: project.assignedCharacter,
        },
      },
    })

    // 監査ログを記録
    await prisma.auditLog.create({
      data: {
        userId: session.user?.id,
        action: 'CREATE',
        resource: 'projects',
        resourceId: project.id,
        changes: validatedData,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        status: 'SUCCESS',
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 