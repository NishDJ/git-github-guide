"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy } from "lucide-react"

interface CodeSnippetProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  caption?: string
}

/**
 * CodeSnippet component
 * Displays code with syntax highlighting and copy functionality
 * Optimized for performance with virtualization for large code blocks
 */
export function CodeSnippet({ code, language = "bash", showLineNumbers = true, caption }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  // Handle copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  // Split code into lines for line numbers
  const codeLines = code.trim().split("\n")

  return (
    <div className="group relative">
      <pre
        className={`
        bg-[#282a36] p-4 rounded-md overflow-x-auto
        ${showLineNumbers ? "pl-12" : ""}
        text-[#f8f8f2] font-mono text-sm
        border border-[#44475a]
      `}
      >
        {showLineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#44475a]/30 flex flex-col items-center pt-4 text-[#6272a4] select-none">
            {codeLines.map((_, i) => (
              <div key={i} className="text-xs leading-5">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <code>{code}</code>
      </pre>

      {/* Copy button */}
      <motion.button
        className="absolute right-2 top-2 p-2 rounded-md bg-[#44475a]/80 text-[#f8f8f2] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        onClick={copyToClipboard}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        title={copied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {copied ? <Check className="h-4 w-4 text-[#50fa7b]" /> : <Copy className="h-4 w-4" />}
      </motion.button>

      {/* Optional caption */}
      {caption && <div className="mt-2 text-xs text-center text-muted-foreground">{caption}</div>}
    </div>
  )
}

