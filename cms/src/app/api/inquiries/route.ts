import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { InquiryType, InquiryStatus, Priority } from '@/types/database'
import { notifyNewInquiry } from '@/lib/notifications'

// 問い合わせ作成のスキーマ
const createInquirySchema = z.object({
  leadId: z.string().optional(),
  inquiryType: z.enum(['GENERAL', 'TECHNICAL_SUPPORT', 'BUSINESS', 'COLLABORATION', 'LICENSING', 'BUG_REPORT']),
  subject: z.string().min(1).max(255),
  message: z.string().min(1),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    size: z.number(),
  })).optional(),
  // 新規リード情報（leadIdがない場合）
  leadInfo: z.object({
    email: z.string().email(),
    name: z.string(),
    company: z.string().optional(),
  }).optional(),
})

// GET: 問い合わせ一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as InquiryStatus | null
    const inquiryType = searchParams.get('inquiryType') as InquiryType | null
    const priority = searchParams.get('priority') as Priority | null

    const where = {
      ...(status && { status }),
      ...(inquiryType && { inquiryType }),
      ...(priority && { priority }),
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
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
      prisma.inquiry.count({ where }),
    ])

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: 問い合わせ作成（外部APIからも使用可能）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createInquirySchema.parse(body)

    let leadId = validatedData.leadId

    // 新規リードの作成（必要な場合）
    if (!leadId && validatedData.leadInfo) {
      const lead = await prisma.lead.create({
        data: {
          email: validatedData.leadInfo.email,
          name: validatedData.leadInfo.name,
          company: validatedData.leadInfo.company,
          source: 'DIRECT',
          leadType: 'OTHER',
          gdprConsent: true,
          consentDate: new Date(),
        },
      })
      leadId = lead.id
    }

    // 問い合わせの作成
    const inquiry = await prisma.inquiry.create({
      data: {
        leadId,
        inquiryType: validatedData.inquiryType,
        subject: validatedData.subject,
        message: validatedData.message,
        attachments: validatedData.attachments || [],
        // SLA設定（ビジネス問い合わせは24時間、その他は48時間）
        responseTimeSla: validatedData.inquiryType === 'BUSINESS' ? 24 : 48,
      },
      include: {
        lead: true,
      },
    })

    // 通知を送信（管理者にメール、Discord等）
    await notifyNewInquiry(inquiry)

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 