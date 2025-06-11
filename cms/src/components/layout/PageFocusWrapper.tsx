'use client'

import { usePageFocus } from '@/hooks/usePageFocus'

interface PageFocusWrapperProps {
  children: React.ReactNode
}

export default function PageFocusWrapper({ children }: PageFocusWrapperProps) {
  usePageFocus()
  
  return <>{children}</>
} 