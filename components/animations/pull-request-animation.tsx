"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { GitPullRequestIcon, MessageSquareIcon, CheckIcon, GitMergeIcon } from "lucide-react"

export function PullRequestAnimation() {
  const prefersReducedMotion = useReducedMotion()

  // Use simpler animations if user prefers reduced motion
  const animationDuration = prefersReducedMotion ? 0 : 6
  const animationRepeat = prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY

  return (
    <div
      className="h-64 w-full bg-[#282a36] rounded-md overflow-hidden relative"
      aria-label="Animation showing GitHub pull request workflow"
    >
      {/* Timeline labels */}
      <div className="absolute top-2 left-4 text-xs text-[#6272a4]">Step 1: Create PR</div>
      <div className="absolute top-2 left-1/3 text-xs text-[#6272a4]">Step 2: Review</div>
      <div className="absolute top-2 right-4 text-xs text-[#6272a4]">Step 3: Merge</div>

      {/* GitHub UI mockup */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-[#44475a] rounded-md overflow-hidden">
        {/* Header */}
        <div className="h-8 bg-[#282a36] flex items-center px-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5555] mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-[#f1fa8c] mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-[#50fa7b]"></div>
          <div className="text-xs text-[#f8f8f2] ml-4">github.com</div>
        </div>

        {/* PR Creation */}
        <motion.div
          className="absolute left-0 top-8 w-full h-[calc(100%-8px)] bg-[#44475a] p-4"
          initial={{ opacity: prefersReducedMotion ? 0 : 1 }}
          animate={{
            opacity: [1, 1, 0, 0, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.2, 0.3, 0.6, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center">
            <GitPullRequestIcon className="h-5 w-5 text-[#ff79c6] mr-2" />
            <div className="text-sm font-semibold text-[#f8f8f2]">New Pull Request</div>
          </div>
          <div className="mt-3 flex">
            <div className="w-20 text-xs text-[#bd93f9]">base: main</div>
            <div className="mx-2 text-xs text-[#f8f8f2]">←</div>
            <div className="w-20 text-xs text-[#ff79c6]">compare: feature</div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-[#f8f8f2] mb-1">Title</div>
            <div className="h-8 bg-[#282a36] rounded-md px-2 py-1 text-xs text-[#f8f8f2]">
              Add new greeting functionality
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-[#f8f8f2] mb-1">Description</div>
            <div className="h-16 bg-[#282a36] rounded-md px-2 py-1 text-xs text-[#f8f8f2]">
              This PR updates the greeting to be more friendly and welcoming.
            </div>
          </div>
          <motion.div
            className="mt-4 w-32 h-8 bg-[#8be9fd] rounded-md flex items-center justify-center text-xs font-semibold text-[#282a36]"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              repeat: animationRepeat ? animationDuration / 6 : 0,
              repeatDelay: animationDuration / 3,
              ease: "easeInOut",
            }}
          >
            Create Pull Request
          </motion.div>
        </motion.div>

        {/* PR Review */}
        <motion.div
          className="absolute left-0 top-8 w-full h-[calc(100%-8px)] bg-[#44475a] p-4"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.2, 0.3, 0.5, 0.6, 1],
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center">
            <GitPullRequestIcon className="h-5 w-5 text-[#ff79c6] mr-2" />
            <div className="text-sm font-semibold text-[#f8f8f2]">Pull Request #42: Add new greeting functionality</div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#bd93f9] flex items-center justify-center text-xs text-white">
              U
            </div>
            <div className="ml-2 text-xs text-[#f8f8f2]">user123 wants to merge feature into main</div>
          </div>
          <div className="mt-3 bg-[#282a36] rounded-md p-2">
            <div className="text-xs text-[#6272a4] mb-1">greeting.js</div>
            <div className="flex">
              <div className="w-6 text-xs text-[#6272a4] pr-2 border-r border-[#6272a4]">
                1<br />2<br />3
              </div>
              <div className="pl-2 text-xs font-mono">
                <div>function greeting() {"{"}</div>
                <div className="bg-[#50fa7b] bg-opacity-20">- &nbsp;&nbsp;return "Hello, user!";</div>
                <div className="bg-[#ff79c6] bg-opacity-20">+ &nbsp;&nbsp;return "Hello, world!";</div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <MessageSquareIcon className="h-4 w-4 text-[#f8f8f2] mr-2" />
            <div className="text-xs text-[#f8f8f2]">Add comment</div>
            <div className="ml-auto flex">
              <motion.div
                className="h-7 px-3 bg-[#50fa7b] rounded-md flex items-center justify-center text-xs font-semibold text-[#282a36] mr-2"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: animationRepeat ? animationDuration / 6 : 0,
                  repeatDelay: animationDuration / 3,
                  ease: "easeInOut",
                }}
              >
                <CheckIcon className="h-3 w-3 mr-1" />
                Approve
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* PR Merge */}
        <motion.div
          className="absolute left-0 top-8 w-full h-[calc(100%-8px)] bg-[#44475a] p-4"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0, 0, 1, 1],
          }}
          transition={{
            duration: animationDuration,
            repeat: animationRepeat,
            repeatDelay: 1,
            times: [0, 0.2, 0.4, 0.6, 0.7, 1],
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center">
            <GitPullRequestIcon className="h-5 w-5 text-[#50fa7b] mr-2" />
            <div className="text-sm font-semibold text-[#f8f8f2]">Pull Request #42: Add new greeting functionality</div>
          </div>
          <div className="mt-2 flex items-center">
            <CheckIcon className="h-4 w-4 text-[#50fa7b] mr-2" />
            <div className="text-xs text-[#f8f8f2]">Approved by reviewer</div>
          </div>
          <div className="mt-2 flex items-center">
            <CheckIcon className="h-4 w-4 text-[#50fa7b] mr-2" />
            <div className="text-xs text-[#f8f8f2]">All checks have passed</div>
          </div>
          <div className="mt-4 bg-[#282a36] rounded-md p-3">
            <div className="text-sm text-[#f8f8f2] mb-2">Merge pull request</div>
            <div className="text-xs text-[#6272a4] mb-3">This will merge 1 commit into main from feature</div>
            <motion.div
              className="w-full h-8 bg-[#bd93f9] rounded-md flex items-center justify-center text-xs font-semibold text-white"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1,
                repeat: animationRepeat ? animationDuration / 6 : 0,
                repeatDelay: animationDuration / 3,
                ease: "easeInOut",
              }}
            >
              <GitMergeIcon className="h-4 w-4 mr-2" />
              Confirm merge
            </motion.div>
          </div>
          <motion.div
            className="mt-4 p-3 border border-[#50fa7b] rounded-md bg-[#50fa7b] bg-opacity-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0, 0, 0, 1],
            }}
            transition={{
              duration: animationDuration,
              repeat: animationRepeat,
              repeatDelay: 1,
              times: [0, 0.2, 0.4, 0.6, 0.8, 0.9],
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center">
              <GitMergeIcon className="h-4 w-4 text-[#50fa7b] mr-2" />
              <div className="text-xs text-[#50fa7b]">Pull request successfully merged and closed</div>
            </div>
            <div className="mt-2 text-xs text-[#f8f8f2]">The feature branch can now be safely deleted.</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Command annotations */}
      <motion.div
        className="absolute left-[15%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [1, 1, 0, 0, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.2, 0.3, 0.6, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        Create PR from feature to main
      </motion.div>

      <motion.div
        className="absolute left-[40%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 1, 1, 0, 0],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.2, 0.3, 0.5, 0.6, 1],
          ease: "easeInOut",
        }}
      >
        Review code changes
      </motion.div>

      <motion.div
        className="absolute right-[15%] bottom-4 bg-[#44475a] px-2 py-1 rounded text-xs text-[#f8f8f2]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0, 0, 1, 1],
        }}
        transition={{
          duration: animationDuration,
          repeat: animationRepeat,
          repeatDelay: 1,
          times: [0, 0.2, 0.4, 0.6, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        Merge PR to complete the process
      </motion.div>
    </div>
  )
}

