'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { cardHover } from '@/utils/animations'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  as?: 'div' | 'article' | 'section'
}

export default function Card({ 
  children, 
  className, 
  hover = true,
  onClick,
  as: Component = 'div' 
}: CardProps) {
  const CardWrapper = onClick ? motion[Component] : Component

  if (onClick) {
    return (
      <CardWrapper
        className={cn(
          'glass-card rounded-xl p-6 transition-all duration-300',
          hover && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        variants={hover ? cardHover : undefined}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        {children}
      </CardWrapper>
    )
  }

  return (
    <Component
      className={cn(
        'glass-card rounded-xl p-6',
        className
      )}
    >
      {children}
    </Component>
  )
} 