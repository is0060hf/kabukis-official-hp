'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Bell, ExternalLink } from 'lucide-react'
import Card from '@/components/common/Card'
import { mockStreamSchedule } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function SchedulePage() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'singing': return 'bg-melody-purple text-white'
      case 'collaboration': return 'bg-melody-pink text-white'
      case 'asmr': return 'bg-melody-sky text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'singing': return '歌枠'
      case 'collaboration': return 'コラボ'
      case 'asmr': return 'ASMR'
      default: return 'その他'
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
            配信スケジュール
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            今後の配信予定をチェックして<br/>
            お気に入りの配信を見逃さないようにしましょう♪
          </motion.p>
        </motion.div>

        {/* 通知設定 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center">
              <Bell className="w-8 h-8 text-melody-purple mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">配信通知</h3>
              <p className="text-gray-600 mb-4">
                YouTubeチャンネル登録で配信開始をお知らせ！
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors flex items-center mx-auto">
                <ExternalLink className="w-4 h-4 mr-2" />
                YouTubeチャンネル登録
              </button>
            </Card>
          </motion.div>
        </motion.div>

        {/* 配信スケジュール一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8">
            今後の配信予定
          </motion.h2>
          
          <div className="space-y-6">
            {mockStreamSchedule.map((stream, index) => (
              <motion.div key={stream.id} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* サムネイル */}
                    <div className="lg:w-1/3">
                      <div className="relative">
                        <img 
                          src={stream.thumbnail} 
                          alt={stream.title}
                          className="w-full h-48 lg:h-full object-cover rounded-lg"
                        />
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-medium ${getTypeColor(stream.type)}`}>
                          {getTypeLabel(stream.type)}
                        </div>
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          予定
                        </div>
                      </div>
                    </div>
                    
                    {/* 詳細情報 */}
                    <div className="lg:w-2/3">
                      <h3 className="font-bold text-xl mb-3 text-gray-800">{stream.title}</h3>
                      <p className="text-gray-600 mb-4">{stream.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">{stream.date}</div>
                            <div className="text-xs">配信日</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">{stream.time}</div>
                            <div className="text-xs">開始時刻</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">{stream.duration}</div>
                            <div className="text-xs">予定時間</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button className="bg-melody-purple hover:bg-melody-purple/80 text-white px-4 py-2 rounded-full transition-colors text-sm">
                          リマインダー設定
                        </button>
                        <button className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-4 py-2 rounded-full transition-colors text-sm">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 配信タイプ説明 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            配信タイプについて
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <div className="w-12 h-12 bg-melody-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🎵</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">歌枠</h3>
                <p className="text-gray-600">
                  リクエストや新曲披露など、歌メインの配信です
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <div className="w-12 h-12 bg-melody-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">👥</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">コラボ</h3>
                <p className="text-gray-600">
                  傾奇くんや他のVTuberとの特別企画配信です
                </p>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <div className="w-12 h-12 bg-melody-sky rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">😴</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">ASMR</h3>
                <p className="text-gray-600">
                  優しい歌声でリラックスタイムをお届けします
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 