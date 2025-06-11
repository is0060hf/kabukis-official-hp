import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { auditAction } from '@/lib/audit'
import { z } from 'zod'

// GET /api/notifications - 通知一覧を取得
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const isRead = searchParams.get('isRead')
    const type = searchParams.get('type')
    const skip = (page - 1) * limit

    // フィルター条件を構築
    const where: any = { userId: user.id }
    if (isRead !== null && isRead !== '') {
      where.isRead = isRead === 'true'
    }
    if (type) {
      where.type = type
    }

    // 通知を取得
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where })
    ])

    // 未読数を取得
    const unreadCount = await prisma.notification.count({
      where: {
        userId: user.id,
        isRead: false
      }
    })

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      unreadCount
    })
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST /api/notifications - 通知を作成
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 管理者権限チェック
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    })

    if (!adminUser?.profile?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const json = await request.json()

    // バリデーション
    const schema = z.object({
      userId: z.string().optional(),
      userIds: z.array(z.string()).optional(),
      type: z.enum([
        'SYSTEM_UPDATE',
        'NEW_CONTENT',
        'NEW_REQUEST',
        'NEW_FEEDBACK',
        'REQUEST_STATUS_CHANGE',
        'FEEDBACK_RESPONSE',
        'PROJECT_UPDATE',
        'LEAD_ASSIGNED',
        'REVENUE_ALERT',
        'ERROR_ALERT'
      ]),
      title: z.string().min(1).max(200),
      message: z.string().min(1).max(1000),
      link: z.string().url().optional().nullable(),
      metadata: z.any().optional()
    })

    const validatedData = schema.parse(json)

    // 通知を作成
    let notifications = []
    
    if (validatedData.userId) {
      // 特定のユーザーへの通知
      const notification = await prisma.notification.create({
        data: {
          userId: validatedData.userId,
          type: validatedData.type,
          title: validatedData.title,
          message: validatedData.message,
          link: validatedData.link,
          metadata: validatedData.metadata || undefined
        }
      })
      notifications.push(notification)
    } else if (validatedData.userIds && validatedData.userIds.length > 0) {
      // 複数ユーザーへの通知
      const notificationData = validatedData.userIds.map(userId => ({
        userId,
        type: validatedData.type,
        title: validatedData.title,
        message: validatedData.message,
        link: validatedData.link,
        metadata: validatedData.metadata || undefined
      }))
      
      await prisma.notification.createMany({
        data: notificationData
      })
      
      notifications = await prisma.notification.findMany({
        where: {
          userId: { in: validatedData.userIds },
          title: validatedData.title,
          createdAt: { gte: new Date(Date.now() - 1000) }
        }
      })
    } else {
      // 全ユーザーへの通知
      const users = await prisma.user.findMany({
        select: { id: true }
      })
      
      const notificationData = users.map(user => ({
        userId: user.id,
        type: validatedData.type,
        title: validatedData.title,
        message: validatedData.message,
        link: validatedData.link,
        metadata: validatedData.metadata || undefined
      }))
      
      await prisma.notification.createMany({
        data: notificationData
      })
      
      notifications = await prisma.notification.findMany({
        where: {
          title: validatedData.title,
          createdAt: { gte: new Date(Date.now() - 1000) }
        }
      })
    }

    // 監査ログを記録
    await auditAction(
      'CREATE_NOTIFICATION',
      'notification',
      notifications[0]?.id,
      {
        type: validatedData.type,
        recipientCount: notifications.length
      },
      adminUser.id
    )

    return NextResponse.json({
      notifications,
      count: notifications.length
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Failed to create notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
} 