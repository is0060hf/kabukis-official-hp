'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  ListTodo,
  TrendingUp,
  Eye
} from 'lucide-react'

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'リード管理', 
    href: '/leads', 
    icon: Users,
    subItems: [
      { name: 'リード一覧', href: '/leads' },
      { name: 'フィードバック', href: '/feedbacks', icon: MessageSquare },
      { name: 'リクエスト', href: '/requests', icon: ListTodo },
    ]
  },
  { name: 'コンテンツ管理', href: '/content', icon: FileText },
  { name: '配信スケジュール', href: '/schedule', icon: Calendar },
  { 
    name: '分析', 
    href: '/analytics', 
    icon: BarChart3,
    subItems: [
      { name: 'リード分析', href: '/analytics/leads', icon: TrendingUp },
      { name: 'コンテンツ分析', href: '/analytics/content', icon: Eye },
    ]
  },
  { name: '設定', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const navRef = useRef<HTMLElement>(null)

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!navRef.current) return
      
      const focusableElements = Array.from(
        navRef.current.querySelectorAll('a, button')
      ) as HTMLElement[]
      
      const currentIndex = focusableElements.findIndex(
        el => el === document.activeElement
      )
      
      if (currentIndex === -1) return
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          const nextIndex = (currentIndex + 1) % focusableElements.length
          focusableElements[nextIndex]?.focus()
          break
          
        case 'ArrowUp':
          e.preventDefault()
          const prevIndex = currentIndex === 0 
            ? focusableElements.length - 1 
            : currentIndex - 1
          focusableElements[prevIndex]?.focus()
          break
          
        case 'Home':
          e.preventDefault()
          focusableElements[0]?.focus()
          break
          
        case 'End':
          e.preventDefault()
          focusableElements[focusableElements.length - 1]?.focus()
          break
      }
    }
    
    const nav = navRef.current
    if (nav) {
      nav.addEventListener('keydown', handleKeyDown)
      return () => nav.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedItems]) // expandedItemsが変わるとフォーカス可能な要素も変わるため

  const renderNavItem = (item: any) => {
    const isActive = pathname === item.href || (item.subItems && item.subItems.some((sub: any) => pathname === sub.href))
    const isExpanded = expandedItems.includes(item.name)
    const Icon = item.icon

    if (item.subItems) {
      return (
        <li key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`
              w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium
              transition-colors duration-200
              ${isActive 
                ? 'bg-cms-primary text-white' 
                : 'text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text'
              }
            `}
            aria-expanded={isExpanded}
            aria-controls={`submenu-${item.name}`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{item.name}</span>
            </div>
            {isExpanded ? 
              <ChevronDown className="w-4 h-4" aria-hidden="true" /> : 
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            }
          </button>
          {isExpanded && (
            <ul 
              id={`submenu-${item.name}`}
              className="mt-1 ml-8 space-y-1"
              role="group"
            >
              {item.subItems.map((subItem: any) => {
                const SubIcon = subItem.icon
                const isSubActive = pathname === subItem.href
                return (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-md text-sm
                        transition-colors duration-200
                        ${isSubActive 
                          ? 'bg-cms-primary/20 text-cms-primary' 
                          : 'text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text'
                        }
                      `}
                      aria-current={isSubActive ? 'page' : undefined}
                    >
                      {SubIcon && <SubIcon className="w-4 h-4" aria-hidden="true" />}
                      <span>{subItem.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </li>
      )
    }

    return (
      <li key={item.name}>
        <Link
          href={item.href}
          className={`
            flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
            transition-colors duration-200
            ${isActive 
              ? 'bg-cms-primary text-white' 
              : 'text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text'
            }
          `}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
          <span>{item.name}</span>
        </Link>
      </li>
    )
  }

  return (
    <nav 
      ref={navRef}
      className="w-64 bg-cms-surface border-r border-cms-border" 
      aria-label="メインナビゲーション"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-cms-text">Kabukis CMS</h2>
      </div>
      
      <ul className="px-3 space-y-1" role="list">
        {navigation.map(renderNavItem)}
      </ul>
      
      <div className="absolute bottom-0 w-64 p-3 border-t border-cms-border">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-cms-text-muted hover:bg-cms-surface-hover hover:text-cms-text transition-colors duration-200"
        >
          <HelpCircle className="w-5 h-5" aria-hidden="true" />
          <span>ヘルプ</span>
        </Link>
      </div>
    </nav>
  )
} 