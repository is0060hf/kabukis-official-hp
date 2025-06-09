'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Youtube, Twitter, Music, ExternalLink } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const socialLinks = [
  { href: 'https://youtube.com/@nekosora-aoba', icon: Youtube, label: 'YouTube' },
  { href: 'https://twitter.com/nekosora_aoba', icon: Twitter, label: 'Twitter' },
  { href: 'https://spotify.com/artist/nekosora-aoba', icon: Music, label: 'Spotify' },
]

const footerLinks = {
  content: [
    { href: '/content/music', label: '楽曲一覧' },
    { href: '/content/covers', label: '歌ってみた' },
    { href: '/content/blog', label: 'ブログ' },
  ],
  community: [
    { href: '/community/discord', label: 'Discord' },
    { href: '/community/requests', label: 'リクエスト' },
    { href: '/live/schedule', label: '配信スケジュール' },
  ],
  business: [
    { href: '/studio/services', label: '楽曲制作' },
    { href: '/studio/licensing', label: 'ライセンス' },
    { href: '/studio/contact', label: 'お問い合わせ' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-melody-dawn/30 backdrop-blur-sm border-t border-melody-sky/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ブランド情報 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">猫空あおば</h3>
            <p className="text-gray-600 text-sm">
              歌とお酒を愛する歌姫VTuber。<br />
              心に響く音楽をお届けします。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-melody-sky transition-colors duration-200"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* コンテンツリンク */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-semibold text-gray-800">コンテンツ</h4>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-melody-sky transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* コミュニティリンク */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-semibold text-gray-800">コミュニティ</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-melody-sky transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ビジネスリンク */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-semibold text-gray-800">ビジネス</h4>
            <ul className="space-y-2">
              {footerLinks.business.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-melody-sky transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* 傾奇ユウヤへのリンク */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-melody-sky/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © 2024 猫空あおば. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">弟子の活動もチェック！</span>
              <a
                href="https://yuya-kabuki.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-melody-sky to-melody-purple text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity duration-200"
              >
                <span>傾奇くんのAI解説はこちら🤖</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 