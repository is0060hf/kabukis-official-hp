import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// コンテンツ更新のスキーマ
const updateContentSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  characterOwner: z.enum(['YUYA', 'AOBA', 'SHARED']).optional(),
  contentType: z.enum(['BLOG', 'TOOL', 'MUSIC', 'VIDEO', 'DOCUMENTATION', 'CASE_STUDY']).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET: 個別コンテンツ取得
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const content = await prisma.content.findFirst({
      where: { id },
      include: {
        analytics: {
          select: {
            eventType: true,
          },
        },
        _count: {
          select: {
            analytics: true,
          },
        },
      },
    })

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT: コンテンツ更新
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updateContentSchema.parse(body)

    // スラッグの重複チェック（自分以外）
    if (validatedData.slug) {
      const existingContent = await prisma.content.findFirst({
        where: {
          slug: validatedData.slug,
          NOT: { id },
        },
      })

      if (existingContent) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        )
      }
    }

    const { categoryIds, tags, ...contentData } = validatedData

    // 公開ステータスの変更を検知
    const currentContent = await prisma.content.findUnique({
      where: { id },
      select: { status: true },
    })

    const content = await prisma.content.update({
      where: { id },
      data: {
        ...contentData,
        ...(tags !== undefined && { tags }),
        ...(validatedData.status === 'PUBLISHED' && 
            currentContent?.status !== 'PUBLISHED' && {
          publishedAt: new Date(),
        }),
        // カテゴリ関連付けは一時的にコメントアウト
        // ...(categoryIds && {
        //   categories: {
        //     set: categoryIds.map(id => ({ id })),
        //   },
        // }),
      },
    })

    return NextResponse.json(content)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE: コンテンツ削除
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.content.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 