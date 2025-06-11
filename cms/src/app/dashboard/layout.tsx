import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { GlobalLiveRegion } from '@/components/common/LiveRegion'
import PageFocusWrapper from '@/components/layout/PageFocusWrapper'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex h-screen bg-cms-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={session?.user} />
        <main id="main-content" className="flex-1 overflow-y-auto p-6">
          <GlobalLiveRegion />
          <PageFocusWrapper>
            {children}
          </PageFocusWrapper>
        </main>
      </div>
    </div>
  )
} 