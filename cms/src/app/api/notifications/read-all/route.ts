import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { auditAction } from '@/lib/audit'

// PATCH /api/notifications/read-all - すべての通知を既読にする
export async function PATCH(request: NextRequest) {
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

    // ユーザーのすべての未読通知を既読にする
    const result = await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false
      },
      data: {
        isRead: true,
        readAt: new Date()
      }
    })

    // 監査ログを記録
    await auditAction(
      'MARK_ALL_NOTIFICATIONS_READ',
      'notification',
      undefined,
      { count: result.count },
      user.id
    )

    return NextResponse.json({
      success: true,
      count: result.count
    })
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark all notifications as read' },
      { status: 500 }
    )
  }
} 