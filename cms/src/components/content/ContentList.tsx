'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { announceToScreenReader } from '@/components/common/LiveRegion'

interface Content {
  id: string
  title: string
  slug: string
  characterOwner: string
  contentType: string
  status: string
  viewCount: number
  publishedAt: string | null
  createdAt: string
  categories: Array<{ id: string; name: string }>
  _count: { analytics: number }
}

export default function ContentList() {
  const searchParams = useSearchParams()
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  useEffect(() => {
    fetchContents()
  }, [searchParams])

  const fetchContents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      const response = await fetch(`/api/content?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setContents(data.contents)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このコンテンツを削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        announceToScreenReader('コンテンツを削除しました', 'polite')
        fetchContents()
      } else {
        announceToScreenReader('コンテンツの削除に失敗しました', 'assertive')
      }
    } catch (error) {
      console.error('Error deleting content:', error)
      announceToScreenReader('エラーが発生しました', 'assertive')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      DRAFT: { label: '下書き', class: 'badge-info' },
      PUBLISHED: { label: '公開中', class: 'badge-success' },
      ARCHIVED: { label: 'アーカイブ', class: 'badge-warning' },
    }
    const config = statusMap[status as keyof typeof statusMap]
    return <span className={config.class}>{config.label}</span>
  }

  const getCharacterBadge = (character: string) => {
    const characterMap = {
      YUYA: { label: '傾奇ユウヤ', class: 'bg-purple-400/20 text-purple-400' },
      AOBA: { label: '猫空あおば', class: 'bg-pink-400/20 text-pink-400' },
      SHARED: { label: '共通', class: 'bg-cms-primary/20 text-cms-primary' },
    }
    const config = characterMap[character as keyof typeof characterMap]
    return <span className={`badge ${config.class}`}>{config.label}</span>
  }

  if (loading) {
    return <div className="text-cms-text-muted">読み込み中...</div>
  }

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">タイトル</th>
              <th scope="col">キャラクター</th>
              <th scope="col">タイプ</th>
              <th scope="col">ステータス</th>
              <th scope="col">閲覧数</th>
              <th scope="col">公開日</th>
              <th scope="col" className="text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => (
              <tr key={content.id}>
                <td>
                  <div>
                    <p className="font-medium text-cms-text">{content.title}</p>
                    <p className="text-sm text-cms-text-muted">{content.slug}</p>
                  </div>
                </td>
                <td>{getCharacterBadge(content.characterOwner)}</td>
                <td className="text-cms-text-muted">{content.contentType}</td>
                <td>{getStatusBadge(content.status)}</td>
                <td className="text-cms-text-muted">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    {content.viewCount}
                  </div>
                </td>
                <td className="text-cms-text-muted">
                  {content.publishedAt ? (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      {format(new Date(content.publishedAt), 'yyyy/MM/dd', { locale: ja })}
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/content/${content.id}/edit`}
                      className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text transition-colors duration-200"
                      aria-label={`${content.title}を編集`}
                    >
                      <Edit className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="p-2 rounded-md text-cms-text-muted hover:bg-cms-error/20 hover:text-cms-error transition-colors duration-200"
                      aria-label={`${content.title}を削除`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contents.length === 0 && (
        <div className="text-center py-8 text-cms-text-muted">
          コンテンツが見つかりませんでした
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {/* TODO: ページネーション実装 */}
          <span className="text-sm text-cms-text-muted">
            {pagination.total}件中 {(pagination.page - 1) * pagination.limit + 1}-
            {Math.min(pagination.page * pagination.limit, pagination.total)}件を表示
          </span>
        </div>
      )}
    </div>
  )
} 