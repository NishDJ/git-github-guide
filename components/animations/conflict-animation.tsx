"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

export function ConflictAnimation() {
  const prefersReducedMotion = useReducedMotion()

  // Use simpler animations if user prefers reduced motion
  const animationDuration = prefersReducedMotion ? 0 : 6
  const animationRepeat = prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY

  return (
    <div
      className="h-64 w-full bg-[#282a36] rounded-md overflow-hidden relative"
      aria-label="Animation showing Git merge conflict resolution process"
    >
      {/* Timeline labels */}
      <div className="absolute top-2 left-4 text-xs text-[#6272a4]">Step 1: Conflict detected</div>
      <div className="absolute top-2 right-4 text-xs text-[#6272a4]">Step 2: Resolve & commit</div>

      {/* Branch visualization */}
      <div className="absolute left-0 w-full top-12 h-8">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#bd93f9]" />
        <motion.div
          className="absolute left-[20%] top-1/2 w-[30%] h-[2px] bg-[#ff79c6]"
          initial={{ rotate: -20, y: -10, transformOrigin: "left" }}
          animate={{
            rotate: [-20, -20, -20, 0],
            y: [-10, -10, -10, 0],
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.5, 0.7, 0.8],
            ease: "easeInOut",
          }}
        />

        {/* Branch labels */}
        <div className="absolute left-[10%] top-[calc(50%+8px)] text-xs text-[#bd93f9]">main</div>
        <motion.div
          className="absolute left-[35%] top-[calc(50%-18px)] text-xs text-[#ff79c6]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.5, 0.7, 0.8],
            ease: "easeInOut",
          }}
        >
          feature
        </motion.div>
      </div>

      {/* File content */}
      <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#44475a] rounded-md p-2 overflow-hidden">
        {/* Original file */}
        <motion.div
          className="text-xs font-mono text-[#f8f8f2]"
          initial={{ opacity: prefersReducedMotion ? 0 : 1 }}
          animate={{
            opacity: [1, 0, 0, 0, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.1, 0.2, 0.6, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          <div className="bg-[#282a36] p-1 rounded-sm">
            <span>// greeting.js</span>
          </div>
          <div className="mt-1">
            function greeting() {"{"}
            <br />
            &nbsp;&nbsp;return "Hello, user!";
            <br />
            {"}"}
          </div>
        </motion.div>

        {/* Conflict markers */}
        <motion.div
          className="absolute left-0 top-0 w-full h-full p-2 text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0.1, 0.2, 0.4, 0.6, 0.7, 1],
            ease: "easeInOut",
          }}
        >
          <div className="bg-[#282a36] p-1 rounded-sm">
            <span>// greeting.js (CONFLICT)</span>
          </div>
          <div className="mt-1">
            function greeting() {"{"}
            <br />
            <div className="bg-[#ff5555] bg-opacity-30 p-1 rounded-sm my-1">
              <span>{"<<<<<<< HEAD"}</span>
              <br />
              <span>&nbsp;&nbsp;return "Hello, user!";</span>
              <br />
              <span>{"======="}</span>
              <br />
              <span>&nbsp;&nbsp;return "Hello, world!";</span>
              <br />
              <span>{">>>>>>> feature"}</span>
            </div>
            {"}"}
          </div>
        </motion.div>

        {/* Manual resolution */}
        <motion.div
          className="absolute left-0 top-0 w-full h-full p-2 text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0, 0, 1, 1],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.4, 0.5, 0.7, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          <div className="bg-[#282a36] p-1 rounded-sm">
            <span>// greeting.js (RESOLVED)</span>
          </div>
          <div className="mt-1">
            function greeting() {"{"}
            <br />
            <div className="bg-[#50fa7b] bg-opacity-20 p-1 rounded-sm my-1">
              <span>&nbsp;&nbsp;return "Hello, wonderful world!";</span>
            </div>
            {"}"}
          </div>
        </motion.div>
      </div>

      {/* Command annotations */}
      <motion.div
        className="absolute left-[20%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#ff5555]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.2, 0.4, 0.5, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        CONFLICT: Merge conflict in greeting.js
      </motion.div>

      <motion.div
        className="absolute left-[40%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0, 1, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.4, 0.5, 0.6, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        Edit file to resolve conflict
      </motion.div>

      <motion.div
        className="absolute right-[20%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#50fa7b]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0, 0, 1, 1],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.4, 0.6, 0.7, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        git add . && git commit
      </motion.div>
    </div>
  )
}

