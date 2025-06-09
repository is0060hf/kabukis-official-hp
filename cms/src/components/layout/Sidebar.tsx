'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react'

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: LayoutDashboard },
  { name: 'リード管理', href: '/leads', icon: Users },
  { name: 'コンテンツ管理', href: '/content', icon: FileText },
  { name: '配信スケジュール', href: '/schedule', icon: Calendar },
  { name: '分析', href: '/analytics', icon: BarChart3 },
  { name: '設定', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-cms-surface border-r border-cms-border" aria-label="メインナビゲーション">
      <div className="p-6">
        <h2 className="text-xl font-bold text-cms-text">Kabukis CMS</h2>
      </div>
      
      <ul className="px-3 space-y-1" role="list">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
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
        })}
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