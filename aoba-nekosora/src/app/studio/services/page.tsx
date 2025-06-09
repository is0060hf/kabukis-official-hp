'use client'

import { motion } from 'framer-motion'
import { Music, Mic, Settings, Calendar, Check, Star, Sparkles, Headphones } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import MusicVisualizer from '@/components/common/MusicVisualizer'
import MusicNotes from '@/components/common/MusicNotes'
import { services } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-melody-pink/10 via-melody-light to-melody-purple/10 py-20">
        {/* 音符アニメーション */}
        <div className="absolute inset-0 overflow-hidden">
          <MusicNotes count={5} className="absolute top-20 right-20" />
          <MusicNotes count={3} className="absolute bottom-10 left-10" />
        </div>
        
        {/* 回転する円 */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-melody-purple/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-melody-pink/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-melody-pink/20"
            >
              <Settings className="w-5 h-5 text-melody-purple" />
              <span className="text-sm font-medium bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                SERVICES
              </span>
              <MusicVisualizer className="h-4" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-melody-purple via-melody-pink to-melody-sky bg-clip-text text-transparent">
                サービス紹介
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 max-w-2xl mx-auto"
            >
              あおばの音楽制作サービス<br/>
              あなたの想いを美しい音楽で表現します
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* メインサービス一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Card className="h-full glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                  {/* 背景装飾 */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-melody-purple/5 to-melody-pink/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  <MusicNotes count={1} className="absolute top-2 right-2 w-6 h-6 opacity-10" />
                  
                  <div className="relative z-10">
                    {/* アイコンとタイトル */}
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-melody-purple/20 to-melody-pink/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <div className="text-4xl">{service.icon}</div>
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-melody-purple transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* 特徴リスト */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-melody-purple to-melody-pink rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* 価格と納期 */}
                    <div className="border-t border-melody-purple/20 pt-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">料金</div>
                          <div className="font-bold text-lg bg-gradient-to-r from-melody-purple to-melody-pink bg-clip-text text-transparent">
                            {service.price}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">納期目安</div>
                          <div className="font-medium text-gray-800">
                            {service.deliveryTime}
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        href="/studio/contact"
                        className="block w-full text-center bg-gradient-to-r from-melody-purple/10 to-melody-pink/10 hover:from-melody-purple/20 hover:to-melody-pink/20 text-melody-purple px-4 py-3 rounded-full font-medium transition-all transform hover:scale-105"
                      >
                        このサービスについて相談
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* サービスの流れ */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            制作の流れ
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card className="glass-card">
              <div className="grid gap-8 md:grid-cols-4">
                {[
                  { step: '01', title: 'ヒアリング', desc: 'お客様のご要望を詳しくお伺いします', icon: '💬' },
                  { step: '02', title: '企画・構成', desc: '楽曲の方向性や構成を決めていきます', icon: '📝' },
                  { step: '03', title: '制作', desc: '実際の楽曲制作を進めていきます', icon: '🎵' },
                  { step: '04', title: '納品', desc: '完成した楽曲をお届けします', icon: '🎁' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {index < 3 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-melody-purple/30 to-melody-pink/30" />
                    )}
                    
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-melody-purple/10 to-melody-pink/10 rounded-full mb-4">
                      <div className="text-3xl">{item.icon}</div>
                    </div>
                    
                    <div className="text-xs text-melody-purple font-bold mb-2">
                      STEP {item.step}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 特別オファー */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 text-[200px] text-yellow-300/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.div>
              </div>
              
              <div className="relative z-10 text-center py-8">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-8 h-8 text-yellow-500" />
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  初回限定特別オファー
                </h3>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  初めてご利用のお客様限定！<br/>
                  楽曲制作サービスを<span className="font-bold text-melody-purple">20% OFF</span>でご提供
                </p>
                
                <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full font-medium mb-8">
                  <Sparkles className="w-5 h-5" />
                  期間限定：2024年3月末まで
                </div>
                
                <Link 
                  href="/studio/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Mic className="w-5 h-5" />
                  今すぐ相談する
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* よくある質問 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            よくある質問
          </motion.h2>
          
          <div className="grid gap-6 max-w-3xl mx-auto">
            {[
              {
                q: '制作期間はどのくらいかかりますか？',
                a: '楽曲の内容により異なりますが、通常1〜3週間程度です。お急ぎの場合はご相談ください。'
              },
              {
                q: '修正は何回まで可能ですか？',
                a: '基本的に3回まで無料で対応いたします。大幅な変更は別途ご相談となります。'
              },
              {
                q: '著作権はどうなりますか？',
                a: 'ご契約内容により異なります。買い取り、使用許諾など、お客様のニーズに合わせて対応可能です。'
              },
              {
                q: 'デモ音源の作成は可能ですか？',
                a: 'はい、可能です。まずは簡単なデモを作成し、方向性を確認してから本制作に入ることができます。'
              }
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="glass-card hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-melody-purple to-melody-pink rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Q
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden bg-gradient-to-r from-melody-purple/5 via-melody-pink/5 to-melody-sky/5">
              <div className="absolute inset-0 overflow-hidden">
                <MusicNotes count={3} className="absolute top-10 right-10" />
                <div className="absolute bottom-0 left-0 w-full">
                  <MusicVisualizer className="h-20 opacity-20" />
                </div>
              </div>
              
              <div className="relative z-10 text-center py-12">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Headphones className="w-10 h-10 text-melody-purple" />
                </motion.div>
                
                <h3 className="text-3xl font-bold mb-6 text-gray-800">
                  あなたの音楽制作パートナーとして
                </h3>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                  心を込めて、あなただけの特別な音楽を創り上げます。<br/>
                  まずはお気軽にご相談ください。
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/studio/works"
                    className="glass-card hover:bg-white/90 text-melody-purple px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    制作実績を見る
                  </Link>
                  <Link 
                    href="/studio/contact"
                    className="bg-gradient-to-r from-melody-purple to-melody-pink hover:from-melody-purple/90 hover:to-melody-pink/90 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    無料相談を申し込む
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