"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for responsive media queries
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null for SSR compatibility
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    // Default to false for SSR
    return false
  })

  useEffect(() => {
    // Return early if not in browser environment
    if (typeof window === "undefined") return undefined

    // Create media query list
    const mediaQuery = window.matchMedia(query)

    // Update state based on matches
    const updateMatches = () => setMatches(mediaQuery.matches)

    // Set initial value
    updateMatches()

    // Add event listener for changes
    if (mediaQuery.addEventListener) {
      // Modern browsers
      mediaQuery.addEventListener("change", updateMatches)
      return () => mediaQuery.removeEventListener("change", updateMatches)
    } else {
      // Fallback for older browsers
      // @ts-ignore - For older browsers that don't support addEventListener
      mediaQuery.addListener(updateMatches)
      // @ts-ignore - For older browsers that don't support removeEventListener
      return () => mediaQuery.removeListener(updateMatches)
    }
  }, [query])

  return matches
}

