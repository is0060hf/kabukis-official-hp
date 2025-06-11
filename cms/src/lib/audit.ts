import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// 監査対象のアクション
const SENSITIVE_ACTIONS = ['DELETE', 'PUT', 'POST']
const SENSITIVE_RESOURCES = ['/api/users', '/api/leads', '/api/projects', '/api/companies', '/api/content']

// ログステータス
type LogStatus = 'SUCCESS' | 'FAILURE'

// 監査ログエントリ
interface AuditLogEntry {
  userId?: string
  action: string
  resource: string
  resourceId?: string
  changes?: any
  ipAddress?: string | null
  userAgent?: string | null
  status: LogStatus
}

// 監査ログを記録する関数
export async function logAuditEntry(entry: AuditLogEntry) {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    await prisma.auditLog.create({
      data: {
        ...entry,
        createdAt: new Date(),
      },
    })
  } catch (error) {
    console.error('Error creating audit log:', error)
  }
}

// 監査ログミドルウェア
export async function auditMiddleware(
  request: NextRequest,
  response: NextResponse
): Promise<void> {
  try {
    // セッション情報を取得
    const session = await auth()
    
    // 監査対象かチェック
    const isAuditRequired = 
      SENSITIVE_ACTIONS.includes(request.method) &&
      SENSITIVE_RESOURCES.some(resource => request.url.includes(resource))
    
    if (!isAuditRequired) {
      return
    }
    
    // リクエストボディを取得（可能な場合）
    let requestBody = null
    try {
      const clonedRequest = request.clone()
      requestBody = await clonedRequest.json()
    } catch {
      // ボディが取得できない場合は無視
    }
    
    // リソースIDを抽出（URLパスから）
    const urlParts = new URL(request.url).pathname.split('/')
    const resourceId = urlParts.length > 3 ? urlParts[urlParts.length - 1] : undefined
    
    // 監査ログエントリを作成
    const logEntry: AuditLogEntry = {
      userId: session?.user?.id,
      action: request.method,
      resource: new URL(request.url).pathname,
      resourceId,
      changes: requestBody,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
      status: response.status < 400 ? 'SUCCESS' : 'FAILURE',
    }
    
    // 非同期でログを記録
    logAuditEntry(logEntry).catch(console.error)
  } catch (error) {
    console.error('Error in audit middleware:', error)
  }
}

// 重要な操作を記録するヘルパー関数
export async function auditAction(
  action: string,
  resource: string,
  resourceId?: string,
  changes?: any,
  userId?: string
) {
  try {
    await logAuditEntry({
      userId,
      action,
      resource,
      resourceId,
      changes,
      status: 'SUCCESS',
    })
  } catch (error) {
    console.error('Error auditing action:', error)
  }
}

// 監査ログのクリーンアップ（古いログの削除）
export async function cleanupAuditLogs(daysToKeep: number = 90) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)
    
    const result = await prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    })
    
    console.log(`Cleaned up ${result.count} audit logs older than ${daysToKeep} days`)
    return result
  } catch (error) {
    console.error('Error cleaning up audit logs:', error)
    throw error
  }
} 