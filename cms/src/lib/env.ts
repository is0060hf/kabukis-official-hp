// 環境変数のバリデーション

type RequiredEnvVars = {
  DATABASE_URL: string
  NEXTAUTH_URL: string
  NEXTAUTH_SECRET: string
}

type OptionalEnvVars = {
  // OAuth
  DISCORD_CLIENT_ID?: string
  DISCORD_CLIENT_SECRET?: string
  GITHUB_CLIENT_ID?: string
  GITHUB_CLIENT_SECRET?: string
  
  // Email
  EMAIL_SERVER?: string
  EMAIL_FROM?: string
  SMTP_HOST?: string
  SMTP_PORT?: string
  SMTP_USER?: string
  SMTP_PASS?: string
  
  // Discord
  DISCORD_WEBHOOK_URL?: string
  
  // Other
  ALLOWED_ORIGINS?: string
  OPENAI_API_KEY?: string
  ENCRYPTION_KEY?: string
  ADMIN_EMAIL?: string
}

export type EnvVars = RequiredEnvVars & OptionalEnvVars

// 環境変数の検証とログ出力
export function validateEnv(): EnvVars {
  const errors: string[] = []
  const warnings: string[] = []

  // 必須環境変数のチェック
  if (!process.env.DATABASE_URL) {
    errors.push('DATABASE_URL is required')
  }
  
  if (!process.env.NEXTAUTH_URL) {
    errors.push('NEXTAUTH_URL is required')
  }
  
  if (!process.env.NEXTAUTH_SECRET) {
    errors.push('NEXTAUTH_SECRET is required')
  }

  // Discord Webhook URLの形式チェック
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      const url = new URL(process.env.DISCORD_WEBHOOK_URL)
      if (url.hostname !== 'discord.com' || !url.pathname.startsWith('/api/webhooks/')) {
        warnings.push('DISCORD_WEBHOOK_URL appears to be invalid format')
      }
    } catch {
      warnings.push('DISCORD_WEBHOOK_URL is not a valid URL')
    }
  }

  // Email設定の整合性チェック
  if (process.env.EMAIL_SERVER) {
    if (!process.env.EMAIL_FROM) {
      warnings.push('EMAIL_FROM should be set when EMAIL_SERVER is configured')
    }
  }

  // SMTP設定の整合性チェック
  if (process.env.SMTP_HOST) {
    if (!process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      warnings.push('SMTP configuration is incomplete (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS all required)')
    }
  }

  // OAuth設定の整合性チェック
  if (process.env.DISCORD_CLIENT_ID && !process.env.DISCORD_CLIENT_SECRET) {
    warnings.push('DISCORD_CLIENT_SECRET is required when DISCORD_CLIENT_ID is set')
  }
  
  if (process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_SECRET) {
    warnings.push('GITHUB_CLIENT_SECRET is required when GITHUB_CLIENT_ID is set')
  }

  // 開発環境の警告
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Running in development mode')
    
    if (process.env.ENCRYPTION_KEY === 'development-encryption-key') {
      warnings.push('Using default ENCRYPTION_KEY - this MUST be changed in production')
    }
  }

  // エラーがある場合は終了
  if (errors.length > 0) {
    console.error('❌ Environment validation failed:')
    errors.forEach(error => console.error(`  - ${error}`))
    process.exit(1)
  }

  // 警告を表示
  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:')
    warnings.forEach(warning => console.warn(`  - ${warning}`))
  }

  // 設定されている機能を表示
  console.log('✅ Environment validated successfully')
  console.log('📋 Configured features:')
  if (process.env.DISCORD_CLIENT_ID) console.log('  - Discord OAuth')
  if (process.env.GITHUB_CLIENT_ID) console.log('  - GitHub OAuth')
  if (process.env.EMAIL_SERVER || process.env.SMTP_HOST) console.log('  - Email notifications')
  if (process.env.DISCORD_WEBHOOK_URL) console.log('  - Discord notifications')

  return {
    // Required
    DATABASE_URL: process.env.DATABASE_URL!,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    
    // Optional
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  }
}

// 開発環境かどうかの判定
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production' 