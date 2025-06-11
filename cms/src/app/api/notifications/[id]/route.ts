import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { auditAction } from '@/lib/audit'
import { z } from 'zod'

// PATCH /api/notifications/[id] - 通知を更新（既読にする）
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const json = await request.json()

    // バリデーション
    const schema = z.object({
      isRead: z.boolean()
    })

    const validatedData = schema.parse(json)

    // 通知が存在し、ユーザーのものであることを確認
    const notification = await prisma.notification.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }

    // 通知を更新
    const updatedNotification = await prisma.notification.update({
      where: { id: params.id },
      data: {
        isRead: validatedData.isRead,
        readAt: validatedData.isRead ? new Date() : null
      }
    })

    return NextResponse.json(updatedNotification)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Failed to update notification:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}

// DELETE /api/notifications/[id] - 通知を削除
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 通知が存在し、ユーザーのものであることを確認
    const notification = await prisma.notification.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }

    // 通知を削除
    await prisma.notification.delete({
      where: { id: params.id }
    })

    // 監査ログを記録
    await auditAction(
      'DELETE_NOTIFICATION',
      'notification',
      params.id,
      { notificationType: notification.type },
      user.id
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete notification:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    )
  }
} 