'use client'

import { motion } from 'framer-motion'
import { Music, Mic, BookOpen, Search, TrendingUp, Sparkles, Headphones, Heart } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { mockSongs, mockCoverSongs, mockBlogPosts } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ContentPage() {
  const latestSongs = mockSongs.slice(0, 3)
  const latestCovers = mockCoverSongs.slice(0, 3)
  const latestBlogs = mockBlogPosts.slice(0, 3)

  return (
    <div className="min-h-screen pt-20">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-purple/20 via-melody-pink/10 to-melody-sky/20 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-melody-pink/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-melody-sky/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
              <span className="text-sm font-medium text-gray-700">MUSIC & CONTENT</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                Music Content
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              あおばの音楽の世界へようこそ<br/>
              オリジナル楽曲、歌ってみた、音楽ブログをお楽しみください♪
            </motion.p>
            
            {/* 検索バー */}
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="search"
                  placeholder="楽曲やアーティスト名で検索..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-full focus:ring-2 focus:ring-melody-purple focus:border-transparent bg-white/90 backdrop-blur-sm shadow-lg"
                  aria-label="コンテンツを検索"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-melody-purple hover:bg-melody-purple/90 text-white px-6 py-2 rounded-full transition-colors"
                  aria-label="検索を実行"
                >
                  検索
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* コンテンツカテゴリー */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Link href="/content/music" className="block h-full">
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-melody-purple/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  
                  <div className="relative z-10 text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-melody-purple/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <Music className="w-8 h-8 text-melody-purple" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                      オリジナル楽曲
                    </h3>
                    <p className="text-gray-600 mb-4">
                      あおばが心を込めて作り上げた<br/>オリジナル楽曲をお聴きください
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="text-melody-purple font-bold text-lg">{mockSongs.length}</span>
                      <span className="text-gray-500">楽曲公開中</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link href="/content/covers" className="block h-full">
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-melody-pink/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  
                  <div className="relative z-10 text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-melody-pink/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <Mic className="w-8 h-8 text-melody-pink" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                      歌ってみた
                    </h3>
                    <p className="text-gray-600 mb-4">
                      人気楽曲をあおばの歌声でカバー<br/>リクエストも受付中
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="text-melody-purple font-bold text-lg">{mockCoverSongs.length}</span>
                      <span className="text-gray-500">楽曲公開中</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link href="/content/blog" className="block h-full">
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-melody-sky/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  
                  <div className="relative z-10 text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-melody-sky/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8 text-melody-sky" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                      音楽ブログ
                    </h3>
                    <p className="text-gray-600 mb-4">
                      制作秘話やお酒のお話<br/>音楽への想いを綴っています
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="text-melody-purple font-bold text-lg">{mockBlogPosts.length}</span>
                      <span className="text-gray-500">記事公開中</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* 最新オリジナル楽曲 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                最新オリジナル楽曲
              </h2>
              <p className="text-gray-600">心を込めて作り上げた楽曲たち</p>
            </div>
            <Link 
              href="/content/music" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium flex items-center gap-2 group"
            >
              <span>全て見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {latestSongs.map((song, index) => (
              <motion.div key={song.id} variants={fadeInUp}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative mb-4">
                    <img 
                      src={song.coverImage} 
                      alt={song.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
                        <Headphones className="w-6 h-6 text-melody-purple" />
                      </button>
                    </div>
                    <span className="absolute top-3 right-3 bg-melody-purple text-white px-3 py-1 rounded-full text-xs font-medium">
                      {song.genre}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{song.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{song.releaseDate}</span>
                    <div className="flex items-center gap-1 text-melody-purple">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{song.playCount.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 最新歌ってみた */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                最新歌ってみた
              </h2>
              <p className="text-gray-600">人気楽曲をあおばアレンジで</p>
            </div>
            <Link 
              href="/content/covers" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium flex items-center gap-2 group"
            >
              <span>全て見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {latestCovers.map((cover, index) => (
              <motion.div key={cover.id} variants={fadeInUp}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative mb-4">
                    <img 
                      src={cover.thumbnail} 
                      alt={cover.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
                        <Headphones className="w-6 h-6 text-melody-purple" />
                      </button>
                    </div>
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Cover
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 text-gray-800 group-hover:text-melody-purple transition-colors">
                    {cover.title}
                  </h3>
                  <p className="text-sm text-melody-purple mb-2">原曲: {cover.originalArtist}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{cover.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{cover.coverDate}</span>
                    <div className="flex items-center gap-1 text-melody-purple">
                      <Heart className="w-4 h-4" />
                      <span className="font-medium">{cover.viewCount.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* コンテンツ統計 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-melody-purple/5 via-melody-pink/5 to-melody-sky/5">
              <div className="text-center py-8">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">
                  あおばの音楽活動
                </h3>
                
                <div className="grid gap-8 md:grid-cols-4 mb-8">
                  <div>
                    <div className="text-4xl font-bold text-melody-purple mb-2">
                      {mockSongs.reduce((sum, song) => sum + song.playCount, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">総再生数</div>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-melody-pink mb-2">
                      {mockSongs.length}
                    </div>
                    <div className="text-sm text-gray-600">オリジナル楽曲</div>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-melody-sky mb-2">
                      {mockCoverSongs.length}
                    </div>
                    <div className="text-sm text-gray-600">歌ってみた</div>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-melody-purple mb-2">
                      {mockBlogPosts.length}
                    </div>
                    <div className="text-sm text-gray-600">ブログ記事</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  これからも心に響く音楽をお届けできるよう、<br/>
                  日々成長していきます。応援よろしくお願いします♪
                </p>
                
                <Link 
                  href="/community"
                  className="inline-flex items-center gap-2 bg-melody-purple hover:bg-melody-purple/90 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Heart className="w-5 h-5" />
                  ファンコミュニティに参加
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 