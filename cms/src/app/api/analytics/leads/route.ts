import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LeadStatus, LeadSource, CharacterOwner } from '@/types/database'
import { startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek, subWeeks } from 'date-fns'
import { validatePeriod, validateMonths, validateCharacter } from '@/lib/validation'

// GET: リード分析データ取得
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = validatePeriod(searchParams.get('period'))
    const character = validateCharacter(searchParams.get('character'))
    const months = validateMonths(searchParams.get('months'))

    // 期間の計算
    const now = new Date()
    const dateRanges = []
    
    if (period === 'monthly') {
      for (let i = 0; i < months; i++) {
        const date = subMonths(now, i)
        dateRanges.push({
          start: startOfMonth(date),
          end: endOfMonth(date),
          label: date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })
        })
      }
    } else {
      for (let i = 0; i < 12; i++) { // 12週間
        const date = subWeeks(now, i)
        dateRanges.push({
          start: startOfWeek(date),
          end: endOfWeek(date),
          label: `${date.getMonth() + 1}月第${Math.ceil(date.getDate() / 7)}週`
        })
      }
    }

    // 全体統計
    const totalLeads = await prisma.lead.count({
      where: character ? {
        OR: [
          { sourceDomain: { contains: character.toLowerCase() } },
          { source: character === 'YUYA' ? 'YUYA_SITE' : 'AOBA_SITE' }
        ]
      } : {}
    })

    const wonLeads = await prisma.lead.count({
      where: {
        status: 'WON',
        ...(character && {
          OR: [
            { sourceDomain: { contains: character.toLowerCase() } },
            { source: character === 'YUYA' ? 'YUYA_SITE' : 'AOBA_SITE' }
          ]
        })
      }
    })

    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0

    // ソース別統計
    const leadsBySource = await prisma.lead.groupBy({
      by: ['source'],
      _count: true,
      where: character ? {
        OR: [
          { sourceDomain: { contains: character.toLowerCase() } },
          { source: character === 'YUYA' ? 'YUYA_SITE' : 'AOBA_SITE' }
        ]
      } : {}
    })

    // ステータス別統計
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
      where: character ? {
        OR: [
          { sourceDomain: { contains: character.toLowerCase() } },
          { source: character === 'YUYA' ? 'YUYA_SITE' : 'AOBA_SITE' }
        ]
      } : {}
    })

    // トレンドデータ
    const trendsData = await Promise.all(
      dateRanges.reverse().map(async (range) => {
        const count = await prisma.lead.count({
          where: {
            createdAt: {
              gte: range.start,
              lte: range.end
            },
            ...(character && {
              OR: [
                { sourceDomain: { contains: character.toLowerCase() } },
                { source: character === 'YUYA' ? 'YUYA_SITE' : 'AOBA_SITE' }
              ]
            })
          }
        })

        const value = await prisma.lead.aggregate({
          _sum: {
            estimatedValue: true
          },
          where: {
            createdAt: {
              gte: range.start,
              lte: range.end
            },
            ...(character && {
              OR: [
                { sourceDomain: { contains: character.toLowerCase() } },
                { source: character === 'YUYA' ? 'YUYA_SITE' : 'AOBA_SITE' }
              ]
            })
          }
        })

        return {
          date: range.label,
          count,
          value: Number(value._sum.estimatedValue || 0)
        }
      })
    )

    return NextResponse.json({
      totalLeads,
      conversionRate: Math.round(conversionRate * 100) / 100,
      leadsBySource: leadsBySource.reduce((acc, item) => {
        acc[item.source] = item._count
        return acc
      }, {} as Record<string, number>),
      leadsByStatus: leadsByStatus.reduce((acc, item) => {
        acc[item.status] = item._count
        return acc
      }, {} as Record<string, number>),
      trendsData
    })
  } catch (error) {
    console.error('Error fetching lead analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 