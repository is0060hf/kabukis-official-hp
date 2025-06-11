import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { corsMiddleware, setCorsHeaders } from './lib/cors'
import { auditMiddleware } from './lib/audit'

export async function middleware(request: NextRequest) {
  // CORSプリフライトリクエストの処理
  const corsResponse = corsMiddleware(request)
  if (corsResponse) {
    return corsResponse
  }

  // パスの取得
  const path = request.nextUrl.pathname
  
  // 認証が不要なパス
  const publicPaths = ['/', '/api/auth']
  const isPublicPath = publicPaths.some(p => path.startsWith(p))
  
  // 認証チェック
  if (!isPublicPath) {
    const session = await auth()
    
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  // 通常のレスポンスを作成
  const response = NextResponse.next()
  
  // CORSヘッダーを設定
  setCorsHeaders(request, response)
  
  // 監査ログの記録（非同期で実行）
  if (path.startsWith('/api/')) {
    auditMiddleware(request, response).catch(console.error)
  }
  
  return response
}

export const config = {
  matcher: [
    // API routes
    '/api/:path*',
    // Protected pages
    '/dashboard/:path*',
    '/content/:path*',
    '/leads/:path*',
    '/analytics/:path*',
    '/requests/:path*',
    '/feedbacks/:path*',
    '/settings/:path*',
  ],
} 