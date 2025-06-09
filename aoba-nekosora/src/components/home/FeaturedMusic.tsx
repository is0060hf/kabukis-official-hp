'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Play, Heart, Share2 } from 'lucide-react'
import Card from '@/components/common/Card'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { mockSongs } from '@/constants/mockData'

export default function FeaturedMusic() {
  const featuredSongs = mockSongs.slice(0, 3)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            人気楽曲
          </h2>
          <p className="text-gray-600 text-lg">
            みんなに愛されている楽曲をお届け
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredSongs.map((song, index) => (
            <motion.div key={song.id} variants={fadeInUp} custom={index}>
              <Card
                hover
                className="h-full flex flex-col"
                onClick={() => console.log(`Play song: ${song.title}`)}
              >
                {/* アルバムアート */}
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4 group">
                  <Image
                    src={song.coverImage}
                    alt={`${song.title}のカバー画像`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-16 h-16 text-white" fill="white" />
                    </motion.div>
                  </div>
                </div>

                {/* 楽曲情報 */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">{song.title}</h3>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                  <p className="text-sm text-gray-500">{song.genre} • {song.duration}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{song.description}</p>
                </div>

                {/* 統計情報 */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {song.playCount.toLocaleString()} 再生
                  </span>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-melody-sky transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-melody-sky transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* もっと見るボタン */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="/content/music"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-melody-sky/10 text-melody-sky rounded-full font-medium hover:bg-melody-sky hover:text-white transition-all duration-300"
          >
            <span>すべての楽曲を見る</span>
            <Play className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
} 