import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// 接続中のクライアントを管理
const clients = new Map<string, ReadableStreamDefaultController>()

// SSEメッセージを送信
function sendSSE(controller: ReadableStreamDefaultController, data: any) {
  const message = `data: ${JSON.stringify(data)}\n\n`
  controller.enqueue(new TextEncoder().encode(message))
}

// 新しい通知を全クライアントに配信
function broadcastNotification(userId: string, notification: any) {
  const controller = clients.get(userId)
  if (controller) {
    sendSSE(controller, {
      type: 'notification',
      data: notification
    })
  }
}

// GET /api/notifications/stream - SSE接続を確立
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  })

  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  // SSEストリームを作成
  const stream = new ReadableStream({
    start(controller) {
      // クライアントを登録
      clients.set(user.id, controller)

      // 初期接続メッセージを送信
      sendSSE(controller, {
        type: 'connected',
        userId: user.id,
        timestamp: new Date().toISOString()
      })

      // 定期的にkeep-aliveメッセージを送信（30秒ごと）
      const keepAliveInterval = setInterval(() => {
        try {
          sendSSE(controller, {
            type: 'ping',
            timestamp: new Date().toISOString()
          })
        } catch (error) {
          // エラーが発生したら接続をクリーンアップ
          clearInterval(keepAliveInterval)
          clients.delete(user.id)
        }
      }, 30000)

      // 接続が閉じられたときのクリーンアップ
      request.signal.addEventListener('abort', () => {
        clearInterval(keepAliveInterval)
        clients.delete(user.id)
        controller.close()
      })
    },
    
    cancel() {
      // ストリームがキャンセルされたときのクリーンアップ
      clients.delete(user.id)
    }
  })

  // SSEレスポンスヘッダーを設定
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Nginxでのバッファリングを無効化
    }
  })
}

// 通知作成時に呼び出すヘルパー関数
async function notifyUser(userId: string, notification: any) {
  broadcastNotification(userId, notification)
} 