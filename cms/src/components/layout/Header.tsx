'use client'

import { signOut } from 'next-auth/react'
import { User, LogOut, Bell } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function Header({ user }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="bg-cms-surface border-b border-cms-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-cms-text">
            管理画面
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* 通知ボタン */}
          <button
            className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text transition-colors duration-200"
            aria-label="通知"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
          </button>
          
          {/* ユーザーメニュー */}
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
              <span className="text-sm font-medium text-cms-text">
                {user.name || user.email}
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
        </div>
      </div>
    </header>
  )
} 