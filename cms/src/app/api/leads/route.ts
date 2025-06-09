import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { LeadSource, LeadType, LeadStatus } from '@/types/database'

// リード作成のスキーマ
const createLeadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  source: z.enum(['YUYA_SITE', 'AOBA_SITE', 'REFERRAL', 'SOCIAL', 'DIRECT']),
  sourceDomain: z.string().optional(),
  sourcePage: z.string().optional(),
  leadType: z.enum(['B2B_CONSULTATION', 'TOOL_INTEREST', 'COLLABORATION', 'MUSIC_LICENSING', 'OTHER']),
  notes: z.string().optional(),
  gdprConsent: z.boolean(),
})

// GET: リード一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as LeadStatus | null
    const source = searchParams.get('source') as LeadSource | null
    const leadType = searchParams.get('leadType') as LeadType | null

    const where = {
      ...(status && { status }),
      ...(source && { source }),
      ...(leadType && { leadType }),
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: { inquiries: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: リード作成（外部APIからも使用可能）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createLeadSchema.parse(body)

    // リードデータの作成
    const leadData = {
      ...validatedData,
      // GDPR同意の記録
      ...(validatedData.gdprConsent && {
        consentDate: new Date()
      })
    }

    const lead = await prisma.lead.create({
      data: leadData,
    })

    // TODO: 通知を送信（メール、Discord webhook等）

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 