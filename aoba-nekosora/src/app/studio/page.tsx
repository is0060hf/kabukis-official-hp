'use client'

import { motion } from 'framer-motion'
import { Music, Mic, Settings, Award, Users, ExternalLink, Sparkles, Briefcase, Shield } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { services, mockWorks, licenseTypes } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function StudioPage() {
  const stats = [
    { label: '制作楽曲数', value: mockWorks.length.toString(), icon: Music, color: 'bg-melody-purple' },
    { label: 'クライアント数', value: '15+', icon: Users, color: 'bg-melody-pink' },
    { label: '業界経験', value: '3年', icon: Award, color: 'bg-melody-sky' },
    { label: 'ライセンス種別', value: licenseTypes.length.toString(), icon: Settings, color: 'bg-indigo-500' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-melody-purple/20 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-melody-purple/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg"
            >
              <Briefcase className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">PROFESSIONAL SERVICE</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              Music Studio
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            >
              プロフェッショナルな音楽制作サービス<br/>
              あなたの想いを音楽に込めてお届けします
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link 
                href="/studio/contact"
                className="group bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="お問い合わせページへ"
              >
                <Mic className="w-5 h-5" />
                お問い合わせ
              </Link>
              <Link 
                href="/studio/works"
                className="group bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 border border-white/30 flex items-center gap-2"
                aria-label="制作実績を見る"
              >
                <Music className="w-5 h-5" />
                制作実績
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

        {/* 統計情報 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.color} text-white rounded-2xl mb-4 shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 主要サービス */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            提供サービス
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-melody-purple rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                      <span>料金</span>
                      <span className="font-bold text-melody-purple">{service.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>納期</span>
                      <span>{service.deliveryTime}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 制作実績ハイライト */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">制作実績</h2>
            <Link 
              href="/studio/works" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium"
            >
              全ての実績を見る →
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {mockWorks.slice(0, 3).map((work, index) => (
              <motion.div key={work.id} variants={fadeInUp}>
                <Card className="h-full group">
                  <div className="relative mb-4">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 bg-melody-purple text-white px-2 py-1 rounded text-sm">
                      {work.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {work.year}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-melody-purple transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-melody-purple mb-2">{work.client}</p>
                  <p className="text-sm text-gray-600 mb-3">{work.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {work.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ライセンス概要 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">ライセンス</h2>
            <Link 
              href="/studio/licensing" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium"
            >
              詳細を見る →
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {licenseTypes.map((license, index) => (
              <motion.div key={license.id} variants={fadeInUp}>
                <Card className={`h-full relative ${license.popular ? 'ring-2 ring-melody-purple' : ''}`}>
                  {license.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-melody-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                        人気
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{license.name}</h3>
                    <p className="text-gray-600 mb-4">{license.description}</p>
                    <div className="text-2xl font-bold text-melody-purple">{license.price}</div>
                  </div>
                  
                  <div className="space-y-2">
                    {license.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* お問い合わせCTA */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">音楽制作のご相談はお気軽に</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                楽曲制作、ボーカル提供、音楽ディレクションなど、
                音楽に関するあらゆるご相談に対応いたします。
                まずはお気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/studio/contact"
                  className="bg-melody-purple hover:bg-melody-purple/80 text-white px-8 py-3 rounded-full transition-colors"
                >
                  お問い合わせ
                </Link>
                <Link 
                  href="/studio/works"
                  className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-8 py-3 rounded-full transition-colors"
                >
                  制作実績を見る
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 