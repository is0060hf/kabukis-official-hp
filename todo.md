# TODO - 傾奇ユウヤ & 猫空あおば 公式サイト

## 傾奇ユウヤ (/yuya-kabuki) - 実装状況

### ✅ 完了
- [x] 基本プロジェクトセットアップ (Next.js 15 + Tailwind CSS 4)
- [x] ダーク吸血鬼テーマのデザインシステム構築
- [x] トップページ (/) の実装
  - [x] HeroSection - メインビジュアル
  - [x] FeaturedTools - 人気ツール紹介
  - [x] LatestContent - 最新AI解説記事
  - [x] LiveSchedule - 配信スケジュール
  - [x] CallToAction - コミュニティ参加促進
- [x] 共通コンポーネント
  - [x] Navigation - エンタメ/ビジネスモード対応
  - [x] ModeToggle - モード切替UI
  - [x] Footer - あおばサイトへの相互リンク
- [x] アニメーション実装 (Framer Motion)
- [x] モックデータの作成と表示
- [x] Claude AI統合
  - [x] pre-commitフックの実装
  - [x] シェルエイリアスの設定
  - [x] VSCodeタスク統合
  - [x] 診断ツールの作成
  - [x] ドキュメントの追加

### 🔧 今後の実装予定

#### ページ実装
- [ ] /live - ライブ配信ページ
  - [ ] /live/schedule - 配信スケジュール詳細
  - [ ] /live/archive - 過去配信アーカイブ
  - [ ] /live/asmr - ASMR専用ページ
- [ ] /content - コンテンツページ
  - [ ] /content/tools - ツール一覧・詳細
  - [ ] /content/articles - AI解説記事一覧・詳細
  - [ ] /content/tutorials - 開発チュートリアル
- [ ] /community - コミュニティページ
  - [ ] /community/discord - Discord案内
  - [ ] /community/feedback - フィードバック
- [ ] /studio - ビジネス向けページ
  - [ ] /studio/works - 制作実績
  - [ ] /studio/services - サービス紹介
  - [ ] /studio/contact - お問い合わせ

#### 機能実装
- [ ] GitHub Release API連携
- [ ] YouTube動画埋め込み
- [ ] 検索機能
- [ ] タグ・カテゴリフィルタ
- [ ] ダークモード最適化
- [ ] PWA対応

#### アセット・コンテンツ
- [ ] キャラクター画像の追加
- [ ] 記事サムネイル画像
- [ ] OGP画像の作成
- [ ] favicon、アイコン類
- [ ] 実際のコンテンツデータ

#### パフォーマンス・SEO
- [ ] 画像最適化 (WebP/AVIF)
- [ ] メタデータ最適化
- [ ] サイトマップ生成
- [ ] robots.txt
- [ ] 構造化データ

#### Claude AI関連
- [ ] テスト自動生成の最適化
- [ ] プロジェクト固有のレビュールール設定
- [ ] CI/CD統合（GitHub Actions）
- [ ] レビュー履歴の管理システム
- [ ] カスタムレビュープロンプトの作成

## 猫空あおば (/aoba-nekosora) - 未実装

### 📋 実装予定
- [ ] プロジェクトセットアップ
- [ ] 明るい歌姫テーマのデザインシステム
- [ ] Hero動画（hero.mp4）の実装
- [ ] 音楽プレーヤーシステム
- [ ] 各ページの実装（ユウヤと同じ構造）
- [ ] STEM配布システム
- [ ] 音楽ライセンス管理

## 共通CMS (/cms) - 未実装

### 📋 実装予定
- [ ] Prismaスキーマ定義
- [ ] NextAuth v5設定
- [ ] 管理画面UI
- [ ] API実装
- [ ] リード管理システム
- [ ] コンテンツ管理
- [ ] 分析ダッシュボード

## 備考
- ビルド時の警告: metadataBaseの設定が必要（本番URLが決まったら設定）
- tailwind.config.mjsでOKLCHカラーを使用した先進的なカラーシステムを実装
- エンタメ/ビジネスの二面性を持つサイト設計
- 師弟関係（ユウヤ→あおば）を相互リンクで表現
- Claude AI統合により、コミット時の自動コードレビューが実装済み
