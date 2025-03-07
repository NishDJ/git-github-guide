"use client"

import { useEffect, type RefObject } from "react"

/**
 * Hook that handles clicks outside of the specified element
 *
 * @param ref - Reference to the element to detect clicks outside of
 * @param handler - Callback function to execute when a click outside occurs
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    // Early return if no ref or handler
    if (!ref.current || !handler) return

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    // Add event listeners
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    // Clean up event listeners
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

