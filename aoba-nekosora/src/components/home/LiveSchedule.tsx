'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Mic } from 'lucide-react'
import Card from '@/components/common/Card'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { mockStreamSchedule } from '@/constants/mockData'

const typeIcons = {
  singing: Mic,
  collaboration: Users,
  asmr: Mic,
}

const typeColors = {
  singing: 'text-melody-sky',
  collaboration: 'text-melody-purple',
  asmr: 'text-melody-accent',
}

export default function LiveSchedule() {
  return (
    <section className="py-20 px-4 bg-melody-dawn/20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            配信スケジュール
          </h2>
          <p className="text-gray-600 text-lg">
            今週の配信予定をチェック！
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mockStreamSchedule.map((stream, index) => {
            const Icon = typeIcons[stream.type as keyof typeof typeIcons]
            const iconColor = typeColors[stream.type as keyof typeof typeColors]

            return (
              <motion.div key={stream.id} variants={fadeInUp} custom={index}>
                <Card hover className="h-full" onClick={() => console.log(`View stream: ${stream.title}`)}>
                  {/* 配信タイプ */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center space-x-2 ${iconColor}`}>
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {stream.type === 'singing' && '歌枠'}
                        {stream.type === 'collaboration' && 'コラボ'}
                        {stream.type === 'asmr' && 'ASMR'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {stream.duration}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {stream.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {stream.description}
                  </p>

                  {/* 日時 */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{stream.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{stream.time}</span>
                    </div>
                  </div>

                  {/* ホバー時のアクション */}
                  <motion.div
                    className="mt-4 pt-4 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <button className="w-full py-2 bg-melody-sky text-white rounded-lg font-medium hover:bg-melody-purple transition-colors duration-200">
                      リマインダー設定
                    </button>
                  </motion.div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* もっと見るリンク */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="/live/schedule"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-melody-sky rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            <span>配信カレンダーを見る</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
} 