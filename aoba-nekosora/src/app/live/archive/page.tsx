'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Play, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import { mockArchives } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = [
    { id: 'all', label: '全て' },
    { id: 'singing', label: '歌枠' },
    { id: 'collaboration', label: 'コラボ' },
    { id: 'asmr', label: 'ASMR' },
  ]

  const filteredArchives = mockArchives.filter(archive => {
    const matchesSearch = archive.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || archive.title.includes(
      selectedFilter === 'singing' ? '歌枠' :
      selectedFilter === 'collaboration' ? 'コラボ' :
      selectedFilter === 'asmr' ? 'ASMR' : ''
    )
    return matchesSearch && matchesFilter
  })

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
            配信アーカイブ
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            過去の配信をもう一度お楽しみください<br/>
            お気に入りの歌声や楽しい瞬間を再体験♪
          </motion.p>
        </motion.div>

        {/* 検索・フィルター */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="flex flex-col md:flex-row gap-4">
                {/* 検索バー */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="配信タイトルで検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                  />
                </div>
                
                {/* フィルター */}
                <div className="flex gap-2">
                  <Filter className="text-gray-400 w-5 h-5 mt-2" />
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedFilter === filter.id
                          ? 'bg-melody-purple text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* アーカイブ一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {filteredArchives.length > 0 ? (
            <div className="space-y-6">
              {filteredArchives.map((archive, index) => (
                <motion.div key={archive.id} variants={fadeInUp}>
                  <Card className="h-full group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* サムネイル */}
                      <div className="lg:w-1/3 relative">
                        <img 
                          src={archive.thumbnail} 
                          alt={archive.title}
                          className="w-full h-48 lg:h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                          {archive.duration}
                        </div>
                      </div>
                      
                      {/* 詳細情報 */}
                      <div className="lg:w-2/3">
                        <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                          {archive.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{archive.description}</p>
                        
                        {/* ハイライト楽曲 */}
                        {archive.highlights && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">歌った楽曲:</h4>
                            <div className="flex flex-wrap gap-2">
                              {archive.highlights.map((song, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-melody-purple/10 text-melody-purple px-2 py-1 rounded text-sm"
                                >
                                  {song}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <div>
                              <div className="font-medium">{archive.date}</div>
                              <div className="text-xs">配信日</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            <div>
                              <div className="font-medium">{archive.viewCount.toLocaleString()}</div>
                              <div className="text-xs">視聴者数</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <div>
                              <div className="font-medium">{archive.duration}</div>
                              <div className="text-xs">配信時間</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-3">
                          <a 
                            href={archive.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors text-sm flex items-center"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            YouTubeで視聴
                          </a>
                          <button className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-4 py-2 rounded-full transition-colors text-sm">
                            お気に入りに追加
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeInUp}>
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">配信が見つかりません</h3>
                <p className="text-gray-600">
                  検索条件を変更してもう一度お試しください
                </p>
              </Card>
            </motion.div>
          )}
        </motion.section>

        {/* 統計情報 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            配信統計
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <div className="text-3xl font-bold text-melody-purple mb-2">
                  {mockArchives.length}
                </div>
                <div className="text-gray-600">総配信数</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <div className="text-3xl font-bold text-melody-pink mb-2">
                  {mockArchives.reduce((sum, archive) => sum + archive.viewCount, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">総視聴者数</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <div className="text-3xl font-bold text-melody-sky mb-2">
                  {mockArchives.reduce((sum, archive) => {
                    const [hours, minutes] = archive.duration.split(':').map(Number)
                    return sum + hours + minutes / 60
                  }, 0).toFixed(1)}h
                </div>
                <div className="text-gray-600">総配信時間</div>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 