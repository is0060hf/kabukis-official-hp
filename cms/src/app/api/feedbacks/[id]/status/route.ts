import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FeedbackStatus } from '@/types/database'
import { notifyStatusUpdate } from '@/lib/notifications'

const updateStatusSchema = z.object({
  status: z.enum(['NEW', 'REVIEWING', 'RESPONDED', 'CLOSED']),
  response: z.string().optional()
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateStatusSchema.parse(body)
    const { id } = await params

    // 現在のフィードバックを取得
    const currentFeedback = await prisma.feedback.findUnique({
      where: { id }
    })

    if (!currentFeedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    // ステータスを更新
    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: {
        status: validatedData.status,
        ...(validatedData.response && {
          response: validatedData.response,
          respondedAt: new Date()
        })
      }
    })

    // ステータス変更の通知
    await notifyStatusUpdate(
      'feedback',
      id,
      currentFeedback.status,
      validatedData.status,
      session.user?.name || session.user?.email || undefined
    )

    return NextResponse.json(updatedFeedback)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating feedback status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 