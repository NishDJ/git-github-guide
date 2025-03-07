"use client"

import { useState } from "react"
import { InteractiveSVG } from "@/components/interactive-svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RebaseAnimation } from "@/components/animations/rebase-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AdvancedGitVisualization() {
  const [activeTab, setActiveTab] = useState("workflow")

  // Define nodes and connections for Git workflow visualization
  const workflowNodes = [
    { id: "working", x: 100, y: 100, type: "commit", label: "Working" },
    { id: "staging", x: 250, y: 100, type: "commit", label: "Staging" },
    { id: "local", x: 400, y: 100, type: "commit", label: "Local" },
    { id: "remote", x: 550, y: 100, type: "commit", label: "Remote" },
  ]

  const workflowConnections = [
    { from: "working", to: "staging", type: "main" },
    { from: "staging", to: "local", type: "main" },
    { from: "local", to: "remote", type: "main" },
  ]

  // Define nodes and connections for branching visualization
  const branchingNodes = [
    { id: "main1", x: 100, y: 150, type: "commit", label: "1" },
    { id: "main2", x: 200, y: 150, type: "commit", label: "2" },
    { id: "main3", x: 300, y: 150, type: "commit", label: "3" },
    { id: "branch1", x: 200, y: 80, type: "branch", label: "Branch" },
    { id: "feature1", x: 300, y: 80, type: "commit", label: "A" },
    { id: "feature2", x: 400, y: 80, type: "commit", label: "B" },
    { id: "merge", x: 400, y: 150, type: "merge", label: "M" },
  ]

  const branchingConnections = [
    { from: "main1", to: "main2", type: "main" },
    { from: "main2", to: "main3", type: "main" },
    { from: "main3", to: "merge", type: "main" },
    { from: "main2", to: "branch1", type: "branch" },
    { from: "branch1", to: "feature1", type: "branch" },
    { from: "feature1", to: "feature2", type: "branch" },
    { from: "feature2", to: "merge", type: "merge" },
  ]

  // Define nodes and connections for rebasing visualization
  const rebasingNodes = [
    { id: "main1", x: 100, y: 150, type: "commit", label: "1" },
    { id: "main2", x: 200, y: 150, type: "commit", label: "2" },
    { id: "main3", x: 300, y: 150, type: "commit", label: "3" },
    { id: "main4", x: 400, y: 150, type: "commit", label: "4" },
    { id: "branch", x: 200, y: 80, type: "branch", label: "Branch" },
    { id: "feature1", x: 300, y: 80, type: "commit", label: "A" },
    { id: "feature2", x: 400, y: 80, type: "commit", label: "B" },
    { id: "rebase1", x: 500, y: 150, type: "commit", label: "A'" },
    { id: "rebase2", x: 600, y: 150, type: "commit", label: "B'" },
  ]

  const rebasingConnections = [
    { from: "main1", to: "main2", type: "main" },
    { from: "main2", to: "main3", type: "main" },
    { from: "main3", to: "main4", type: "main" },
    { from: "main4", to: "rebase1", type: "main" },
    { from: "rebase1", to: "rebase2", type: "main" },
    { from: "main2", to: "branch", type: "branch" },
    { from: "branch", to: "feature1", type: "branch" },
    { from: "feature1", to: "feature2", type: "branch" },
  ]

  return (
    <Card className="bg-[#252630] border-[#8be9fd]">
      <CardHeader>
        <CardTitle className="text-[#50fa7b]">Advanced Git Visualizations</CardTitle>
        <CardDescription className="text-[#f8f8f2]">
          Interactive visualizations of advanced Git concepts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="workflow" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#3d3f4f]">
            <TabsTrigger value="workflow" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Git Workflow
            </TabsTrigger>
            <TabsTrigger value="branching" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Branching & Merging
            </TabsTrigger>
            <TabsTrigger value="rebasing" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Rebasing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="mt-4">
            <div className="space-y-4">
              <p className="text-[#f8f8f2]">
                The Git workflow involves four main areas. Click on nodes to learn more about each area.
              </p>
              <InteractiveSVG nodes={workflowNodes} connections={workflowConnections} width={650} height={200} />
              <div className="text-sm text-[#6272a4] mt-2">
                <p>Commands that move changes between areas:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git add</code> - Working → Staging
                  </li>
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git commit</code> - Staging → Local
                  </li>
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git push</code> - Local → Remote
                  </li>
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git pull</code> - Remote → Working/Local
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branching" className="mt-4">
            <div className="space-y-4">
              <p className="text-[#f8f8f2]">
                Branching allows parallel development, with changes merged back together.
              </p>
              <InteractiveSVG nodes={branchingNodes} connections={branchingConnections} width={650} height={250} />
              <div className="text-sm text-[#6272a4] mt-2">
                <p>Key branching and merging commands:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git branch feature</code> - Create branch
                  </li>
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git checkout feature</code> - Switch branch
                  </li>
                  <li>
                    <code className="bg-[#44475a] px-1 rounded">git merge feature</code> - Merge branch into current
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rebasing" className="mt-4">
            <div className="space-y-4">
              <p className="text-[#f8f8f2]">Rebasing rewrites history by replaying commits on top of another branch.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <InteractiveSVG nodes={rebasingNodes} connections={rebasingConnections} width={650} height={250} />
                </div>
                <div>
                  <RebaseAnimation />
                </div>
              </div>
              <div className="text-sm text-[#6272a4] mt-2">
                <p className="font-medium text-[#ff79c6]">Rebase vs Merge:</p>
                <p>
                  Merge preserves history but creates a non-linear structure. Rebase creates a linear history but
                  rewrites commits.
                </p>
                <p className="mt-2 text-[#f1fa8c]">
                  Warning: Never rebase commits that have been pushed to a shared repository!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

