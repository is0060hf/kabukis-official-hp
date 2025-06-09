'use client'

import { motion } from 'framer-motion'
import { Mic, Play, Heart, TrendingUp, Calendar, ExternalLink, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { mockCoverSongs } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function CoversPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = ['all', 'J-POP', 'バラード', 'アニソン', 'ポップス']

  const filteredCovers = mockCoverSongs.filter(cover => {
    const matchesSearch = cover.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cover.originalArtist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || cover.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const totalViews = mockCoverSongs.reduce((sum, cover) => sum + cover.viewCount, 0)
  const popularCover = mockCoverSongs.reduce((prev, current) => 
    prev.viewCount > current.viewCount ? prev : current
  )

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
            Cover Songs
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            大好きな楽曲をあおばの歌声でお届け<br/>
            みんなのリクエストにもお応えしています♪
          </motion.p>
        </motion.div>

        {/* 統計・人気楽曲 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Mic className="w-8 h-8 text-melody-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{mockCoverSongs.length}</div>
                <div className="text-sm text-gray-600">歌ってみた</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <TrendingUp className="w-8 h-8 text-melody-pink mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600">総視聴回数</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Heart className="w-8 h-8 text-melody-sky mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{popularCover.viewCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">最高視聴回数</div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* 検索・フィルター */}
        <motion.section 
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
                    placeholder="楽曲名やアーティスト名で検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                  />
                </div>
                
                {/* ジャンルフィルター */}
                <div className="flex gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedGenre === genre
                          ? 'bg-melody-purple text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {genre === 'all' ? '全て' : genre}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 歌ってみた一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8">
            歌ってみた一覧
          </motion.h2>
          
          {filteredCovers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCovers.map((cover, index) => (
                <motion.div key={cover.id} variants={fadeInUp}>
                  <Card className="h-full group cursor-pointer">
                    <div className="relative mb-4">
                      <img 
                        src={cover.thumbnail} 
                        alt={cover.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute top-2 right-2 bg-melody-purple text-white px-2 py-1 rounded text-sm">
                        {cover.genre}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {cover.duration}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1 text-gray-800">{cover.title}</h3>
                    <p className="text-sm text-melody-purple mb-2">原曲: {cover.originalArtist}</p>
                    <p className="text-sm text-gray-600 mb-3">{cover.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {cover.coverDate}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {cover.viewCount.toLocaleString()} views
                      </div>
                    </div>
                    
                    <a 
                      href={cover.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      YouTubeで視聴
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeInUp}>
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">楽曲が見つかりません</h3>
                <p className="text-gray-600">
                  検索条件を変更してもう一度お試しください
                </p>
              </Card>
            </motion.div>
          )}
        </motion.section>

        {/* リクエスト受付 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <Mic className="w-12 h-12 text-melody-purple mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">歌ってみたリクエスト</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                あおばに歌ってほしい楽曲はありませんか？<br/>
                リクエストお待ちしています♪ みんなの投票で次の楽曲が決まります
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/community/requests"
                  className="bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-3 rounded-full transition-colors"
                >
                  リクエストする
                </Link>
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