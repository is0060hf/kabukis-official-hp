import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { RequestType, RequestStatus, Priority, CharacterOwner } from '@/types/database'
import { notifyNewRequest } from '@/lib/notifications'

// リクエスト作成のスキーマ
const createRequestSchema = z.object({
  leadId: z.string().optional(),
  userId: z.string().optional(),
  characterOwner: z.enum(['YUYA', 'AOBA', 'SHARED']),
  requestType: z.enum(['NEW_FEATURE', 'CONTENT_REQUEST', 'TOOL_REQUEST', 'COLLABORATION', 'OTHER']),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  metadata: z.record(z.any()).optional(),
})

// GET: リクエスト一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as RequestStatus | null
    const requestType = searchParams.get('requestType') as RequestType | null
    const characterOwner = searchParams.get('characterOwner') as CharacterOwner | null
    const priority = searchParams.get('priority') as Priority | null

    const where = {
      ...(status && { status }),
      ...(requestType && { requestType }),
      ...(characterOwner && { characterOwner }),
      ...(priority && { priority }),
    }

    const [requests, total] = await Promise.all([
      prisma.request.findMany({
        where,
        include: {
          lead: {
            select: {
              id: true,
              name: true,
              email: true,
              company: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.request.count({ where }),
    ])

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: リクエスト作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createRequestSchema.parse(body)

    // 認証チェック（ユーザーIDが指定されている場合）
    if (validatedData.userId) {
      const session = await auth()
      if (!session || session.user?.id !== validatedData.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const newRequest = await prisma.request.create({
      data: {
        ...validatedData,
        metadata: validatedData.metadata || {},
      },
      include: {
        user: true,
      },
    })

    // 通知を送信
    await notifyNewRequest(newRequest)

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 