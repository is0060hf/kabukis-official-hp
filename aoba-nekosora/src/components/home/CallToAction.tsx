'use client'

import { motion } from 'framer-motion'
import { Users, MessageCircle, Heart, Sparkles } from 'lucide-react'
import { fadeInUp, float, pulse } from '@/utils/animations'

export default function CallToAction() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-br from-melody-sky/10 via-transparent to-melody-purple/10" />
      
      {/* 浮遊する装飾要素 */}
      <motion.div
        className="absolute top-20 left-20 text-4xl opacity-20"
        variants={float}
        initial="initial"
        animate="animate"
      >
        🎵
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-4xl opacity-20"
        variants={float}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* メインメッセージ */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              一緒に音楽の旅を楽しみましょう
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              歌を愛する仲間たちと繋がって、<br />
              音楽の素晴らしさを共有しませんか？
            </p>
          </motion.div>

          {/* 特徴カード */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-melody-sky/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-melody-sky" />
              </div>
              <h3 className="font-bold text-gray-800">温かいコミュニティ</h3>
              <p className="text-sm text-gray-600">
                音楽を愛する仲間たちと交流できる場所
              </p>
            </div>

            <div className="glass-card p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-melody-purple/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-melody-purple" />
              </div>
              <h3 className="font-bold text-gray-800">リクエスト歓迎</h3>
              <p className="text-sm text-gray-600">
                歌ってほしい曲をリクエストできます
              </p>
            </div>

            <div className="glass-card p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-melody-accent/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-melody-accent" />
              </div>
              <h3 className="font-bold text-gray-800">限定コンテンツ</h3>
              <p className="text-sm text-gray-600">
                メンバー限定の特別な音楽体験
              </p>
            </div>
          </motion.div>

          {/* CTAボタン */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="/community/discord"
              className="group flex items-center space-x-2 px-8 py-4 bg-melody-button text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              variants={pulse}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="w-5 h-5" />
              <span>Discordに参加する</span>
            </motion.a>

            <a
              href="/content/music"
              className="group flex items-center space-x-2 px-8 py-4 bg-white text-melody-sky border-2 border-melody-sky/30 rounded-full font-medium hover:bg-melody-sky/10 transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
              <span>楽曲を聴いてみる</span>
            </a>
          </motion.div>

          {/* サブメッセージ */}
          <motion.p
            className="text-sm text-gray-500 mt-8"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            参加は無料です。いつでも気軽に遊びに来てくださいね♪
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
} 