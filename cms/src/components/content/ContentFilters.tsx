'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Filter } from 'lucide-react'

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
    router.push(`/content?${params.toString()}`)
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-cms-text-muted" aria-hidden="true" />
        <h2 className="text-lg font-medium text-cms-text">フィルター</h2>
      </div>

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
    </div>
  )
} 