"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAnimation } from "@/contexts/animation-context"

export function RebaseAnimation() {
  const { complexity, isEnabled } = useAnimation()
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 4

  // Step descriptions
  const stepDescriptions = [
    "Initial state: feature branch diverged from main",
    "Step 1: New commits added to main",
    "Step 2: Checkout feature branch and start rebase",
    "Step 3: Feature commits replayed on top of main",
  ]

  // Command for each step
  const stepCommands = [
    "",
    "git checkout main && git pull",
    "git checkout feature && git rebase main",
    "git rebase --continue",
  ]

  // Handle step navigation
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
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
        className="h-72 w-full bg-[#282a36] rounded-md overflow-hidden relative"
        aria-label="Animation showing Git rebase process"
      >
        {/* Step indicator */}
        <div className="absolute top-2 left-4 right-4 flex justify-between">
          <div className="text-xs text-[#6272a4]">{stepDescriptions[currentStep]}</div>
          <div className="text-xs text-[#6272a4]">
            Step {currentStep} of {totalSteps - 1}
          </div>
        </div>

        {/* Main branch - always visible */}
        <div className="absolute left-0 right-0 top-[40%] h-[3px] bg-[#bd93f9]" />

        {/* Feature branch - changes position based on step */}
        <motion.div
          className="absolute h-[3px] bg-[#ff79c6]"
          initial={{ left: "20%", top: "60%", width: "40%" }}
          animate={{
            left: currentStep < 3 ? "20%" : "40%",
            top: currentStep < 3 ? "60%" : "40%",
            width: currentStep < 3 ? "40%" : "40%",
          }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Connection line during rebase */}
        {currentStep >= 2 && (
          <motion.div
            className="absolute left-[20%] h-[3px] bg-[#ff79c6]"
            initial={{ top: "60%", width: "0%" }}
            animate={{
              top: currentStep === 2 ? ["60%", "50%", "40%"] : "40%",
              width: currentStep === 2 ? ["0%", "10%", "20%"] : "20%",
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.5, 1],
            }}
          />
        )}

        {/* Main branch commits */}
        <div className="absolute left-[10%] top-[40%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md">
          <span className="text-[8px] font-bold">1</span>
        </div>

        <div className="absolute left-[20%] top-[40%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md">
          <span className="text-[8px] font-bold">2</span>
        </div>

        {/* New commits on main (appear in step 1) */}
        <motion.div
          className="absolute left-[30%] top-[40%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: currentStep >= 1 ? 1 : 0,
            opacity: currentStep >= 1 ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[8px] font-bold">3</span>
        </motion.div>

        <motion.div
          className="absolute left-[40%] top-[40%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: currentStep >= 1 ? 1 : 0,
            opacity: currentStep >= 1 ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-[8px] font-bold">4</span>
        </motion.div>

        {/* Feature branch commits - move during rebase */}
        <motion.div
          className="absolute -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ left: "30%", top: "60%" }}
          animate={{
            left: currentStep < 3 ? "30%" : "50%",
            top: currentStep < 3 ? "60%" : "40%",
            x: currentStep === 2 ? [0, 10, 20] : 0,
            y: currentStep === 2 ? [0, -10, -20] : 0,
          }}
          transition={{
            duration: 0.5,
            times: [0, 0.5, 1],
          }}
        >
          <span className="text-[8px] font-bold">A</span>
        </motion.div>

        <motion.div
          className="absolute -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ left: "40%", top: "60%" }}
          animate={{
            left: currentStep < 3 ? "40%" : "60%",
            top: currentStep < 3 ? "60%" : "40%",
            x: currentStep === 2 ? [0, 10, 20] : 0,
            y: currentStep === 2 ? [0, -10, -20] : 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            times: [0, 0.5, 1],
          }}
        >
          <span className="text-[8px] font-bold">B</span>
        </motion.div>

        <motion.div
          className="absolute -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md"
          initial={{ left: "50%", top: "60%" }}
          animate={{
            left: currentStep < 3 ? "50%" : "70%",
            top: currentStep < 3 ? "60%" : "40%",
            x: currentStep === 2 ? [0, 10, 20] : 0,
            y: currentStep === 2 ? [0, -10, -20] : 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            times: [0, 0.5, 1],
          }}
        >
          <span className="text-[8px] font-bold">C</span>
        </motion.div>

        {/* Branch labels */}
        <div className="absolute left-[10%] top-[30%] text-xs text-[#bd93f9] font-medium">main</div>
        <motion.div
          className="absolute text-xs text-[#ff79c6] font-medium"
          initial={{ left: "20%", top: "70%" }}
          animate={{
            left: currentStep < 3 ? "20%" : "40%",
            top: currentStep < 3 ? "70%" : "30%",
          }}
          transition={{ duration: 0.5 }}
        >
          feature
        </motion.div>

        {/* Command display */}
        {stepCommands[currentStep] && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#44475a] px-3 py-1.5 rounded-md text-xs text-[#f8f8f2]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentStep}
            transition={{ duration: 0.3 }}
          >
            <code>{stepCommands[currentStep]}</code>
          </motion.div>
        )}

        {/* Explanation for complex mode */}
        {complexity === "complex" && currentStep === 3 && (
          <motion.div
            className="absolute top-16 right-4 w-48 bg-[#44475a]/80 p-2 rounded-md text-xs text-[#f8f8f2]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-semibold text-[#ff79c6] mb-1">Rebase vs Merge:</p>
            <p>Rebase creates a linear history by replaying your commits on top of the target branch.</p>
            <p className="mt-1">This creates a cleaner history but rewrites commits.</p>
          </motion.div>
        )}
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
            disabled={currentStep === totalSteps - 1}
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

