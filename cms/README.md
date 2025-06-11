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

### Prismaエラーの対処法

#### P1001: Can't reach database server
- データベースサーバーが起動していることを確認
- `DATABASE_URL`の接続情報（ホスト、ポート）が正しいか確認
- ファイアウォールやネットワーク設定を確認

#### P1002: The database server was reached but timed out
- データベースサーバーの負荷を確認
- 接続タイムアウトを延長: `?connect_timeout=30`をURLに追加

#### P2002: Unique constraint failed
- 重複するデータがないか確認
- 必要に応じてデータを削除または更新

#### P2025: Record to update not found
- 更新対象のレコードが存在することを確認
- IDが正しいか確認

#### Prismaクライアントが見つからない
```bash
# Prismaクライアントを再生成
npx prisma generate

# node_modulesを再インストール
rm -rf node_modules package-lock.json
npm install
```

### 認証エラー

1. `NEXTAUTH_SECRET`が設定されているか確認
2. `NEXTAUTH_URL`が正しいポート（3002）を指定しているか確認

### 環境変数エラー

起動時に環境変数の検証エラーが表示される場合：

1. `.env.local`ファイルが存在することを確認
2. 必須環境変数が設定されているか確認:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
3. 環境変数の形式が正しいか確認（特にURLの形式）

## 開発時の注意事項

- 初回起動時はデータベースが空のため、ダッシュボードに表示されるデータはありません
- OAuth認証（Discord/GitHub）を使用する場合は、各プロバイダーでアプリを登録し、クライアントID/シークレットを取得してください
- メール通知とDiscord Webhook通知は、環境変数が設定されていない場合はスキップされます 