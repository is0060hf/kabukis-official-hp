'use client'

import { motion } from 'framer-motion'
import { Music, Mic, Settings, Clock, DollarSign, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { services } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ServicesPage() {
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
            Services
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            プロフェッショナルな音楽制作サービス<br/>
            お客様のニーズに合わせた最適なソリューションを提供
          </motion.p>
        </motion.div>

        {/* サービス一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Card className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 bg-gradient-to-br from-melody-purple/10 to-melody-pink/10 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                      </div>
                    </div>
                    
                    <div className="lg:w-2/3 p-8">
                      <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-bold text-lg mb-3 text-gray-800">含まれるサービス</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-lg mb-3 text-gray-800">詳細情報</h4>
                          <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="w-4 h-4 mr-3 text-melody-purple" />
                              <span>料金: <span className="font-bold text-melody-purple">{service.price}</span></span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-3 text-melody-pink" />
                              <span>納期: {service.deliveryTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Link 
                          href="/studio/contact"
                          className="bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          このサービスを依頼
                        </Link>
                        <button className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-6 py-3 rounded-lg transition-colors">
                          詳細を相談
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 制作フロー */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            制作フロー
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: 1, title: 'ヒアリング', description: 'ご要望を詳しくお聞かせください', icon: '💬' },
              { step: 2, title: '企画・提案', description: '最適なプランをご提案いたします', icon: '💡' },
              { step: 3, title: '制作・録音', description: 'プロの技術で楽曲を制作します', icon: '🎵' },
              { step: 4, title: '納品・修正', description: 'ご満足いただけるまで調整します', icon: '✨' },
            ].map((flow, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{flow.icon}</div>
                  <div className="text-lg font-bold mb-2 text-melody-purple">Step {flow.step}</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{flow.title}</h3>
                  <p className="text-gray-600 text-sm">{flow.description}</p>
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
              <h3 className="text-2xl font-bold mb-4 text-gray-800">まずはお気軽にご相談ください</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                どのようなご要望でも、まずはお話を聞かせてください。
                あなたの想いを音楽という形で実現するお手伝いをいたします。
              </p>
              <Link 
                href="/studio/contact"
                className="bg-melody-purple hover:bg-melody-purple/80 text-white px-8 py-3 rounded-full transition-colors inline-block"
              >
                無料相談はこちら
              </Link>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 