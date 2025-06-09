import { Suspense } from 'react'
import ContentList from '@/components/content/ContentList'
import ContentFilters from '@/components/content/ContentFilters'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cms-text">コンテンツ管理</h1>
          <p className="text-cms-text-muted mt-1">
            ブログ記事、ツール、楽曲などのコンテンツを管理
          </p>
        </div>
        <Link
          href="/content/new"
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          新規作成
        </Link>
      </div>

      <Suspense fallback={<div className="card animate-pulse h-32" />}>
        <ContentFilters />
      </Suspense>

      <Suspense fallback={<div className="text-cms-text-muted">読み込み中...</div>}>
        <ContentList />
      </Suspense>
    </div>
  )
} 