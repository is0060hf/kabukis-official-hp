import { IMAGES } from './images'

// 楽曲データ
export const mockSongs = [
  {
    id: '1',
    title: '星降る夜のメロディ',
    artist: '猫空あおば',
    coverImage: IMAGES.placeholder.square,
    releaseDate: '2024-03-15',
    duration: '4:23',
    playCount: 12500,
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    spotifyUrl: 'https://spotify.com/track/example1',
    genre: 'J-POP',
    description: '夜空に輝く星たちへ捧げる、切なくも温かいバラード',
  },
  {
    id: '2',
    title: 'Morning Coffee',
    artist: '猫空あおば',
    coverImage: IMAGES.placeholder.square,
    releaseDate: '2024-02-28',
    duration: '3:45',
    playCount: 8300,
    youtubeUrl: 'https://youtube.com/watch?v=example2',
    spotifyUrl: 'https://spotify.com/track/example2',
    genre: 'Jazz',
    description: '朝のコーヒータイムにぴったりなジャジーな一曲',
  },
  {
    id: '3',
    title: '桜色の約束',
    artist: '猫空あおば feat. 傾奇ユウヤ',
    coverImage: IMAGES.placeholder.square,
    releaseDate: '2024-01-20',
    duration: '5:02',
    playCount: 15700,
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    spotifyUrl: 'https://spotify.com/track/example3',
    genre: 'バラード',
    description: '師弟コラボ！春の訪れを感じる感動的なデュエット曲',
  },
]

// 配信スケジュール
export const mockStreamSchedule = [
  {
    id: '1',
    title: '【歌枠】みんなのリクエストに応えるよ！',
    date: '2024-03-20',
    time: '20:00',
    duration: '2時間',
    type: 'singing',
    thumbnail: IMAGES.placeholder.rectangle,
    description: 'リクエスト大歓迎！みんなの好きな曲を一緒に楽しもう♪',
  },
  {
    id: '2',
    title: '【コラボ】傾奇くんと新曲制作配信',
    date: '2024-03-22',
    time: '21:00',
    duration: '3時間',
    type: 'collaboration',
    thumbnail: IMAGES.placeholder.rectangle,
    description: '傾奇くんと一緒に新曲を作っていく過程をお見せします！',
  },
  {
    id: '3',
    title: '【ASMR】深夜のささやき配信',
    date: '2024-03-24',
    time: '23:00',
    duration: '1時間',
    type: 'asmr',
    thumbnail: IMAGES.placeholder.rectangle,
    description: '眠れない夜に...優しい声でリラックスタイムをお届け',
  },
]

// ブログ記事
export const mockBlogPosts = [
  {
    id: '1',
    title: '新曲「星降る夜のメロディ」制作秘話',
    excerpt: '今回の楽曲に込めた想いと、制作過程でのエピソードをお話しします',
    content: '',
    author: '猫空あおば',
    date: '2024-03-16',
    category: '音楽制作',
    tags: ['楽曲制作', '制作秘話', 'バラード'],
    thumbnail: IMAGES.placeholder.rectangle,
    readTime: '5分',
  },
  {
    id: '2',
    title: 'おすすめの日本酒とその楽しみ方',
    excerpt: '最近出会った素敵な日本酒と、音楽と一緒に楽しむコツをご紹介',
    content: '',
    author: '猫空あおば',
    date: '2024-03-10',
    category: 'お酒',
    tags: ['日本酒', 'おすすめ', 'ライフスタイル'],
    thumbnail: IMAGES.placeholder.rectangle,
    readTime: '8分',
  },
  {
    id: '3',
    title: 'DTM初心者向け！ボーカル録音のコツ',
    excerpt: '自宅でも綺麗にボーカルを録音するためのテクニックを解説します',
    content: '',
    author: '猫空あおば',
    date: '2024-03-05',
    category: 'チュートリアル',
    tags: ['DTM', '録音', 'ボーカル', '初心者向け'],
    thumbnail: IMAGES.placeholder.rectangle,
    readTime: '10分',
  },
]

// STEM素材
export const mockStems = [
  {
    id: '1',
    songTitle: '星降る夜のメロディ',
    stemType: 'Vocal',
    format: 'WAV 48kHz/24bit',
    price: 'Free',
    downloadCount: 234,
    license: 'Personal Use Only',
    description: 'メインボーカルトラック（ハモリ含む）',
  },
  {
    id: '2',
    songTitle: 'Morning Coffee',
    stemType: 'Instrumental',
    format: 'WAV 48kHz/24bit',
    price: '¥500',
    downloadCount: 156,
    license: 'Commercial Use OK',
    description: 'カラオケ音源として使用可能',
  },
  {
    id: '3',
    songTitle: '桜色の約束',
    stemType: 'Harmony',
    format: 'WAV 48kHz/24bit',
    price: 'Free',
    downloadCount: 189,
    license: 'Personal Use Only',
    description: 'ハーモニーパートのみ抽出',
  },
]

// イベント情報
export const mockEvents = [
  {
    id: '1',
    title: '1st Anniversary Live',
    date: '2024-04-15',
    venue: 'オンライン',
    description: 'デビュー1周年記念！スペシャルライブを開催します',
    ticketUrl: '#',
    image: IMAGES.placeholder.rectangle,
  },
  {
    id: '2',
    title: 'ファンミーティング in Tokyo',
    date: '2024-05-01',
    venue: '東京某所',
    description: '初のオフラインイベント！みんなと直接会えるのを楽しみにしています',
    ticketUrl: '#',
    image: IMAGES.placeholder.rectangle,
  },
] 