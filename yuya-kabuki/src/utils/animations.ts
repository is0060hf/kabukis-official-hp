export const commonAnimations = {
  // 標準的なコンテナーバリアント
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  },

  // 標準的なアイテムバリアント
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  },

  // カードホバーバリアント
  cardHoverVariants: {
    rest: { 
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  },

  // フェードインバリアント（遅延あり）
  fadeInDelayed: (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }),

  // スライドインバリアント
  slideInVariants: {
    left: {
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    },
    right: {
      hidden: { opacity: 0, x: 20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    },
  },

  // スケールアニメーション
  scaleVariants: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },

  // ページトランジション
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// カスタムバリアント生成関数
export const createStaggeredContainer = (
  delayChildren = 0.3,
  staggerChildren = 0.1
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

export const createItemVariant = (
  yOffset = 20,
  damping = 12,
  stiffness = 100
) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping,
      stiffness,
    },
  },
}); 