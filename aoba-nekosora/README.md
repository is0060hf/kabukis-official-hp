# 猫空あおば 公式サイト

歌姫VTuber「猫空あおば」の公式サイトです。

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## プロジェクト構造

```
src/
├── app/              # Next.js App Router
├── components/       # Reactコンポーネント
│   ├── common/      # 共通コンポーネント
│   └── home/        # ホームページコンポーネント
├── constants/        # 定数定義
├── utils/           # ユーティリティ関数
└── types/           # TypeScript型定義
```

## 特徴

- 🎵 明るく爽やかな歌姫テーマ
- 🎨 傾奇ユウヤサイトと対比的なデザイン
- 🎬 Hero動画による印象的なトップページ
- 🎤 楽曲・配信情報の魅力的な表示
- 💼 エンタメ/ビジネスモード切り替え
- 📱 完全レスポンシブデザイン

## カラーパレット

- **メインブルー**: #60C8FF (melody-sky)
- **サブパープル**: #836CD1 (melody-purple)
- **アクセント**: 黄色系 (melody-accent)
- **背景**: 明るいトーン (melody-light)

## 開発者向け

### カスタムCSSクラス

- `glass-card`: ガラスモーフィズムカード
- `gradient-text`: グラデーションテキスト
- `melody-button`: メロディボタンスタイル
- `music-note-decoration`: 音符装飾

### アニメーション

Framer Motionを使用した豊富なアニメーション:
- フェードイン各種 (fadeIn, fadeInUp, etc.)
- 浮遊アニメーション (float)
- パルスアニメーション (pulse)
- 音符アニメーション (musicNote) 