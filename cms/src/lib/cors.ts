import { NextRequest, NextResponse } from 'next/server'

// 許可されたオリジン
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [
  'https://yuya-kabuki.com',
  'https://aoba-nekosora.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
]

// CORS設定
export const corsConfig = {
  allowedOrigins: ALLOWED_ORIGINS,
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  allowCredentials: true,
  maxAge: 86400, // 24時間
}

// CORSヘッダーを設定する関数
export function setCorsHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const origin = request.headers.get('origin')
  
  // オリジンが許可されているか確認
  if (origin && corsConfig.allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
  
  // プリフライトリクエストの場合
  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Methods', corsConfig.allowedMethods.join(', '))
    response.headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '))
    response.headers.set('Access-Control-Max-Age', corsConfig.maxAge.toString())
  }
  
  return response
}

// CORSミドルウェア
export function corsMiddleware(request: NextRequest): NextResponse | null {
  // プリフライトリクエストの処理
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    return setCorsHeaders(request, response)
  }
  
  return null
}

// クロスドメインユーザートラッキング（一時的にコメントアウト）
export async function trackCrossSiteNavigation(
  fromDomain: string,
  toDomain: string,
  userId?: string,
  sessionId?: string
) {
  try {
    // const { prisma } = await import('@/lib/prisma')
    
    // await prisma.crossSiteActivity.create({
    //   data: {
    //     userId,
    //     fromDomain,
    //     toDomain,
    //     sessionId: sessionId || generateSessionId(),
    //     createdAt: new Date(),
    //   },
    // })
    
    console.log('Cross-site navigation tracked (temporarily disabled)', {
      fromDomain,
      toDomain,
      userId,
      sessionId
    })
  } catch (error) {
    console.error('Error tracking cross-site navigation:', error)
  }
}

// セッションID生成
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// 共通ユーザー識別
export async function linkUserAccounts(email: string) {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    const existingUser = await prisma.user.findFirst({
      where: { email },
    })
    
    if (existingUser) {
      return existingUser
    } else {
      // 新規ユーザー作成（必要に応じて実装）
      return null
    }
  } catch (error) {
    console.error('Error linking user accounts:', error)
    return null
  }
} 