'use client'

import { useEffect, useState } from 'react'

interface NotificationBadgeProps {
  userId?: string
  className?: string
}

export function NotificationBadge({ userId, className = '' }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // 初期の未読数を取得
    fetchUnreadCount()

    // SSE接続を確立
    const eventSource = new EventSource('/api/notifications/stream')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'notification') {
        // 新しい通知が来たら未読数を増やす
        setUnreadCount(prev => prev + 1)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
      eventSource.close()
      
      // エラー時は再接続を試みる（5秒後）
      setTimeout(() => {
        fetchUnreadCount()
      }, 5000)
    }

    return () => {
      eventSource.close()
    }
  }, [userId])

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/notifications?isRead=false&limit=1')
      if (response.ok) {
        const data = await response.json()
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

  if (unreadCount === 0) {
    return null
  }

  return (
    <span 
      className={`absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full ${className}`}
      aria-label={`${unreadCount}件の未読通知`}
    >
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  )
} 