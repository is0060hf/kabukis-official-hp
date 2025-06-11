'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ページ遷移時にフォーカスをリセットし、
 * メインコンテンツへフォーカスを移動するカスタムフック
 */
export function usePageFocus() {
  const pathname = usePathname()
  
  useEffect(() => {
    // ページ遷移時にメインコンテンツへフォーカスを移動
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      // tabindexを一時的に設定してフォーカス可能にする
      const originalTabIndex = mainContent.getAttribute('tabindex')
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      
      // フォーカス後、元のtabindex状態に戻す
      if (originalTabIndex === null) {
        mainContent.removeAttribute('tabindex')
      } else {
        mainContent.setAttribute('tabindex', originalTabIndex)
      }
    }
    
    // ページ遷移をスクリーンリーダーに通知
    const pageTitle = document.title
    const announcement = `${pageTitle}に移動しました`
    
    // aria-liveリージョンを使用して通知
    const liveRegion = document.getElementById('live-region-polite')
    if (liveRegion) {
      liveRegion.textContent = announcement
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 100)
    }
  }, [pathname])
}

/**
 * 要素にフォーカスを設定するユーティリティ関数
 */
export function setFocus(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    element.focus()
  }
}

/**
 * フォーカス可能な要素を取得するユーティリティ関数
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
} 