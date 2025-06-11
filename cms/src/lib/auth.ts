import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

const isDevelopment = process.env.NODE_ENV === 'development'

export const { handlers, auth, signIn, signOut } = NextAuth({
  // 開発環境でデータベース接続が失敗してもアプリが起動するように
  adapter: isDevelopment ? undefined : PrismaAdapter(prisma),
  providers: [
    // 開発環境用のテスト認証
    ...(isDevelopment
      ? [
          Credentials({
            name: "開発用ログイン",
            credentials: {
              email: { label: "メール", type: "email", placeholder: "test@example.com" },
              password: { label: "パスワード", type: "password", placeholder: "test" },
            },
            async authorize(credentials) {
              // 開発環境では固定のテストユーザーを返す
              if (
                credentials?.email === "test@example.com" &&
                credentials?.password === "test"
              ) {
                return {
                  id: "test-user-id",
                  email: "test@example.com",
                  name: "テストユーザー",
                  image: null,
                }
              }
              return null
            },
          }),
        ]
      : []),
    ...(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET
      ? [
          Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        
        // データベース接続時のみプロファイル情報を追加
        if (!isDevelopment) {
          try {
            const profile = await prisma.userProfile.findUnique({
              where: { userId: token.sub },
            })
            
            if (profile) {
              session.user.isAdmin = profile.isAdmin
              session.user.preferredCharacter = profile.preferredCharacter
            }
          } catch (error) {
            console.error('Failed to fetch user profile:', error)
            // セッションは続行するが、プロファイル情報はデフォルト値を設定
            session.user.isAdmin = false
            session.user.preferredCharacter = undefined
          }
        } else {
          // 開発環境ではダミーの管理者権限を付与
          session.user.isAdmin = true
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  // NEXTAUTH_SECRETは開発環境・本番環境共通で必須
  secret: process.env.NEXTAUTH_SECRET,
})

// 型定義の拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isAdmin?: boolean
      preferredCharacter?: string
    } & DefaultSession["user"]
  }
} 