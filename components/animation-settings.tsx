"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, X, Sliders } from "lucide-react"
import { useAnimation } from "@/contexts/animation-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AnimationSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const { speed, setSpeed, complexity, setComplexity, isEnabled, setIsEnabled, prefersReducedMotion } = useAnimation()

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-[#bd93f9] text-white shadow-lg hover:bg-[#ff79c6] transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Animation settings"
      >
        <Sliders className="h-5 w-5" />
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#282a36] rounded-lg shadow-xl max-w-md w-full p-6 relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#6272a4] hover:text-[#f8f8f2] transition-colors"
              aria-label="Close settings"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-[#bd93f9]" />
              <h2 className="text-xl font-bold text-[#f8f8f2]">Animation Settings</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations-toggle" className="text-[#f8f8f2]">
                  Enable animations
                </Label>
                <Switch
                  id="animations-toggle"
                  checked={isEnabled}
                  onCheckedChange={setIsEnabled}
                  disabled={prefersReducedMotion}
                />
              </div>

              {prefersReducedMotion && (
                <div className="text-sm text-[#ff5555] bg-[#ff5555]/10 p-3 rounded-md">
                  Reduced motion is enabled in your system preferences. Animations will be minimized.
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-[#f8f8f2]">Animation Speed</Label>
                <RadioGroup
                  value={speed}
                  onValueChange={(value) => setSpeed(value as any)}
                  className="flex space-x-2"
                  disabled={!isEnabled || prefersReducedMotion}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="slow" id="speed-slow" className="text-[#bd93f9]" />
                    <Label htmlFor="speed-slow" className="text-[#f8f8f2]">
                      Slow
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="normal" id="speed-normal" className="text-[#bd93f9]" />
                    <Label htmlFor="speed-normal" className="text-[#f8f8f2]">
                      Normal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="fast" id="speed-fast" className="text-[#bd93f9]" />
                    <Label htmlFor="speed-fast" className="text-[#f8f8f2]">
                      Fast
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-[#f8f8f2]">Visual Complexity</Label>
                <RadioGroup
                  value={complexity}
                  onValueChange={(value) => setComplexity(value as any)}
                  className="flex space-x-2"
                  disabled={!isEnabled || prefersReducedMotion}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="simple" id="complexity-simple" className="text-[#bd93f9]" />
                    <Label htmlFor="complexity-simple" className="text-[#f8f8f2]">
                      Simple
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="normal" id="complexity-normal" className="text-[#bd93f9]" />
                    <Label htmlFor="complexity-normal" className="text-[#f8f8f2]">
                      Normal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="complex" id="complexity-complex" className="text-[#bd93f9]" />
                    <Label htmlFor="complexity-complex" className="text-[#f8f8f2]">
                      Complex
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <motion.button
              className="mt-6 w-full py-2 bg-[#bd93f9] text-white rounded-md font-medium hover:bg-[#ff79c6] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(false)}
            >
              Save Settings
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  )
}

