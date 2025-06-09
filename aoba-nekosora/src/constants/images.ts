// 画像パス定数
export const IMAGES = {
  // キャラクター画像
  character: {
    main: '/images/aoba-main.png', // メインビジュアル - あおばの全身イラスト
    icon: '/images/aoba-icon.png', // アイコン - あおばの顔アイコン
    chibi: '/images/aoba-chibi.png', // ちびキャラ - SDキャラクター
    singing: '/images/aoba-singing.png', // 歌っている姿 - マイクを持って歌うあおば
  },
  
  // ヒーロー関連
  hero: {
    video: '/videos/hero.mp4', // ヒーロー動画 - 歌っているシーン5秒ループ
    poster: '/images/hero-poster.jpg', // 動画のポスター画像
  },
  
  // 楽曲・音楽関連
  music: {
    defaultCover: '/images/music-default-cover.jpg', // デフォルトの楽曲カバー
    waveform: '/images/music-waveform.png', // 音楽の波形画像
    note: '/images/music-note.svg', // 音符アイコン
  },
  
  // 配信関連
  streaming: {
    thumbnail: '/images/stream-thumbnail.jpg', // 配信サムネイル
    offline: '/images/stream-offline.jpg', // オフライン画像
  },
  
  // 背景・装飾
  decoration: {
    sparkle: '/images/sparkle.svg', // キラキラエフェクト
    wave: '/images/wave-pattern.svg', // 波のパターン
    gradient: '/images/gradient-bg.jpg', // グラデーション背景
  },
  
  // ソーシャル
  social: {
    youtube: '/images/social/youtube.svg',
    twitter: '/images/social/twitter.svg',
    discord: '/images/social/discord.svg',
    spotify: '/images/social/spotify.svg',
  },
  
  // プレースホルダー
  placeholder: {
    square: 'https://via.placeholder.com/400x400/60C8FF/FFFFFF?text=Image',
    rectangle: 'https://via.placeholder.com/800x450/836CD1/FFFFFF?text=Image',
    banner: 'https://via.placeholder.com/1920x600/60C8FF/FFFFFF?text=Banner',
  },
} as const 