import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { CharacterOwner, ContentType, ContentStatus } from '@/types/database'

// コンテンツ作成のスキーマ
const createContentSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  characterOwner: z.enum(['YUYA', 'AOBA', 'SHARED']),
  contentType: z.enum(['BLOG', 'TOOL', 'MUSIC', 'VIDEO', 'DOCUMENTATION', 'CASE_STUDY']),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
})

// GET: コンテンツ一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const characterOwner = searchParams.get('characterOwner') as CharacterOwner | null
    const contentType = searchParams.get('contentType') as ContentType | null
    const status = searchParams.get('status') as ContentStatus | null
    const search = searchParams.get('search')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const where = {
      ...(characterOwner && { characterOwner }),
      ...(contentType && { contentType }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { content: { contains: search, mode: 'insensitive' as const } },
          { excerpt: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(dateFrom || dateTo ? {
        createdAt: {
          ...(dateFrom && { gte: new Date(dateFrom) }),
          ...(dateTo && { 
            lte: new Date(dateTo + 'T23:59:59.999Z') // 終了日の終わりまで含める
          }),
        },
      } : {}),
    }

    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
        include: {
          // カテゴリ関連付けは一時的にコメントアウト
          // categories: true,
          _count: {
            select: {
              analytics: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.content.count({ where }),
    ])

    return NextResponse.json({
      contents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching contents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: コンテンツ作成
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createContentSchema.parse(body)

    // スラッグの重複チェック
    const existingContent = await prisma.content.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingContent) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    const { categoryIds, tags, ...contentData } = validatedData

    const content = await prisma.content.create({
      data: {
        ...contentData,
        tags: tags || [],
        ...(validatedData.status === 'PUBLISHED' && {
          publishedAt: new Date(),
        }),
        // カテゴリ関連付けは一時的にコメントアウト
        // ...(categoryIds && {
        //   categories: {
        //     connect: categoryIds.map(id => ({ id })),
        //   },
        // }),
      },
      // カテゴリ関連付けは一時的にコメントアウト
      // include: {
      //   categories: true,
      // },
    })

    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 