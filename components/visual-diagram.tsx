"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VisualDiagramProps {
  type: "workflow" | "commit" | "branch" | "merge" | "push-pull" | "conflict" | "general"
  title?: string
}

export function VisualDiagram({ type, title }: VisualDiagramProps) {
  const [activeElement, setActiveElement] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [animateCircles, setAnimateCircles] = useState(true)
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Node coordinates
  const workingDirNode = { x: 96, y: 60 }
  const stagingAreaNode = { x: 504, y: 60 }
  const localRepoNode = { x: 504, y: 220 }
  const remoteRepoNode = { x: 96, y: 220 }
  
  // Enable/disable animations
  useEffect(() => {
    // We'll use this to enable animations when the component mounts
    setAnimateCircles(true)
    return () => setAnimateCircles(false)
  }, [])

  const handleElementClick = (element: string) => {
    setActiveElement(activeElement === element ? null : element)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <div
        className={`p-4 bg-[#44475a] rounded-md text-[#f8f8f2] transition-all duration-300 ${isExpanded ? "scale-105" : ""}`}
      >
        <div className="flex justify-between items-center mb-2">
          {title && <h4 className="text-[#8be9fd] font-semibold">{title}</h4>}
          <button
            onClick={toggleExpand}
            className="text-xs bg-[#282a36] hover:bg-[#6272a4] text-[#f8f8f2] px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
            aria-label={isExpanded ? "Collapse diagram" : "Expand diagram"}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {type === "workflow" && (
          <div className="space-y-4">
            <p>Git workflow involves moving changes between four main areas:</p>
            <div
              className="relative h-64 md:h-72 border border-[#6272a4] rounded-md p-4"
              aria-label="Git workflow diagram showing the relationship between Working Directory, Staging Area, Local Repository, and Remote Repository"
            >
              {/* Working Directory */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute top-4 left-4 w-28 md:w-32 h-16 md:h-20 bg-[#bd93f9] rounded-md flex items-center justify-center shadow-md transform transition-all duration-300 cursor-pointer z-10 ${activeElement === "working" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                      onClick={() => handleElementClick("working")}
                      tabIndex={0}
                      role="button"
                      aria-pressed={activeElement === "working"}
                      onKeyDown={(e) => e.key === "Enter" && handleElementClick("working")}
                    >
                      <span className="text-white font-semibold text-xs md:text-sm text-center px-1">
                        Working Directory
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#bd93f9]">
                    <p className="text-xs">Where you edit your files</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Staging Area */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute top-4 right-4 w-28 md:w-32 h-16 md:h-20 bg-[#ff79c6] rounded-md flex items-center justify-center shadow-md transform transition-all duration-300 cursor-pointer z-10 ${activeElement === "staging" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                      onClick={() => handleElementClick("staging")}
                      tabIndex={0}
                      role="button"
                      aria-pressed={activeElement === "staging"}
                      onKeyDown={(e) => e.key === "Enter" && handleElementClick("staging")}
                    >
                      <span className="text-white font-semibold text-xs md:text-sm text-center px-1">Staging Area</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#ff79c6]">
                    <p className="text-xs">Files ready to be committed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Local Repository */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute bottom-4 right-4 w-28 md:w-32 h-16 md:h-20 bg-[#50fa7b] rounded-md flex items-center justify-center shadow-md transform transition-all duration-300 cursor-pointer z-10 ${activeElement === "local" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                      onClick={() => handleElementClick("local")}
                      tabIndex={0}
                      role="button"
                      aria-pressed={activeElement === "local"}
                      onKeyDown={(e) => e.key === "Enter" && handleElementClick("local")}
                    >
                      <span className="text-white font-semibold text-xs md:text-sm text-center px-1">
                        Local Repository
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-[#282a36] text-[#f8f8f2] border-[#50fa7b]">
                    <p className="text-xs">Your local commit history</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Remote Repository */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute bottom-4 left-4 w-28 md:w-32 h-16 md:h-20 bg-[#8be9fd] rounded-md flex items-center justify-center shadow-md transform transition-all duration-300 cursor-pointer z-10 ${activeElement === "remote" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                      onClick={() => handleElementClick("remote")}
                      tabIndex={0}
                      role="button"
                      aria-pressed={activeElement === "remote"}
                      onKeyDown={(e) => e.key === "Enter" && handleElementClick("remote")}
                    >
                      <span className="text-black font-semibold text-xs md:text-sm text-center px-1">
                        Remote Repository
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-[#282a36] text-[#f8f8f2] border-[#8be9fd]">
                    <p className="text-xs">GitHub or other remote server</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Arrows with interactive highlighting */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 600 280" ref={svgRef}>
                {/* Working Directory to Staging Area path */}
                <motion.path
                  d={`M 112 60 L 488 60`}
                  stroke={activeElement === "working" || activeElement === "staging" ? "white" : "#f8f8f2"}
                  strokeWidth={3}
                  strokeDasharray="1,1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                />
                
                {/* Git Add Animation */}
                {animateCircles && (
                  <motion.circle 
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#bd93f9"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      x: [112, 300, 488],
                      y: [60, 60, 60]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity, 
                      repeatDelay: 1,
                      ease: "easeInOut" 
                    }}
                  />
                )}

                <foreignObject x="240" y="30" width="120" height="35">
                  <div className="bg-[#44475a] px-2 py-1 text-xs rounded-md shadow-md text-center transition-all duration-300 transform ">
                    git add
                  </div>
                </foreignObject>
                
                {/* Staging Area to Local Repository path */}
                <motion.path
                  d={`M 488 80 L 488 200`}
                  stroke={activeElement === "staging" || activeElement === "local" ? "white" : "#f8f8f2"}
                  strokeWidth={3}
                  strokeDasharray="1,1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                />
                
                {/* Git Commit Animation */}
                {animateCircles && (
                  <motion.circle 
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#ff79c6"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      x: [488, 488, 488],
                      y: [80, 140, 200]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity, 
                      repeatDelay: 1,
                      ease: "easeInOut",
                      delay: 3
                    }}
                  />
                )}
                
                <foreignObject x={530} y={130} width="70" height="60">
                  <div className="bg-[#44475a] px-2 py-1 text-xs rounded-md shadow-md transform rotate-90 text-center transition-all duration-300 ">
                    git commit
                  </div>
                </foreignObject>
                
                {/* Local Repository to Remote Repository path */}
                <motion.path
                  d={`M 488 220 L 112 220`}
                  stroke={activeElement === "local" || activeElement === "remote" ? "white" : "#f8f8f2"}
                  strokeWidth={3}
                  strokeDasharray="1,1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                />
                
                {/* Git Push Animation */}
                {animateCircles && (
                  <motion.circle 
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#50fa7b"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      x: [488, 300, 112],
                      y: [220, 220, 220]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity, 
                      repeatDelay: 1,
                      ease: "easeInOut",
                      delay: 6
                    }}
                  />
                )}
                
                {/* Git Pull Animation */}
                {animateCircles && (
                  <motion.circle 
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#8be9fd"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      x: [112, 300, 488],
                      y: [220, 220, 220]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity, 
                      repeatDelay: 1,
                      ease: "easeInOut",
                      delay: 9
                    }}
                  />
                )}
                
                <foreignObject x={230} y={195} width="140" height="40">
                  <div className="bg-[#44475a] px-2 py-1 text-xs rounded-md shadow-md text-center transition-all duration-300 transform ">
                    git pull / push
                  </div>
                </foreignObject>
                
                {/* Remote Repository to Working Directory path */}
                <motion.path
                  d={`M 112 200 L 112 80`}
                  stroke={activeElement === "remote" || activeElement === "working" ? "white" : "#f8f8f2"}
                  strokeWidth={3}
                  strokeDasharray="1,1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                />
                
                {/* Git Clone Animation */}
                {animateCircles && (
                  <motion.circle 
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#8be9fd"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      x: [112, 112, 112],
                      y: [200, 140, 80]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity, 
                      repeatDelay: 1,
                      ease: "easeInOut",
                      delay: 12
                    }}
                  />
                )}
                
                <foreignObject x={0} y={130} width="80" height="60">
                  <div className="bg-[#44475a] px-2 py-1 text-xs rounded-md shadow-md transform -rotate-90 text-center transition-all duration-300 ">
                    git clone
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Additional information based on selected element */}
            {activeElement && (
              <div className="mt-2 p-2 bg-[#282a36] rounded-md text-xs animate-in fade-in duration-300">
                {activeElement === "working" && (
                  <div>
                    <p className="font-semibold text-[#bd93f9]">Working Directory</p>
                    <p>
                      This is where you edit, add, and delete files in your project. Changes here are not tracked by Git
                      until you add them to the staging area.
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Command: Use <code className="bg-[#44475a] px-1 rounded">git status</code> to see changes in the
                      working directory.
                    </p>
                  </div>
                )}
                {activeElement === "staging" && (
                  <div>
                    <p className="font-semibold text-[#ff79c6]">Staging Area</p>
                    <p>
                      Also called the "index", this is a middle ground where you prepare changes for a commit. It lets
                      you commit only specific changes, not everything at once.
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Command: Use <code className="bg-[#44475a] px-1 rounded">git add filename</code> to stage specific
                      files.
                    </p>
                  </div>
                )}
                {activeElement === "local" && (
                  <div>
                    <p className="font-semibold text-[#50fa7b]">Local Repository</p>
                    <p>
                      This is your project's history stored on your computer. It contains all commits, branches, and
                      tags.
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Command: Use <code className="bg-[#44475a] px-1 rounded">git log</code> to view your commit
                      history.
                    </p>
                  </div>
                )}
                {activeElement === "remote" && (
                  <div>
                    <p className="font-semibold text-[#8be9fd]">Remote Repository</p>
                    <p>
                      A version of your project hosted on the internet or network (like GitHub). Allows collaboration
                      with others.
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Command: Use <code className="bg-[#44475a] px-1 rounded">git remote -v</code> to see connected
                      remote repositories.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-[#f8f8f2] italic mt-2">Tip: Click on any element to learn more about it.</div>
          </div>
        )}

        {/* Add similar interactive elements for other diagram types */}
        {type === "commit" && (
          <div className="space-y-4">
            <p>The commit process:</p>
            <div
              className="relative h-40 md:h-48 border border-[#6272a4] rounded-md p-4"
              aria-label="Git commit process diagram showing Working Directory, Staging Area, and Repository"
            >
              {/* Working Directory */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 w-28 md:w-32 h-16 md:h-20 bg-[#bd93f9] rounded-md flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-white font-semibold text-xs md:text-sm text-center px-1">Working Directory</span>
              </div>

              {/* Staging Area */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 md:w-32 h-16 md:h-20 bg-[#ff79c6] rounded-md flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-white font-semibold text-xs md:text-sm text-center px-1">Staging Area</span>
              </div>

              {/* Repository */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 md:w-32 h-16 md:h-20 bg-[#50fa7b] rounded-md flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-white font-semibold text-xs md:text-sm text-center px-1">Repository</span>
              </div>

              {/* Arrows */}
              <div className="absolute top-1/2 left-[120px] md:left-[148px] -translate-y-1/2 w-[calc(50%-136px)] md:w-[calc(50%-164px)] h-0 border-t-2 border-dashed border-[#f8f8f2] flex items-center justify-center">
                <div className="bg-[#44475a] px-2 text-xs">git add</div>
              </div>

              <div className="absolute top-1/2 right-[120px] md:right-[148px] -translate-y-1/2 w-[calc(50%-136px)] md:w-[calc(50%-164px)] h-0 border-t-2 border-dashed border-[#f8f8f2] flex items-center justify-center">
                <div className="bg-[#44475a] px-2 text-xs">git commit</div>
              </div>
            </div>
            <div className="text-xs text-[#f8f8f2] italic mt-2">
              Tip: Think of staging as preparing a snapshot of your changes before committing them permanently.
            </div>
          </div>
        )}

        {type === "branch" && (
          <div className="space-y-4">
            <p>Branching creates a separate line of development:</p>
            <div
              className="relative h-48 md:h-56 border border-[#6272a4] rounded-md p-4"
              aria-label="Git branching diagram showing main and feature branches with commits"
            >
              {/* Main branch */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#bd93f9]"></div>

              {/* Feature branch */}
              <div className="absolute top-1/2 left-1/2 w-[40%] h-1 bg-[#ff79c6] origin-left rotate-[-30deg]"></div>

              {/* Commits on main */}
              <div
                className="absolute top-1/2 left-[20%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Commit 1 on main branch"
              >
                <span className="text-[8px]">1</span>
              </div>

              <div
                className="absolute top-1/2 left-[40%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Commit 2 on main branch"
              >
                <span className="text-[8px]">2</span>
              </div>

              {/* Commit on feature */}
              <div
                className="absolute top-[calc(50%-30px)] left-[70%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Commit 3 on feature branch"
              >
                <span className="text-[8px]">3</span>
              </div>

              {/* Labels */}
              <div className="absolute left-[30%] bottom-4 text-xs text-[#f8f8f2]">main</div>
              <div className="absolute left-[60%] top-4 text-xs text-[#f8f8f2]">feature</div>
            </div>
            <div className="text-xs text-[#f8f8f2] italic mt-2">
              Tip: Branches let you work on different features or fixes in isolation from each other.
            </div>
          </div>
        )}

        {type === "merge" && (
          <div className="space-y-4">
            <p>Merging combines changes from different branches:</p>
            <div
              className="relative h-48 md:h-56 border border-[#6272a4] rounded-md p-4"
              aria-label="Git merge diagram showing how feature branch is merged into main branch"
            >
              {/* Main branch */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#bd93f9]"></div>

              {/* Feature branch */}
              <div className="absolute top-1/2 left-[30%] w-[30%] h-1 bg-[#ff79c6] origin-left rotate-[-30deg]"></div>

              {/* Commits on main */}
              <div
                className="absolute top-1/2 left-[20%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Commit 1 on main branch"
              >
                <span className="text-[8px]">1</span>
              </div>

              <div
                className="absolute top-1/2 left-[30%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Commit 2 on main branch"
              >
                <span className="text-[8px]">2</span>
              </div>

              {/* Commit on feature */}
              <div
                className="absolute top-[calc(50%-20px)] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#ff79c6] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Commit 3 on feature branch"
              >
                <span className="text-[8px]">3</span>
              </div>

              {/* Merge commit */}
              <div
                className="absolute top-1/2 left-[70%] -translate-y-1/2 w-6 h-6 rounded-full bg-[#8be9fd] border-2 border-[#f8f8f2] flex items-center justify-center shadow-md transform transition-transform hover:scale-110"
                aria-label="Merge commit"
              >
                <span className="text-[8px]">4</span>
              </div>

              {/* Labels */}
              <div className="absolute left-[25%] bottom-4 text-xs text-[#f8f8f2]">main</div>
              <div className="absolute left-[40%] top-4 text-xs text-[#f8f8f2]">feature</div>
              <div className="absolute left-[70%] bottom-4 text-xs text-[#f8f8f2]">merge commit</div>
            </div>
            <div className="text-xs text-[#f8f8f2] italic mt-2">
              Tip: A merge commit has two parent commits - one from each branch being merged.
            </div>
          </div>
        )}

        {type === "push-pull" && (
          <div className="space-y-4">
            <p>Remote operations:</p>
            <div
              className="relative h-40 md:h-48 border border-[#6272a4] rounded-md p-4"
              aria-label="Git push and pull operations between local and remote repositories"
            >
              {/* Local repository */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 w-28 md:w-32 h-16 md:h-20 bg-[#bd93f9] rounded-md flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-white font-semibold text-xs md:text-sm text-center px-1">Local Repo</span>
              </div>

              {/* Remote repository */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 md:w-32 h-16 md:h-20 bg-[#50fa7b] rounded-md flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-white font-semibold text-xs md:text-sm text-center px-1">Remote Repo</span>
              </div>

              {/* Push arrow */}
              <div className="absolute top-[calc(50%-10px)] left-[120px] md:left-[148px] -translate-y-1/2 w-[calc(100%-240px)] md:w-[calc(100%-296px)] h-0 border-t-2 border-dashed border-[#ff79c6] flex items-center justify-center">
                <div className="bg-[#44475a] px-2 text-xs text-[#ff79c6]">git push</div>
              </div>

              {/* Pull arrow */}
              <div className="absolute top-[calc(50%+10px)] left-[120px] md:left-[148px] -translate-y-1/2 w-[calc(100%-240px)] md:w-[calc(100%-296px)] h-0 border-t-2 border-dashed border-[#8be9fd] flex items-center justify-center">
                <div className="bg-[#44475a] px-2 text-xs text-[#8be9fd]">git pull</div>
              </div>
            </div>
            <div className="text-xs text-[#f8f8f2] italic mt-2">
              Tip: Always pull before you push to avoid conflicts with remote changes.
            </div>
          </div>
        )}

        {type === "conflict" && (
          <div className="space-y-4">
            <p>Merge conflict resolution:</p>
            <div
              className="relative h-64 md:h-72 border border-[#6272a4] rounded-md p-4"
              aria-label="Git merge conflict resolution example"
            >
              {/* File content */}
              <div className="w-full h-full bg-[#282a36] rounded-md p-2 font-mono text-xs overflow-hidden">
                <div className="text-[#f8f8f2]">function hello() {"{"}</div>
                <div className="bg-[#ff5555] text-white p-1 rounded-sm my-1">
                  <span>{"<<<<<<< HEAD"}</span>
                  <br />
                  <span>&nbsp;&nbsp;console.log("Hello");</span>
                  <br />
                  <span>{"======="}</span>
                  <br />
                  <span>&nbsp;&nbsp;console.log("Hello, World!");</span>
                  <br />
                  <span>{">>>>>>> feature"}</span>
                </div>
                <div className="text-[#f8f8f2]">{"}"}</div>

                <div className="mt-4 text-[#f8f8f2]">Steps to resolve:</div>
                <ol className="list-decimal pl-5 mt-1 text-[#f8f8f2]">
                  <li>Edit the file to remove conflict markers</li>
                  <li>Choose which changes to keep</li>
                  <li>Run git add to stage the resolved file</li>
                  <li>Run git commit to complete the merge</li>
                </ol>

                <div className="mt-4 text-[#f8f8f2]">Resolved version:</div>
                <div className="bg-[#50fa7b] bg-opacity-20 p-1 rounded-sm mt-1">
                  <span className="text-[#f8f8f2]">function hello() {"{"}</span>
                  <br />
                  <span className="text-[#f8f8f2]">&nbsp;&nbsp;console.log("Hello, World!");</span>
                  <br />
                  <span className="text-[#f8f8f2]">{"}"}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-[#f8f8f2] italic mt-2">
              Tip: Conflicts occur when Git can't automatically merge changes that affect the same lines.
            </div>
          </div>
        )}

        {type === "general" && (
          <div className="space-y-4">
            <p>This diagram illustrates the Git operation described above.</p>
            <div className="relative h-40 md:h-56 border border-[#6272a4] rounded-md p-4" aria-label="General Git operation diagram">
              <div className={`absolute w-full h-full flex items-center justify-center ${isExpanded ? 'scale-105' : ''} transition-all duration-300`}>
                <div className="text-center relative">
                  <div className="text-[#8be9fd] font-semibold mb-2">Git Operation Flow</div>
                  <p className="text-sm mb-6">Select any element to learn more about its role.</p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {/* Interactive elements with tooltips */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className={`bg-[#bd93f9] text-white px-4 py-2 rounded-md text-sm shadow-md transition-all duration-300 cursor-pointer transform ${activeElement === "working" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                            onClick={() => handleElementClick("working")}
                            tabIndex={0}
                            role="button"
                            aria-pressed={activeElement === "working"}
                            onKeyDown={(e) => e.key === "Enter" && handleElementClick("working")}
                          >
                            Working Directory
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#bd93f9]">
                          <p className="text-xs">Where you edit your files</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className={`bg-[#ff79c6] text-white px-4 py-2 rounded-md text-sm shadow-md transition-all duration-300 cursor-pointer transform ${activeElement === "staging" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                            onClick={() => handleElementClick("staging")}
                            tabIndex={0}
                            role="button" 
                            aria-pressed={activeElement === "staging"}
                            onKeyDown={(e) => e.key === "Enter" && handleElementClick("staging")}
                          >
                            Staging Area
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#ff79c6]">
                          <p className="text-xs">Files ready to be committed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className={`bg-[#50fa7b] text-white px-4 py-2 rounded-md text-sm shadow-md transition-all duration-300 cursor-pointer transform ${activeElement === "repository" ? "scale-110 ring-2 ring-white" : "hover:scale-105"}`}
                            onClick={() => handleElementClick("repository")}
                            tabIndex={0}
                            role="button"
                            aria-pressed={activeElement === "repository"}
                            onKeyDown={(e) => e.key === "Enter" && handleElementClick("repository")}
                          >
                            Repository
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-[#282a36] text-[#f8f8f2] border-[#50fa7b]">
                          <p className="text-xs">Your commit history</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional information panel based on selected element */}
            {activeElement && (
              <div className="mt-2 p-2 bg-[#282a36] rounded-md text-xs animate-in fade-in duration-300">
                {activeElement === "working" && (
                  <div>
                    <p className="font-semibold text-[#bd93f9]">Working Directory</p>
                    <p>
                      This is where you modify files in your project. It contains all your project files and directories.
                      Files here can be tracked (already in Git) or untracked (new files).
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Related commands: <code className="bg-[#44475a] px-1 rounded">git status</code>, 
                      <code className="bg-[#44475a] px-1 rounded ml-1">git add</code>
                    </p>
                  </div>
                )}
                {activeElement === "staging" && (
                  <div>
                    <p className="font-semibold text-[#ff79c6]">Staging Area</p>
                    <p>
                      Also known as the "index", this is a preparatory area where you organize and prepare changes
                      before permanently recording them in the repository.
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Related commands: <code className="bg-[#44475a] px-1 rounded">git add</code>, 
                      <code className="bg-[#44475a] px-1 rounded ml-1">git reset</code>
                    </p>
                  </div>
                )}
                {activeElement === "repository" && (
                  <div>
                    <p className="font-semibold text-[#50fa7b]">Repository</p>
                    <p>
                      The .git directory where Git stores all the snapshots of your project. This contains
                      your complete history and metadata about all commits and branches.
                    </p>
                    <p className="mt-1 text-[#6272a4]">
                      Related commands: <code className="bg-[#44475a] px-1 rounded">git commit</code>, 
                      <code className="bg-[#44475a] px-1 rounded ml-1">git log</code>
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <div className="text-xs text-[#f8f8f2] italic mt-2">
              Tip: Click on any element to learn more about its role in the Git workflow.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
