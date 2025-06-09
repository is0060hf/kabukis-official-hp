'use client'

import { motion } from 'framer-motion'
import { Play, Music, Calendar, ChevronDown } from 'lucide-react'
import { fadeIn, fadeInUp, float, sparkle } from '@/utils/animations'
import { IMAGES } from '@/constants/images'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景グラデーション（動画の代替） */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-melody-sky/20 via-melody-purple/10 to-melody-accent/20">
        {/* 動画は後で実装 */}
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={IMAGES.hero.poster}
        >
          <source src={IMAGES.hero.video} type="video/mp4" />
        </video> */}
        <div className="absolute inset-0 bg-gradient-to-b from-melody-light/60 via-melody-light/40 to-melody-light/80" />
      </div>

      {/* 装飾的な要素 */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-20"
        variants={sparkle}
        initial="hidden"
        animate="visible"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-6xl opacity-20"
        variants={sparkle}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5 }}
      >
        🎵
      </motion.div>

      {/* メインコンテンツ */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* タイトル */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold gradient-text"
            variants={fadeInUp}
          >
            猫空あおば
          </motion.h1>

          {/* サブタイトル */}
          <motion.p
            className="text-xl md:text-2xl text-gray-700"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            歌とお酒を愛する歌姫VTuber
          </motion.p>

          {/* 説明文 */}
          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            心に響く歌声で、あなたの日常に彩りを。<br />
            楽曲制作から歌枠配信まで、音楽の魅力をお届けします。
          </motion.p>

          {/* CTAボタン */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="/content/music"
              className="group flex items-center space-x-2 px-8 py-4 bg-melody-button text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>最新楽曲を聴く</span>
            </motion.a>

            <motion.a
              href="/live/schedule"
              className="group flex items-center space-x-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-melody-sky border-2 border-melody-sky/30 rounded-full font-medium hover:bg-melody-sky/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              <span>配信スケジュール</span>
            </motion.a>
          </motion.div>

          {/* 音符のアニメーション */}
          <motion.div
            className="flex items-center justify-center space-x-8 mt-12"
            variants={float}
            initial="initial"
            animate="animate"
          >
            <Music className="w-8 h-8 text-melody-sky opacity-60" />
            <Music className="w-6 h-6 text-melody-purple opacity-40 animation-delay-200" />
            <Music className="w-10 h-10 text-melody-accent opacity-50 animation-delay-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-gray-600 opacity-60" />
      </motion.div>
    </section>
  )
} 