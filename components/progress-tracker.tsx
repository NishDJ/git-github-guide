"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Circle } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Section {
  id: string
  title: string
  subsections: string[]
}

// Define guide sections
const guideSections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    subsections: ["What is Git?", "What is GitHub?", "Key Concepts"],
  },
  {
    id: "basic",
    title: "Basic Commands",
    subsections: ["Initializing", "Staging", "Committing", "Checking Status", "Viewing History"],
  },
  {
    id: "branching",
    title: "Branching",
    subsections: ["Creating Branches", "Switching Branches", "Merging Branches", "Deleting Branches"],
  },
  {
    id: "remote",
    title: "Remote Repositories",
    subsections: ["Connecting to GitHub", "Pushing", "Pulling", "Pull Requests", "Cloning"],
  },
  {
    id: "advanced",
    title: "Advanced Operations",
    subsections: ["Resolving Conflicts", "Reverting Changes", "Stashing", "Cherry-Picking", "Rebasing"],
  },
]

/**
 * ProgressTracker component
 * Tracks and displays user progress through the Git guide
 * Persists progress in localStorage
 */
export function ProgressTracker() {
  const [isOpen, setIsOpen] = useState(false)
  const [completedSections, setCompletedSections] = useLocalStorage<Record<string, boolean>>("git-guide-progress", {})

  // Calculate overall progress percentage
  const totalSubsections = guideSections.reduce((total, section) => total + section.subsections.length, 0)

  const completedCount = Object.values(completedSections).filter(Boolean).length
  const progressPercentage = Math.round((completedCount / totalSubsections) * 100)

  // Toggle completion status of a subsection
  const toggleSubsection = (sectionId: string, subsectionIndex: number) => {
    const key = `${sectionId}-${subsectionIndex}`
    setCompletedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Check if a subsection is completed
  const isSubsectionCompleted = (sectionId: string, subsectionIndex: number) => {
    const key = `${sectionId}-${subsectionIndex}`
    return !!completedSections[key]
  }

  // Reset all progress
  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      setCompletedSections({})
    }
  }

  return (
    <div className="relative">
      {/* Progress button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        aria-label="Track your progress"
        aria-expanded={isOpen}
      >
        <div className="relative h-4 w-4">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <circle className="text-muted-foreground/30" cx="12" cy="12" r="10" fill="none" strokeWidth="2" />
            <motion.circle
              className="text-primary"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2"
              strokeDasharray="62.83"
              strokeDashoffset={62.83 - (62.83 * progressPercentage) / 100}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
              initial={{ strokeDashoffset: 62.83 }}
              animate={{ strokeDashoffset: 62.83 - (62.83 * progressPercentage) / 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
            {progressPercentage}%
          </span>
        </div>
        <span className="hidden sm:inline">Track Progress</span>
      </button>

      {/* Progress panel */}
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-80 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 border-b">
            <h3 className="font-medium">Your Progress</h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {guideSections.map((section) => (
              <div key={section.id} className="mb-3">
                <h4 className="font-medium text-sm px-2 py-1">{section.title}</h4>
                <ul className="mt-1 space-y-1">
                  {section.subsections.map((subsection, index) => (
                    <li key={`${section.id}-${index}`}>
                      <button
                        className="w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-muted text-left"
                        onClick={() => toggleSubsection(section.id, index)}
                      >
                        {isSubsectionCompleted(section.id, index) ? (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={isSubsectionCompleted(section.id, index) ? "line-through opacity-70" : ""}>
                          {subsection}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex justify-between">
            <button className="text-xs text-destructive hover:underline" onClick={resetProgress}>
              Reset Progress
            </button>
            <button className="text-xs text-primary hover:underline" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

