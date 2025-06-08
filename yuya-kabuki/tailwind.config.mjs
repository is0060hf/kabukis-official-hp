/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ダーク吸血鬼テーマカラー（OKLCHで定義）
        vampire: {
          blood: 'oklch(45% 0.3 25)', // 深い赤
          night: 'oklch(15% 0.02 250)', // 深い夜色
          moon: 'oklch(85% 0.02 250)', // 淡い月光色
          shadow: 'oklch(25% 0.05 250)', // 影色
          accent: 'oklch(60% 0.25 280)', // 紫のアクセント
        },
        primary: {
          DEFAULT: 'oklch(60% 0.25 280)', // 紫
          dark: 'oklch(45% 0.25 280)',
          light: 'oklch(75% 0.15 280)',
        },
        secondary: {
          DEFAULT: 'oklch(45% 0.3 25)', // 血色
          dark: 'oklch(35% 0.3 25)',
          light: 'oklch(55% 0.2 25)',
        },
        background: {
          DEFAULT: 'oklch(15% 0.02 250)', // 深い夜色
          paper: 'oklch(20% 0.02 250)',
          elevated: 'oklch(25% 0.02 250)',
        },
        text: {
          primary: 'oklch(95% 0 0)', // ほぼ白
          secondary: 'oklch(75% 0 0)', // 薄いグレー
          disabled: 'oklch(50% 0 0)', // グレー
        },
      },
      fontFamily: {
        gothic: ['Yu Gothic', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blood-drip': 'blood-drip 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px oklch(60% 0.25 280), 0 0 10px oklch(60% 0.25 280), 0 0 15px oklch(60% 0.25 280)' 
          },
          '100%': { 
            boxShadow: '0 0 10px oklch(60% 0.25 280), 0 0 20px oklch(60% 0.25 280), 0 0 30px oklch(60% 0.25 280)' 
          },
        },
        'blood-drip': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'vampire-gradient': 'linear-gradient(135deg, oklch(15% 0.02 250) 0%, oklch(45% 0.3 25) 100%)',
        'moon-gradient': 'radial-gradient(circle at 30% 30%, oklch(85% 0.02 250) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config 