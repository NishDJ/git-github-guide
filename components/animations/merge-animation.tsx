"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function MergeAnimation() {
  const prefersReducedMotion = useReducedMotion()
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  // Use simpler animations if user prefers reduced motion
  const animationDuration = prefersReducedMotion ? 0 : 5
  const animationRepeat = prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY

  // Manual step control
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const resetAnimation = () => {
    setCurrentStep(0)
  }

  return (
    <div className="space-y-2">
      <div
        className="h-64 w-full bg-[#282a36] rounded-md overflow-hidden relative"
        aria-label="Animation showing Git merge process from feature branch to main branch"
      >
        {/* Timeline labels */}
        <div className="absolute top-2 left-4 text-xs text-[#6272a4]">
          {currentStep === 0
            ? "Step 1: Branches diverged"
            : currentStep === 1
              ? "Step 2: Checkout main"
              : currentStep === 2
                ? "Step 3: Merge feature into main"
                : "Step 4: Merge complete"}
        </div>

        {/* Main branch */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#bd93f9]" />

        {/* Feature branch - starts diverged, then merges */}
        <motion.div
          className="absolute left-[20%] top-1/2 h-[3px] bg-[#ff79c6]"
          initial={{ width: "30%", rotate: 30, y: -20 }}
          animate={{
            width: currentStep < 3 ? "30%" : "0%",
            rotate: currentStep < 3 ? 30 : 0,
            y: currentStep < 3 ? -20 : 0,
          }}
          transition={{
            duration: isPlaying ? 0.5 : 0,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "left" }}
        />

        {/* Initial commits on main */}
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md">
          <span className="text-[8px] font-bold">1</span>
        </div>

        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md">
          <span className="text-[8px] font-bold">2</span>
        </div>

        {/* Feature branch commits */}
        <motion.div
          className="absolute left-[30%] top-[calc(50%-20px)] -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: currentStep === 3 ? 40 : 0,
            y: currentStep === 3 ? 20 : 0,
          }}
          transition={{
            duration: isPlaying ? 0.5 : 0,
            ease: "easeInOut",
          }}
        >
          <span className="text-[8px] font-bold">3</span>
        </motion.div>

        <motion.div
          className="absolute left-[40%] top-[calc(50%-20px)] -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: currentStep === 3 ? 20 : 0,
            y: currentStep === 3 ? 20 : 0,
          }}
          transition={{
            duration: isPlaying ? 0.5 : 0,
            ease: "easeInOut",
          }}
        >
          <span className="text-[8px] font-bold">4</span>
        </motion.div>

        {/* Merge commit appears */}
        <motion.div
          className="absolute left-[60%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#8be9fd] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: currentStep === 3 ? 1 : 0,
            opacity: currentStep === 3 ? 1 : 0,
          }}
          transition={{
            duration: isPlaying ? 0.5 : 0,
            ease: "easeOut",
          }}
          aria-label="Merge commit"
        >
          <span className="text-[8px] font-bold">M</span>
        </motion.div>

        {/* Command annotations */}
        <motion.div
          className="absolute left-[20%] top-[70%] bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentStep === 1 ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          git checkout main
        </motion.div>

        <motion.div
          className="absolute left-[50%] top-[70%] bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentStep === 2 ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          git merge feature
        </motion.div>

        <motion.div
          className="absolute right-[20%] top-[70%] bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentStep === 3 ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          Merge complete
        </motion.div>

        {/* Branch labels */}
        <div className="absolute left-[10%] bottom-4 text-xs text-[#bd93f9] font-medium">main</div>
        <motion.div
          className="absolute left-[40%] top-[30%] text-xs text-[#ff79c6] font-medium"
          initial={{ opacity: 1 }}
          animate={{
            opacity: currentStep < 3 ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          feature
        </motion.div>

        {/* Merge result label */}
        <motion.div
          className="absolute left-[60%] bottom-4 text-xs text-[#8be9fd] font-medium"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentStep === 3 ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          merge commit
        </motion.div>
      </div>

      {/* Interactive controls */}
      <div className="flex justify-between items-center bg-[#282a36] p-2 rounded-md">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="h-8 px-2 text-xs bg-[#44475a] text-[#f8f8f2] hover:bg-[#6272a4] border-[#6272a4]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextStep}
            disabled={currentStep === 3}
            className="h-8 px-2 text-xs bg-[#44475a] text-[#f8f8f2] hover:bg-[#6272a4] border-[#6272a4]"
          >
            Next
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAnimation}
          className="h-8 px-2 text-xs bg-[#44475a] text-[#f8f8f2] hover:bg-[#6272a4] border-[#6272a4]"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

