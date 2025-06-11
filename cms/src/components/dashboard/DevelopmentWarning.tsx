'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DevelopmentWarning() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (process.env.NODE_ENV === 'development') {
      // ローカルストレージから非表示設定を確認
      const dismissed = localStorage.getItem('dev-warning-dismissed')
      if (!dismissed) {
        setIsVisible(true)
      }
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('dev-warning-dismissed', 'true')
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6 transition-opacity duration-300 ${
        isDismissed ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-yellow-600">開発環境で実行中</h3>
            <p className="text-sm text-cms-text-muted">
              現在開発環境で動作しています。本番環境では以下の設定を必ず行ってください：
            </p>
            <ul className="text-xs text-cms-text-muted mt-2 space-y-1 ml-4">
              <li>• NEXTAUTH_SECRETを安全な値に変更</li>
              <li>• ENCRYPTION_KEYを本番用の値に変更</li>
              <li>• OAuth認証の本番用クライアントID/シークレットを設定</li>
              <li>• 本番用のデータベースURLを設定</li>
            </ul>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-yellow-500/20 rounded transition-colors"
          aria-label="警告を閉じる"
        >
          <X className="w-4 h-4 text-yellow-600" />
        </button>
      </div>
    </div>
  )
} 