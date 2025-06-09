import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import LoginForm from '@/components/auth/LoginForm'

export default async function HomePage() {
  const session = await auth()
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cms-text mb-2">
            Kabukis CMS
          </h1>
          <p className="text-cms-text-muted">
            傾奇ユウヤ・猫空あおば 統合管理システム
          </p>
        </div>
        
        <LoginForm />
      </div>
    </main>
  )
} 