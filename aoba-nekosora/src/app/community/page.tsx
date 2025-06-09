'use client'

import { motion } from 'framer-motion'
import { Users, MessageSquare, Heart, Music, Gift, Star, Sparkles, Shield, Trophy } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import MusicVisualizer from '@/components/common/MusicVisualizer'
import MusicNotes from '@/components/common/MusicNotes'
import { discordInfo } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function CommunityPage() {
  const communityStats = [
    { label: 'Discord メンバー', value: discordInfo.memberCount.toLocaleString(), icon: Users, color: 'from-indigo-400 to-purple-500' },
    { label: 'オンライン', value: discordInfo.onlineCount.toLocaleString(), icon: MessageSquare, color: 'from-green-400 to-emerald-500' },
    { label: 'リクエスト楽曲', value: '24', icon: Music, color: 'from-melody-purple to-melody-pink' },
    { label: 'ファンアート', value: '156', icon: Heart, color: 'from-pink-400 to-rose-500' },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-sky/10 via-melody-light to-melody-pink/10 py-20">
        {/* 音符アニメーション */}
        <div className="absolute inset-0 overflow-hidden">
          <MusicNotes count={4} className="absolute top-20 left-10" />
          <MusicNotes count={3} className="absolute bottom-20 right-20" />
        </div>
        
        {/* ハートのアニメーション */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ y: '100vh', x: `${Math.random() * 100}%` }}
              animate={{ y: '-100px' }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear"
              }}
              style={{ color: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#f38ba8'][i] }}
            >
              ♥
            </motion.div>
          ))}
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
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-melody-pink/20"
            >
              <Sparkles className="w-5 h-5 text-melody-purple animate-sparkle" />
              <span className="text-sm font-medium bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                FAN COMMUNITY
              </span>
              <Heart className="w-4 h-4 text-melody-pink animate-pulse" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple via-melody-pink to-melody-sky bg-clip-text text-transparent">
                Community
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
            >
              あおばを愛してくれるみんなと繋がる場所<br/>
              音楽好きが集まる温かいコミュニティです♪
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link 
                href="/community/discord"
                className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="Discordに参加する"
              >
                <MessageSquare className="w-5 h-5" />
                Discord参加
              </Link>
              <Link 
                href="/community/requests"
                className="group glass-card hover:bg-white/90 text-melody-purple px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="楽曲をリクエストする"
              >
                <Music className="w-5 h-5" />
                楽曲リクエスト
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* コミュニティ統計 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communityStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="relative overflow-hidden group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
                  <MusicNotes count={1} className="absolute -top-2 -right-2 w-6 h-6 opacity-10" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} text-white rounded-full mb-4 shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Discord紹介 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
              {/* 装飾 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse-soft delay-1000" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="text-5xl">💬</div>
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold mb-4 text-gray-800">
                    {discordInfo.serverName}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    あおばの公式Discordサーバーへようこそ！<br/>
                    音楽愛好家たちが集まり、楽曲について語り合ったり、<br/>
                    お酒の話題で盛り上がったりしています。
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <MusicVisualizer className="h-8" />
                  </div>
                  
                  <Link 
                    href="/community/discord"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg"
                    aria-label="Discordサーバーに参加する"
                  >
                    <MessageSquare className="w-6 h-6" />
                    今すぐ参加する
                  </Link>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-400" />
                      サーバーの特徴
                    </h3>
                    <ul className="space-y-3">
                      {discordInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2 flex-shrink-0"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                          />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-indigo-500" />
                      主要チャンネル
                    </h3>
                    <div className="space-y-3">
                      {discordInfo.channels.map((channel, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all glass-card"
                          whileHover={{ x: 5 }}
                        >
                          <div className="font-medium text-gray-800 mb-1">{channel.name}</div>
                          <div className="text-sm text-gray-600">{channel.description}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* コミュニティ機能 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            コミュニティでできること
          </motion.h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <Link href="/community/requests" className="block h-full">
                <Card className="relative overflow-hidden group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-melody-purple/10 to-melody-pink/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-melody-purple/20 to-melody-pink/20 rounded-full group-hover:scale-110 transition-transform"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Music className="w-7 h-7 text-melody-purple" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-melody-purple transition-colors">
                        楽曲リクエスト
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-lg">
                      あおばに歌ってほしい楽曲をリクエストできます。<br/>
                      みんなの投票で次の楽曲が決まります！
                    </p>
                    
                    <div className="flex items-center gap-2 text-melody-purple font-medium">
                      <span>リクエストする</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link href="/community/discord" className="block h-full">
                <Card className="relative overflow-hidden group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-full group-hover:scale-110 transition-transform"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MessageSquare className="w-7 h-7 text-indigo-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-melody-purple transition-colors">
                        Discord参加
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-lg">
                      あおばや他のファンと直接交流できる<br/>
                      公式Discordサーバーに参加しませんか？
                    </p>
                    
                    <div className="flex items-center gap-2 text-indigo-500 font-medium">
                      <span>参加する</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* コミュニティルール */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            コミュニティルール
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-br from-white to-melody-light glass-card">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full shadow-md"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-gray-800">基本的なお約束</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-melody-purple mt-0.5 flex-shrink-0" />
                      <span>互いを尊重し、優しい気持ちで接しましょう</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-melody-purple mt-0.5 flex-shrink-0" />
                      <span>音楽や創作活動を応援する気持ちを大切に</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-melody-purple mt-0.5 flex-shrink-0" />
                      <span>建設的で前向きなコミュニケーションを心がけて</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-melody-purple mt-0.5 flex-shrink-0" />
                      <span>他のメンバーの意見や作品を尊重しましょう</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full shadow-md"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Gift className="w-5 h-5" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-gray-800">特別なご褒美</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>限定音源の早期アクセス</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>あおばとの直接交流機会</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>ファンアート・創作活動の発表の場</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>楽曲制作過程の舞台裏情報</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 参加呼びかけ */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-r from-melody-sky/5 via-melody-pink/5 to-melody-purple/5">
              {/* 背景装飾 */}
              <div className="absolute inset-0 overflow-hidden">
                <MusicNotes count={2} className="absolute top-10 right-10" />
                <MusicNotes count={2} className="absolute bottom-10 left-10" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MusicVisualizer className="h-16 opacity-20" />
                </div>
              </div>
              
              <div className="relative z-10 text-center py-8 max-w-3xl mx-auto">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="text-4xl">🌟</div>
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 text-gray-800">
                  一緒に音楽を楽しみませんか？
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  あおばのコミュニティは、音楽を愛するすべての人に開かれています。<br/>
                  初心者からプロまで、年齢性別問わず、<br/>
                  音楽への愛があれば誰でも大歓迎です♪
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/community/discord"
                    className="bg-gradient-to-r from-melody-purple to-melody-pink hover:from-melody-purple/90 hover:to-melody-pink/90 text-white px-10 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                  >
                    今すぐ参加する
                  </Link>
                  <Link 
                    href="/community/requests"
                    className="glass-card hover:bg-white/90 text-melody-purple px-10 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                  >
                    楽曲をリクエスト
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