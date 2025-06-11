import { Lead, Inquiry, Feedback, Request } from '@prisma/client'
import nodemailer from 'nodemailer'
import { CharacterOwner } from '@/types/database'

// メール送信の設定
const transporter = process.env.EMAIL_SERVER 
  ? nodemailer.createTransport(process.env.EMAIL_SERVER)
  : null

// 通知タイプ
export enum NotificationType {
  NEW_LEAD = 'NEW_LEAD',
  NEW_INQUIRY = 'NEW_INQUIRY',
  NEW_FEEDBACK = 'NEW_FEEDBACK',
  NEW_REQUEST = 'NEW_REQUEST',
  STATUS_UPDATE = 'STATUS_UPDATE',
}

// Discord埋め込みの色
const DISCORD_COLORS = {
  [NotificationType.NEW_LEAD]: 0x00ff00,      // 緑
  [NotificationType.NEW_INQUIRY]: 0x0099ff,   // 青
  [NotificationType.NEW_FEEDBACK]: 0xffcc00,  // 黄
  [NotificationType.NEW_REQUEST]: 0xff9900,   // オレンジ
  [NotificationType.STATUS_UPDATE]: 0x9900ff, // 紫
}

// キャラクター別の絵文字
const CHARACTER_EMOJIS = {
  YUYA: '🦇',
  AOBA: '🐱',
  SHARED: '🌟',
}

// 優先度の絵文字
const PRIORITY_EMOJIS = {
  LOW: '🟢',
  MEDIUM: '🟡',
  HIGH: '🟠',
  URGENT: '🔴',
}

interface NotificationOptions {
  type: NotificationType
  title: string
  description: string
  fields?: Array<{ name: string; value: string; inline?: boolean }>
  url?: string
  character?: CharacterOwner
  priority?: string
}

// Discord Webhook送信
export async function sendDiscordNotification(options: NotificationOptions) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('Discord Webhook URL not configured')
    return
  }

  const characterEmoji = options.character ? CHARACTER_EMOJIS[options.character] : ''
  const priorityEmoji = options.priority ? PRIORITY_EMOJIS[options.priority as keyof typeof PRIORITY_EMOJIS] : ''

  const embed = {
    title: `${characterEmoji} ${priorityEmoji} ${options.title}`.trim(),
    description: options.description,
    color: DISCORD_COLORS[options.type],
    fields: options.fields || [],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'Kabukis CMS',
    },
    ...(options.url && { url: options.url }),
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      console.error('Discord notification failed:', response.statusText)
    }
  } catch (error) {
    console.error('Discord notification error:', error)
  }
}

// メール送信
export async function sendEmailNotification(
  to: string,
  subject: string,
  html: string
) {
  if (!process.env.EMAIL_SERVER || !transporter) {
    console.warn('Email server not configured')
    return
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@kabukis-cms.com',
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('Email notification error:', error)
  }
}

// リード通知
export async function notifyNewLead(lead: Lead) {
  const fields = [
    { name: '📧 メール', value: lead.email, inline: true },
    { name: '👤 名前', value: lead.name || '未設定', inline: true },
    { name: '🏢 会社', value: lead.company || '未設定', inline: true },
    { name: '📌 ソース', value: lead.source, inline: true },
    { name: '📋 タイプ', value: lead.leadType, inline: true },
    { name: '🌐 ドメイン', value: lead.sourceDomain || '未設定', inline: true },
  ]

  await sendDiscordNotification({
    type: NotificationType.NEW_LEAD,
    title: '新しいリードが登録されました',
    description: `${lead.name || 'ゲスト'}さんからの新規リード`,
    fields,
    character: lead.sourceDomain?.includes('yuya') ? 'YUYA' : 
               lead.sourceDomain?.includes('aoba') ? 'AOBA' : 'SHARED',
    priority: lead.priority,
  })

  // 管理者にメール通知
  if (process.env.ADMIN_EMAIL) {
    await sendEmailNotification(
      process.env.ADMIN_EMAIL,
      `新規リード: ${lead.name || lead.email}`,
      `
        <h2>新しいリードが登録されました</h2>
        <p><strong>名前:</strong> ${lead.name || '未設定'}</p>
        <p><strong>メール:</strong> ${lead.email}</p>
        <p><strong>会社:</strong> ${lead.company || '未設定'}</p>
        <p><strong>ソース:</strong> ${lead.source}</p>
        <p><strong>タイプ:</strong> ${lead.leadType}</p>
        <p><strong>優先度:</strong> ${lead.priority}</p>
        <hr>
        <p><a href="${process.env.NEXTAUTH_URL}/leads/${lead.id}">詳細を見る</a></p>
      `
    )
  }
}

// 問い合わせ通知
export async function notifyNewInquiry(inquiry: Inquiry & { lead?: Lead | null }) {
  const fields = [
    { name: '📧 送信者', value: inquiry.lead?.email || 'ゲスト', inline: true },
    { name: '📋 タイプ', value: inquiry.inquiryType, inline: true },
    { name: '🚨 優先度', value: inquiry.priority, inline: true },
    { name: '📝 件名', value: inquiry.subject },
  ]

  await sendDiscordNotification({
    type: NotificationType.NEW_INQUIRY,
    title: '新しい問い合わせが届きました',
    description: inquiry.message.substring(0, 200) + (inquiry.message.length > 200 ? '...' : ''),
    fields,
    priority: inquiry.priority,
  })

  // 高優先度の場合は管理者にメール通知
  if (inquiry.priority === 'HIGH' || inquiry.priority === 'URGENT') {
    if (process.env.ADMIN_EMAIL) {
      await sendEmailNotification(
        process.env.ADMIN_EMAIL,
        `【${inquiry.priority}】新規問い合わせ: ${inquiry.subject}`,
        `
          <h2>緊急度の高い問い合わせが届きました</h2>
          <p><strong>件名:</strong> ${inquiry.subject}</p>
          <p><strong>タイプ:</strong> ${inquiry.inquiryType}</p>
          <p><strong>優先度:</strong> ${inquiry.priority}</p>
          <p><strong>送信者:</strong> ${inquiry.lead?.email || 'ゲスト'}</p>
          <hr>
          <p>${inquiry.message}</p>
          <hr>
          <p><a href="${process.env.NEXTAUTH_URL}/inquiries/${inquiry.id}">詳細を見る</a></p>
        `
      )
    }
  }
}

// フィードバック通知
export async function notifyNewFeedback(feedback: Feedback & { user?: { email: string } | null }) {
  const fields = [
    { name: '📧 送信者', value: feedback.user?.email || 'ゲスト', inline: true },
    { name: '📋 タイプ', value: feedback.feedbackType, inline: true },
    { name: '⭐ 評価', value: feedback.rating ? '★'.repeat(feedback.rating) : '未評価', inline: true },
    { name: '🎭 キャラクター', value: feedback.characterOwner, inline: true },
    { name: '📝 件名', value: feedback.subject },
  ]

  await sendDiscordNotification({
    type: NotificationType.NEW_FEEDBACK,
    title: '新しいフィードバックが届きました',
    description: feedback.message.substring(0, 200) + (feedback.message.length > 200 ? '...' : ''),
    fields,
    character: feedback.characterOwner,
  })
}

// リクエスト通知
export async function notifyNewRequest(request: Request & { user?: { email: string } | null }) {
  const fields = [
    { name: '📧 送信者', value: request.user?.email || 'ゲスト', inline: true },
    { name: '📋 タイプ', value: request.requestType, inline: true },
    { name: '🚨 優先度', value: request.priority, inline: true },
    { name: '🎭 キャラクター', value: request.characterOwner, inline: true },
    { name: '📝 タイトル', value: request.title },
  ]

  await sendDiscordNotification({
    type: NotificationType.NEW_REQUEST,
    title: '新しいリクエストが届きました',
    description: request.description.substring(0, 200) + (request.description.length > 200 ? '...' : ''),
    fields,
    character: request.characterOwner,
    priority: request.priority,
  })
}

// ステータス更新通知
export async function notifyStatusUpdate(
  entityType: 'lead' | 'inquiry' | 'feedback' | 'request',
  entityId: string,
  oldStatus: string,
  newStatus: string,
  updatedBy?: string
) {
  await sendDiscordNotification({
    type: NotificationType.STATUS_UPDATE,
    title: `${entityType}のステータスが更新されました`,
    description: `ID: ${entityId}`,
    fields: [
      { name: '📊 変更前', value: oldStatus, inline: true },
      { name: '📈 変更後', value: newStatus, inline: true },
      { name: '👤 更新者', value: updatedBy || 'システム', inline: true },
    ],
  })
} 