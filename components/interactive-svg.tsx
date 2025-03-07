"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useAnimation } from "@/contexts/animation-context"

interface GitNode {
  id: string
  x: number
  y: number
  type: "commit" | "branch" | "merge" | "tag"
  label: string
}

interface GitConnection {
  from: string
  to: string
  type: "branch" | "main" | "merge"
}

interface InteractiveSVGProps {
  nodes: GitNode[]
  connections: GitConnection[]
  width?: number
  height?: number
}

export function InteractiveSVG({ nodes, connections, width = 600, height = 300 }: InteractiveSVGProps) {
  const { complexity, isEnabled } = useAnimation()
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Node colors based on type
  const nodeColors = {
    commit: "#50fa7b",
    branch: "#bd93f9",
    merge: "#ff79c6",
    tag: "#f1fa8c",
  }

  // Connection colors based on type
  const connectionColors = {
    main: "#bd93f9",
    branch: "#ff79c6",
    merge: "#8be9fd",
  }

  // Handle node click
  const handleNodeClick = (id: string) => {
    setActiveNode(id === activeNode ? null : id)
  }

  // Get connection path
  const getConnectionPath = (from: GitNode, to: GitNode, type: "branch" | "main" | "merge") => {
    if (type === "main") {
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
    } else if (type === "branch") {
      const midX = (from.x + to.x) / 2
      const midY = from.y - 30
      return `M ${from.x} ${from.y} Q ${midX} ${midY}, ${to.x} ${to.y}`
    } else {
      const midX = (from.x + to.x) / 2
      const midY = to.y - 30
      return `M ${from.x} ${from.y} Q ${midX} ${midY}, ${to.x} ${to.y}`
    }
  }

  return (
    <div className="w-full overflow-x-auto bg-[#282a36] rounded-lg p-4">
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        {/* Connections */}
        {connections.map((connection, index) => {
          const fromNode = nodes.find((n) => n.id === connection.from)
          const toNode = nodes.find((n) => n.id === connection.to)

          if (!fromNode || !toNode) return null

          const path = getConnectionPath(fromNode, toNode, connection.type)
          const isActive = activeNode === connection.from || activeNode === connection.to
          const isHovered = hoveredNode === connection.from || hoveredNode === connection.to

          return (
            <motion.path
              key={`connection-${index}`}
              d={path}
              stroke={connectionColors[connection.type]}
              strokeWidth={isActive || isHovered ? 3 : 2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                strokeWidth: isActive || isHovered ? 3 : 2,
                stroke: isActive ? "#ff79c6" : isHovered ? "#8be9fd" : connectionColors[connection.type],
              }}
              transition={{
                pathLength: { duration: 1, delay: index * 0.2 },
                strokeWidth: { duration: 0.3 },
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id
          const isHovered = hoveredNode === node.id

          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 18 : 15}
                fill={nodeColors[node.type]}
                stroke="#f8f8f2"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  r: isActive ? 18 : isHovered ? 17 : 15,
                }}
                transition={{
                  scale: { duration: 0.5, type: "spring" },
                  r: { duration: 0.2 },
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: "pointer" }}
              />

              <motion.text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="#282a36"
                fontSize={12}
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                pointerEvents="none"
              >
                {node.label}
              </motion.text>

              {/* Node label below */}
              <motion.text
                x={node.x}
                y={node.y + 35}
                textAnchor="middle"
                fill="#f8f8f2"
                fontSize={10}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive || isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                pointerEvents="none"
              >
                {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
              </motion.text>

              {/* Particle effects for complex mode */}
              {complexity === "complex" && isActive && isEnabled && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.circle
                      key={`particle-${node.id}-${i}`}
                      cx={node.x}
                      cy={node.y}
                      r={2}
                      fill={nodeColors[node.type]}
                      initial={{ scale: 0 }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 50],
                        y: [0, (Math.random() - 0.5) * 50],
                        opacity: [1, 0],
                        scale: [1, 0.5],
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: Math.random(),
                      }}
                    />
                  ))}
                </>
              )}
            </g>
          )
        })}
      </svg>

      {/* Node details panel */}
      {activeNode && (
        <motion.div
          className="mt-4 p-3 bg-[#44475a] rounded-md text-[#f8f8f2] text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-bold text-[#8be9fd] mb-1">
            {nodes.find((n) => n.id === activeNode)?.type.toUpperCase()}:{" "}
            {nodes.find((n) => n.id === activeNode)?.label}
          </h4>
          <p className="text-xs">
            {nodes.find((n) => n.id === activeNode)?.type === "commit" &&
              "A snapshot of your code at a specific point in time."}
            {nodes.find((n) => n.id === activeNode)?.type === "branch" && "A parallel version of your repository."}
            {nodes.find((n) => n.id === activeNode)?.type === "merge" && "Combines changes from different branches."}
            {nodes.find((n) => n.id === activeNode)?.type === "tag" && "A named reference to a specific commit."}
          </p>
        </motion.div>
      )}
    </div>
  )
}

