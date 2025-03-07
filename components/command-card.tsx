"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import { VisualDiagram } from "./visual-diagram"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { LazyAnimation } from "@/components/lazy-animation"

interface CommandCardProps {
  title: string
  description: string
  command: string
  explanation: string
  diagramType: "workflow" | "commit" | "branch" | "merge" | "push-pull" | "conflict" | "general"
  animation?: ReactNode
  examples?: string[]
}

export function CommandCard({
  title,
  description,
  command,
  explanation,
  diagramType,
  animation,
  examples = [],
}: CommandCardProps) {
  return (
    <Card className="mb-8 bg-[#252630] border-[#8be9fd]">
      <CardHeader>
        <CardTitle className="text-[#50fa7b]">{title}</CardTitle>
        <CardDescription className="text-[#f8f8f2]">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {animation && (
          <div>
            <h3 className="text-[#ff79c6] font-semibold mb-2">Animation:</h3>
            <LazyAnimation
              className="rounded-md overflow-hidden"
              height={250}
              fallback={
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bd93f9] mb-2"></div>
                  <div className="text-xs text-[#6272a4]">Animation will load when visible</div>
                </div>
              }
            >
              <div aria-label={`Animation demonstrating ${title}`}>{animation}</div>
            </LazyAnimation>
          </div>
        )}

        <div>
          <h3 className="text-[#ff79c6] font-semibold mb-2">Command Sequence:</h3>
          <CodeBlock code={command} />
        </div>

        <div>
          <h3 className="text-[#ff79c6] font-semibold mb-2">Explanation:</h3>
          <p className="text-[#f8f8f2]">{explanation}</p>
        </div>

        {examples.length > 0 && (
          <Collapsible className="w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-[#ff79c6] font-semibold">Real-world Examples:</h3>
              <CollapsibleTrigger
                className="p-2 rounded-md hover:bg-[#44475a] focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus-visible:ring-2 focus-visible:ring-[#bd93f9]"
                aria-label="Toggle examples"
              >
                <ChevronDownIcon className="h-4 w-4 text-[#f8f8f2]" />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2">
              <ul className="space-y-2 text-[#f8f8f2]">
                {examples.map((example, index) => (
                  <li key={index} className="bg-[#282a36] p-3 rounded-md">
                    {example}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div>
          <h3 className="text-[#ff79c6] font-semibold mb-2">Visual Representation:</h3>
          <VisualDiagram type={diagramType} title={title} />
        </div>
      </CardContent>
    </Card>
  )
}

