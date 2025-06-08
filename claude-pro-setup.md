# Claude ProプランでClaude Codeを使用する方法

## 前提条件
- Claude Proプラン（月額$20）に加入していること
- Claude Codeがインストールされていること

## 切り替え手順（既にAPIで使用している場合）

1. **完全にログアウト**
   ```bash
   claude logout
   ```
   または Claude Code内で `/logout` コマンドを実行

2. **Claude Codeを最新版に更新**
   ```bash
   claude update
   ```

3. **ターミナルを完全に再起動**
   - すべてのターミナルウィンドウを閉じて、新しく開く

4. **Proプランでログイン**
   ```bash
   claude login
   ```
   - プロンプトが表示されたら、claude.aiで使用しているのと同じ認証情報でログイン
   - **重要**: API/Console認証情報は追加しないでください

## 新規セットアップの場合

1. **Claude Codeをインストール**（既にインストール済みの場合はスキップ）
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Proプランでログイン**
   ```bash
   claude
   ```
   - 正しいアカウントタイプ（Pro）を選択
   - claude.aiで使用している認証情報でログイン

## 使用制限について

### Proプラン（$20/月）
- **Claude使用時**: 5時間ごとに約45メッセージ
- **Claude Code使用時**: 5時間ごとに約10-40プロンプト
- **モデルアクセス**: Sonnet 4のみ（Opus 4は使用不可）
- **最適な用途**: 小規模リポジトリ（通常1,000行未満のコード）

## API クレジットを使用しないための設定

ProプランのみでClaude Codeを使用し、API従量課金を避けるには：

1. **使用制限に達した場合**
   - API クレジットオプションが表示されても**拒否**する
   - 使用期間がリセットされるまで待つ（5時間ごと）

2. **使用状況の確認**
   ```bash
   /status
   ```
   Claude Code内でこのコマンドを実行して残り使用量を確認

3. **APIクレジットオプションを完全に無効化**
   - `claude logout` でログアウト
   - `claude login` でProプランの認証情報のみでログイン
   - ログイン時にAPI/Console認証情報は絶対に追加しない

## トラブルシューティング

### ログイン時に正しいアカウントオプションが表示されない場合

1. 完全にログアウト: `/logout`
2. Claude Codeを更新: `claude update`
3. ターミナルを再起動
4. 再度 `claude` を実行してProアカウントを選択

### 使用制限と課金

- **Proプラン内で使用を維持**: APIクレジットオプションを拒否
- **自動リロードの管理**: ConsoleアカウントでAPIクレジットの自動リロードを無効化
- **課金の透明性**: すべてのAPIクレジット使用には明示的な同意が必要

## 参考情報
- [Anthropic公式ヘルプ - Using Claude Code with your Pro or Max Plan](https://support.anthropic.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
- Proプランの詳細: https://claude.ai/upgrade 