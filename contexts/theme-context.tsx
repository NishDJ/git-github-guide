"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

type Theme = "dark" | "light" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * ThemeProvider component that manages application theme state
 * Supports dark, light, and system preference modes
 * Persists theme preference in localStorage
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get initial theme from localStorage or default to system
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme
      return savedTheme || "system"
    }
    return "system"
  })

  // Check system preference
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  // Determine the actual theme based on system preference if needed
  const resolvedTheme = theme === "system" ? (prefersDark ? "dark" : "light") : theme

  // Update theme in localStorage and apply to document
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  // Apply theme class to document element
  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme classes
    root.classList.remove("light", "dark")

    // Add current theme class
    root.classList.add(resolvedTheme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", resolvedTheme === "dark" ? "#252630" : "#ffffff")
    }
  }, [resolvedTheme])

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>
}

/**
 * Hook to access theme context
 * @returns ThemeContextType object with theme state and controls
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

