# TODO - 傾奇ユウヤ & 猫空あおば 公式サイト

## 🚨 最優先対応事項（セキュリティ・機能面）

### 1. フォーム送信処理の実装
- [ ] /studio/contact - お問い合わせフォーム
- [ ] /community/feedback - フィードバックフォーム  
- [ ] /community/requests - リクエストフォーム
- [ ] CSRF対策の実装
- [ ] フォームデータのサニタイゼーション（DOMPurify使用）
- [ ] API送信処理の実装

### 2. 基本的な画像アセット配置
- [ ] キャラクター画像の追加（最低限のメインビジュアル）
- [ ] プレースホルダー画像の置き換え
- [ ] favicon、アイコン類

### 3. SEO必須設定
- [ ] metadataBaseの設定（ビルド警告解消）
- [ ] OGP画像の作成
- [ ] robots.txt
- [ ] サイトマップ生成

## 📊 CMS実装（Phase別）

### Phase 1: 基盤構築
- [x] Prismaスキーマ定義
- [x] データベース選定・接続設定
- [x] NextAuth v5設定（管理者認証）
- [x] 基本的なCRUD API実装

### Phase 2: コンテンツ管理
- [x] 記事管理（ブログ、AI解説記事）
- [x] 配信スケジュール管理
- [x] ツール情報管理
- [x] 楽曲情報管理

### Phase 3: リード管理
- [x] 問い合わせ情報の保存・管理
- [x] フィードバック管理
- [x] リクエスト管理
- [x] 通知システム（メール/Discord webhook）

### Phase 4: 分析機能
- [x] 管理画面UI
- [x] アナリティクスダッシュボード
- [x] コンテンツパフォーマンス分析

## 🔧 機能実装（優先度順）

### 高優先度
- [ ] 実際のコンテンツデータ投入
- [ ] YouTube動画埋め込み
- [ ] 検索機能
- [ ] タグ・カテゴリフィルタ

### 中優先度
- [ ] CMS: validation.tsの単体テスト作成（validateMonths、validateCharacter等）
- [ ] CMS: process.exit(1)を例外スローに変更（env.ts）
- [ ] CMS: DevelopmentWarningコンポーネントのクライアントサイド環境変数アクセス改善
- [ ] CMS: 共通リトライユーティリティの作成（notifications.ts）
- [ ] GitHub Release API連携
- [ ] Hero動画の実装（aoba-nekosora）
- [ ] 音楽プレーヤーシステム（aoba-nekosora）
- [ ] PWA対応
- [ ] ダークモード最適化

### 低優先度
- [ ] フローティングプレーヤー（aoba-nekosora）
- [ ] ビジュアライザー拡張（aoba-nekosora）
- [ ] STEM配布システム（aoba-nekosora）
- [ ] 音楽ライセンス管理（aoba-nekosora）

## 🧪 品質向上・テスト

### テスト実装
- [ ] 各ページの基本的なレンダリングテスト
- [ ] フォーム機能のユニットテスト
- [ ] 検索・フィルター機能のテスト
- [ ] 新規コンポーネントのテスト（MusicNotes、MusicVisualizer）

### CI/CD・自動化
- [ ] CI/CD統合（GitHub Actions）
- [ ] テスト自動実行設定
- [ ] ビルド自動化
- [ ] デプロイ自動化

## 🎨 コード改善（リファクタリング）

### 高優先度
- [ ] 時間計算のエラーハンドリング追加（/live/archive/page.tsx:238-239）
- [ ] Studio詳細ページの画像パス修正
- [ ] mockStems等の型定義をtypes/index.tsに追加
- [x] CMS: @types/nodemailerをdevDependenciesに移動
- [x] CMS: 分析APIのパラメータ検証強化（SQLインジェクション対策）
- [x] CMS: 通知システムのエラーハンドリング改善
- [x] CMS: Discord Webhook URLのバリデーション追加
- [x] CMS: 環境変数バリデーション - cms/src/lib/env.tsを作成して起動時チェック
- [x] CMS: 開発環境警告 - ダッシュボードにも開発環境であることを表示
- [x] CMS: README改善 - トラブルシューティングにPrismaエラーの対処法追加
- [x] CMS: ENCRYPTION_KEYのサンプル値について「本番環境では必ず変更」とコメント明記

### 中優先度
- [ ] アクセシビリティ向上（SkipToContent コンポーネント追加）
- [ ] コードの可読性向上（データを別ファイルに分離：src/constants/studio.ts）
- [ ] インラインデータのmockData.tsへの移動
- [ ] 長いコンポーネントファイルの分割（CommunityPage等）

### 低優先度
- [ ] アニメーションのパフォーマンス最適化（prefers-reduced-motion対応）
- [ ] MusicNotes/MusicVisualizerコンポーネントのプロパティ拡張
- [ ] カラー値のCSS変数統一化
- [ ] ファイル末尾の不要な空白削除

## 📈 パフォーマンス・SEO最適化

- [ ] 画像最適化 (WebP/AVIF変換)
- [ ] メタデータ最適化
- [ ] 構造化データ実装
- [ ] Core Web Vitals最適化

## 🤖 Claude AI関連改善

- [ ] テスト自動生成の最適化
- [ ] プロジェクト固有のレビュールール設定
- [ ] レビュー履歴の管理システム
- [ ] カスタムレビュープロンプトの作成

---

## ✅ 完了済みタスク

### 傾奇ユウヤ (/yuya-kabuki)
- [x] 基本プロジェクトセットアップ (Next.js 15 + Tailwind CSS 4)
- [x] ダーク吸血鬼テーマのデザインシステム構築
- [x] トップページ実装（全セクション）
- [x] 共通コンポーネント（Navigation、ModeToggle、Footer）
- [x] アニメーション実装 (Framer Motion)
- [x] モックデータの作成と表示
- [x] 全ページ基本実装
  - [x] ライブ配信関連ページ（schedule、archive、asmr）
  - [x] コンテンツ関連ページ（tools、articles、tutorials）
  - [x] コミュニティ関連ページ（discord、feedback）
  - [x] スタジオ関連ページ（works、services、contact）
- [x] Claude AI統合（pre-commit、エイリアス、VSCode統合）
- [x] コード改善実施済み
  - [x] アニメーションバリアントの共通化
  - [x] 画像パスの定数管理
  - [x] メールバリデーションの強化
  - [x] Cardコンポーネントの適用拡大
  - [x] 未使用インポートの削除
  - [x] SiteMode型の共通化

### 猫空あおば (/aoba-nekosora)
- [x] 基本プロジェクトセットアップ
- [x] 明るい歌姫テーマのデザインシステム構築
- [x] トップページ実装（全セクション）
- [x] 共通コンポーネント（MusicVisualizer、MusicNotes追加）
- [x] 全ページ実装
  - [x] ライブ配信関連ページ（schedule、archive、collab）
  - [x] コンテンツ関連ページ（music、covers、blog）
  - [x] コミュニティ関連ページ（discord、requests）
  - [x] スタジオ関連ページ（works、services、licensing、contact）
- [x] レスポンシブ対応
- [x] 全ページ統一デザイン実装
- [x] SiteMode型の共通化

### 共通CMS (/cms)
- [x] 基本プロジェクトセットアップ (Next.js 15 + Prisma + NextAuth v5)
- [x] ダークテーマベースの管理画面デザイン
- [x] Phase 1: 基盤構築
  - [x] Prismaスキーマ定義（認証、リード、コンテンツ、配信管理）
  - [x] NextAuth v5設定（Discord/GitHub認証）
  - [x] 基本的なCRUD API実装
  - [x] 管理者権限チェック
- [x] Phase 2: コンテンツ管理
  - [x] コンテンツ一覧・フィルター機能
  - [x] 記事・ツール・楽曲の統合管理
  - [x] 配信スケジュール管理API
  - [x] キャラクター別メトリクス表示
- [x] Phase 3: リード管理
  - [x] フィードバック管理機能（評価・タグ付き）
  - [x] リクエスト管理機能（優先度・ステータス管理）
  - [x] 通知システム実装（Discord Webhook/メール通知）
  - [x] ステータス更新API
- [x] Phase 4: 分析機能
  - [x] リード分析ダッシュボード（コンバージョン率、トレンド分析）
  - [x] コンテンツ分析ダッシュボード（人気コンテンツ、トラフィック分析）
  - [x] 管理画面統合ダッシュボード
  - [x] CSVエクスポート機能
- [x] WCAG2.2準拠のアクセシビリティ対応
- [x] レスポンシブ管理画面

### 共通
- [x] 相互リンク実装（師弟関係の表現）
- [x] エンタメ/ビジネスモード切替機能
- [x] WCAG2.2準拠の基本実装

## 📝 備考
- ビルド時の警告: metadataBaseの設定が必要（本番URLが決まったら設定）
- tailwind.config.mjsでOKLCHカラーを使用した先進的なカラーシステムを実装
- エンタメ/ビジネスの二面性を持つサイト設計
- 師弟関係（ユウヤ→あおば）を相互リンクで表現
- Claude AI統合により、コミット時の自動コードレビューが実装済み
- CMSシステムはポート3002で動作（両サイトとの競合を避けるため）
