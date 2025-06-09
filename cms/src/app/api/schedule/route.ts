import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { CharacterOwner, StreamType, StreamStatus } from '@/types/database'

// スケジュール作成のスキーマ
const createScheduleSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  characterOwner: z.enum(['YUYA', 'AOBA', 'SHARED']),
  streamType: z.enum(['GAMING', 'ASMR', 'MUSIC', 'COLLAB', 'SPECIAL']),
  scheduledDate: z.string().datetime(),
  duration: z.number().optional(),
  platform: z.string(),
  streamUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringPattern: z.any().optional(),
})

// GET: スケジュール一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const characterOwner = searchParams.get('characterOwner') as CharacterOwner | null
    const streamType = searchParams.get('streamType') as StreamType | null
    const status = searchParams.get('status') as StreamStatus | null
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const where = {
      ...(characterOwner && { characterOwner }),
      ...(streamType && { streamType }),
      ...(status && { status }),
      ...(from || to ? {
        scheduledDate: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        }
      } : {}),
    }

    const schedules = await prisma.streamSchedule.findMany({
      where,
      orderBy: { scheduledDate: 'asc' },
    })

    return NextResponse.json(schedules)
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: スケジュール作成
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createScheduleSchema.parse(body)

    const schedule = await prisma.streamSchedule.create({
      data: {
        ...validatedData,
        scheduledDate: new Date(validatedData.scheduledDate),
      },
    })

    return NextResponse.json(schedule, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 