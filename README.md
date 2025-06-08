# 傾奇ユウヤ & 猫空あおば 公式サイト

このリポジトリは、傾奇ユウヤと猫空あおばの公式サイトを含むモノレポジトリです。

## プロジェクト構成

```
kabukis-official-hp/
├── yuya-kabuki/      # 傾奇ユウヤ公式サイト（吸血鬼テーマ）
├── aoba-nekosora/    # 猫空あおば公式サイト（歌姫テーマ）
└── cms/              # 共通CMS
```

## 技術スタック

- Next.js 15
- TypeScript
- Tailwind CSS 4 (OKLCHカラーシステム)
- Framer Motion
- WCAG 2.2準拠

## Claude AI統合

このプロジェクトではClaude AIを使用した自動コードレビューシステムが統合されています。

### セットアップ

1. **Claude CLIのインストール**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **APIキーの設定**
   ```bash
   export ANTHROPIC_API_KEY='your-api-key'
   ```

3. **シェルエイリアスの設定**
   ```bash
   ./setup-claude-aliases.sh
   source ~/.zshrc  # または ~/.bashrc
   ```

4. **診断ツールの実行**
   ```bash
   ./debug-claude-setup.sh
   ```

### 機能

#### Pre-commitフック
コミット時に自動的にステージングされたTypeScript/JavaScriptファイルをレビューします。

- バグの検出
- 既存コンポーネントの再利用チェック
- コードの可読性評価
- WCAG 2.2準拠チェック
- テストの必要性判定

レビューで問題が見つかった場合は、指摘事項が表示されます。推奨事項はtodo.mdに自動的に追記されます。

#### シェルエイリアス

| エイリアス | 説明 |
|-----------|------|
| `cl` | Claude対話モード |
| `crf <file>` | ファイルをレビュー |
| `crd` | git diffをレビュー |
| `crds` | ステージング済みの変更をレビュー |
| `cgc <name>` | コンポーネント生成 |
| `cgt <file>` | テスト生成 |
| `crefactor <file>` | リファクタリング提案 |
| `cbug <file>` | バグ検出 |
| `ca11y <file>` | アクセシビリティチェック |
| `canalyze` | プロジェクト分析 |
| `cdoc <file>` | ドキュメント生成 |
| `coptimize <file>` | 最適化提案 |
| `csecurity <file>` | セキュリティチェック |

#### VSCodeタスク

VSCodeのコマンドパレット（Cmd/Ctrl + Shift + P）から「Tasks: Run Task」を選択して、以下のタスクを実行できます：

- Claude: 現在のファイルをレビュー
- Claude: git diffをレビュー
- Claude: ステージング済みの変更をレビュー
- Claude: 現在のファイルのテストを生成
- Claude: プロジェクト構造を分析
- Claude: リファクタリング提案
- Claude: WCAG 2.2アクセシビリティチェック
- Claude: コンポーネントドキュメント生成
- Claude: セキュリティチェック
- Claude: パフォーマンス最適化提案

### トラブルシューティング

問題が発生した場合は、診断ツールを実行してください：

```bash
./debug-claude-setup.sh
```

このツールは以下をチェックします：
- Claude CLIのインストール状態
- Node.jsバージョン
- pre-commitフックの設定
- APIキーの設定
- VSCodeタスクの設定
- .gitignoreの設定
- ネットワーク接続

### 注意事項

- コミットをスキップする場合: `git commit --no-verify`
- CLAUDE_DEBUG環境変数が自動的に設定されます
- レビュー結果はclaude-debug.logに保存されます
- センシティブな情報を含むコードには注意してください

## 開発

### 各プロジェクトの開発

```bash
# 傾奇ユウヤサイト
cd yuya-kabuki
npm run dev

# 猫空あおばサイト
cd aoba-nekosora
npm run dev

# CMS
cd cms
npm run dev
```

### ビルド

```bash
# 全プロジェクトのビルド
npm run build:all
```

## ライセンス

このプロジェクトはプライベートリポジトリです。 