'use client'

import { motion } from 'framer-motion'
import { Music, Mic, Settings, Award, Users, Briefcase, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import MusicVisualizer from '@/components/common/MusicVisualizer'
import { services, mockWorks, licenseTypes } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function StudioPage() {
  const stats = [
    { label: '制作楽曲数', value: mockWorks.length.toString(), icon: Music, color: 'bg-gradient-to-r from-melody-purple to-melody-pink' },
    { label: 'クライアント数', value: '15+', icon: Users, color: 'bg-gradient-to-r from-melody-pink to-melody-sky' },
    { label: '業界経験', value: '3年', icon: Award, color: 'bg-gradient-to-r from-melody-sky to-melody-purple' },
    { label: 'ライセンス種別', value: licenseTypes.length.toString(), icon: Settings, color: 'bg-gradient-to-r from-melody-purple to-melody-sky' },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション - 明るくプロフェッショナル */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-light via-white to-melody-dawn py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-melody-purple/5 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-melody-sky/5 rounded-full blur-3xl animate-pulse-soft delay-1000" />
        </div>
        
        {/* 音符の流れ */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl text-melody-purple/10"
                initial={{ x: '-10%', y: `${Math.random() * 100}%` }}
                animate={{ x: '110%' }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear"
                }}
              >
                ♪
              </motion.div>
            ))}
          </div>
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
              <Briefcase className="w-5 h-5 text-melody-purple" />
              <span className="text-sm font-medium bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                PROFESSIONAL SERVICE
              </span>
              <MusicVisualizer className="h-4" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple via-melody-pink to-melody-sky bg-clip-text text-transparent">
                Music Studio
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
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
                className="group bg-gradient-to-r from-melody-purple to-melody-pink text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                aria-label="お問い合わせページへ"
              >
                <Mic className="w-5 h-5" />
                お問い合わせ
              </Link>
              <Link 
                href="/studio/works"
                className="group glass-card hover:bg-white/90 text-melody-purple px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
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
                <Card className="relative overflow-hidden group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-melody-purple/5 to-transparent rounded-full blur-xl" />
                  
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
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            提供サービス
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Card className="h-full glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  {/* 背景装飾 */}
                  <div className="absolute -top-10 -right-10 text-8xl opacity-5">
                    {service.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-melody-purple/10 to-melody-pink/10 rounded-2xl">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-gradient-to-r from-melody-purple to-melody-pink rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-melody-purple/20 pt-4">
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>料金</span>
                        <span className="font-bold bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                          {service.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>納期</span>
                        <span>{service.deliveryTime}</span>
                      </div>
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
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">制作実績</h2>
            <Link 
              href="/studio/works" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium flex items-center gap-2 group"
            >
              <span>全ての実績を見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {mockWorks.slice(0, 3).map((work, index) => (
              <motion.div key={work.id} variants={fadeInUp}>
                <Card className="h-full group glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative mb-4">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-melody-purple px-3 py-1 rounded-full text-sm font-medium">
                      {work.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm">
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
                        className="bg-gradient-to-r from-melody-purple/10 to-melody-pink/10 text-gray-700 px-2 py-1 rounded text-xs"
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
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">ライセンス</h2>
            <Link 
              href="/studio/licensing" 
              className="text-melody-purple hover:text-melody-pink transition-colors font-medium flex items-center gap-2 group"
            >
              <span>詳細を見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {licenseTypes.map((license, index) => (
              <motion.div key={license.id} variants={fadeInUp}>
                <Card className={`h-full glass-card relative ${license.popular ? 'ring-2 ring-melody-purple shadow-xl' : ''} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                  {license.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-melody-purple to-melody-pink text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg inline-flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        人気
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{license.name}</h3>
                    <p className="text-gray-600 mb-4">{license.description}</p>
                    <div className="text-2xl font-bold bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                      {license.price}
                    </div>
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
            <Card className="relative overflow-hidden bg-gradient-to-r from-melody-purple/5 via-melody-pink/5 to-melody-sky/5">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 text-[200px] text-melody-purple/5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  ♪
                </motion.div>
              </div>
              
              <div className="relative z-10 text-center py-8">
                <motion.div 
                  className="text-6xl mb-4 inline-block"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎵
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  音楽制作のご相談はお気軽に
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  楽曲制作、ボーカル提供、音楽ディレクションなど、<br/>
                  音楽に関するあらゆるご相談に対応いたします。<br/>
                  まずはお気軽にお問い合わせください。
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/studio/contact"
                    className="bg-gradient-to-r from-melody-purple to-melody-pink hover:from-melody-purple/90 hover:to-melody-pink/90 text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                  >
                    お問い合わせ
                  </Link>
                  <Link 
                    href="/studio/works"
                    className="glass-card hover:bg-white/90 text-melody-purple px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                  >
                    制作実績を見る
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 