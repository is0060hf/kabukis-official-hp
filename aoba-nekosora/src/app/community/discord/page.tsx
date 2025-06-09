'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Users, Hash, Volume2, Gift, ExternalLink, Shield, Heart } from 'lucide-react'
import Card from '@/components/common/Card'
import { discordInfo } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function DiscordPage() {
  const steps = [
    {
      step: 1,
      title: 'Discord アカウント作成',
      description: 'まだDiscordアカウントをお持ちでない方は、公式サイトで無料アカウントを作成してください。',
      icon: '👤',
    },
    {
      step: 2,
      title: 'サーバーに参加',
      description: '下記の招待リンクをクリックして、あおばの音楽カフェに参加しましょう。',
      icon: '🔗',
    },
    {
      step: 3,
      title: '自己紹介',
      description: '自己紹介チャンネルで簡単な挨拶をして、みんなと仲良くなりましょう。',
      icon: '👋',
    },
    {
      step: 4,
      title: 'コミュニティを楽しむ',
      description: '音楽の話題やあおばの配信について、みんなでワイワイ楽しみましょう♪',
      icon: '🎉',
    },
  ]

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
            Discord Community
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {discordInfo.serverName}<br/>
            あおばや仲間たちとリアルタイムで交流しよう♪
          </motion.p>
        </motion.div>

        {/* サーバー情報 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">☕</div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">{discordInfo.serverName}</h2>
                <div className="flex justify-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{discordInfo.memberCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">メンバー</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{discordInfo.onlineCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">オンライン</div>
                  </div>
                </div>
                <a 
                  href={discordInfo.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full transition-colors text-lg inline-flex items-center"
                >
                  <ExternalLink className="w-6 h-6 mr-3" />
                  今すぐDiscordに参加
                </a>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 参加手順 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            参加方法
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-lg font-bold mb-2 text-melody-purple">ステップ {step.step}</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* チャンネル紹介 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            主要チャンネル
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {discordInfo.channels.map((channel, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">
                      {channel.name.includes('お知らせ') ? '📢' :
                       channel.name.includes('リクエスト') ? '🎵' :
                       channel.name.includes('お酒') ? '🍶' :
                       channel.name.includes('ファンアート') ? '🎨' : '#'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{channel.name}</h3>
                      <p className="text-gray-600">{channel.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* サーバーの特徴 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            サーバーの特徴
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discordInfo.features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">
                    {feature.includes('楽曲') ? '🎵' :
                     feature.includes('制作') ? '🎧' :
                     feature.includes('交流') ? '👥' :
                     feature.includes('音源') ? '🎁' :
                     feature.includes('お酒') ? '🍶' : '✨'}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{feature}</h3>
                  <p className="text-gray-600 text-sm">
                    {feature.includes('楽曲') ? 'みんなからの楽曲リクエストを受付' :
                     feature.includes('制作') ? '楽曲制作の舞台裏をリアルタイムでシェア' :
                     feature.includes('交流') ? '音楽好きの仲間たちとの出会い' :
                     feature.includes('音源') ? 'メンバー限定の特別な音源配布' :
                     feature.includes('お酒') ? 'お酒の話題で大人の交流を楽しめる' : '温かいコミュニティ'}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ルール・マナー */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            サーバールール
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <Shield className="w-5 h-5 text-blue-500 mr-2" />
                    守ってほしいこと
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 相手を思いやる気持ちを大切に</li>
                    <li>• 建設的で楽しい会話を心がけて</li>
                    <li>• スパムや荒らし行為は禁止</li>
                    <li>• 個人情報の共有は避けて</li>
                    <li>• 適切なチャンネルで発言しましょう</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    大切にしていること
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 音楽への愛と情熱</li>
                    <li>• お互いの創作活動を応援</li>
                    <li>• 初心者も上級者も平等に</li>
                    <li>• 年齢を問わず楽しめる雰囲気</li>
                    <li>• あおばと一緒に成長していこう</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 参加を促すセクション */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Card className="text-center bg-gradient-to-r from-melody-purple/5 to-melody-pink/5">
              <div className="text-4xl mb-4">🎶</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">一緒に音楽を楽しもう！</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                あおばの音楽カフェは、音楽を愛するすべての人が集まる場所です。
                あなたの参加を心からお待ちしています。
                一緒に素敵な音楽の時間を過ごしましょう♪
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={discordInfo.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full transition-colors inline-flex items-center justify-center"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Discordに参加する
                </a>
                <a 
                  href="/community/requests"
                  className="border border-melody-purple text-melody-purple hover:bg-melody-purple hover:text-white px-8 py-3 rounded-full transition-colors"
                >
                  楽曲をリクエスト
                </a>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 