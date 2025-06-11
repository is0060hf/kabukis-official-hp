'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Play,
  Pause,
  Filter
} from 'lucide-react'
import { RequestType, RequestStatus, Priority, CharacterOwner } from '@/types/database'

interface Request {
  id: string
  characterOwner: CharacterOwner
  requestType: RequestType
  title: string
  description: string
  priority: Priority
  status: RequestStatus
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

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL')
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'ALL'>('ALL')
  const [characterFilter, setCharacterFilter] = useState<CharacterOwner | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchRequests()
  }, [statusFilter, typeFilter, priorityFilter, characterFilter, page])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(typeFilter !== 'ALL' && { requestType: typeFilter }),
        ...(priorityFilter !== 'ALL' && { priority: priorityFilter }),
        ...(characterFilter !== 'ALL' && { characterOwner: characterFilter })
      })
      const response = await fetch(`/api/requests?${params}`)
      const data = await response.json()
      setRequests(data.requests)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (requestId: string, newStatus: RequestStatus) => {
    try {
      await fetch(`/api/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      // リストを更新
      fetchRequests()
    } catch (error) {
      console.error('Error updating request status:', error)
    }
  }

  const requestTypeLabels: Record<RequestType, string> = {
    NEW_FEATURE: '新機能',
    CONTENT_REQUEST: 'コンテンツリクエスト',
    TOOL_REQUEST: 'ツールリクエスト',
    COLLABORATION: 'コラボレーション',
    OTHER: 'その他'
  }

  const requestStatusLabels: Record<RequestStatus, string> = {
    PENDING: '保留中',
    REVIEWING: 'レビュー中',
    APPROVED: '承認済み',
    IN_PROGRESS: '進行中',
    COMPLETED: '完了',
    REJECTED: '却下'
  }

  const priorityLabels: Record<Priority, string> = {
    LOW: '低',
    MEDIUM: '中',
    HIGH: '高',
    URGENT: '緊急'
  }

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-100 text-gray-800'
      case 'REVIEWING': return 'bg-blue-100 text-blue-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
    }
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'LOW': return 'text-green-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'HIGH': return 'text-orange-600'
      case 'URGENT': return 'text-red-600'
    }
  }

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING': return <Clock className="h-4 w-4" />
      case 'REVIEWING': return <Clock className="h-4 w-4" />
      case 'APPROVED': return <CheckCircle className="h-4 w-4" />
      case 'IN_PROGRESS': return <Play className="h-4 w-4" />
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />
      case 'REJECTED': return <XCircle className="h-4 w-4" />
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
        <h1 className="text-3xl font-bold text-cms-text">リクエスト管理</h1>
        <p className="text-cms-text-muted mt-1">
          ユーザーからのリクエストと要望を管理
        </p>
      </div>

      {/* フィルター */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-cms-card p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">ステータス</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'ALL')}
            className="w-full px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            {Object.entries(requestStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">タイプ</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as RequestType | 'ALL')}
            className="w-full px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            {Object.entries(requestTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">優先度</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'ALL')}
            className="w-full px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cms-text-muted mb-1">キャラクター</label>
          <select
            value={characterFilter}
            onChange={(e) => setCharacterFilter(e.target.value as CharacterOwner | 'ALL')}
            className="w-full px-3 py-2 bg-cms-background border border-cms-border rounded-lg text-cms-text"
          >
            <option value="ALL">全て</option>
            <option value="YUYA">傾奇ユウヤ</option>
            <option value="AOBA">猫空あおば</option>
            <option value="SHARED">共通</option>
          </select>
        </div>
      </div>

      {/* リクエストリスト */}
      <div className="space-y-4">
        {requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-cms-card p-6 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-cms-text-muted mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-cms-text text-lg">{request.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-cms-text-muted">
                    <span>{requestTypeLabels[request.requestType]}</span>
                    <span>•</span>
                    <span className={`font-medium ${getPriorityColor(request.priority)}`}>
                      優先度: {priorityLabels[request.priority]}
                    </span>
                    <span>•</span>
                    <span>{request.characterOwner}</span>
                    <span>•</span>
                    <span>{new Date(request.createdAt).toLocaleDateString('ja-JP')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusIcon(request.status)}
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                  {requestStatusLabels[request.status]}
                </span>
              </div>
            </div>

            <p className="text-cms-text mb-4">{request.description}</p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-cms-text-muted">
                リクエスト者: {request.user?.name || request.lead?.name || 'ゲスト'} 
                ({request.user?.email || request.lead?.email})
              </div>
              
              <div className="flex gap-2">
                {request.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => updateRequestStatus(request.id, 'REVIEWING')}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      レビュー開始
                    </button>
                    <button
                      onClick={() => updateRequestStatus(request.id, 'REJECTED')}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      却下
                    </button>
                  </>
                )}
                {request.status === 'REVIEWING' && (
                  <>
                    <button
                      onClick={() => updateRequestStatus(request.id, 'APPROVED')}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      承認
                    </button>
                    <button
                      onClick={() => updateRequestStatus(request.id, 'REJECTED')}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      却下
                    </button>
                  </>
                )}
                {request.status === 'APPROVED' && (
                  <button
                    onClick={() => updateRequestStatus(request.id, 'IN_PROGRESS')}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  >
                    作業開始
                  </button>
                )}
                {request.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => updateRequestStatus(request.id, 'COMPLETED')}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    完了
                  </button>
                )}
              </div>
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