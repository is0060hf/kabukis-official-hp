import { prisma } from '@/lib/prisma'
import DashboardStats from '@/components/dashboard/DashboardStats'
import RecentActivity from '@/components/dashboard/RecentActivity'
import CharacterMetrics from '@/components/dashboard/CharacterMetrics'

export default async function DashboardPage() {
  // 統計データの取得
  const [leadCount, contentCount, scheduleCount] = await Promise.all([
    prisma.lead.count(),
    prisma.content.count({ where: { status: 'PUBLISHED' } }),
    prisma.streamSchedule.count({ where: { status: 'SCHEDULED' } }),
  ])

  const stats = {
    totalLeads: leadCount,
    publishedContent: contentCount,
    upcomingStreams: scheduleCount,
    conversionRate: 0, // TODO: 実装
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cms-text">ダッシュボード</h1>
        <p className="text-cms-text-muted mt-1">
          傾奇ユウヤ・猫空あおば 統合管理システム
        </p>
      </div>

      {/* 統計カード */}
      <DashboardStats stats={stats} />

      {/* キャラクター別メトリクス */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CharacterMetrics character="YUYA" />
        <CharacterMetrics character="AOBA" />
      </div>

      {/* 最近のアクティビティ */}
      <RecentActivity />
    </div>
  )
} 