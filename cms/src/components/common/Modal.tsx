'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import FocusTrap from './FocusTrap'
import { announceToScreenReader } from './LiveRegion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) {
  const previousActiveElement = useRef<HTMLElement | null>(null)
  
  useEffect(() => {
    if (isOpen) {
      // 現在のフォーカス要素を保存
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // モーダルが開いたことをスクリーンリーダーに通知
      announceToScreenReader(`${title}ダイアログが開きました`, 'polite')
      
      // スクロールを無効化
      document.body.style.overflow = 'hidden'
    } else {
      // スクロールを再有効化
      document.body.style.overflow = 'unset'
      
      // 前のフォーカス要素に戻す
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
        previousActiveElement.current = null
      }
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, title])
  
  if (!isOpen) return null
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }
  
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity duration-300"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      
      {/* モーダルコンテンツ */}
      <div className="flex min-h-full items-center justify-center p-4">
        <FocusTrap active={isOpen} onEscape={onClose}>
          <div
            className={`
              relative w-full ${sizeClasses[size]} 
              bg-cms-surface border border-cms-border rounded-lg 
              shadow-xl transform transition-all duration-300
              animate-scale-in
            `}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-6 border-b border-cms-border">
              <h2 
                id="modal-title" 
                className="text-lg font-semibold text-cms-text"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text transition-colors duration-200"
                aria-label="閉じる"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            
            {/* コンテンツ */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </FocusTrap>
      </div>
    </div>
  )
} 