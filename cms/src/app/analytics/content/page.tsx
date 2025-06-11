'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  TrendingUp,
  Globe,
  BarChart3,
  Download,
  FileText
} from 'lucide-react'
import { ContentType, CharacterOwner, EventType } from '@/types/database'

interface ContentAnalyticsData {
  totalViews: number
  popularContent: Array<{
    id: string
    title: string
    views: number
    engagement: number
  }>
  trafficSources: Record<string, number>
  eventStats: Record<EventType, number>
  monthlyTrend: Array<{
    month: string
    views: number
  }>
}

export default function ContentAnalyticsPage() {
  const [analytics, setAnalytics] = useState<ContentAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [contentType, setContentType] = useState<ContentType | 'ALL'>('ALL')
  const [character, setCharacter] = useState<CharacterOwner | 'ALL'>('ALL')
  const [months, setMonths] = useState(3)

  useEffect(() => {
    fetchAnalytics()
  }, [contentType, character, months])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(contentType !== 'ALL' && { type: contentType }),
        ...(character !== 'ALL' && { character }),
        months: months.toString()
      })
      const response = await fetch(`/api/analytics/content?${params}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    if (!analytics) return
    
    const csv = [
      ['タイトル', 'ビュー数', 'エンゲージメント率'],
      ...analytics.popularContent.map(item => [item.title, item.views, `${item.engagement}%`])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `content-analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cms-primary"></div>
      </div>
    )
  }

  if (!analytics) {
    return <div>データの取得に失敗しました</div>
  }

  const eventTypeLabels: Record<EventType, string> = {
    VIEW: '閲覧',
    LIKE: 'いいね',
    SHARE: 'シェア',
    DOWNLOAD: 'ダウンロード',
    COMMENT: 'コメント'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-cms-text">コンテンツ分析</h1>
          <p className="text-cms-text-muted mt-1">
            コンテンツパフォーマンスとユーザーエンゲージメント分析
          </p>
        </div>
        
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-cms-primary text-white rounded-lg hover:bg-cms-primary-hover transition-colors"
        >
          <Download className="h-4 w-4" />
          エクスポート
        </button>
      </div>

      {/* フィルター */}
      <div className="flex gap-4 bg-cms-card p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">コンテンツタイプ</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value as ContentType | 'ALL')}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全体</option>
            <option value="BLOG">ブログ</option>
            <option value="TOOL">ツール</option>
            <option value="MUSIC">音楽</option>
            <option value="VIDEO">動画</option>
            <option value="DOCUMENTATION">ドキュメント</option>
            <option value="CASE_STUDY">事例</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">キャラクター</label>
          <select
            value={character}
            onChange={(e) => setCharacter(e.target.value as CharacterOwner | 'ALL')}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全体</option>
            <option value="YUYA">傾奇ユウヤ</option>
            <option value="AOBA">猫空あおば</option>
            <option value="SHARED">共通</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">表示期間</label>
          <select
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="1">1ヶ月</option>
            <option value="3">3ヶ月</option>
            <option value="6">6ヶ月</option>
          </select>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cms-card p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-cms-text-muted">総ビュー数</p>
              <p className="text-2xl font-bold text-cms-text">{analytics.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 人気コンテンツ */}
      <div className="bg-cms-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-cms-text mb-4">人気コンテンツ TOP10</h2>
        <div className="space-y-3">
          {analytics.popularContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-cms-background rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-cms-text-muted">#{index + 1}</span>
                <div>
                  <h3 className="font-medium text-cms-text">{content.title}</h3>
                  <p className="text-sm text-cms-text-muted">
                    {content.views.toLocaleString()} ビュー • エンゲージメント率 {content.engagement}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* トラフィックソースとイベント統計 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cms-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-cms-text mb-4">トラフィックソース</h2>
          <div className="space-y-3">
            {Object.entries(analytics.trafficSources).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="text-cms-text capitalize">{source}</span>
                <span className="font-medium text-cms-text">{count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cms-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-cms-text mb-4">イベント統計</h2>
          <div className="space-y-3">
            {Object.entries(analytics.eventStats).map(([event, count]) => (
              <div key={event} className="flex justify-between items-center">
                <span className="text-cms-text">{eventTypeLabels[event as EventType]}</span>
                <span className="font-medium text-cms-text">{count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 月別トレンド */}
      <div className="bg-cms-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-cms-text mb-4">月別ビュー数トレンド</h2>
        <div className="space-y-4">
          {analytics.monthlyTrend.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-sm text-cms-text-muted w-24">{item.month}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-cms-background rounded-full h-6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.views / Math.max(...analytics.monthlyTrend.map(d => d.views))) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                  <span className="text-sm font-medium text-cms-text w-16 text-right">
                    {item.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 