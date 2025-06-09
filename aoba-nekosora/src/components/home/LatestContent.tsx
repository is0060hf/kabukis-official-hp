'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import Card from '@/components/common/Card'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { mockBlogPosts } from '@/constants/mockData'

export default function LatestContent() {
  const latestPosts = mockBlogPosts.slice(0, 3)

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
            最新のコンテンツ
          </h2>
          <p className="text-gray-600 text-lg">
            音楽制作の裏話やお役立ち情報をお届け
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {latestPosts.map((post, index) => (
            <motion.div key={post.id} variants={fadeInUp} custom={index}>
              <Card
                hover
                className="h-full flex flex-col"
                onClick={() => console.log(`View post: ${post.title}`)}
              >
                {/* サムネイル */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src={post.thumbnail}
                    alt={`${post.title}のサムネイル`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-melody-sky text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* メタ情報 */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 読むボタン */}
                <motion.div
                  className="mt-4 pt-4 border-t border-gray-100"
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-flex items-center space-x-2 text-melody-sky font-medium">
                    <span>記事を読む</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
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
            href="/content/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-melody-purple/10 text-melody-purple rounded-full font-medium hover:bg-melody-purple hover:text-white transition-all duration-300"
          >
            <span>すべての記事を見る</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
} 