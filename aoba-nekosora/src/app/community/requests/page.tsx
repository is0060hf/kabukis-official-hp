'use client'

import { motion } from 'framer-motion'
import { Music, Heart, TrendingUp, Send, Vote, CheckCircle, Clock, Users } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/common/Card'
import { mockRequests } from '@/constants/mockData'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function RequestsPage() {
  const [newRequest, setNewRequest] = useState({ songTitle: '', artist: '', reason: '' })
  const [filter, setFilter] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case '完了': return 'bg-green-500 text-white'
      case '採用': return 'bg-blue-500 text-white'
      case '検討中': return 'bg-yellow-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '完了': return <CheckCircle className="w-4 h-4" />
      case '採用': return <Heart className="w-4 h-4" />
      case '検討中': return <Clock className="w-4 h-4" />
      default: return <Music className="w-4 h-4" />
    }
  }

  const filteredRequests = mockRequests.filter(request => 
    filter === 'all' || request.status === filter
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // リクエスト送信処理（実際の実装では API コールなど）
    console.log('新しいリクエスト:', newRequest)
    setNewRequest({ songTitle: '', artist: '', reason: '' })
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
            Song Requests
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            あおばに歌ってほしい楽曲をリクエストしよう<br/>
            みんなの投票で次の楽曲が決まります♪
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
                <Music className="w-8 h-8 text-melody-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{mockRequests.length}</div>
                <div className="text-sm text-gray-600">総リクエスト</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {mockRequests.filter(r => r.status === '完了').length}
                </div>
                <div className="text-sm text-gray-600">完了</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {mockRequests.filter(r => r.status === '採用').length}
                </div>
                <div className="text-sm text-gray-600">採用済み</div>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <TrendingUp className="w-8 h-8 text-melody-pink mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {mockRequests.reduce((sum, r) => sum + r.votes, 0)}
                </div>
                <div className="text-sm text-gray-600">総投票数</div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* リクエストフォーム */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            楽曲をリクエストする
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    楽曲名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRequest.songTitle}
                    onChange={(e) => setNewRequest({...newRequest, songTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                    placeholder="例: 夜に駆ける"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    アーティスト名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRequest.artist}
                    onChange={(e) => setNewRequest({...newRequest, artist: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                    placeholder="例: YOASOBI"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    リクエスト理由（任意）
                  </label>
                  <textarea
                    rows={4}
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-melody-purple focus:border-transparent"
                    placeholder="この楽曲をリクエストする理由や、あおばの歌声で聴いてみたい思いを教えてください♪"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-melody-purple hover:bg-melody-purple/80 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  リクエストを送信
                </button>
              </form>
            </Card>
          </motion.div>
        </motion.section>

        {/* フィルター */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { id: 'all', label: '全て' },
                  { id: '検討中', label: '検討中' },
                  { id: '採用', label: '採用済み' },
                  { id: '完了', label: '完了' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === option.id
                        ? 'bg-melody-purple text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* リクエスト一覧 */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            現在のリクエスト状況
          </motion.h2>
          
          <div className="space-y-4">
            {filteredRequests.map((request, index) => (
              <motion.div key={request.id} variants={fadeInUp}>
                <Card className="group">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{request.songTitle}</h3>
                        <div className={`px-2 py-1 rounded text-sm font-medium flex items-center gap-1 ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </div>
                      </div>
                      <p className="text-melody-purple mb-1">by {request.artist}</p>
                      <div className="text-sm text-gray-500 flex items-center gap-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {request.requestedBy}
                        </span>
                        <span>{request.requestDate}</span>
                        <span className="text-melody-purple">{request.genre}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-melody-purple">{request.votes}</div>
                        <div className="text-sm text-gray-600">投票</div>
                      </div>
                      <button 
                        className="bg-melody-purple hover:bg-melody-purple/80 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        disabled={request.status === '完了'}
                      >
                        <Vote className="w-4 h-4 mr-2" />
                        {request.status === '完了' ? '完了' : '投票'}
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ガイドライン */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
            リクエストガイドライン
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800">おすすめのリクエスト</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 人気のJ-POPやアニメソング</li>
                    <li>• あおばの声質に合いそうなバラード</li>
                    <li>• 感動的なメロディーの楽曲</li>
                    <li>• みんなで盛り上がれる楽曲</li>
                    <li>• 最新のヒット曲</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800">リクエストのコツ</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 楽曲名とアーティスト名は正確に</li>
                    <li>• なぜその楽曲をリクエストするか理由を書くと採用されやすい</li>
                    <li>• 他の人のリクエストにも積極的に投票を</li>
                    <li>• 著作権上歌えない楽曲もあります</li>
                    <li>• 重複リクエストは統合される場合があります</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 