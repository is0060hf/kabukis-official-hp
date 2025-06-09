/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CMS独自のカラースキーム（ダークテーマベース）
        'cms-bg': 'oklch(13% 0.01 280)',
        'cms-surface': 'oklch(18% 0.015 280)',
        'cms-surface-hover': 'oklch(22% 0.02 280)',
        'cms-border': 'oklch(30% 0.02 280)',
        'cms-text': 'oklch(95% 0.01 280)',
        'cms-text-muted': 'oklch(70% 0.01 280)',
        
        // アクセントカラー
        'cms-primary': 'oklch(65% 0.18 280)', // 紫系
        'cms-primary-hover': 'oklch(70% 0.20 280)',
        'cms-secondary': 'oklch(65% 0.18 340)', // ピンク系
        'cms-secondary-hover': 'oklch(70% 0.20 340)',
        
        // ステータスカラー（WCAG2.2準拠）
        'cms-success': 'oklch(75% 0.15 150)',
        'cms-warning': 'oklch(80% 0.15 90)',
        'cms-error': 'oklch(65% 0.20 25)',
        'cms-info': 'oklch(70% 0.15 230)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      aria: {
        current: 'current="page"',
        expanded: 'expanded="true"',
        collapsed: 'expanded="false"',
      },
    },
  },
  plugins: [],
} 