"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { GithubIcon, ArrowDown } from "lucide-react"
import { useAnimation } from "@/contexts/animation-context"
import { useTheme } from "@/contexts/theme-context"

/**
 * ParallaxHeader component
 * Creates a visually appealing header with parallax scrolling effects
 * Optimized for performance and accessibility
 */
export function ParallaxHeader() {
  const { isEnabled, complexity } = useAnimation()
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false) 
  const [overlayClass, setOverlayClass] = useState("bg-black/30") // Default to ensure consistency

  // Only enable scroll effects after component mounts to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
    // Update overlay class after hydration to match theme
    setOverlayClass(resolvedTheme === "dark" ? "bg-black/30" : "bg-white/10")
  }, [])

  // Update overlay when theme changes after initial render
  useEffect(() => {
    if (isMounted) {
      setOverlayClass(resolvedTheme === "dark" ? "bg-black/30" : "bg-white/10")
    }
  }, [resolvedTheme, isMounted])

  // Use scroll position for parallax effects
  const { scrollY } = useScroll()

  // Transform values based on scroll position
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  // Add spring physics for smoother parallax
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 })

  // SVG path for the animated Git logo
  const gitPath =
    "M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden"
      aria-label="Git and GitHub Visual Guide header with animated background"
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: isMounted && isEnabled ? smoothY : 0,
          scale: isMounted && isEnabled ? scale : 1,
        }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gradient-CiLCsBvbGDi15UczwiyMgmxnHm0VlO.png"
          alt="" // Decorative image
          fill
          className="object-cover"
          priority
          sizes="100vw"
          aria-hidden="true"
        />

        {/* Overlay for better text contrast */}
        <div className={`absolute inset-0 ${overlayClass}`} />
      </motion.div>

      {/* Animated Git logo for complex mode */}
      {complexity === "complex" && isEnabled && isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="absolute opacity-20"
              width={100 + i * 30}
              height={100 + i * 30}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                rotate: Math.random() * 360,
                opacity: 0.1 + Math.random() * 0.2,
              }}
              animate={{
                y: ["-20%", "120%"],
                rotate: [0, 360],
              }}
              transition={{
                y: {
                  duration: 20 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                rotate: {
                  duration: 30 + i * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              <path d={gitPath} fill={i % 2 === 0 ? "#bd93f9" : "#ff79c6"} />
            </motion.svg>
          ))}
        </div>
      )}

      {/* Header content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ opacity: isMounted && isEnabled ? opacity : 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Git & GitHub
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white mt-2 max-w-2xl text-center drop-shadow-lg"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          A Visual Guide for Beginners
        </motion.p>
        <motion.p
          className="text-sm md:text-base text-white mt-2 max-w-2xl text-center drop-shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Learn version control concepts with interactive visualizations and practical examples
        </motion.p>
          
          <motion.p
            className="text-sm md:text-base text-white/80 mt-2 max-w-2xl text-center drop-shadow-lg font-light italic"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          >
            Created by Nishant Jain
          </motion.p>
        <motion.div
          className="flex gap-4 mt-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#282a36] hover:bg-[#44475a] text-white px-6 py-3 rounded-md flex items-center gap-2 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubIcon className="h-5 w-5" />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            href="#content"
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-md transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        aria-hidden="true"
      >
        {/* Arrow animation above mouse */}
        <motion.div 
          className="flex justify-center mb-4"
          initial={{ opacity: 1 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            y: { duration: 1.2, repeat: Number.POSITIVE_INFINITY },
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            initial={{ opacity: 1 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  )
}

