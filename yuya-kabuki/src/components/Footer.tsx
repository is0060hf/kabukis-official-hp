"use client";

import Link from "next/link";
import { Github, Twitter, Youtube, Music, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { href: "https://twitter.com/yuya_kabuki", icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
    { href: "https://github.com/yuya-kabuki", icon: <Github className="w-5 h-5" />, label: "GitHub" },
    { href: "https://youtube.com/@yuya_kabuki", icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
  ];

  const quickLinks = [
    { href: "/content/tools", label: "便利ツール" },
    { href: "/content/articles", label: "AI解説記事" },
    { href: "/live/schedule", label: "配信スケジュール" },
    { href: "/studio", label: "ビジネス向け" },
  ];

  return (
    <footer className="relative bg-vampire-night/80 backdrop-blur-md border-t border-vampire-accent/20">
      {/* グラデーション装飾 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vampire-accent to-transparent"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-vampire-accent to-vampire-blood rounded-full flex items-center justify-center">
                <span className="text-white font-bold">Y</span>
              </div>
              <span className="text-lg font-bold gradient-text">傾奇ユウヤ</span>
            </div>
            <p className="text-text-secondary text-sm mb-4 max-w-md">
              クール系ショタ吸血鬼VTuber。AI解説・便利ツール配信を中心に活動中。
              開発大好き、無表情だけど内面は熱い。
            </p>
            
            {/* ソーシャルリンク */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-vampire-shadow/50 hover:bg-vampire-accent/20 text-text-secondary hover:text-vampire-accent transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="text-text-primary font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-vampire-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 師匠リンク */}
          <div>
            <h3 className="text-text-primary font-bold mb-4">Partner Site</h3>
            <motion.a
              href="https://aoba-nekosora.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 p-4 rounded-lg bg-gradient-to-r from-vampire-accent/10 to-vampire-blood/10 hover:from-vampire-accent/20 hover:to-vampire-blood/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-shrink-0">
                <Music className="w-6 h-6 text-vampire-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary group-hover:text-vampire-accent transition-colors">
                  猫空あおば
                </p>
                <p className="text-xs text-text-secondary">
                  師匠の新曲をチェック🎧
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-text-secondary group-hover:text-vampire-accent transition-colors" />
            </motion.a>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-12 pt-8 border-t border-vampire-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-text-secondary text-sm">
            <p>&copy; 2024 傾奇ユウヤ. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-vampire-accent transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="hover:text-vampire-accent transition-colors">
                利用規約
              </Link>
            </div>
          </div>
        </div>

        {/* 装飾的な要素 */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-vampire-accent/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      </div>
    </footer>
  );
};

export default Footer; 