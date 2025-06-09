'use client'

import { motion } from 'framer-motion'
import { Music, Play, Download, ExternalLink, Clock, Calendar, TrendingUp, Filter } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import { mockSongs } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function MusicPage() {
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const genres = ['all', 'J-POP', 'Jazz', 'バラード', 'ポップス']
  
  const filteredSongs = mockSongs
    .filter(song => selectedGenre === 'all' || song.genre === selectedGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case 'popular':
          return b.playCount - a.playCount
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const totalPlays = mockSongs.reduce((sum, song) => sum + song.playCount, 0)

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
            Original Music
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            あおばが心を込めて作り上げたオリジナル楽曲<br/>
            それぞれの楽曲に込められた想いと物語をお楽しみください♪
          </motion.p>
        </motion.div>

        {/* 統計情報 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Music className="w-8 h-8 text-melody-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{mockSongs.length}</div>
                <div className="text-sm text-gray-600">オリジナル楽曲</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <TrendingUp className="w-8 h-8 text-melody-pink mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{totalPlays.toLocaleString()}</div>
                <div className="text-sm text-gray-600">総再生数</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Calendar className="w-8 h-8 text-melody-sky mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">2024</div>
                <div className="text-sm text-gray-600">デビュー年</div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* フィルター・ソート */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* ジャンルフィルター */}
                <div className="flex flex-wrap gap-2 items-center">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 mr-2">ジャンル:</span>
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedGenre === genre
                          ? 'bg-melody-purple text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {genre === 'all' ? '全て' : genre}
                    </button>
                  ))}
                </div>
                
                {/* ソート */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">並び替え:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                  >
                    <option value="newest">新しい順</option>
                    <option value="popular">人気順</option>
                    <option value="alphabetical">タイトル順</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 楽曲一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSongs.map((song, index) => (
              <motion.div key={song.id} variants={fadeInUp}>
                <Card className="h-full group">
                  <div className="relative mb-4">
                    <img 
                      src={song.coverImage} 
                      alt={song.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2 bg-melody-purple text-white px-2 py-1 rounded text-sm">
                      {song.genre}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {song.duration}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{song.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{song.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {song.releaseDate}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {song.playCount.toLocaleString()} plays
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {song.duration}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <a 
                      href={song.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      YouTube
                    </a>
                    <a 
                      href={song.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Spotify
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ジャンル別おすすめ */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            ジャンル別楽曲
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {['J-POP', 'Jazz', 'バラード'].map((genre) => {
              const genreSongs = mockSongs.filter(song => song.genre === genre)
              const totalPlays = genreSongs.reduce((sum, song) => sum + song.playCount, 0)
              
              return (
                <motion.div key={genre} variants={fadeInUp}>
                  <Card className="text-center h-full">
                    <div className="text-4xl mb-4">
                      {genre === 'J-POP' ? '🎌' : 
                       genre === 'Jazz' ? '🎷' : 
                       genre === 'バラード' ? '💝' : '🎵'}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{genre}</h3>
                    <div className="text-2xl font-bold text-melody-purple mb-1">
                      {genreSongs.length}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">楽曲</div>
                    <div className="text-sm text-gray-500">
                      {totalPlays.toLocaleString()} plays
                    </div>
                  </Card>
                </motion.div>
              )
            })}
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full bg-gradient-to-br from-melody-purple/10 to-melody-pink/10">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">全ジャンル</h3>
                <div className="text-2xl font-bold text-melody-purple mb-1">
                  {mockSongs.length}
                </div>
                <div className="text-sm text-gray-600 mb-2">総楽曲数</div>
                <div className="text-sm text-gray-500">
                  {totalPlays.toLocaleString()} total plays
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* 制作秘話・特別企画 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">楽曲制作について</h3>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                すべての楽曲に込められた想いや制作過程、インスピレーションの源など、
                制作秘話は音楽ブログで詳しくお話ししています。
                また、STEM素材の配布やライセンス提供も行っておりますので、お気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/content/blog"
                  className="bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-3 rounded-full transition-colors"
                >
                  制作秘話を読む
                </a>
                <a 
                  href="/studio/licensing"
                  className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-6 py-3 rounded-full transition-colors"
                >
                  ライセンスについて
                </a>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 