'use client'

import { signIn } from 'next-auth/react'
import { Github, MessageCircle, UserCircle } from 'lucide-react'

const isDevelopment = process.env.NODE_ENV === 'development'

export default function LoginForm() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">ログイン</h2>
      
      <div className="space-y-4">
        {isDevelopment && (
          <button
            onClick={() => signIn('credentials', { 
              callbackUrl: '/dashboard',
              email: 'test@example.com',
              password: 'test'
            })}
            className="btn-primary w-full flex items-center justify-center gap-2"
            aria-label="開発用ログイン"
          >
            <UserCircle className="w-5 h-5" aria-hidden="true" />
            開発用ログイン（test@example.com / test）
          </button>
        )}
        
        <button
          onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
          className="btn-outline w-full flex items-center justify-center gap-2"
          aria-label="Discordでログイン"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Discordでログイン
        </button>
        
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="btn-outline w-full flex items-center justify-center gap-2"
          aria-label="GitHubでログイン"
        >
          <Github className="w-5 h-5" aria-hidden="true" />
          GitHubでログイン
        </button>
      </div>
      
      <div className="mt-6 text-sm text-cms-text-muted text-center">
        <p>管理者権限を持つアカウントでログインしてください</p>
        {isDevelopment && (
          <p className="mt-2 text-yellow-500">
            開発環境：テスト用アカウントでログインできます
          </p>
        )}
      </div>
    </div>
  )
} 