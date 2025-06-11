import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'

// GET: ダッシュボード概要データ取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const weekStart = startOfWeek(now)
    const weekEnd = endOfWeek(now)

    // 概要統計
    const [
      totalLeads,
      monthlyLeads,
      weeklyLeads,
      activeProjects,
      monthlyInquiries,
      openInquiries
    ] = await Promise.all([
      // 全リード数
      prisma.lead.count(),
      // 今月のリード数
      prisma.lead.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      }),
      // 今週のリード数
      prisma.lead.count({
        where: {
          createdAt: {
            gte: weekStart,
            lte: weekEnd
          }
        }
      }),
      // アクティブなプロジェクト（要求書）数
      prisma.request.count({
        where: {
          status: {
            in: ['APPROVED', 'IN_PROGRESS']
          }
        }
      }),
      // 今月の問い合わせ数
      prisma.inquiry.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      }),
      // 未対応の問い合わせ数
      prisma.inquiry.count({
        where: {
          status: {
            in: ['OPEN', 'IN_PROGRESS']
          }
        }
      })
    ])

    // 月次収益（推定値）
    const monthlyRevenue = await prisma.lead.aggregate({
      _sum: {
        estimatedValue: true
      },
      where: {
        status: 'WON',
        updatedAt: {
          gte: monthStart,
          lte: monthEnd
        }
      }
    })

    // コンバージョン率
    const conversionRate = totalLeads > 0 
      ? (await prisma.lead.count({ where: { status: 'WON' } }) / totalLeads) * 100
      : 0

    // サイト別メトリクス
    const [yuyaMetrics, aobaMetrics] = await Promise.all([
      // 傾奇ユウヤサイト
      {
        domain: 'yuya-kabuki.com',
        pageViews: await prisma.contentAnalytics.count({
          where: {
            eventType: 'VIEW',
            createdAt: { gte: monthStart, lte: monthEnd },
            content: { characterOwner: 'YUYA' }
          }
        }),
        toolDownloads: await prisma.contentAnalytics.count({
          where: {
            eventType: 'DOWNLOAD',
            createdAt: { gte: monthStart, lte: monthEnd },
            content: { 
              characterOwner: 'YUYA',
              contentType: 'TOOL'
            }
          }
        }),
        b2bLeads: await prisma.lead.count({
          where: {
            source: 'YUYA_SITE',
            leadType: 'B2B_CONSULTATION',
            createdAt: { gte: monthStart, lte: monthEnd }
          }
        })
      },
      // 猫空あおばサイト
      {
        domain: 'aoba-nekosora.com',
        pageViews: await prisma.contentAnalytics.count({
          where: {
            eventType: 'VIEW',
            createdAt: { gte: monthStart, lte: monthEnd },
            content: { characterOwner: 'AOBA' }
          }
        }),
        musicPlays: await prisma.contentAnalytics.count({
          where: {
            eventType: 'VIEW',
            createdAt: { gte: monthStart, lte: monthEnd },
            content: { 
              characterOwner: 'AOBA',
              contentType: 'MUSIC'
            }
          }
        }),
        stemDownloads: await prisma.contentAnalytics.count({
          where: {
            eventType: 'DOWNLOAD',
            createdAt: { gte: monthStart, lte: monthEnd },
            content: { 
              characterOwner: 'AOBA',
              contentType: 'MUSIC'
            }
          }
        })
      }
    ])

    // クロスサイトメトリクス
    const crossReferrals = await prisma.contentAnalytics.count({
      where: {
        eventType: 'VIEW',
        createdAt: { gte: monthStart, lte: monthEnd },
        OR: [
          { referrer: { contains: 'yuya-kabuki.com' }, content: { characterOwner: 'AOBA' } },
          { referrer: { contains: 'aoba-nekosora.com' }, content: { characterOwner: 'YUYA' } }
        ]
      }
    })

    // 最近のアクティビティ
    const recentActivities = await Promise.all([
      // 最新のリード
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          source: true,
          sourceDomain: true,
          createdAt: true
        }
      }),
      // 最新の問い合わせ
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          subject: true,
          inquiryType: true,
          createdAt: true,
          lead: {
            select: {
              sourceDomain: true
            }
          }
        }
      }),
      // 最新のフィードバック
      prisma.feedback.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          subject: true,
          feedbackType: true,
          characterOwner: true,
          createdAt: true
        }
      })
    ]).then(([leads, inquiries, feedbacks]) => {
      // 全てのアクティビティを統合して時系列でソート
      const activities = [
        ...leads.map(l => ({
          id: l.id,
          type: 'lead' as const,
          description: `新規リード: ${l.name || 'ゲスト'}`,
          timestamp: l.createdAt,
          character: l.sourceDomain?.includes('yuya') ? 'YUYA' as const : 
                    l.sourceDomain?.includes('aoba') ? 'AOBA' as const : undefined,
          sourceDomain: l.sourceDomain
        })),
        ...inquiries.map(i => ({
          id: i.id,
          type: 'inquiry' as const,
          description: `新規問い合わせ: ${i.subject}`,
          timestamp: i.createdAt,
          character: i.lead?.sourceDomain?.includes('yuya') ? 'YUYA' as const : 
                    i.lead?.sourceDomain?.includes('aoba') ? 'AOBA' as const : undefined,
          sourceDomain: i.lead?.sourceDomain
        })),
        ...feedbacks.map(f => ({
          id: f.id,
          type: 'feedback' as const,
          description: `新規フィードバック: ${f.subject}`,
          timestamp: f.createdAt,
          character: f.characterOwner as 'YUYA' | 'AOBA' | undefined,
          sourceDomain: f.characterOwner === 'YUYA' ? 'yuya-kabuki.com' : 
                       f.characterOwner === 'AOBA' ? 'aoba-nekosora.com' : undefined
        }))
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10)

      return activities
    })

    return NextResponse.json({
      overview: {
        totalLeads,
        activeProjects,
        monthlyRevenue: Number(monthlyRevenue._sum.estimatedValue || 0),
        conversionRate: Math.round(conversionRate * 100) / 100
      },
      metrics: {
        leads: {
          total: totalLeads,
          monthly: monthlyLeads,
          weekly: weeklyLeads
        },
        inquiries: {
          monthly: monthlyInquiries,
          open: openInquiries
        }
      },
      siteMetrics: {
        yuya: yuyaMetrics,
        aoba: aobaMetrics
      },
      crossSiteMetrics: {
        crossReferrals,
        sharedUserBase: 0 // TODO: 実装する場合は共通ユーザー数を計算
      },
      recentActivities
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 