'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3,
  Download,
  Filter
} from 'lucide-react'
import { CharacterOwner } from '@/types/database'

interface LeadAnalyticsData {
  totalLeads: number
  conversionRate: number
  leadsBySource: Record<string, number>
  leadsByStatus: Record<string, number>
  trendsData: Array<{
    date: string
    count: number
    value: number
  }>
}

export default function LeadAnalyticsPage() {
  const [analytics, setAnalytics] = useState<LeadAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly')
  const [character, setCharacter] = useState<CharacterOwner | 'ALL'>('ALL')
  const [months, setMonths] = useState(6)

  useEffect(() => {
    fetchAnalytics()
  }, [period, character, months])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        period,
        ...(character !== 'ALL' && { character }),
        months: months.toString()
      })
      const response = await fetch(`/api/analytics/leads?${params}`)
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
      ['日付', 'リード数', '推定価値'],
      ...analytics.trendsData.map(item => [item.date, item.count, item.value])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lead-analytics-${new Date().toISOString().split('T')[0]}.csv`
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-cms-text">リード分析</h1>
          <p className="text-cms-text-muted mt-1">
            リード獲得状況とコンバージョン分析
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
          <label className="block text-sm font-medium text-cms-text-muted mb-1">期間</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'monthly' | 'weekly')}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="monthly">月別</option>
            <option value="weekly">週別</option>
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
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">表示期間</label>
          <select
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="3">3ヶ月</option>
            <option value="6">6ヶ月</option>
            <option value="12">12ヶ月</option>
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
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-cms-text-muted">総リード数</p>
              <p className="text-2xl font-bold text-cms-text">{analytics.totalLeads}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-cms-card p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-cms-text-muted">コンバージョン率</p>
              <p className="text-2xl font-bold text-cms-text">{analytics.conversionRate}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* トレンドチャート */}
      <div className="bg-cms-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-cms-text mb-4">リード獲得トレンド</h2>
        <div className="space-y-4">
          {analytics.trendsData.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-sm text-cms-text-muted w-24">{item.date}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-cms-background rounded-full h-6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / Math.max(...analytics.trendsData.map(d => d.count))) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-cms-primary to-blue-500"
                    />
                  </div>
                  <span className="text-sm font-medium text-cms-text w-12 text-right">{item.count}</span>
                </div>
                <p className="text-xs text-cms-text-muted mt-1">推定価値: ¥{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ソース別・ステータス別分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cms-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-cms-text mb-4">ソース別リード</h2>
          <div className="space-y-3">
            {Object.entries(analytics.leadsBySource).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="text-cms-text">{source}</span>
                <span className="font-medium text-cms-text">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cms-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-cms-text mb-4">ステータス別リード</h2>
          <div className="space-y-3">
            {Object.entries(analytics.leadsByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="text-cms-text">{status}</span>
                <span className="font-medium text-cms-text">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 