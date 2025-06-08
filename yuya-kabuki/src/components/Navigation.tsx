"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2, Sparkles, Users, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // エンタメ/ビジネスモードの判定
  const isBusinessMode = pathname.startsWith("/studio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const entertainmentLinks = [
    { href: "/", label: "トップ", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/live", label: "ライブ配信", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/content", label: "コンテンツ", icon: <Code2 className="w-4 h-4" /> },
    { href: "/community", label: "コミュニティ", icon: <Users className="w-4 h-4" /> },
  ];

  const businessLinks = [
    { href: "/studio", label: "Studio", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/studio/works", label: "制作実績", icon: <Code2 className="w-4 h-4" /> },
    { href: "/studio/services", label: "サービス", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/studio/contact", label: "お問い合わせ", icon: <Users className="w-4 h-4" /> },
  ];

  const currentLinks = isBusinessMode ? businessLinks : entertainmentLinks;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-vampire-night/90 backdrop-blur-lg border-b border-vampire-accent/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="relative group">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-vampire-accent to-vampire-blood rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
                <div className="absolute inset-0 bg-vampire-accent rounded-full filter blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold gradient-text">傾奇ユウヤ</span>
            </motion.div>
          </Link>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-1">
            {currentLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== "/" && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "text-vampire-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {link.icon}
                    <span>{link.label}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-vampire-accent/10 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-vampire-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Link>
              );
            })}
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-vampire-accent/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-vampire-night/95 backdrop-blur-lg border-t border-vampire-accent/20"
          >
            <div className="container mx-auto px-4 py-4">
              {currentLinks.map((link, index) => {
                const isActive = pathname === link.href || 
                  (link.href !== "/" && pathname.startsWith(link.href));
                
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-vampire-accent/20 text-vampire-accent"
                          : "hover:bg-vampire-accent/10 text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 