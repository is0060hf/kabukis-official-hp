'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, Calendar } from 'lucide-react'

export default function ContentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // ページ番号をリセット
    params.delete('page')
    router.push(`/content?${params.toString()}`)
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-cms-text-muted" aria-hidden="true" />
        <h2 className="text-lg font-medium text-cms-text">フィルター</h2>
      </div>

      <div className="space-y-4">
        {/* 基本フィルター */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="characterOwner" className="label">
              キャラクター
            </label>
            <select
              id="characterOwner"
              className="input"
              value={searchParams.get('characterOwner') || ''}
              onChange={(e) => handleFilterChange('characterOwner', e.target.value)}
            >
              <option value="">すべて</option>
              <option value="YUYA">傾奇ユウヤ</option>
              <option value="AOBA">猫空あおば</option>
              <option value="SHARED">共通</option>
            </select>
          </div>

          <div>
            <label htmlFor="contentType" className="label">
              コンテンツタイプ
            </label>
            <select
              id="contentType"
              className="input"
              value={searchParams.get('contentType') || ''}
              onChange={(e) => handleFilterChange('contentType', e.target.value)}
            >
              <option value="">すべて</option>
              <option value="BLOG">ブログ</option>
              <option value="TOOL">ツール</option>
              <option value="MUSIC">楽曲</option>
              <option value="VIDEO">動画</option>
              <option value="DOCUMENTATION">ドキュメント</option>
              <option value="CASE_STUDY">事例</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="label">
              ステータス
            </label>
            <select
              id="status"
              className="input"
              value={searchParams.get('status') || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">すべて</option>
              <option value="DRAFT">下書き</option>
              <option value="PUBLISHED">公開中</option>
              <option value="ARCHIVED">アーカイブ</option>
            </select>
          </div>
        </div>

        {/* 日付範囲フィルター */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-cms-text-muted" aria-hidden="true" />
            <label className="text-sm font-medium text-cms-text">
              日付範囲
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateFrom" className="label text-xs">
                開始日
              </label>
              <input
                id="dateFrom"
                type="date"
                className="input"
                value={searchParams.get('dateFrom') || ''}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                max={searchParams.get('dateTo') || undefined}
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="label text-xs">
                終了日
              </label>
              <input
                id="dateTo"
                type="date"
                className="input"
                value={searchParams.get('dateTo') || ''}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                min={searchParams.get('dateFrom') || undefined}
              />
            </div>
          </div>
        </div>

        {/* クイックフィルター */}
        <div>
          <p className="text-sm font-medium text-cms-text mb-2">クイックフィルター</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const params = new URLSearchParams()
                params.set('status', 'PUBLISHED')
                params.set('dateFrom', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                router.push(`/content?${params.toString()}`)
              }}
              className="btn-outline text-sm"
            >
              過去7日間の公開記事
            </button>
            <button
              onClick={() => {
                const params = new URLSearchParams()
                params.set('status', 'DRAFT')
                router.push(`/content?${params.toString()}`)
              }}
              className="btn-outline text-sm"
            >
              下書きのみ
            </button>
            <button
              onClick={() => {
                router.push('/content')
              }}
              className="btn-outline text-sm"
            >
              フィルターをクリア
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 