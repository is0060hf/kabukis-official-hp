import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { RequestStatus } from '@/types/database'
import { notifyStatusUpdate } from '@/lib/notifications'

const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'])
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

    // 現在のリクエストを取得
    const currentRequest = await prisma.request.findUnique({
      where: { id }
    })

    if (!currentRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // ステータスを更新
    const updateData: any = {
      status: validatedData.status
    }

    // 完了時は完了日時を記録
    if (validatedData.status === 'COMPLETED') {
      updateData.implementedAt = new Date()
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: updateData
    })

    // ステータス変更の通知
    await notifyStatusUpdate(
      'request',
      id,
      currentRequest.status,
      validatedData.status,
      session.user?.name || session.user?.email || undefined
    )

    return NextResponse.json(updatedRequest)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating request status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 