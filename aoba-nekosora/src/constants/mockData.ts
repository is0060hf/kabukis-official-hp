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

// 歌ってみた動画
export const mockCoverSongs = [
  {
    id: '1',
    title: '夜に駆ける',
    originalArtist: 'YOASOBI',
    coverDate: '2024-03-10',
    youtubeUrl: 'https://youtube.com/watch?v=cover1',
    viewCount: 45000,
    thumbnail: IMAGES.placeholder.rectangle,
    description: 'みんなのリクエストで一番多かった楽曲をカバーしました！',
    genre: 'J-POP',
    duration: '4:23',
  },
  {
    id: '2',
    title: 'Lemon',
    originalArtist: '米津玄師',
    coverDate: '2024-02-28',
    youtubeUrl: 'https://youtube.com/watch?v=cover2',
    viewCount: 38000,
    thumbnail: IMAGES.placeholder.rectangle,
    description: '切ない歌詞に心を込めて歌わせていただきました',
    genre: 'バラード',
    duration: '4:11',
  },
  {
    id: '3',
    title: '炎',
    originalArtist: 'LiSA',
    coverDate: '2024-02-15',
    youtubeUrl: 'https://youtube.com/watch?v=cover3',
    viewCount: 52000,
    thumbnail: IMAGES.placeholder.rectangle,
    description: '力強い楽曲にチャレンジ！情熱を込めて歌いました',
    genre: 'アニソン',
    duration: '4:18',
  },
]

// アーカイブ配信
export const mockArchives = [
  {
    id: '1',
    title: '【歌枠】深夜のリクエスト祭り',
    date: '2024-03-15',
    duration: '2:35:00',
    viewCount: 8500,
    thumbnail: IMAGES.placeholder.rectangle,
    youtubeUrl: 'https://youtube.com/watch?v=archive1',
    highlights: ['夜に駆ける', 'Lemon', '炎'],
    description: 'みんなのリクエストに全力で応えた配信でした！',
  },
  {
    id: '2',
    title: '【コラボ】傾奇くんと新曲披露',
    date: '2024-03-08',
    duration: '1:45:00',
    viewCount: 12000,
    thumbnail: IMAGES.placeholder.rectangle,
    youtubeUrl: 'https://youtube.com/watch?v=archive2',
    highlights: ['桜色の約束', '新曲制作過程'],
    description: '傾奇くんとの初コラボ楽曲をお披露目！',
  },
]

// コラボ企画
export const mockCollaborations = [
  {
    id: '1',
    title: '師弟デュエット企画',
    partner: '傾奇ユウヤ',
    type: 'デュエット',
    status: '進行中',
    description: '師弟関係をテーマにした楽曲制作プロジェクト',
    nextStream: '2024-03-22 21:00',
    image: IMAGES.placeholder.rectangle,
  },
  {
    id: '2',
    title: 'VTuber合唱企画',
    partner: '複数VTuber',
    type: '合唱',
    status: '企画中',
    description: '10名以上のVTuberによる大合唱プロジェクト',
    nextStream: 'TBD',
    image: IMAGES.placeholder.rectangle,
  },
]

// Discord情報
export const discordInfo = {
  serverName: 'あおばの音楽カフェ☕',
  memberCount: 2500,
  onlineCount: 340,
  inviteUrl: 'https://discord.gg/aoba-music',
  features: [
    '楽曲リクエスト',
    '制作過程シェア',
    'ファン同士の交流',
    '限定音源配布',
    'お酒の話題もOK',
  ],
  channels: [
    { name: '📢お知らせ', description: '最新情報をお届け' },
    { name: '🎵楽曲リクエスト', description: '歌ってほしい曲をリクエスト' },
    { name: '🍶お酒トーク', description: 'おすすめのお酒について語り合おう' },
    { name: '🎨ファンアート', description: 'あおばのファンアートを投稿' },
  ],
}

// リクエスト情報
export const mockRequests = [
  {
    id: '1',
    songTitle: '群青',
    artist: 'YOASOBI',
    requestedBy: 'ファン1',
    requestDate: '2024-03-18',
    status: '検討中',
    votes: 45,
    genre: 'J-POP',
  },
  {
    id: '2',
    songTitle: 'ドライフラワー',
    artist: '優里',
    requestedBy: 'ファン2',
    requestDate: '2024-03-17',
    status: '採用',
    votes: 32,
    genre: 'バラード',
  },
  {
    id: '3',
    songTitle: 'うっせぇわ',
    artist: 'Ado',
    requestedBy: 'ファン3',
    requestDate: '2024-03-16',
    status: '完了',
    votes: 28,
    genre: 'J-POP',
  },
]

// 制作実績（ビジネス向け）
export const mockWorks = [
  {
    id: '1',
    title: 'TVアニメ「星空物語」エンディングテーマ',
    client: '某アニメ制作会社',
    role: '作詞・作曲・歌唱',
    year: '2024',
    category: 'アニメソング',
    description: '優しい物語の世界観に寄り添う楽曲を制作しました',
    image: IMAGES.placeholder.rectangle,
    tags: ['アニメ', 'エンディング', 'バラード'],
  },
  {
    id: '2',
    title: 'ゲーム「Magic Quest」BGM集',
    client: 'インディーゲーム開発者',
    role: '楽曲制作・ボーカル提供',
    year: '2023',
    category: 'ゲーム音楽',
    description: 'ファンタジー世界の冒険を彩る10曲を制作',
    image: IMAGES.placeholder.rectangle,
    tags: ['ゲーム', 'BGM', 'ファンタジー'],
  },
  {
    id: '3',
    title: '企業VP「未来への歌声」',
    client: 'テック系スタートアップ',
    role: 'テーマソング制作',
    year: '2023',
    category: '企業音楽',
    description: '革新的な企業のビジョンを音楽で表現',
    image: IMAGES.placeholder.rectangle,
    tags: ['企業', 'VP', 'テーマソング'],
  },
]

// サービス情報
export const services = [
  {
    id: '1',
    title: 'オリジナル楽曲制作',
    description: 'あなただけのオリジナル楽曲を制作いたします',
    features: [
      '作詞・作曲・編曲',
      'ボーカル録音',
      '高品質ミキシング・マスタリング',
      '商用利用可能',
    ],
    price: '¥300,000〜',
    deliveryTime: '4-6週間',
    icon: '🎵',
  },
  {
    id: '2',
    title: 'ボーカル素材提供',
    description: '高品質なボーカル素材をお作りします',
    features: [
      '多様なボーカルスタイル',
      'STEM分離データ提供',
      'コマーシャル利用可',
      'カスタムメロディ対応',
    ],
    price: '¥50,000〜',
    deliveryTime: '1-2週間',
    icon: '🎤',
  },
  {
    id: '3',
    title: '楽曲アレンジ・リミックス',
    description: '既存楽曲のアレンジやリミックスを承ります',
    features: [
      'ジャンル変更アレンジ',
      'EDMリミックス',
      'アコースティックアレンジ',
      '演奏時間調整',
    ],
    price: '¥100,000〜',
    deliveryTime: '2-3週間',
    icon: '🎧',
  },
]

// ライセンス情報
export const licenseTypes = [
  {
    id: '1',
    name: 'Personal License',
    description: '個人利用・非商用利用向け',
    features: [
      '個人プロジェクトでの使用',
      'SNS投稿可',
      '再配布不可',
      'クレジット表記必須',
    ],
    price: 'Free',
    popular: false,
  },
  {
    id: '2',
    name: 'Commercial License',
    description: '商用利用・収益化向け',
    features: [
      '商用プロジェクトでの使用',
      '収益化コンテンツ使用可',
      '企業利用可',
      'クレジット表記必須',
    ],
    price: '¥10,000〜',
    popular: true,
  },
  {
    id: '3',
    name: 'Exclusive License',
    description: '独占利用権向け',
    features: [
      '楽曲の独占利用権',
      '再販売・再ライセンス可',
      'クレジット表記任意',
      '無制限商用利用',
    ],
    price: '¥500,000〜',
    popular: false,
  },
] 