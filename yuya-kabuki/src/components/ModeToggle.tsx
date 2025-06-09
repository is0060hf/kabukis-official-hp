"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Briefcase } from "lucide-react";

const ModeToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // 現在のモードを判定
  const isBusinessMode = pathname.startsWith("/studio");

  const modes = [
    {
      id: "entertainment",
      label: "ファン向け",
      icon: <Sparkles className="w-4 h-4" />,
      description: "配信・ツール・コミュニティ",
      path: "/",
      gradient: "from-vampire-accent to-vampire-blood",
    },
    {
      id: "business",
      label: "事業パートナー向け",
      icon: <Briefcase className="w-4 h-4" />,
      description: "開発実績・サービス案内",
      path: "/studio",
      gradient: "from-vampire-blood to-vampire-shadow",
    },
  ];

  const currentMode = isBusinessMode ? modes[1] : modes[0];

  const handleModeChange = (mode: typeof modes[0]) => {
    router.push(mode.path);
    setIsOpen(false);
  };

  // クリック外側でクローズ
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#mode-toggle")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div id="mode-toggle" className="fixed top-20 right-4 md:top-4 md:right-4 z-60">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative px-3 py-2 md:px-4 md:py-2 rounded-full 
          bg-gradient-to-r ${currentMode.gradient} 
          text-white font-medium text-sm
          shadow-lg hover:shadow-xl
          transition-all duration-300
          flex items-center space-x-2
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentMode.icon}
        <span className="hidden sm:inline">{currentMode.label}</span>
        <span className="sm:hidden">{currentMode.id === 'entertainment' ? 'ファン' : '事業'}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 sm:w-72 glass-card rounded-lg overflow-hidden max-w-[calc(100vw-2rem)]"
          >
            <div className="p-1">
              {modes.map((mode) => {
                const isActive = mode.id === currentMode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode)}
                    disabled={isActive}
                    className={`
                      w-full p-4 rounded-lg
                      transition-all duration-300
                      ${isActive 
                        ? "bg-vampire-accent/20 cursor-default" 
                        : "hover:bg-vampire-accent/10 cursor-pointer"
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`
                        p-2 rounded-lg 
                        bg-gradient-to-r ${mode.gradient}
                        text-white
                      `}>
                        {mode.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-text-primary flex items-center space-x-2">
                          <span>{mode.label}</span>
                          {isActive && (
                            <span className="text-xs bg-vampire-accent/20 text-vampire-accent px-2 py-0.5 rounded-full">
                              現在
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-text-secondary mt-1">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 説明文 */}
            <div className="p-4 border-t border-vampire-accent/10">
              <p className="text-xs text-text-secondary">
                同じコンテンツを異なる視点でご覧いただけます。
                いつでも切り替え可能です。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeToggle; 