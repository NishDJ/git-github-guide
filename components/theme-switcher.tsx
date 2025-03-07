"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"
import { Sun, Moon, Monitor } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

/**
 * ThemeSwitcher component
 * Allows users to toggle between light, dark, and system themes
 * Includes animations and accessibility features
 */
export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return placeholder with same dimensions to prevent layout shift
    return <div className="w-9 h-9" aria-hidden="true" />
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 left-4 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="p-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Cycle through themes: dark -> light -> system -> dark
                const nextTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark"
                setTheme(nextTheme)
              }}
              aria-label={`Current theme: ${theme}. Click to switch theme.`}
            >
              {theme === "dark" && <Moon className="h-5 w-5" />}
              {theme === "light" && <Sun className="h-5 w-5" />}
              {theme === "system" && <Monitor className="h-5 w-5" />}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>
              Current theme: {theme}
              <br />
              Click to switch
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

