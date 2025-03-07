"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for debouncing values
 * Useful for search inputs and other frequently changing values
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up timeout to update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up timeout on value change or unmount
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

