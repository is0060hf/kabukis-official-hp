import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ContentType, CharacterOwner, EventType } from '@/types/database'
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { validateContentType, validateCharacter, validateMonths } from '@/lib/validation'

// GET: コンテンツ分析データ取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const contentType = validateContentType(searchParams.get('type'))
    const character = validateCharacter(searchParams.get('character'))
    const months = validateMonths(searchParams.get('months')) || 3 // デフォルト3ヶ月

    // 期間の設定
    const endDate = endOfMonth(new Date())
    const startDate = startOfMonth(subMonths(new Date(), months - 1))

    // 基本的なwhere条件
    const contentWhere = {
      ...(contentType && { contentType }),
      ...(character && { characterOwner: character }),
      publishedAt: {
        gte: startDate,
        lte: endDate
      }
    }

    // 全体ビュー数
    const totalViews = await prisma.contentAnalytics.count({
      where: {
        eventType: 'VIEW',
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        content: contentWhere
      }
    })

    // 人気コンテンツ（ビュー数上位10件）
    const popularContentRaw = await prisma.contentAnalytics.groupBy({
      by: ['contentId'],
      _count: true,
      where: {
        eventType: 'VIEW',
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        content: contentWhere
      },
      orderBy: {
        _count: {
          contentId: 'desc'
        }
      },
      take: 10
    })

    // コンテンツ詳細情報を取得
    const popularContent = await Promise.all(
      popularContentRaw.map(async (item) => {
        const content = await prisma.content.findUnique({
          where: { id: item.contentId },
          select: {
            id: true,
            title: true,
            viewCount: true,
            likeCount: true,
            downloadCount: true
          }
        })

        // エンゲージメント率（いいね数/ビュー数）
        const engagement = content && content.viewCount > 0 
          ? (content.likeCount / content.viewCount) * 100
          : 0

        return {
          id: item.contentId,
          title: content?.title || 'Unknown',
          views: item._count,
          engagement: Math.round(engagement * 100) / 100
        }
      })
    )

    // トラフィックソース（リファラー）分析
    const trafficSourcesRaw = await prisma.contentAnalytics.groupBy({
      by: ['referrer'],
      _count: true,
      where: {
        eventType: 'VIEW',
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        content: contentWhere,
        NOT: {
          referrer: null
        }
      },
      orderBy: {
        _count: {
          referrer: 'desc'
        }
      },
      take: 10
    })

    // リファラーをグループ化
    const trafficSources: Record<string, number> = {
      direct: 0,
      social: 0,
      search: 0,
      internal: 0,
      other: 0
    }

    trafficSourcesRaw.forEach((item) => {
      const referrer = item.referrer || ''
      if (!referrer) {
        trafficSources.direct += item._count
      } else if (referrer.includes('google') || referrer.includes('bing')) {
        trafficSources.search += item._count
      } else if (referrer.includes('twitter') || referrer.includes('facebook') || referrer.includes('discord')) {
        trafficSources.social += item._count
      } else if (referrer.includes('yuya-kabuki.com') || referrer.includes('aoba-nekosora.com')) {
        trafficSources.internal += item._count
      } else {
        trafficSources.other += item._count
      }
    })

    // イベントタイプ別統計
    const eventStats = await prisma.contentAnalytics.groupBy({
      by: ['eventType'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        content: contentWhere
      }
    })

    const eventStatsMap = eventStats.reduce((acc, item) => {
      acc[item.eventType] = item._count
      return acc
    }, {} as Record<EventType, number>)

    // 月別トレンド
    const monthlyTrend = []
    for (let i = 0; i < months; i++) {
      const monthStart = startOfMonth(subMonths(new Date(), i))
      const monthEnd = endOfMonth(subMonths(new Date(), i))

      const monthViews = await prisma.contentAnalytics.count({
        where: {
          eventType: 'VIEW',
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          },
          content: contentWhere
        }
      })

      monthlyTrend.unshift({
        month: monthStart.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' }),
        views: monthViews
      })
    }

    return NextResponse.json({
      totalViews,
      popularContent,
      trafficSources,
      eventStats: eventStatsMap,
      monthlyTrend
    })
  } catch (error) {
    console.error('Error fetching content analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 