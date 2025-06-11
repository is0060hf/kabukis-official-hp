'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { announceToScreenReader } from './LiveRegion'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  showPageNumbers?: boolean
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className = '',
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    // カスタムハンドラーがある場合はそれを使用
    if (onPageChange) {
      onPageChange(page)
      return
    }

    // デフォルトはURLパラメータを更新
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
    
    // スクリーンリーダーに通知
    announceToScreenReader(`ページ${page}に移動しました`, 'polite')
  }

  // ページ番号の範囲を計算
  const getPageNumbers = () => {
    const delta = 2 // 現在のページの前後に表示するページ数
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []
    let l: number | undefined

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i)
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    })

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <nav 
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label="ページネーション"
    >
      {/* 最初のページへ */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="最初のページへ"
      >
        <ChevronsLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* 前のページへ */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="前のページへ"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* ページ番号 */}
      {showPageNumbers && (
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={`dots-${index}`} className="px-3 py-1 text-cms-text-muted">
                ...
              </span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber as number)}
                className={`
                  min-w-[2.5rem] px-3 py-1 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${currentPage === pageNumber
                    ? 'bg-cms-primary text-white'
                    : 'text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text'
                  }
                `}
                aria-label={`ページ${pageNumber}`}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            )
          ))}
        </div>
      )}

      {/* 次のページへ */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="次のページへ"
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* 最後のページへ */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="最後のページへ"
      >
        <ChevronsRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  )
}

// ページ情報表示コンポーネント
interface PageInfoProps {
  currentPage: number
  limit: number
  total: number
  className?: string
}

export function PageInfo({ currentPage, limit, total, className = '' }: PageInfoProps) {
  const start = (currentPage - 1) * limit + 1
  const end = Math.min(currentPage * limit, total)

  return (
    <span className={`text-sm text-cms-text-muted ${className}`}>
      {total}件中 {start}-{end}件を表示
    </span>
  )
} 