'use client'

import { motion } from 'framer-motion'

interface MusicVisualizerProps {
  isPlaying?: boolean
  className?: string
}

export default function MusicVisualizer({ isPlaying = true, className = '' }: MusicVisualizerProps) {
  const bars = Array.from({ length: 5 }, (_, i) => i)
  
  return (
    <div className={`flex items-end gap-1 h-8 ${className}`}>
      {bars.map((index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-melody-purple to-melody-sky rounded-full"
          animate={
            isPlaying
              ? {
                  height: ['20%', '100%', '50%', '80%', '20%'],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                  },
                }
              : { height: '20%' }
          }
        />
      ))}
    </div>
  )
} 