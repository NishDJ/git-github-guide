"use client"

import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAnimation } from "@/contexts/animation-context"
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react"

export function CommitAnimation() {
  const { getDuration, complexity, isEnabled } = useAnimation()
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [isManualMode, setIsManualMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Base animation duration
  const baseDuration = 4
  const animationDuration = getDuration(baseDuration)
  const animationRepeat = isEnabled ? Number.POSITIVE_INFINITY : 0

  // Steps in the animation
  const steps = [
    { name: "Edit files", description: "Make changes to your project files" },
    { name: "Stage changes", description: "Add modified files to the staging area" },
    { name: "Commit changes", description: "Create a permanent snapshot of your changes" },
    { name: "View history", description: "See your new commit in the repository history" },
  ]

  // Handle auto-play animation
  useEffect(() => {
    if (!isManualMode && isPlaying && isEnabled) {
      intervalRef.current = setInterval(
        () => {
          setCurrentStep((prev) => (prev + 1) % steps.length)
        },
        (animationDuration * 1000) / steps.length,
      )
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isManualMode, isPlaying, steps.length, animationDuration, isEnabled])

  // Reset animation
  const resetAnimation = () => {
    setCurrentStep(0)
    if (!isPlaying) setIsPlaying(true)
  }

  // Toggle between auto and manual modes
  const toggleMode = () => {
    setIsManualMode(!isManualMode)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // Go to next step manually
  const goToNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  return (
    <div className="space-y-2">
      <div
        className="h-64 w-full bg-[#282a36] rounded-md overflow-hidden relative"
        aria-label="Interactive animation showing the Git commit process. Files move from the working directory through staging to the repository. The process has three steps: editing files, staging changes with git add, and committing changes with git commit."
      >
        {/* Timeline labels with tooltips */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 left-4 text-xs text-[#6272a4] cursor-help">Step 1: Edit files</div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#bd93f9]">
              <p className="text-xs">Make changes to your project files in your working directory</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-[#6272a4] cursor-help">
                Step 2: Stage changes
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#ff79c6]">
              <p className="text-xs">Use git add to prepare files for committing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-4 text-xs text-[#6272a4] cursor-help">Step 3: Commit changes</div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#50fa7b]">
              <p className="text-xs">Use git commit to save changes permanently</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Progress indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#44475a]">
          <motion.div
            className="h-full bg-[#bd93f9]"
            initial={{ width: "0%" }}
            animate={{
              width: isManualMode ? `${(currentStep / (steps.length - 1)) * 100}%` : ["0%", "100%"],
            }}
            transition={
              isManualMode
                ? { duration: 0.3 }
                : {
                    duration: animationDuration,
                    repeat: animationRepeat,
                    ease: "linear",
                  }
            }
          />
        </div>

        {/* Working directory */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="text-xs text-[#f8f8f2] mb-1">Working Directory</div>
          <div className="w-24 h-24 rounded-md bg-[#44475a] flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <motion.div
              className="w-full h-6 mb-1 rounded bg-[#bd93f9] flex items-center justify-center text-white text-xs"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: isManualMode
                  ? currentStep >= 0
                    ? [0.5, 1, 0.5][Math.min(currentStep, 2)]
                    : 0.5
                  : [0.5, 1, 0.5, 0.5, 0.5],
                scale: isManualMode ? (currentStep === 0 ? 1.05 : 1) : [1, 1.05, 1, 1, 1],
              }}
              transition={{
                duration: animationDuration,
                repeat: isManualMode ? 0 : animationRepeat,
                repeatDelay: 1,
                times: isManualMode ? [0, 0.5, 1] : [0, 0.1, 0.2, 0.6, 1],
                ease: "easeInOut",
              }}
            >
              index.js
            </motion.div>
            <motion.div
              className="w-full h-6 rounded bg-[#bd93f9] flex items-center justify-center text-white text-xs"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: isManualMode
                  ? currentStep >= 1
                    ? [0.5, 1, 0.5][Math.min(currentStep - 1, 2)]
                    : 0.5
                  : [0.5, 0.5, 1, 0.5, 0.5],
                scale: isManualMode ? (currentStep === 1 ? 1.05 : 1) : [1, 1, 1.05, 1, 1],
              }}
              transition={{
                duration: animationDuration,
                repeat: isManualMode ? 0 : animationRepeat,
                repeatDelay: 1,
                times: isManualMode ? [0, 0.5, 1] : [0, 0.1, 0.2, 0.3, 1],
                ease: "easeInOut",
              }}
            >
              app.js
            </motion.div>

            {/* Code editing effect */}
            {complexity === "complex" && (
              <motion.div
                className="absolute inset-0 bg-[#44475a] opacity-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentStep === 0 ? [0, 0.7, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: currentStep === 0 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 1,
                }}
              >
                <div className="text-[#f8f8f2] font-mono text-xs">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.5,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    console.log("Hello");
                  </motion.div>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: "100%",
                      opacity: 1,
                      transition: {
                        delay: 0.8,
                        duration: 1.2,
                      },
                    }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    const greeting = "World";
                  </motion.div>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: "100%",
                      opacity: 1,
                      transition: {
                        delay: 1.6,
                        duration: 1.0,
                      },
                    }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    return greeting;
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Staging area */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="text-xs text-[#f8f8f2] mb-1">Staging Area</div>
          <div className="w-24 h-24 rounded-md bg-[#44475a] flex flex-col items-center justify-center p-2">
            <motion.div
              className="w-full h-6 mb-1 rounded bg-[#ff79c6] flex items-center justify-center text-white text-xs opacity-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isManualMode ? (currentStep >= 1 ? 1 : 0) : [0, 0, 1, 1, 0],
                x: isManualMode ? (currentStep >= 1 ? 0 : -50) : [-50, -50, 0, 0, 0],
              }}
              transition={{
                duration: animationDuration,
                repeat: isManualMode ? 0 : animationRepeat,
                repeatDelay: 1,
                times: isManualMode ? [0, 1] : [0, 0.2, 0.3, 0.5, 0.6],
                ease: "easeInOut",
              }}
            >
              index.js
            </motion.div>
            <motion.div
              className="w-full h-6 rounded bg-[#ff79c6] flex items-center justify-center text-white text-xs opacity-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isManualMode ? (currentStep >= 1 ? 1 : 0) : [0, 0, 0, 1, 0],
                x: isManualMode ? (currentStep >= 1 ? 0 : -50) : [-50, -50, -50, 0, 0],
              }}
              transition={{
                duration: animationDuration,
                repeat: isManualMode ? 0 : animationRepeat,
                repeatDelay: 1,
                times: isManualMode ? [0, 1] : [0, 0.2, 0.3, 0.4, 0.6],
                ease: "easeInOut",
              }}
            >
              app.js
            </motion.div>
          </div>
        </div>

        {/* Repository */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="text-xs text-[#f8f8f2] mb-1">Repository</div>
          <div className="w-24 h-24 rounded-md bg-[#44475a] flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-[#50fa7b] flex items-center justify-center text-white text-xs opacity-0 shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isManualMode ? (currentStep >= 2 ? 1 : 0) : [0, 0, 0, 0, 1],
                scale: isManualMode ? (currentStep >= 2 ? 1 : 0.8) : [0.8, 0.8, 0.8, 0.8, 1],
                rotateY: complexity === "complex" ? [0, 360] : 0,
              }}
              transition={{
                opacity: {
                  duration: animationDuration,
                  repeat: isManualMode ? 0 : animationRepeat,
                  repeatDelay: 1,
                  times: isManualMode ? [0, 1] : [0, 0.2, 0.4, 0.6, 0.7],
                  ease: "easeInOut",
                },
                scale: {
                  duration: animationDuration,
                  repeat: isManualMode ? 0 : animationRepeat,
                  repeatDelay: 1,
                  times: isManualMode ? [0, 1] : [0, 0.2, 0.4, 0.6, 0.7],
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="text-center">
                <div className="font-bold">Commit</div>
                <div className="text-[8px] mt-1">a1b2c3d</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Command annotations */}
        <motion.div
          className="absolute left-[10%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isManualMode ? (currentStep === 0 ? 1 : 0) : [1, 1, 0, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: isManualMode ? 0 : animationRepeat,
            repeatDelay: 1,
            times: isManualMode ? [0, 1] : [0, 0.2, 0.3, 0.6, 1],
          }}
        >
          Edit files
        </motion.div>

        <motion.div
          className="absolute left-[40%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isManualMode ? (currentStep === 1 ? 1 : 0) : [0, 1, 1, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: isManualMode ? 0 : animationRepeat,
            repeatDelay: 1,
            times: isManualMode ? [0, 1] : [0.2, 0.3, 0.5, 0.6, 1],
          }}
        >
          git add .
        </motion.div>

        <motion.div
          className="absolute right-[10%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isManualMode ? (currentStep === 2 ? 1 : 0) : [0, 0, 0, 1, 1],
          }}
          transition={{
            duration: animationDuration,
            repeat: isManualMode ? 0 : animationRepeat,
            repeatDelay: 1,
            times: isManualMode ? [0, 1] : [0, 0.4, 0.6, 0.7, 1],
          }}
        >
          git commit -m "Update files"
        </motion.div>

        {/* Step description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#282a36] px-3 py-1 rounded-md text-xs text-[#f8f8f2] min-w-[200px] text-center"
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].description}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animation controls */}
      <div className="flex items-center justify-between bg-[#282a36] p-2 rounded-md">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-md bg-[#44475a] text-[#f8f8f2] hover:bg-[#6272a4] transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-md bg-[#44475a] text-[#f8f8f2] hover:bg-[#6272a4] transition-colors"
            onClick={resetAnimation}
            aria-label="Reset animation"
          >
            <RotateCcw size={16} />
          </motion.button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#f8f8f2]">{isManualMode ? "Manual" : "Auto"}</span>
          <Switch checked={isManualMode} onCheckedChange={toggleMode} className="data-[state=checked]:bg-[#bd93f9]" />

          {isManualMode && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-md bg-[#bd93f9] text-[#f8f8f2] hover:bg-[#ff79c6] transition-colors"
              onClick={goToNextStep}
              aria-label="Next step"
            >
              <ChevronRight size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

