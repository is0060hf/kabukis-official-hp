'use client'

import { motion } from 'framer-motion'
import { Calendar, Music, Headphones, ExternalLink, Play, Star, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import MusicVisualizer from '@/components/common/MusicVisualizer'
import MusicNotes from '@/components/common/MusicNotes'
import { mockWorks } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function WorksPage() {
  const categories = [...new Set(mockWorks.map(work => work.category))]
  
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-purple/10 via-melody-light to-melody-sky/10 py-20">
        {/* 音符アニメーション */}
        <div className="absolute inset-0 overflow-hidden">
          <MusicNotes count={4} className="absolute top-10 left-20" />
          <MusicNotes count={3} className="absolute bottom-20 right-10" />
        </div>
        
        {/* 波形エフェクト */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-melody-purple/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
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
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-melody-purple/20"
            >
              <Award className="w-5 h-5 text-melody-purple" />
              <span className="text-sm font-medium bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                PORTFOLIO
              </span>
              <MusicVisualizer className="h-4" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple via-melody-pink to-melody-sky bg-clip-text text-transparent">
                制作実績
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 max-w-2xl mx-auto"
            >
              あおばが心を込めて制作した音楽作品たち<br/>
              様々なジャンルで新しい音楽体験をお届けしています
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* カテゴリフィルター */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center">
            <button 
              className="bg-gradient-to-r from-melody-purple to-melody-pink text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              aria-label="すべての実績を表示"
            >
              すべて
            </button>
            {categories.map((category) => (
              <button 
                key={category}
                className="glass-card hover:bg-white/90 text-melody-purple px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 hover:shadow-lg"
                aria-label={`${category}の実績を表示`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </motion.section>

        {/* 制作実績一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockWorks.map((work, index) => (
              <motion.div key={work.id} variants={fadeInUp}>
                <Card className="h-full group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  {/* 背景装飾 */}
                  <MusicNotes count={1} className="absolute -top-2 -right-2 w-6 h-6 opacity-10" />
                  
                  {/* サムネイル */}
                  <div className="relative mb-6">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform shadow-lg hover:bg-white">
                            <Play className="w-5 h-5 text-melody-purple" />
                          </button>
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform delay-100 shadow-lg hover:bg-white">
                            <ExternalLink className="w-5 h-5 text-melody-purple" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* カテゴリバッジ */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm text-melody-purple px-3 py-1 rounded-full text-xs font-medium shadow-md">
                        {work.category}
                      </span>
                      {(work as any).featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          注目
                        </span>
                      )}
                    </div>
                    
                    {/* 年度 */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs shadow-md">
                        {work.year}
                      </span>
                    </div>
                  </div>
                  
                  {/* コンテンツ */}
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-sm text-melody-purple font-medium mb-3">
                      {work.client}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {work.description}
                    </p>
                    
                    {/* 詳細情報 */}
                    <div className="border-t border-melody-purple/20 pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Music className="w-4 h-4 text-melody-purple" />
                          <span>{work.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-melody-purple" />
                          <span>{(work as any).duration || `${work.year}年制作`}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* タグ */}
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="bg-gradient-to-r from-melody-purple/10 to-melody-pink/10 text-gray-700 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* 再生数などの統計 */}
                    {(work as any).stats && (
                      <div className="mt-4 pt-4 border-t border-melody-purple/20 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Headphones className="w-4 h-4 text-melody-purple" />
                          <span>{(work as any).stats.plays?.toLocaleString() || '0'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-melody-purple font-medium">
                          <TrendingUp className="w-4 h-4" />
                          <span>人気上昇中</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 統計情報 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-r from-melody-sky/5 via-melody-pink/5 to-melody-purple/5">
              <div className="absolute inset-0 overflow-hidden">
                <MusicNotes count={2} className="absolute top-10 left-10" />
                <MusicNotes count={2} className="absolute bottom-10 right-10" />
              </div>
              
              <div className="relative z-10 text-center py-8">
                <h3 className="text-3xl font-bold mb-8 text-gray-800">
                  制作実績サマリー
                </h3>
                
                <div className="grid gap-8 md:grid-cols-4 mb-8">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent mb-2">
                      {mockWorks.length}
                    </div>
                    <div className="text-sm text-gray-600">総制作数</div>
                  </motion.div>
                  
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="text-4xl font-bold text-melody-pink mb-2">
                      15+
                    </div>
                    <div className="text-sm text-gray-600">クライアント数</div>
                  </motion.div>
                  
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-4xl font-bold text-melody-sky mb-2">
                      98%
                    </div>
                    <div className="text-sm text-gray-600">満足度</div>
                  </motion.div>
                  
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <div className="text-4xl font-bold text-melody-purple mb-2">
                      3年
                    </div>
                    <div className="text-sm text-gray-600">活動期間</div>
                  </motion.div>
                </div>
                
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  これからも皆様の心に響く音楽を作り続けていきます。<br/>
                  新しいプロジェクトのご相談はお気軽にどうぞ♪
                </p>
                
                <Link 
                  href="/studio/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-melody-purple to-melody-pink hover:from-melody-purple/90 hover:to-melody-pink/90 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Music className="w-5 h-5" />
                  制作のご相談
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              あなたの音楽プロジェクトを<br className="sm:hidden" />
              一緒に実現しませんか？
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              楽曲制作、アレンジ、ボーカル提供など、<br/>
              音楽に関するあらゆるニーズにお応えします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/studio/services"
                className="glass-card hover:bg-white/90 text-melody-purple px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                サービス一覧
              </Link>
              <Link 
                href="/studio/contact"
                className="bg-gradient-to-r from-melody-purple to-melody-pink hover:from-melody-purple/90 hover:to-melody-pink/90 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                お問い合わせ
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 