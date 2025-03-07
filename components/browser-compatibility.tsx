"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

/**
 * BrowserCompatibility component
 * Detects browser compatibility issues and displays warnings
 * Checks for required features and provides fallback information
 */
export function BrowserCompatibility() {
  const [isDismissed, setIsDismissed] = useLocalStorage("compatibility-notice-dismissed", false)
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([])

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    const issues: string[] = []

    // Check for required browser features
    if (!window.requestAnimationFrame) {
      issues.push("Your browser doesn't support smooth animations")
    }

    if (!window.localStorage) {
      issues.push("Your browser doesn't support saving progress")
    }

    if (!window.matchMedia) {
      issues.push("Your browser may have display issues with responsive layouts")
    }

    if (!("IntersectionObserver" in window)) {
      issues.push("Your browser doesn't support lazy loading optimizations")
    }

    // Check for Safari-specific issues
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (isSafari) {
      const safariVersion = Number.parseInt(navigator.userAgent.match(/Version\/(\d+)/)?.[1] || "0", 10)

      if (safariVersion < 14) {
        issues.push("You're using an older version of Safari which may have display issues")
      }
    }

    // Check for Internet Explorer
    const isIE = /MSIE|Trident/.test(navigator.userAgent)
    if (isIE) {
      issues.push("Internet Explorer is not supported. Please use a modern browser")
    }

    setCompatibilityIssues(issues)
  }, [])

  // Don't render anything if no issues or dismissed
  if (isDismissed || compatibilityIssues.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-card border border-border rounded-lg shadow-lg z-50 p-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-card-foreground">Browser Compatibility Notice</h3>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-muted-foreground hover:text-card-foreground"
            aria-label="Dismiss compatibility notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          <p>We've detected some potential compatibility issues:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {compatibilityIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
          <p className="mt-2">
            For the best experience, we recommend using the latest version of Chrome, Firefox, Edge, or Safari.
          </p>
        </div>

        <div className="mt-3 flex justify-end">
          <button onClick={() => setIsDismissed(true)} className="text-xs text-primary hover:underline">
            Continue anyway
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

