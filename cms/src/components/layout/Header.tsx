'use client'

import { signOut } from 'next-auth/react'
import { User, LogOut, Bell, Search } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { announceToScreenReader } from '@/components/common/LiveRegion'

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export default function Header({ user }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  
  // 検索のショートカットキー（Cmd/Ctrl + K）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 検索結果ページに遷移（将来的には別ページを作成）
      router.push(`/content?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setShowSearchResults(false)
      announceToScreenReader(`「${searchQuery}」で検索しました`, 'polite')
    }
  }
  
  if (!user) {
    return (
      <header className="bg-cms-surface border-b border-cms-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-cms-text">
            Kabukis CMS
          </h1>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-cms-surface border-b border-cms-border px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-semibold text-cms-text">
            管理画面
          </h1>
        </div>
        
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          {/* グローバル検索 */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cms-text-muted" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                placeholder="検索... (⌘K)"
                className="w-full pl-10 pr-4 py-2 bg-cms-bg border border-cms-border rounded-md text-cms-text placeholder-cms-text-muted focus:outline-none focus:ring-2 focus:ring-cms-primary focus:border-transparent"
                aria-label="グローバル検索"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cms-text-muted bg-cms-surface px-2 py-1 rounded border border-cms-border">
                ⌘K
              </kbd>
            </div>
            
            {/* 検索候補（将来的に実装） */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-cms-surface border border-cms-border rounded-md shadow-lg p-2 z-50">
                <p className="text-sm text-cms-text-muted px-3 py-2">
                  「{searchQuery}」で検索...
                </p>
              </div>
            )}
          </form>
        </div>
        
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* 通知ボタン */}
          <button
            className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text transition-colors duration-200"
            aria-label="通知"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
          </button>
          
          {/* ユーザーメニュー */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-cms-surface-hover transition-colors duration-200"
                aria-expanded={showDropdown}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-cms-primary rounded-full flex items-center justify-center">
                  {user.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name || 'ユーザー'} 
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" aria-hidden="true" />
                  )}
                </div>
                <span className="text-sm font-medium text-cms-text hidden sm:inline">
                  {user?.name || user?.email || 'ゲスト'}
                </span>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-cms-surface border border-cms-border rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-cms-text hover:bg-cms-surface-hover transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 