'use client'

import { motion } from 'framer-motion'
import { Music } from 'lucide-react'

interface MusicNotesProps {
  count?: number
  className?: string
}

export default function MusicNotes({ count = 3, className = '' }: MusicNotesProps) {
  const notes = Array.from({ length: count }, (_, i) => i)
  
  return (
    <div className={`relative ${className}`}>
      {notes.map((index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, y: 0, x: index * 30 - 30 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-10, -40, -70, -100],
            x: [index * 30 - 30, index * 35 - 35, index * 40 - 40, index * 45 - 45],
            rotate: [0, -15, 15, -15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.8,
            ease: 'easeOut',
          }}
        >
          <Music className={`w-6 h-6 ${index % 2 === 0 ? 'text-melody-purple' : 'text-melody-sky'}`} />
        </motion.div>
      ))}
      {notes.map((index) => (
        <motion.div
          key={`note2-${index}`}
          className="absolute text-2xl"
          initial={{ opacity: 0, y: 0, x: index * 25 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: [-5, -35, -65, -95],
            x: [index * 25, index * 30, index * 35, index * 40],
            rotate: [0, 10, -10, 10],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: index * 0.6 + 2,
            ease: 'easeOut',
          }}
        >
          <span className={index % 2 === 0 ? 'text-melody-purple' : 'text-melody-pink'}>♪</span>
        </motion.div>
      ))}
    </div>
  )
} 