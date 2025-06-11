'use client'

import { useEffect, useState } from 'react'

interface LiveRegionProps {
  message?: string
  priority?: 'polite' | 'assertive'
  clearDelay?: number
  className?: string
}

export default function LiveRegion({ 
  message, 
  priority = 'polite', 
  clearDelay = 5000,
  className = ''
}: LiveRegionProps) {
  const [currentMessage, setCurrentMessage] = useState('')
  
  useEffect(() => {
    if (message) {
      setCurrentMessage(message)
      
      if (clearDelay > 0) {
        const timer = setTimeout(() => {
          setCurrentMessage('')
        }, clearDelay)
        
        return () => clearTimeout(timer)
      }
    }
  }, [message, clearDelay])
  
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className={`sr-only ${className}`}
    >
      {currentMessage}
    </div>
  )
}

// グローバルライブリージョンプロバイダー
export function GlobalLiveRegion() {
  return (
    <>
      <div
        id="live-region-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div
        id="live-region-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  )
}

// ライブリージョンに通知を送信するユーティリティ
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const regionId = priority === 'assertive' ? 'live-region-assertive' : 'live-region-polite'
  const region = document.getElementById(regionId)
  
  if (region) {
    // 一度クリアしてから新しいメッセージを設定
    region.textContent = ''
    setTimeout(() => {
      region.textContent = message
    }, 100)
  }
} 