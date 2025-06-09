'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Users, ExternalLink, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { mockCollaborations } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function CollabPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '進行中': return 'bg-green-500 text-white'
      case '企画中': return 'bg-yellow-500 text-white'
      case '完了': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'デュエット': return '🎵'
      case '合唱': return '🎭'
      case 'トーク': return '💬'
      default: return '🎤'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-melody-sky via-white to-melody-purple/20 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* ヘッダーセクション */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent"
          >
            コラボ配信
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            傾奇くんや素敵な仲間たちとの特別企画<br/>
            みんなで作り上げる音楽の時間をお楽しみください♪
          </motion.p>
        </motion.div>

        {/* 師弟関係の特別セクション */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-melody-purple/10 to-melody-pink/10">
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-4xl">👩‍🎤</div>
                  <Heart className="w-8 h-8 text-melody-pink" />
                  <div className="text-4xl">👨‍💻</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">師弟コラボについて</h3>
                <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                  あおばと傾奇くんの師弟関係から生まれる特別なコラボレーション。
                  音楽×テクノロジーの融合で、新しいエンターテイメントの形を創造します。
                  あおばがお姉ちゃんとして傾奇くんを見守りながら、お互いに成長していく様子をぜひご覧ください。
                </p>
                <Link 
                  href="https://yuya-kabuki.com" 
                  className="inline-flex items-center text-melody-purple hover:text-melody-pink transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  傾奇くんのサイトもチェック
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 進行中の企画 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8">
            進行中の企画
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {mockCollaborations.map((collab, index) => (
              <motion.div key={collab.id} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="relative mb-4">
                    <img 
                      src={collab.image} 
                      alt={collab.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-medium ${getStatusColor(collab.status)}`}>
                      {collab.status}
                    </div>
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2">
                      <span className="text-xl">{getTypeIcon(collab.type)}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{collab.title}</h3>
                  <p className="text-sm text-melody-purple mb-2">with {collab.partner}</p>
                  <p className="text-gray-600 text-sm mb-4">{collab.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      次回配信: {collab.nextStream}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      タイプ: {collab.type}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button className="bg-melody-purple hover:bg-melody-purple/80 text-white px-4 py-2 rounded-full transition-colors text-sm flex-1">
                      詳細を見る
                    </button>
                    <button className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-4 py-2 rounded-full transition-colors text-sm">
                      通知ON
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* コラボの種類 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            コラボの種類
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">デュエット</h3>
                <p className="text-gray-600">
                  二人の声が織りなすハーモニー。師弟ならではの息の合った歌声をお届け
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">合唱企画</h3>
                <p className="text-gray-600">
                  複数のVTuberと一緒に作り上げる大合唱。みんなの声を一つにした感動の瞬間
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">制作配信</h3>
                <p className="text-gray-600">
                  楽曲制作の裏側を見せながら、リアルタイムで音楽を作り上げていく企画
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* 過去のコラボハイライト */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8">
            過去のコラボハイライト
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '桜色の約束',
                partner: '傾奇ユウヤ',
                views: 15700,
                date: '2024-01-20',
                thumbnail: '/api/placeholder/300/200',
              },
              {
                title: '星降る夜のセッション',
                partner: '月夜ルナ',
                views: 9800,
                date: '2024-02-14',
                thumbnail: '/api/placeholder/300/200',
              },
              {
                title: 'Summer Harmony',
                partner: '海音マリン',
                views: 11200,
                date: '2024-02-28',
                thumbnail: '/api/placeholder/300/200',
              },
            ].map((highlight, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group cursor-pointer">
                  <div className="relative mb-4">
                    <img 
                      src={highlight.thumbnail} 
                      alt={highlight.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl mb-2">▶️</div>
                        <div className="text-sm">再生する</div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-1 text-gray-800">{highlight.title}</h4>
                  <p className="text-sm text-melody-purple mb-2">with {highlight.partner}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{highlight.date}</span>
                    <span>{highlight.views.toLocaleString()} views</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 参加申請 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">コラボ企画に参加しませんか？</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                あおばとコラボしたいアーティスト・VTuberの方を募集しています。
                音楽を通じて素敵な時間を一緒に作りましょう♪
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-3 rounded-full transition-colors">
                  コラボ申請フォーム
                </button>
                <Link 
                  href="/community/discord"
                  className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-6 py-3 rounded-full transition-colors"
                >
                  Discordで相談
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 