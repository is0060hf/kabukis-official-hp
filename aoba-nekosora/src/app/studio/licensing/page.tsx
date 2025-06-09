'use client'

import { motion } from 'framer-motion'
import { Shield, Download, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/common/Card'
import { licenseTypes, mockStems } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function LicensingPage() {
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
            Licensing
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            音楽ライセンス・STEM販売<br/>
            用途に合わせた柔軟なライセンス体系をご用意
          </motion.p>
        </motion.div>

        {/* ライセンス種別 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            ライセンス種別
          </motion.h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {licenseTypes.map((license, index) => (
              <motion.div key={license.id} variants={fadeInUp}>
                <Card className={`h-full relative ${license.popular ? 'ring-2 ring-melody-purple' : ''}`}>
                  {license.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-melody-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                        おすすめ
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{license.name}</h3>
                    <p className="text-gray-600 mb-4">{license.description}</p>
                    <div className="text-3xl font-bold text-melody-purple mb-2">{license.price}</div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {license.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/studio/contact"
                    className={`w-full block text-center px-6 py-3 rounded-lg transition-colors ${
                      license.popular 
                        ? 'bg-melody-purple text-white hover:bg-melody-purple/80' 
                        : 'border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white'
                    }`}
                  >
                    このライセンスを選択
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* STEM素材 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            STEM素材
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {mockStems.map((stem, index) => (
              <motion.div key={stem.id} variants={fadeInUp}>
                <Card className="h-full">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{stem.songTitle}</h3>
                  <p className="text-melody-purple mb-3">{stem.stemType}</p>
                  <p className="text-gray-600 text-sm mb-4">{stem.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>フォーマット</span>
                      <span>{stem.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ライセンス</span>
                      <span>{stem.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ダウンロード数</span>
                      <span>{stem.downloadCount}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-melody-purple">{stem.price}</span>
                    <button className="bg-melody-purple hover:bg-melody-purple/80 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      ダウンロード
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 利用規約 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            ライセンス利用規約
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    許可されている利用
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• ライセンスに応じた商用・非商用利用</li>
                    <li>• 楽曲の一部としての使用</li>
                    <li>• リミックス・アレンジでの利用</li>
                    <li>• YouTube・SNSでの配信</li>
                    <li>• ライブパフォーマンスでの使用</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    禁止されている利用
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 素材そのものの再販売</li>
                    <li>• 違法なコンテンツでの使用</li>
                    <li>• 第三者への無断譲渡</li>
                    <li>• AI学習データとしての利用</li>
                    <li>• クレジット表記の削除</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* お問い合わせCTA */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">カスタムライセンスのご相談も承ります</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                標準ライセンスに含まれない特別な利用をご希望の場合、
                カスタムライセンスの作成も可能です。お気軽にご相談ください。
              </p>
              <Link 
                href="/studio/contact"
                className="bg-melody-purple hover:bg-melody-purple/80 text-white px-8 py-3 rounded-full transition-colors inline-block"
              >
                ライセンスについて相談する
              </Link>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 