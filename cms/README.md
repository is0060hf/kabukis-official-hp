# Kabukis CMS

傾奇ユウヤ・猫空あおば 統合管理システム

## 開発環境のセットアップ

### 1. 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local`ファイルを編集して、必要な環境変数を設定してください。

### 2. データベースのセットアップ

#### オプション1: Docker Composeを使用（推奨）

```bash
# PostgreSQLを起動
docker-compose up -d

# データベースのマイグレーション
npx prisma db push
```

#### オプション2: ローカルのPostgreSQLを使用

1. PostgreSQL 15以上をインストール（Alpine Linuxベースを推奨）
2. データベースを作成: `kabukis_cms`
3. `.env.local`の`DATABASE_URL`を適切に設定

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3002 でアクセスできます。

## トラブルシューティング

### データベース接続エラー

1. PostgreSQLが起動しているか確認
   ```bash
   docker-compose ps
   ```

2. データベースが作成されているか確認
   ```bash
   docker-compose exec postgres psql -U postgres -c "\l"
   ```

3. Prismaクライアントを再生成
   ```bash
   npx prisma generate
   ```

### 認証エラー

1. `NEXTAUTH_SECRET`が設定されているか確認
2. `NEXTAUTH_URL`が正しいポート（3002）を指定しているか確認

## 開発時の注意事項

- 初回起動時はデータベースが空のため、ダッシュボードに表示されるデータはありません
- OAuth認証（Discord/GitHub）を使用する場合は、各プロバイダーでアプリを登録し、クライアントID/シークレットを取得してください
- メール通知とDiscord Webhook通知は、環境変数が設定されていない場合はスキップされます 