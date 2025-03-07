"use client"

import { useState, useEffect, useRef } from "react"

/**
 * Custom hook for lazy loading components when they enter the viewport
 * @param options - IntersectionObserver options
 * @returns [ref, isVisible] - Ref to attach to the container and boolean indicating visibility
 */
export function useLazyLoad(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Return early if SSR or no ref
    if (typeof window === "undefined" || !ref.current) return

    // If IntersectionObserver is not supported, always show the component
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element enters the viewport, set it as visible
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        rootMargin: "100px", // Start loading when within 100px of viewport
        threshold: 0.1, // Trigger when at least 10% is visible
        ...options,
      },
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [options])

  return [ref, isVisible]
}

