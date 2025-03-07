"use client"

import { useEffect, useState, useRef } from "react"
import { FallbackDiagram } from "./fallback-diagram"

interface DiagramRendererProps {
  id: string
  code: string
  fallbackType: "workflow" | "commit" | "branch" | "merge" | "push-pull" | "conflict" | "general"
}

export function DiagramRenderer({ id, code, fallbackType }: DiagramRendererProps) {
  const [renderState, setRenderState] = useState<"loading" | "success" | "error">("loading")
  const containerRef = useRef<HTMLDivElement>(null)
  const attemptedRef = useRef(false)

  useEffect(() => {
    // Only run in browser and only once
    if (typeof window === "undefined" || attemptedRef.current) return
    attemptedRef.current = true

    const renderDiagram = async () => {
      try {
        // Make sure the DOM is fully loaded
        if (document.readyState !== "complete") {
          window.addEventListener("load", renderDiagram)
          return
        }

        // Dynamically import mermaid
        const mermaidModule = await import("mermaid")
        const mermaid = mermaidModule.default

        // Initialize with safe settings
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          logLevel: "error",
        })

        // Make sure the container exists
        if (!containerRef.current) {
          setRenderState("error")
          return
        }

        // Clear previous content
        containerRef.current.innerHTML = ""

        // Add the code to the container
        const tempDiv = document.createElement("div")
        tempDiv.className = "mermaid"
        tempDiv.textContent = code
        containerRef.current.appendChild(tempDiv)

        // Wait a bit to ensure DOM is fully processed
        setTimeout(() => {
          try {
            // Use mermaidAPI directly to avoid DOM issues
            mermaid.init(undefined, ".mermaid")
            setRenderState("success")
          } catch (renderError) {
            console.error("Mermaid render error:", renderError)
            setRenderState("error")
          }
        }, 500)
      } catch (error) {
        console.error("Mermaid load error:", error)
        setRenderState("error")
      }
    }

    renderDiagram()

    return () => {
      window.removeEventListener("load", renderDiagram)
    }
  }, [code])

  return (
    <div className="bg-white p-4 rounded-md">
      {renderState === "loading" && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bd93f9]"></div>
        </div>
      )}

      <div
        ref={containerRef}
        id={id}
        className={renderState === "loading" ? "hidden" : renderState === "error" ? "hidden" : "block"}
      ></div>

      {renderState === "error" && <FallbackDiagram type={fallbackType} />}
    </div>
  )
}

