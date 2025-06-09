'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, Mic, Calendar, Users, Briefcase, Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import ModeToggle from './ModeToggle'
import { fadeIn, fadeInUp } from '@/utils/animations'
import { SiteMode } from '@/types'

const navItems = {
  entertainment: [
    { href: '/', label: 'ホーム', icon: Music },
    { href: '/live', label: 'ライブ配信', icon: Mic },
    { href: '/content', label: 'コンテンツ', icon: Music },
    { href: '/community', label: 'コミュニティ', icon: Users },
  ],
  business: [
    { href: '/studio', label: 'Studio', icon: Briefcase },
    { href: '/studio/works', label: '制作実績', icon: Music },
    { href: '/studio/services', label: 'サービス', icon: Mic },
    { href: '/studio/contact', label: 'お問い合わせ', icon: Calendar },
  ],
}

export default function Navigation() {
  const [mode, setMode] = useState<SiteMode>('entertainment')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const currentNavItems = navItems[mode]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-melody-sky/20"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold gradient-text music-note-decoration"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              猫空あおば
            </motion.div>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {currentNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-melody-sky transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* モード切替 */}
            <ModeToggle mode={mode} onModeChange={setMode} />
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-melody-sky/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-melody-sky/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {currentNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-melody-sky transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-melody-sky/20">
                <ModeToggle mode={mode} onModeChange={setMode} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
} 