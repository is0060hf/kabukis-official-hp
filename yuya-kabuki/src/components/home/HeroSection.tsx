"use client";

import { motion } from "framer-motion";
import { ChevronDown, Code2, GitBranch, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { commonAnimations, createStaggeredContainer } from "@/utils/animations";
import { IMAGE_PATHS } from "@/constants/images";

const HeroSection = () => {
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // カスタムコンテナーバリアント（より遅い間隔）
  const containerVariants = createStaggeredContainer(0.3, 0.2);
  const { itemVariants } = commonAnimations;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        {/* グラデーション背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-vampire-night via-vampire-shadow to-vampire-night opacity-90"></div>
        
        {/* 浮遊する要素 */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-vampire-accent/20 rounded-full filter blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-vampire-blood/20 rounded-full filter blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* コードパーティクル */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-vampire-accent/20 text-4xl font-code"
              initial={{
                x: Math.random() * windowSize.width,
                y: -100,
              }}
              animate={{
                y: windowSize.height + 100,
                rotate: 360,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            >
              {["</>", "{}", "=>", "git", "AI"][i]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* メインコンテンツ */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左側：テキストコンテンツ */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-vampire-accent/20 text-vampire-accent rounded-full text-sm font-medium mb-4">
                🦇 AI解説VTuber
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">傾奇ユウヤ</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
            >
              クール系ショタ吸血鬼VTuber
              <br />
              <span className="text-vampire-accent">AI解説</span>と
              <span className="text-vampire-blood">便利ツール配信</span>で
              <br />
              開発の世界を照らす
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/content/tools"
                className="glow-button px-8 py-4 rounded-full text-white font-medium flex items-center justify-center space-x-2 group"
              >
                <Code2 className="w-5 h-5" />
                <span>ツールを見る</span>
              </Link>
              <Link
                href="/live"
                className="px-8 py-4 rounded-full border-2 border-vampire-accent text-vampire-accent hover:bg-vampire-accent hover:text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Terminal className="w-5 h-5" />
                <span>配信を見る</span>
              </Link>
            </motion.div>

            {/* ステータス */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold gradient-text">50+</p>
                <p className="text-sm text-text-secondary">開発ツール</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold gradient-text">100+</p>
                <p className="text-sm text-text-secondary">解説記事</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold gradient-text">10k+</p>
                <p className="text-sm text-text-secondary">ダウンロード</p>
              </div>
            </motion.div>
          </div>

          {/* 右側：ビジュアル要素 */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* キャラクター画像 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative w-[400px] h-[400px]">
                  {/* グロー効果の背景 */}
                  <div className="absolute inset-0 bg-vampire-accent/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute inset-[-20px] bg-gradient-to-br from-vampire-accent/20 to-vampire-blood/20 rounded-full blur-2xl animate-float"></div>
                  
                  {/* 画像コンテナ */}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    {/* ぼやけたエッジ効果のマスク */}
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-transparent to-vampire-night/80 z-10 pointer-events-none"></div>
                    
                    <Image
                      src={IMAGE_PATHS.CHARACTER.YUYA_HERO}
                      alt="傾奇ユウヤ - クール系ショタ吸血鬼VTuber。ダークな装いに紫のアクセント、鋭い牙と赤い瞳が特徴"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full animate-float scale-110"
                      priority
                    />
                    
                    {/* 内側のグロー効果 */}
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-vampire-accent/10 to-vampire-accent/30 mix-blend-screen"></div>
                  </div>
                  
                  {/* 外側のリング効果 */}
                  <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-vampire-accent/50 via-vampire-blood/30 to-transparent animate-spin-slow"></div>
                </div>
              </motion.div>
              
              {/* 装飾的な要素 */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-vampire-accent/20 rounded-full filter blur-xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-vampire-blood/20 rounded-full filter blur-xl animate-pulse-slow animation-delay-300"></div>
              
              {/* 浮遊するアイコン */}
              <motion.div
                className="absolute top-0 right-0 p-3 bg-vampire-accent/20 rounded-lg backdrop-blur"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <GitBranch className="w-6 h-6 text-vampire-accent" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 left-0 p-3 bg-vampire-blood/20 rounded-lg backdrop-blur"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
              >
                <Code2 className="w-6 h-6 text-vampire-blood" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* スクロール指示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ChevronDown className="w-8 h-8 text-text-secondary" />
      </motion.div>
    </section>
  );
};

export default HeroSection; 