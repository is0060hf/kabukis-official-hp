'use client'

import { motion } from 'framer-motion'
import { Music2, Briefcase } from 'lucide-react'
import { cn } from '@/utils/cn'
import { SiteMode } from '@/types'

interface ModeToggleProps {
  mode: SiteMode
  onModeChange: (mode: SiteMode) => void
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="relative flex items-center bg-melody-sky/10 rounded-full p-1">
      <motion.div
        className="absolute inset-y-1 w-1/2 bg-melody-button rounded-full"
        animate={{
          x: mode === 'entertainment' ? 0 : '100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      
      <button
        className={cn(
          'relative z-10 flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200',
          mode === 'entertainment' ? 'text-white' : 'text-gray-600'
        )}
        onClick={() => onModeChange('entertainment')}
      >
        <Music2 className="w-4 h-4" />
        <span className="text-sm font-medium">ファン向け</span>
      </button>
      
      <button
        className={cn(
          'relative z-10 flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200',
          mode === 'business' ? 'text-white' : 'text-gray-600'
        )}
        onClick={() => onModeChange('business')}
      >
        <Briefcase className="w-4 h-4" />
        <span className="text-sm font-medium">事業パートナー向け</span>
      </button>
    </div>
  )
} 