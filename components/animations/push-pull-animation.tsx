"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

export function PushPullAnimation() {
  const prefersReducedMotion = useReducedMotion()

  // Use simpler animations if user prefers reduced motion
  const animationDuration = prefersReducedMotion ? 0 : 6
  const animationRepeat = prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY

  return (
    <div
      className="h-64 w-full bg-[#282a36] rounded-md overflow-hidden relative"
      aria-label="Animation showing Git push and pull operations between local and remote repositories"
    >
      {/* Timeline labels */}
      <div className="absolute top-2 left-4 text-xs text-[#6272a4]">Step 1: Push changes</div>
      <div className="absolute top-2 right-4 text-xs text-[#6272a4]">Step 2: Pull updates</div>

      {/* Local repository */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="text-xs text-[#f8f8f2] mb-1">Local Repository</div>
        <div className="w-32 h-32 rounded-md bg-[#44475a] flex flex-col items-center justify-center p-2 relative">
          {/* Local commits */}
          <motion.div
            className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#bd93f9] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            1
          </motion.div>
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#bd93f9] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            2
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-[#bd93f9] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            3
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#50fa7b] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0, 0, 1, 1],
            }}
            transition={{
              duration: animationDuration,
              repeat: animationRepeat,
              repeatDelay: 1,
              times: [0, 0.5, 0.6, 0.7, 0.8, 1],
              ease: "easeInOut",
            }}
          >
            5
          </motion.div>
        </div>
      </div>

      {/* Remote repository */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="text-xs text-[#f8f8f2] mb-1">Remote Repository</div>
        <div className="w-32 h-32 rounded-md bg-[#44475a] flex flex-col items-center justify-center p-2 relative">
          {/* Remote commits */}
          <motion.div
            className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#50fa7b] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            1
          </motion.div>
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#50fa7b] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            2
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-[#bd93f9] flex items-center justify-center text-white text-xs opacity-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 1, 1, 1],
            }}
            transition={{
              duration: animationDuration,
              repeat: animationRepeat,
              repeatDelay: 1,
              times: [0, 0.3, 0.4, 0.5, 0.8, 1],
              ease: "easeInOut",
            }}
          >
            3
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#ff79c6] flex items-center justify-center text-white text-xs"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0, 0, 0, 1],
            }}
            transition={{
              duration: animationDuration,
              repeat: animationRepeat,
              repeatDelay: 1,
              times: [0, 0.3, 0.4, 0.5, 0.6, 0.7],
              ease: "easeInOut",
            }}
          >
            4
          </motion.div>
        </div>
      </div>

      {/* Push animation */}
      <motion.div
        className="absolute left-[140px] top-[calc(50%-15px)] -translate-y-1/2 h-[3px] bg-[#ff79c6]"
        initial={{ width: 0 }}
        animate={{
          width: [0, "calc(100% - 280px)", 0, 0, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.3, 0.4, 0.6, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="absolute right-0 top-0 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[#ff79c6] rotate-45"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 0, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.3, 0.4, 0.6, 0.8, 1],
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Pull animation */}
      <motion.div
        className="absolute right-[140px] top-[calc(50%+15px)] -translate-y-1/2 h-[3px] bg-[#8be9fd]"
        initial={{ width: 0 }}
        animate={{
          width: [0, 0, 0, "calc(100% - 280px)", 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.4, 0.5, 0.7, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "right" }}
      >
        <motion.div
          className="absolute left-0 top-0 -translate-y-1/2 w-3 h-3 border-t-2 border-l-2 border-[#8be9fd] -rotate-45"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0, 1, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.4, 0.5, 0.7, 0.8, 1],
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Command annotations */}
      <motion.div
        className="absolute left-1/2 top-[calc(50%-25px)] -translate-x-1/2 bg-[#44475a] px-2 py-1 rounded text-xs text-[#ff79c6]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0, 0, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.3, 0.4, 0.6, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        git push origin main
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[calc(50%+25px)] -translate-x-1/2 bg-[#44475a] px-2 py-1 rounded text-xs text-[#8be9fd]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0, 1, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.4, 0.5, 0.7, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        git pull origin main
      </motion.div>
    </div>
  )
}

