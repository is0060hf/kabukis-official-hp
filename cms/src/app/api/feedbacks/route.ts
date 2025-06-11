import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FeedbackType, FeedbackStatus, CharacterOwner } from '@/types/database'
import { notifyNewFeedback } from '@/lib/notifications'

// フィードバック作成のスキーマ
const createFeedbackSchema = z.object({
  leadId: z.string().optional(),
  userId: z.string().optional(),
  characterOwner: z.enum(['YUYA', 'AOBA', 'SHARED']),
  feedbackType: z.enum(['BUG_REPORT', 'FEATURE_REQUEST', 'IMPROVEMENT', 'COMPLAINT', 'PRAISE', 'OTHER']),
  subject: z.string().min(1).max(255),
  message: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
  tags: z.array(z.string()).optional(),
})

// GET: フィードバック一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as FeedbackStatus | null
    const feedbackType = searchParams.get('feedbackType') as FeedbackType | null
    const characterOwner = searchParams.get('characterOwner') as CharacterOwner | null

    const where = {
      ...(status && { status }),
      ...(feedbackType && { feedbackType }),
      ...(characterOwner && { characterOwner }),
    }

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
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
      prisma.feedback.count({ where }),
    ])

    return NextResponse.json({
      feedbacks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: フィードバック作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createFeedbackSchema.parse(body)

    // 認証チェック（ユーザーIDが指定されている場合）
    if (validatedData.userId) {
      const session = await auth()
      if (!session || session.user?.id !== validatedData.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const feedback = await prisma.feedback.create({
      data: {
        ...validatedData,
        tags: validatedData.tags || [],
      },
      include: {
        user: true,
      },
    })

    // 通知を送信
    await notifyNewFeedback(feedback)

    return NextResponse.json(feedback, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating feedback:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 