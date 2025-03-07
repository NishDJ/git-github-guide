"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useReducedMotion } from "framer-motion"

type AnimationSpeed = "slow" | "normal" | "fast"
type AnimationComplexity = "simple" | "normal" | "complex"

interface AnimationContextType {
  speed: AnimationSpeed
  setSpeed: (speed: AnimationSpeed) => void
  complexity: AnimationComplexity
  setComplexity: (complexity: AnimationComplexity) => void
  prefersReducedMotion: boolean
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
  getDuration: (baseDuration: number) => number
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [speed, setSpeed] = useState<AnimationSpeed>("slow")
  const [complexity, setComplexity] = useState<AnimationComplexity>("complex")
  const [isEnabled, setIsEnabled] = useState(true)

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSpeed = localStorage.getItem("animationSpeed") as AnimationSpeed
      const savedComplexity = localStorage.getItem("animationComplexity") as AnimationComplexity
      const savedEnabled = localStorage.getItem("animationsEnabled")

      if (savedSpeed) setSpeed(savedSpeed)
      if (savedComplexity) setComplexity(savedComplexity)
      if (savedEnabled !== null) setIsEnabled(savedEnabled === "true")
    }
  }, [])

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("animationSpeed", speed)
      localStorage.setItem("animationComplexity", complexity)
      localStorage.setItem("animationsEnabled", isEnabled.toString())
    }
  }, [speed, complexity, isEnabled])

  // Calculate duration based on speed setting
  const getDuration = (baseDuration: number): number => {
    if (prefersReducedMotion || !isEnabled) return 0

    const speedMultiplier = {
      slow: 1.5,
      normal: 1,
      fast: 0.6,
    }

    return baseDuration * speedMultiplier[speed]
  }

  return (
    <AnimationContext.Provider
      value={{
        speed,
        setSpeed,
        complexity,
        setComplexity,
        prefersReducedMotion: !!prefersReducedMotion,
        isEnabled,
        setIsEnabled,
        getDuration,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider")
  }
  return context
}

