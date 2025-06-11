'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare,
  Star,
  Filter,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react'
import { FeedbackType, FeedbackStatus, CharacterOwner } from '@/types/database'

interface Feedback {
  id: string
  characterOwner: CharacterOwner
  feedbackType: FeedbackType
  subject: string
  message: string
  rating?: number
  status: FeedbackStatus
  createdAt: string
  lead?: {
    name?: string
    email: string
  }
  user?: {
    name?: string
    email: string
  }
}

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | 'ALL'>('ALL')
  const [typeFilter, setTypeFilter] = useState<FeedbackType | 'ALL'>('ALL')
  const [characterFilter, setCharacterFilter] = useState<CharacterOwner | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchFeedbacks()
  }, [statusFilter, typeFilter, characterFilter, page])

  const fetchFeedbacks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(typeFilter !== 'ALL' && { feedbackType: typeFilter }),
        ...(characterFilter !== 'ALL' && { characterOwner: characterFilter })
      })
      const response = await fetch(`/api/feedbacks?${params}`)
      const data = await response.json()
      setFeedbacks(data.feedbacks)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFeedbackStatus = async (feedbackId: string, newStatus: FeedbackStatus) => {
    try {
      await fetch(`/api/feedbacks/${feedbackId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      // リストを更新
      fetchFeedbacks()
    } catch (error) {
      console.error('Error updating feedback status:', error)
    }
  }

  const feedbackTypeLabels: Record<FeedbackType, string> = {
    BUG_REPORT: 'バグ報告',
    FEATURE_REQUEST: '機能要望',
    IMPROVEMENT: '改善提案',
    COMPLAINT: '苦情',
    PRAISE: '称賛',
    OTHER: 'その他'
  }

  const feedbackStatusLabels: Record<FeedbackStatus, string> = {
    NEW: '新規',
    REVIEWING: 'レビュー中',
    RESPONDED: '返信済み',
    CLOSED: 'クローズ'
  }

  const getStatusColor = (status: FeedbackStatus) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800'
      case 'REVIEWING': return 'bg-yellow-100 text-yellow-800'
      case 'RESPONDED': return 'bg-green-100 text-green-800'
      case 'CLOSED': return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: FeedbackType) => {
    switch (type) {
      case 'BUG_REPORT': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'FEATURE_REQUEST': return <Star className="h-4 w-4 text-yellow-500" />
      case 'IMPROVEMENT': return <Clock className="h-4 w-4 text-blue-500" />
      case 'COMPLAINT': return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'PRAISE': return <Star className="h-4 w-4 text-green-500" />
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cms-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cms-text">フィードバック管理</h1>
        <p className="text-cms-text-muted mt-1">
          ユーザーからのフィードバックと要望を管理
        </p>
      </div>

      {/* フィルター */}
      <div className="flex gap-4 bg-cms-card p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">ステータス</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FeedbackStatus | 'ALL')}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            {Object.entries(feedbackStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">タイプ</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as FeedbackType | 'ALL')}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            {Object.entries(feedbackTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">キャラクター</label>
          <select
            value={characterFilter}
            onChange={(e) => setCharacterFilter(e.target.value as CharacterOwner | 'ALL')}
            className="px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            <option value="YUYA">傾奇ユウヤ</option>
            <option value="AOBA">猫空あおば</option>
            <option value="SHARED">共通</option>
          </select>
        </div>
      </div>

      {/* フィードバックリスト */}
      <div className="space-y-4">
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-cms-card p-6 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                {getTypeIcon(feedback.feedbackType)}
                <div>
                  <h3 className="font-semibold text-cms-text">{feedback.subject}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-cms-text-muted">
                    <span>{feedbackTypeLabels[feedback.feedbackType]}</span>
                    <span>•</span>
                    <span>{feedback.characterOwner}</span>
                    <span>•</span>
                    <span>{new Date(feedback.createdAt).toLocaleDateString('ja-JP')}</span>
                    {feedback.rating && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < feedback.rating! ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                {feedbackStatusLabels[feedback.status]}
              </span>
            </div>

            <p className="text-cms-text mb-4">{feedback.message}</p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-cms-text-muted">
                送信者: {feedback.user?.name || feedback.lead?.name || 'ゲスト'} 
                ({feedback.user?.email || feedback.lead?.email})
              </div>
              
              {feedback.status !== 'CLOSED' && (
                <div className="flex gap-2">
                  {feedback.status === 'NEW' && (
                    <button
                      onClick={() => updateFeedbackStatus(feedback.id, 'REVIEWING')}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      レビュー開始
                    </button>
                  )}
                  {feedback.status === 'REVIEWING' && (
                    <button
                      onClick={() => updateFeedbackStatus(feedback.id, 'RESPONDED')}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      返信済みにする
                    </button>
                  )}
                  <button
                    onClick={() => updateFeedbackStatus(feedback.id, 'CLOSED')}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    クローズ
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-cms-card text-cms-text rounded hover:bg-cms-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            前へ
          </button>
          <span className="px-4 py-2 text-cms-text">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-cms-card text-cms-text rounded hover:bg-cms-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
} 