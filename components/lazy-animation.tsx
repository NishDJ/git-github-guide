"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useLazyLoad } from "@/hooks/use-lazy-load"

interface LazyAnimationProps {
  children: ReactNode
  height?: number
  className?: string
  fallback?: ReactNode
}

/**
 * LazyAnimation component
 * Lazily loads animations when they enter the viewport
 * Shows a placeholder until the animation is loaded
 */
export function LazyAnimation({ children, height = 250, className = "", fallback }: LazyAnimationProps) {
  const [ref, isVisible] = useLazyLoad()

  return (
    <div ref={ref} className={`relative ${className}`} style={{ minHeight: height }}>
      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#282a36] rounded-md">
          {fallback || (
            <motion.div
              className="text-[#6272a4]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              Loading animation...
            </motion.div>
          )}
        </div>
      )}

      {isVisible && children}
    </div>
  )
}

