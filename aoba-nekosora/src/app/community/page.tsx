'use client'

import { motion } from 'framer-motion'
import { Users, MessageSquare, Heart, Music, Gift, Star, Sparkles, Shield, Trophy } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { discordInfo } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function CommunityPage() {
  const communityStats = [
    { label: 'Discord メンバー', value: discordInfo.memberCount.toLocaleString(), icon: Users, color: 'bg-indigo-500' },
    { label: 'オンライン', value: discordInfo.onlineCount.toLocaleString(), icon: MessageSquare, color: 'bg-green-500' },
    { label: 'リクエスト楽曲', value: '24', icon: Music, color: 'bg-melody-purple' },
    { label: 'ファンアート', value: '156', icon: Heart, color: 'bg-melody-pink' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-purple/20 via-melody-pink/10 to-melody-sky/20 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-melody-pink/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-melody-purple" />
              <span className="text-sm font-medium text-gray-700">FAN COMMUNITY</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                Community
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
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
                className="group bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="Discordに参加する"
              >
                <MessageSquare className="w-5 h-5" />
                Discord参加
              </Link>
              <Link 
                href="/community/requests"
                className="group bg-white hover:bg-gray-50 text-melody-purple px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border border-melody-purple/20 flex items-center gap-2"
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
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} text-white rounded-full mb-4 shadow-lg`}>
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
            <Card className="relative overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6">
                    <div className="text-5xl">💬</div>
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-4 text-gray-800">
                    {discordInfo.serverName}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    あおばの公式Discordサーバーへようこそ！
                    音楽愛好家たちが集まり、楽曲について語り合ったり、
                    お酒の話題で盛り上がったりしています。
                  </p>
                  
                  <Link 
                    href="/community/discord"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg"
                    aria-label="Discordサーバーに参加する"
                  >
                    <MessageSquare className="w-6 h-6" />
                    今すぐ参加する
                  </Link>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      サーバーの特徴
                    </h3>
                    <ul className="space-y-3">
                      {discordInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
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
                        <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="font-medium text-gray-800 mb-1">{channel.name}</div>
                          <div className="text-sm text-gray-600">{channel.description}</div>
                        </div>
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
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            コミュニティでできること
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <Link href="/community/requests">
                <Card className="h-full group">
                  <div className="text-center">
                    <Music className="w-12 h-12 text-melody-purple mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                      楽曲リクエスト
                    </h3>
                    <p className="text-gray-600 mb-4">
                      あおばに歌ってほしい楽曲をリクエストできます。
                      みんなの投票で次の楽曲が決まります！
                    </p>
                    <div className="text-sm text-melody-purple font-medium">
                      リクエストする →
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link href="/community/discord">
                <Card className="h-full group">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-melody-pink mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                      Discord参加
                    </h3>
                    <p className="text-gray-600 mb-4">
                      あおばや他のファンと直接交流できる
                      公式Discordサーバーに参加しませんか？
                    </p>
                    <div className="text-sm text-melody-purple font-medium">
                      参加する →
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
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            コミュニティルール
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    基本的なお約束
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 互いを尊重し、優しい気持ちで接しましょう</li>
                    <li>• 音楽や創作活動を応援する気持ちを大切に</li>
                    <li>• 建設的で前向きなコミュニケーションを心がけて</li>
                    <li>• 他のメンバーの意見や作品を尊重しましょう</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <Gift className="w-5 h-5 text-green-500 mr-2" />
                    特別なご褒美
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 限定音源の早期アクセス</li>
                    <li>• あおばとの直接交流機会</li>
                    <li>• ファンアート・創作活動の発表の場</li>
                    <li>• 楽曲制作過程の舞台裏情報</li>
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
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">一緒に音楽を楽しみませんか？</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                あおばのコミュニティは、音楽を愛するすべての人に開かれています。
                初心者からプロまで、年齢性別問わず、
                音楽への愛があれば誰でも大歓迎です♪
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/community/discord"
                  className="bg-melody-purple hover:bg-melody-purple/80 text-white px-8 py-3 rounded-full transition-colors"
                >
                  今すぐ参加する
                </Link>
                <Link 
                  href="/community/requests"
                  className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-8 py-3 rounded-full transition-colors"
                >
                  楽曲をリクエスト
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 