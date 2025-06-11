import { prisma } from '@/lib/prisma'

type NotificationType = 
  | 'SYSTEM_UPDATE'
  | 'NEW_CONTENT'
  | 'NEW_REQUEST'
  | 'NEW_FEEDBACK'
  | 'REQUEST_STATUS_CHANGE'
  | 'FEEDBACK_RESPONSE'
  | 'PROJECT_UPDATE'
  | 'LEAD_ASSIGNED'
  | 'REVENUE_ALERT'
  | 'ERROR_ALERT'

interface CreateNotificationParams {
  userId?: string
  userIds?: string[]
  type: NotificationType
  title: string
  message: string
  link?: string
  metadata?: any
}

/**
 * 通知を作成するヘルパー関数
 */
export async function createNotification(params: CreateNotificationParams) {
  const { userId, userIds, type, title, message, link, metadata } = params

  try {
    if (userId) {
      // 特定のユーザーへの通知
      return await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          link,
          metadata
        }
      })
    } else if (userIds && userIds.length > 0) {
      // 複数ユーザーへの通知
      const notificationData = userIds.map(uid => ({
        userId: uid,
        type,
        title,
        message,
        link,
        metadata
      }))
      
      return await prisma.notification.createMany({
        data: notificationData
      })
    } else {
      // 全ユーザーへの通知
      const users = await prisma.user.findMany({
        select: { id: true }
      })
      
      const notificationData = users.map(user => ({
        userId: user.id,
        type,
        title,
        message,
        link,
        metadata
      }))
      
      return await prisma.notification.createMany({
        data: notificationData
      })
    }
  } catch (error) {
    console.error('Failed to create notification:', error)
    throw error
  }
}

/**
 * システム管理者への通知を作成
 */
export async function notifyAdmins(params: Omit<CreateNotificationParams, 'userId' | 'userIds'>) {
  try {
    const admins = await prisma.user.findMany({
      where: {
        profile: {
          isAdmin: true
        }
      },
      select: { id: true }
    })

    if (admins.length === 0) {
      console.warn('No admin users found to notify')
      return
    }

    return await createNotification({
      ...params,
      userIds: admins.map(admin => admin.id)
    })
  } catch (error) {
    console.error('Failed to notify admins:', error)
    throw error
  }
}

/**
 * 新しいリクエストの通知を作成（DB版）
 */
export async function createNewRequestNotification(requestId: string, requestTitle: string) {
  return notifyAdmins({
    type: 'NEW_REQUEST',
    title: '新しいリクエストが作成されました',
    message: `「${requestTitle}」のリクエストが作成されました`,
    link: `/requests?id=${requestId}`
  })
}

/**
 * 新しいフィードバックの通知を作成（DB版）
 */
export async function createNewFeedbackNotification(feedbackId: string, feedbackSubject: string) {
  return notifyAdmins({
    type: 'NEW_FEEDBACK',
    title: '新しいフィードバックが投稿されました',
    message: `「${feedbackSubject}」のフィードバックが投稿されました`,
    link: `/feedbacks?id=${feedbackId}`
  })
}

/**
 * リクエストステータス変更の通知を作成
 */
export async function notifyRequestStatusChange(
  userId: string,
  requestId: string,
  requestTitle: string,
  newStatus: string
) {
  const statusMap: Record<string, string> = {
    REVIEWING: 'レビュー中',
    APPROVED: '承認済み',
    IN_PROGRESS: '実装中',
    COMPLETED: '完了',
    REJECTED: '却下'
  }

  return createNotification({
    userId,
    type: 'REQUEST_STATUS_CHANGE',
    title: 'リクエストのステータスが更新されました',
    message: `「${requestTitle}」のステータスが「${statusMap[newStatus] || newStatus}」に変更されました`,
    link: `/requests?id=${requestId}`
  })
}

/**
 * フィードバックへの返信通知を作成
 */
export async function notifyFeedbackResponse(
  userId: string,
  feedbackId: string,
  feedbackSubject: string
) {
  return createNotification({
    userId,
    type: 'FEEDBACK_RESPONSE',
    title: 'フィードバックに返信がありました',
    message: `「${feedbackSubject}」への返信が投稿されました`,
    link: `/feedbacks?id=${feedbackId}`
  })
} 