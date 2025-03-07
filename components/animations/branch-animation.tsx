"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useAnimation } from "@/contexts/animation-context"
import { GitBranch, GitCommit, GitMerge } from "lucide-react"

export function BranchAnimation() {
  const { getDuration, complexity, isEnabled } = useAnimation()
  const [isDragging, setIsDragging] = useState(false)
  const [activeBranch, setActiveBranch] = useState<"main" | "feature">("main")
  const [commitPositions, setCommitPositions] = useState({
    main1: { x: 20, y: 50 },
    main2: { x: 40, y: 50 },
    feature1: { x: 60, y: 30 },
    feature2: { x: 80, y: 30 },
  })

  // Base animation duration
  const baseDuration = 4
  const animationDuration = getDuration(baseDuration)
  const animationRepeat = isEnabled ? Number.POSITIVE_INFINITY : 0

  // For interactive branch angle
  const branchAngle = useMotionValue(-30)
  const springBranchAngle = useSpring(branchAngle, { stiffness: 300, damping: 30 })

  // For interactive commit dragging (if complexity is complex)
  const dragCommitRef = useRef<null | "feature1" | "feature2">(null)

  // Handle branch click
  const handleBranchClick = (branch: "main" | "feature") => {
    setActiveBranch(branch)
  }

  // Handle branch angle change
  const handleBranchAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    branchAngle.set(Number(event.target.value))
  }

  // Handle commit drag (for complex mode)
  const handleCommitDragStart = (commit: "feature1" | "feature2") => {
    if (complexity === "complex") {
      dragCommitRef.current = commit
      setIsDragging(true)
    }
  }

  const handleCommitDragEnd = () => {
    dragCommitRef.current = null
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && dragCommitRef.current && complexity === "complex") {
      const commit = dragCommitRef.current
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      // Constrain to reasonable values
      const constrainedX = Math.max(40, Math.min(90, x))
      const constrainedY = Math.max(10, Math.min(40, y))

      setCommitPositions((prev) => ({
        ...prev,
        [commit]: { x: constrainedX, y: constrainedY },
      }))
    }
  }

  return (
    <div
      className="h-80 w-full bg-[#282a36] rounded-md overflow-hidden relative"
      aria-label="Interactive animation demonstrating Git branching. Shows how a feature branch is created from the main branch, commits are added to the feature branch, and work continues on both branches independently. Includes visual representation of git checkout -b feature and git commit commands."
      onMouseMove={handleMouseMove}
      onMouseUp={handleCommitDragEnd}
      onMouseLeave={handleCommitDragEnd}
    >
      {/* Timeline labels */}
      <div className="absolute top-2 left-4 text-xs text-[#6272a4]">Step 1: Create branch</div>
      <div className="absolute top-2 left-1/3 text-xs text-[#6272a4]">Step 2: Add commits</div>
      <div className="absolute top-2 right-4 text-xs text-[#6272a4]">Step 3: Continue work</div>

      {/* Main branch */}
      <motion.div
        className={`absolute left-0 right-0 top-1/2 h-[3px] ${activeBranch === "main" ? "bg-[#ff79c6]" : "bg-[#bd93f9]"}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        onClick={() => handleBranchClick("main")}
        whileHover={{ height: "4px" }}
      />

      {/* Feature branch - grows in animation and can be interactively angled */}
      <motion.div
        className={`absolute left-[20%] top-1/2 h-[3px] ${activeBranch === "feature" ? "bg-[#ff79c6]" : "bg-[#bd93f9]"}`}
        initial={{ width: 0, rotate: -30 }}
        animate={{
          width: "30%",
          rotate: springBranchAngle,
          y: useTransform(springBranchAngle, [-60, 0], [-40, 0]),
        }}
        transition={{
          width: { duration: 1, ease: "easeOut" },
        }}
        style={{ transformOrigin: "left" }}
        onClick={() => handleBranchClick("feature")}
        whileHover={{ height: "4px" }}
      />

      {/* Initial commit on main */}
      <motion.div
        className="absolute left-[10%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: activeBranch === "main" ? "0 0 15px rgba(80, 250, 123, 0.5)" : "none",
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "backOut",
        }}
        whileHover={{ scale: 1.1 }}
        aria-label="Initial commit on main branch"
      >
        <GitCommit className="h-4 w-4 text-[#282a36]" />
      </motion.div>

      {/* Branch point commit */}
      <motion.div
        className="absolute left-[20%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: activeBranch === "main" ? "0 0 15px rgba(80, 250, 123, 0.5)" : "none",
        }}
        transition={{
          duration: 0.5,
          delay: 0.4,
          ease: "backOut",
        }}
        whileHover={{ scale: 1.1 }}
        aria-label="Branch point commit"
      >
        <GitBranch className="h-4 w-4 text-[#282a36]" />
      </motion.div>

      {/* Feature branch commits - draggable in complex mode */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md cursor-pointer"
        style={{
          left: `${commitPositions.feature1.x}%`,
          top: `${commitPositions.feature1.y}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: activeBranch === "feature" ? "0 0 15px rgba(255, 121, 198, 0.5)" : "none",
        }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          ease: "backOut",
        }}
        whileHover={{ scale: 1.1 }}
        onMouseDown={() => handleCommitDragStart("feature1")}
        aria-label="First commit on feature branch"
        drag={complexity === "complex"}
        dragConstraints={{
          top: 20,
          left: 40,
          right: 70,
          bottom: 40,
        }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        <GitCommit className="h-4 w-4 text-[#282a36]" />
      </motion.div>

      <motion.div
        className="absolute w-8 h-8 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md cursor-pointer"
        style={{
          left: `${commitPositions.feature2.x}%`,
          top: `${commitPositions.feature2.y}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: activeBranch === "feature" ? "0 0 15px rgba(255, 121, 198, 0.5)" : "none",
        }}
        transition={{
          duration: 0.5,
          delay: 0.8,
          ease: "backOut",
        }}
        whileHover={{ scale: 1.1 }}
        onMouseDown={() => handleCommitDragStart("feature2")}
        aria-label="Second commit on feature branch"
        drag={complexity === "complex"}
        dragConstraints={{
          top: 20,
          left: 60,
          right: 90,
          bottom: 40,
        }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        <GitCommit className="h-4 w-4 text-[#282a36]" />
      </motion.div>

      {/* Main branch continued commits */}
      <motion.div
        className="absolute left-[35%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: activeBranch === "main" ? "0 0 15px rgba(80, 250, 123, 0.5)" : "none",
        }}
        transition={{
          duration: 0.5,
          delay: 1,
          ease: "backOut",
        }}
        whileHover={{ scale: 1.1 }}
        aria-label="Continued commit on main branch"
      >
        <GitMerge className="h-4 w-4 text-[#282a36]" />
      </motion.div>

      {/* Command annotations with typing effect */}
      <motion.div
        className="absolute left-[20%] top-[70%] bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2] overflow-hidden"
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          width: ["0%", "auto", "auto", "0%"],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.1, 0.3, 0.4],
          ease: "easeInOut",
        }}
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
          git checkout -b feature
        </motion.span>
        <motion.div
          className="text-[#6272a4] text-[10px] mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          Creates and switches to new branch
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[35%] top-[70%] bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2] overflow-hidden"
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: [0, 0, 1, 1, 0],
          width: ["0%", "0%", "auto", "auto", "0%"],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.3, 0.4, 0.6, 0.7],
          ease: "easeInOut",
        }}
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
          git commit -m "Add feature"
        </motion.span>
        <motion.div
          className="text-[#6272a4] text-[10px] mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          Saves changes to feature branch
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[20%] top-[70%] bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2] overflow-hidden"
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: [0, 0, 0, 1, 1, 0],
          width: ["0%", "0%", "0%", "auto", "auto", "0%"],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.4, 0.6, 0.7, 0.9, 1],
          ease: "easeInOut",
        }}
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.3 }}>
          git switch main
        </motion.span>
        <motion.div
          className="text-[#6272a4] text-[10px] mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.3 }}
        >
          Switch back to main branch
        </motion.div>
      </motion.div>

      {/* Branch labels */}
      <motion.div
        className="absolute left-[10%] bottom-4 text-sm font-medium cursor-pointer"
        animate={{
          color: activeBranch === "main" ? "#ff79c6" : "#bd93f9",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => handleBranchClick("main")}
      >
        main
      </motion.div>

      <motion.div
        className="absolute left-[40%] top-[30%] text-sm font-medium cursor-pointer"
        animate={{
          color: activeBranch === "feature" ? "#ff79c6" : "#bd93f9",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => handleBranchClick("feature")}
      >
        feature
      </motion.div>

      {/* Branch switching indicator */}
      {complexity === "complex" && (
        <motion.div
          className="absolute left-[40%] top-[40%] bg-[#44475a]/80 px-2 py-1 rounded-full text-xs text-[#f8f8f2]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.8, 0.8, 0.8, 1.1, 1, 0.8],
            x: [0, 0, 0, -20, -40, -60],
            y: [0, 0, 0, 10, 20, 30],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.5, 0.7, 0.75, 0.9, 1],
          }}
        >
          HEAD → main
        </motion.div>
      )}

      {/* Interactive controls for complex mode */}
      {complexity === "complex" && (
        <div className="absolute bottom-4 right-4 bg-[#44475a] p-2 rounded-md">
          <label className="text-xs text-[#f8f8f2] block mb-1">Branch angle:</label>
          <input
            type="range"
            min="-60"
            max="0"
            value={branchAngle.get()}
            onChange={handleBranchAngleChange}
            className="w-32 accent-[#bd93f9]"
          />
          <div className="text-xs text-[#6272a4] mt-1">
            {complexity === "complex" ? "Drag commits to reposition" : ""}
          </div>
        </div>
      )}

      {/* Particle effects for complex mode */}
      {complexity === "complex" && activeBranch === "feature" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#ff79c6]"
              initial={{
                x: `${20 + Math.random() * 60}%`,
                y: `${30 + Math.random() * 20}%`,
                opacity: 0,
              }}
              animate={{
                y: ["0%", "100%"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

