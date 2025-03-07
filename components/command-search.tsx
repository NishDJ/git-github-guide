"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

// Define command data structure
interface GitCommand {
  name: string
  description: string
  category: "basic" | "branch" | "remote" | "advanced"
  command: string
  example?: string
}

// Sample command data - in a real app, this would be more extensive
const gitCommands: GitCommand[] = [
  {
    name: "Initialize Repository",
    description: "Create a new Git repository",
    category: "basic",
    command: "git init",
    example: "git init my-project",
  },
  {
    name: "Clone Repository",
    description: "Clone a repository from remote",
    category: "remote",
    command: "git clone <url>",
    example: "git clone https://github.com/user/repo.git",
  },
  {
    name: "Create Branch",
    description: "Create a new branch",
    category: "branch",
    command: "git checkout -b <branch-name>",
    example: "git checkout -b feature/login",
  },
  {
    name: "Stage Changes",
    description: "Add files to staging area",
    category: "basic",
    command: "git add <file>",
    example: "git add . (add all files)",
  },
  {
    name: "Commit Changes",
    description: "Commit staged changes",
    category: "basic",
    command: 'git commit -m "message"',
    example: 'git commit -m "Add login feature"',
  },
  {
    name: "Push Changes",
    description: "Push commits to remote",
    category: "remote",
    command: "git push <remote> <branch>",
    example: "git push origin main",
  },
  {
    name: "Pull Changes",
    description: "Pull changes from remote",
    category: "remote",
    command: "git pull <remote> <branch>",
    example: "git pull origin main",
  },
  {
    name: "Merge Branch",
    description: "Merge a branch into current branch",
    category: "branch",
    command: "git merge <branch>",
    example: "git merge feature/login",
  },
  {
    name: "View Status",
    description: "Check repository status",
    category: "basic",
    command: "git status",
  },
  {
    name: "View Commit History",
    description: "Show commit history",
    category: "basic",
    command: "git log",
    example: "git log --oneline",
  },
  {
    name: "Stash Changes",
    description: "Temporarily save changes",
    category: "advanced",
    command: "git stash",
    example: "git stash pop (apply and remove stash)",
  },
  {
    name: "Rebase Branch",
    description: "Reapply commits on top of another branch",
    category: "advanced",
    command: "git rebase <branch>",
    example: "git rebase main",
  },
]

/**
 * CommandSearch component
 * Provides a searchable interface for Git commands
 * Supports keyboard navigation and command copying
 */
export function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)

  // Debounce search query to prevent excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Filter commands based on search query
  const filteredCommands = gitCommands.filter((command) => {
    if (!debouncedSearchQuery) return true

    const searchLower = debouncedSearchQuery.toLowerCase()
    return (
      command.name.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.command.toLowerCase().includes(searchLower) ||
      command.category.toLowerCase().includes(searchLower)
    )
  })

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredCommands.length])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
          break
        case "Enter":
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            copyToClipboard(filteredCommands[selectedIndex].command)
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [isOpen, filteredCommands, selectedIndex],
  )

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  // Copy command to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(text)
        setTimeout(() => setCopied(null), 2000)
      })
      .catch((err) => console.error("Failed to copy: ", err))
  }

  // Refs for click outside detection
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close search when clicking outside
  useOnClickOutside(searchRef, () => setIsOpen(false))

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basic":
        return "bg-[#50fa7b] text-[#282a36]"
      case "branch":
        return "bg-[#bd93f9] text-[#282a36]"
      case "remote":
        return "bg-[#8be9fd] text-[#282a36]"
      case "advanced":
        return "bg-[#ff79c6] text-[#282a36]"
      default:
        return "bg-[#6272a4] text-[#f8f8f2]"
    }
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Search Git commands"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search commands</span>
        <kbd className="hidden sm:flex items-center justify-center h-5 px-1.5 text-xs rounded bg-muted text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="fixed inset-0 flex items-start justify-center pt-16 sm:pt-24">
              <motion.div
                ref={searchRef}
                className="w-full max-w-lg bg-popover border rounded-lg shadow-lg overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Search input */}
                <div className="flex items-center px-4 border-b">
                  <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search Git commands..."
                    className="flex-1 py-3 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Search results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {filteredCommands.length === 0 ? (
                    <div className="py-6 text-center text-muted-foreground">No commands found</div>
                  ) : (
                    <ul className="py-2">
                      {filteredCommands.map((command, index) => (
                        <motion.li
                          key={command.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                          className={`px-4 py-2 cursor-pointer ${
                            selectedIndex === index ? "bg-muted" : "hover:bg-muted/50"
                          }`}
                          onClick={() => copyToClipboard(command.command)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-foreground">{command.name}</div>
                              <div className="text-sm text-muted-foreground">{command.description}</div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(command.category)}`}>
                              {command.category}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{command.command}</code>
                            {copied === command.command ? (
                              <span className="text-xs text-green-500">Copied!</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Click to copy <ArrowRight className="inline h-3 w-3" />
                              </span>
                            )}
                          </div>
                          {command.example && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              Example: <code className="bg-muted px-1 py-0.5 rounded">{command.example}</code>
                            </div>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Keyboard shortcuts */}
                <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-muted rounded">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-muted rounded">↓</kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-muted rounded">Enter</kbd>
                      <span>Copy</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Esc</kbd>
                    <span>Close</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

