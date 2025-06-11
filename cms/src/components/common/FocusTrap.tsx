'use client'

import { useEffect, useRef } from 'react'

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  onEscape?: () => void
}

export default function FocusTrap({ children, active = true, onEscape }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!active) return
    
    const container = containerRef.current
    if (!container) return
    
    // フォーカス可能な要素を取得
    const getFocusableElements = () => {
      const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
    }
    
    // 初期フォーカスを設定
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
    
    // キーボードイベントハンドラ
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape()
        return
      }
      
      if (e.key !== 'Tab') return
      
      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return
      
      const currentIndex = focusableElements.findIndex(el => el === document.activeElement)
      
      if (e.shiftKey) {
        // Shift + Tab
        if (currentIndex === 0) {
          e.preventDefault()
          focusableElements[focusableElements.length - 1].focus()
        }
      } else {
        // Tab
        if (currentIndex === focusableElements.length - 1) {
          e.preventDefault()
          focusableElements[0].focus()
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, onEscape])
  
  return (
    <div ref={containerRef} data-focus-trap={active}>
      {children}
    </div>
  )
} 