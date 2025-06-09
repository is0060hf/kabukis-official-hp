'use client'

import { signIn } from 'next-auth/react'
import { Github, MessageCircle } from 'lucide-react'

export default function LoginForm() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">ログイン</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
          className="btn-primary w-full flex items-center justify-center gap-2"
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
      </div>
    </div>
  )
} 