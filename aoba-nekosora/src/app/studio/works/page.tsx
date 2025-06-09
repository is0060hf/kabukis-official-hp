'use client'

import { motion } from 'framer-motion'
import { Award, Calendar, Tag, ExternalLink, Play } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import { mockWorks } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'アニメソング', 'ゲーム音楽', '企業音楽']

  const filteredWorks = mockWorks.filter(work => 
    selectedCategory === 'all' || work.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-melody-sky via-white to-melody-purple/20 pt-20">
      <div className="container mx-auto px-4 py-12">
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
            Works
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            これまで手がけた音楽制作の実績をご紹介<br/>
            多様なジャンルでの制作経験をお確かめください
          </motion.p>
        </motion.div>

        {/* カテゴリーフィルター */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="flex flex-wrap gap-2 justify-center">
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
            </Card>
          </motion.div>
        </motion.section>

        {/* 制作実績一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work, index) => (
              <motion.div key={work.id} variants={fadeInUp}>
                <Card className="h-full group">
                  <div className="relative mb-6">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-2 left-2 bg-melody-purple text-white px-2 py-1 rounded text-sm">
                      {work.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {work.year}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-melody-purple mb-3">{work.client}</p>
                  <p className="text-gray-600 mb-4">{work.description}</p>
                  
                  <div className="space-y-3 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      {work.role}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {work.year}年制作
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-melody-purple hover:bg-melody-purple/80 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    詳細を見る
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
} 