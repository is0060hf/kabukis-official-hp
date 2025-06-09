'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Play, Music, Sparkles, Headphones, Heart } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import MusicVisualizer from '@/components/common/MusicVisualizer'
import MusicNotes from '@/components/common/MusicNotes'
import { mockStreamSchedule } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { cn } from '@/utils/cn'

export default function LivePage() {
  const upcomingStreams = mockStreamSchedule.slice(0, 3)
  const recentStreams = [
    {
      id: '1',
      title: '【歌枠】深夜のリクエスト祭り',
      date: '2024-03-15',
      viewCount: 8500,
      duration: '2:35:00',
      thumbnail: 'https://via.placeholder.com/400x300',
    },
    {
      id: '2',
      title: '【コラボ】傾奇くんと新曲披露',
      date: '2024-03-08',
      viewCount: 12000,
      duration: '1:45:00',
      thumbnail: 'https://via.placeholder.com/400x300',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション - 明るく爽やかに */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-sky/10 via-melody-light to-melody-pink/10 py-20">
        {/* 音符アニメーション */}
        <div className="absolute inset-0 overflow-hidden">
          <MusicNotes count={5} className="absolute top-20 left-20" />
          <MusicNotes count={3} className="absolute bottom-20 right-20" />
        </div>
        
        {/* 装飾的な円 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-melody-sky/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-melody-pink/10 rounded-full blur-3xl animate-pulse-soft delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-melody-sky/20"
            >
              <Sparkles className="w-5 h-5 text-melody-purple animate-sparkle" />
              <span className="text-sm font-medium bg-gradient-to-r from-melody-purple to-melody-sky bg-clip-text text-transparent">
                LIVE STREAMING
              </span>
              <MusicVisualizer className="h-4" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple via-melody-pink to-melody-sky bg-clip-text text-transparent">
                歌枠配信
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
            >
              あおばの歌声をリアルタイムでお届け<br/>
              みんなで一緒に音楽を楽しみましょう♪
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link 
                href="/live/schedule"
                className="group bg-gradient-to-r from-melody-purple to-melody-pink text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="配信スケジュールを見る"
              >
                <Calendar className="w-5 h-5" />
                配信スケジュール
              </Link>
              <Link 
                href="/live/collab"
                className="group glass-card hover:bg-white/90 text-melody-purple px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="コラボ配信を見る"
              >
                <Users className="w-5 h-5" />
                コラボ配信
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* 次回配信予定 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                次回配信予定
                <MusicVisualizer className="h-6" />
              </h2>
              <p className="text-gray-600">今週の歌枠スケジュール</p>
            </div>
            <Link 
              href="/live/schedule" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium flex items-center gap-2 group"
              aria-label="全てのスケジュールを見る"
            >
              <span>全て見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingStreams.map((stream, index) => (
              <motion.div key={stream.id} variants={fadeInUp}>
                <Card className="group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                  {/* 音符装飾 */}
                  <div className="absolute top-2 right-2">
                    <MusicNotes count={1} className="w-8 h-8" />
                  </div>
                  
                  <div className="relative mb-6">
                    <div className="aspect-video bg-gradient-to-br from-melody-sky/20 to-melody-pink/20 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-melody-purple ml-1" />
                        </div>
                      </div>
                      {/* ビジュアライザー装飾 */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <MusicVisualizer className="h-12 opacity-60" />
                      </div>
                    </div>
                    <span className={cn(
                      "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm",
                      stream.type === 'singing' ? 'bg-melody-purple/80 text-white' :
                      stream.type === 'collaboration' ? 'bg-melody-pink/80 text-white' :
                      'bg-melody-sky/80 text-white'
                    )}>
                      {stream.type === 'singing' ? '🎤 歌枠' :
                       stream.type === 'collaboration' ? '👥 コラボ' :
                       '🎧 ASMR'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                    {stream.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-melody-purple" />
                      <time dateTime={stream.date}>{stream.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-melody-purple" />
                      <span>{stream.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-melody-purple" />
                      <span>{stream.description}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-melody-sky/20 flex items-center justify-between">
                    <button 
                      className="bg-gradient-to-r from-melody-purple/10 to-melody-pink/10 hover:from-melody-purple/20 hover:to-melody-pink/20 text-melody-purple px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                      aria-label="リマインダーを設定"
                    >
                      <Clock className="w-4 h-4" />
                      リマインダー
                    </button>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Headphones className="w-3 h-3" />
                      {stream.duration}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 最近のアーカイブ */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                最近のアーカイブ
              </h2>
              <p className="text-gray-600">見逃した配信をチェック</p>
            </div>
            <Link 
              href="/live/archive" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium flex items-center gap-2 group"
              aria-label="全てのアーカイブを見る"
            >
              <span>全て見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {recentStreams.map((stream, index) => (
              <motion.div key={stream.id} variants={fadeInUp}>
                <Card className="group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img 
                        src={stream.thumbnail} 
                        alt={stream.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                        {stream.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{stream.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-melody-pink" />
                          {stream.viewCount.toLocaleString()} views
                        </span>
                        <span>•</span>
                        <span>{stream.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTAセクション */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-r from-melody-sky/5 via-melody-pink/5 to-melody-purple/5">
              {/* 背景装飾 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40">
                  <MusicNotes count={2} />
                </div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40">
                  <MusicNotes count={2} />
                </div>
              </div>
              
              <div className="relative z-10 text-center py-8">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Users className="w-8 h-8 text-melody-purple" />
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  配信の通知を受け取ろう
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  YouTubeのチャンネル登録とベルマークをONにして、<br/>
                  配信開始の通知を受け取りましょう♪
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="https://youtube.com/@aoba-nekosora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    aria-label="YouTubeチャンネルに登録（新しいタブで開く）"
                  >
                    <Play className="w-5 h-5" />
                    YouTube登録
                  </a>
                  <Link 
                    href="/community/discord"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    aria-label="Discordに参加"
                  >
                    <Users className="w-5 h-5" />
                    Discord参加
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 