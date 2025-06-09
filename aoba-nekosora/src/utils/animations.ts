import { Variants } from 'framer-motion'

// フェードインアニメーション
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}

// 下からフェードイン
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}

// 左からフェードイン
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}

// 右からフェードイン
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}

// スケールアップアニメーション
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'backOut' }
  },
}

// 音符が舞うアニメーション
export const musicNote: Variants = {
  hidden: { opacity: 0, y: 0, rotate: 0 },
  visible: {
    opacity: [0, 1, 1, 0],
    y: [-20, -40, -60, -80],
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 2,
      ease: 'easeOut',
      times: [0, 0.2, 0.8, 1],
    },
  },
}

// 波紋アニメーション
export const ripple: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.5, 2],
    opacity: [0, 0.5, 0],
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      times: [0, 0.5, 1],
    },
  },
}

// 輝きアニメーション
export const sparkle: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 1, 0],
    scale: [0, 1.2, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

// 親要素用のstaggerアニメーション
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

// カード用のホバーアニメーション
export const cardHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.05, 
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.3,
      rotate: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  },
  tap: { scale: 0.95 },
}

// 浮遊アニメーション
export const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

// パルスアニメーション
export const pulse = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
} 