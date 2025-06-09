'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Calendar, Tag, Search, Filter, User } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import { mockBlogPosts } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', '音楽制作', 'お酒', 'チュートリアル', 'ライフスタイル']

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '音楽制作': return '🎵'
      case 'お酒': return '🍶'
      case 'チュートリアル': return '📚'
      case 'ライフスタイル': return '✨'
      default: return '📝'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '音楽制作': return 'bg-melody-purple text-white'
      case 'お酒': return 'bg-melody-pink text-white'
      case 'チュートリアル': return 'bg-melody-sky text-white'
      case 'ライフスタイル': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
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
            Music Blog
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            音楽制作の裏側やお酒の話題まで<br/>
            あおばの想いや日常を綴ったブログです♪
          </motion.p>
        </motion.div>

        {/* 統計情報 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="grid gap-6 md:grid-cols-4">
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <BookOpen className="w-8 h-8 text-melody-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{mockBlogPosts.length}</div>
                <div className="text-sm text-gray-600">総記事数</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Tag className="w-8 h-8 text-melody-pink mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{categories.length - 1}</div>
                <div className="text-sm text-gray-600">カテゴリー</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <User className="w-8 h-8 text-melody-sky mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">猫空あおば</div>
                <div className="text-sm text-gray-600">ライター</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">2024</div>
                <div className="text-sm text-gray-600">開始年</div>
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
                    placeholder="記事タイトルやタグで検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                  />
                </div>
                
                {/* カテゴリーフィルター */}
                <div className="flex gap-2">
                  <Filter className="w-5 h-5 text-gray-400 mt-3" />
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-melody-purple text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? '全て' : category}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* ブログ記事一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card className="h-full group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* サムネイル */}
                      <div className="lg:w-1/3">
                        <div className="relative">
                          <img 
                            src={post.thumbnail} 
                            alt={post.title}
                            className="w-full h-48 lg:h-full object-cover rounded-lg"
                          />
                          <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-medium ${getCategoryColor(post.category)}`}>
                            {getCategoryIcon(post.category)} {post.category}
                          </div>
                        </div>
                      </div>
                      
                      {/* 記事情報 */}
                      <div className="lg:w-2/3">
                        <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        
                        {/* タグ */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* メタ情報 */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <button className="bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-2 rounded-full transition-colors text-sm">
                          続きを読む
                        </button>
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">記事が見つかりません</h3>
                <p className="text-gray-600">
                  検索条件を変更してもう一度お試しください
                </p>
              </Card>
            </motion.div>
          )}
        </motion.section>

        {/* カテゴリー別記事数 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            カテゴリー別記事
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.slice(1).map((category) => {
              const categoryPosts = mockBlogPosts.filter(post => post.category === category)
              
              return (
                <motion.div key={category} variants={fadeInUp}>
                  <Card className="text-center h-full group cursor-pointer" onClick={() => setSelectedCategory(category)}>
                    <div className="text-4xl mb-4">{getCategoryIcon(category)}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                      {category}
                    </h3>
                    <div className="text-2xl font-bold text-melody-purple mb-1">
                      {categoryPosts.length}
                    </div>
                    <div className="text-sm text-gray-600">記事</div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* あおばからのメッセージ */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">ブログについて</h3>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                このブログでは、楽曲制作の裏話や制作過程、DTMのテクニック、
                お気に入りのお酒の話題、日常の出来事など、様々なことを書いています。
                音楽に興味のある方、お酒好きの方、そしてあおばのことをもっと知りたい方、
                ぜひお気軽に読んでくださいね♪
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-3 rounded-full transition-colors">
                  記事をリクエスト
                </button>
                <a 
                  href="/community/discord"
                  className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-6 py-3 rounded-full transition-colors"
                >
                  感想をシェア
                </a>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 