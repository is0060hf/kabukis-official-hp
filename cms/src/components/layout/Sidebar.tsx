'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

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
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{item.name}</span>
            </div>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {isExpanded && (
            <ul className="mt-1 ml-8 space-y-1">
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
                    >
                      {SubIcon && <SubIcon className="w-4 h-4" />}
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
    <nav className="w-64 bg-cms-surface border-r border-cms-border" aria-label="メインナビゲーション">
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