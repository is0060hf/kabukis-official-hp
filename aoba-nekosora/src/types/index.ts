// サイトモード
export type SiteMode = 'entertainment' | 'business'

// 楽曲
export interface Song {
  id: string
  title: string
  artist: string
  coverImage: string
  releaseDate: string
  duration: string
  playCount: number
  youtubeUrl?: string
  spotifyUrl?: string
  genre: string
  description: string
}

// 配信スケジュール
export interface StreamSchedule {
  id: string
  title: string
  date: string
  time: string
  duration: string
  type: 'singing' | 'collaboration' | 'asmr'
  thumbnail: string
  description: string
}

// ブログ記事
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  thumbnail: string
  readTime: string
}

// STEM素材
export interface Stem {
  id: string
  songTitle: string
  stemType: string
  format: string
  price: string
  downloadCount: number
  license: string
  description: string
}

// イベント
export interface Event {
  id: string
  title: string
  date: string
  venue: string
  description: string
  ticketUrl: string
  image: string
} 