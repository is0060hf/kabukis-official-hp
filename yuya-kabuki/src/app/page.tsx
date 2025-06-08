"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTools from "@/components/home/FeaturedTools";
import LatestContent from "@/components/home/LatestContent";
import LiveSchedule from "@/components/home/LiveSchedule";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      {/* ヒーローセクション */}
      <HeroSection />

      {/* セクション間の装飾 */}
      <div className="relative h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vampire-accent/5 to-transparent"></div>
      </div>

      {/* 人気ツール */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 text-center">
            人気の便利ツール
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            AI技術を活用した開発ツールを無料で配布中。開発効率を劇的に向上させます。
          </p>
          <FeaturedTools />
        </motion.div>
      </section>

      {/* セクション間の装飾 */}
      <div className="relative h-32">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vampire-blood/30 to-transparent"></div>
        </div>
      </div>

      {/* 最新コンテンツ */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 text-center">
            最新のAI解説
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            最新のAI技術やツールについて、分かりやすく解説しています。
          </p>
          <LatestContent />
        </motion.div>
      </section>

      {/* セクション間の装飾 */}
      <div className="relative h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-vampire-accent/10 rounded-full filter blur-[60px]"></div>
        </div>
      </div>

      {/* 配信スケジュール */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 text-center">
            配信スケジュール
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            AI解説やツール開発の生配信をチェック。一緒に学びましょう。
          </p>
          <LiveSchedule />
        </motion.div>
      </section>

      {/* CTA */}
      <CallToAction />
    </>
  );
}
