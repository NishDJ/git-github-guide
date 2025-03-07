"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Introduction } from "@/components/sections/introduction"
import { BasicCommands } from "@/components/sections/basic-commands"
import { Branching } from "@/components/sections/branching"
import { RemoteRepositories } from "@/components/sections/remote-repositories"
import { AdvancedOperations } from "@/components/sections/advanced-operations"
import { FAQSection } from "@/components/sections/faq-section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LightbulbIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useAnimation } from "@/contexts/animation-context"
import { AdvancedGitVisualization } from "@/components/advanced-git-visualization"

export function GitGuide() {
  const { isEnabled } = useAnimation()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-8" variants={container} initial={isEnabled ? "hidden" : "show"} animate="show">
      <motion.p className="text-lg text-[#8be9fd]" variants={item}>
        This guide will walk you through common Git and GitHub command sequences with visual explanations. Select a
        section below to get started.
      </motion.p>

      <motion.div variants={item}>
        <Alert className="bg-[#282a36] border-[#ff79c6] text-[#f8f8f2]">
          <LightbulbIcon className="h-4 w-4 text-[#f1fa8c]" />
          <AlertTitle className="text-[#f1fa8c]">Pro Tip</AlertTitle>
          <AlertDescription>
            Git commands can be combined with flags to modify their behavior. For example,{" "}
            <code className="bg-[#44475a] px-1 rounded">git commit -am "message"</code> combines adding and committing
            in one step.
          </AlertDescription>
        </Alert>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="introduction" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 bg-[#3d3f4f]">
            <TabsTrigger
              value="introduction"
              className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white"
            >
              Introduction
            </TabsTrigger>
            <TabsTrigger value="basic" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Basic Commands
            </TabsTrigger>
            <TabsTrigger value="branching" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Branching
            </TabsTrigger>
            <TabsTrigger value="remote" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Remote Repos
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              Advanced
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white">
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="advanced-viz"
              className="data-[state=active]:bg-[#bd93f9] data-[state=active]:text-white"
            >
              Advanced Viz
            </TabsTrigger>
          </TabsList>
          <TabsContent value="introduction">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Introduction to Git & GitHub</CardTitle>
                <CardDescription className="text-[#f8f8f2]">Understanding version control fundamentals</CardDescription>
              </CardHeader>
              <CardContent>
                <Introduction />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="basic">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Basic Git Commands</CardTitle>
                <CardDescription className="text-[#f8f8f2]">
                  Getting started with repositories, staging, and committing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BasicCommands />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="branching">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Branching & Merging</CardTitle>
                <CardDescription className="text-[#f8f8f2]">
                  Creating branches, switching between them, and merging changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Branching />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="remote">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Remote Repositories</CardTitle>
                <CardDescription className="text-[#f8f8f2]">
                  Working with GitHub and other remote repositories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RemoteRepositories />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="advanced">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Advanced Operations</CardTitle>
                <CardDescription className="text-[#f8f8f2]">
                  Resolving conflicts, reverting changes, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedOperations />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="faq">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-[#f8f8f2]">
                  Common questions and answers about Git and GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FAQSection />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="advanced-viz">
            <Card className="bg-[#3d3f4f] border-[#bd93f9]">
              <CardHeader>
                <CardTitle className="text-[#ff79c6]">Advanced Git Visualizations</CardTitle>
                <CardDescription className="text-[#f8f8f2]">
                  Interactive visualizations of complex Git concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedGitVisualization />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div className="bg-[#282a36] p-4 rounded-md border border-[#6272a4]" variants={item}>
        <h3 className="text-[#8be9fd] font-semibold mb-2">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-[#ff79c6] text-sm font-medium mb-1">Basic Commands</h4>
            <ul className="text-xs text-[#f8f8f2] space-y-1">
              <li>
                <code className="bg-[#44475a] px-1 rounded">git init</code> - Initialize a repository
              </li>
              <li>
                <code className="bg-[#44475a] px-1 rounded">git add .</code> - Stage all changes
              </li>
              <li>
                <code className="bg-[#44475a] px-1 rounded">git commit -m "message"</code> - Commit changes
              </li>
              <li>
                <code className="bg-[#44475a] px-1 rounded">git status</code> - Check status
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#ff79c6] text-sm font-medium mb-1">Branch Commands</h4>
            <ul className="text-xs text-[#f8f8f2] space-y-1">
              <li>
                <code className="bg-[#44475a] px-1 rounded">git branch</code> - List branches
              </li>
              <li>
                <code className="bg-[#44475a] px-1 rounded">git checkout -b name</code> - Create & switch branch
              </li>
              <li>
                <code className="bg-[#44475a] px-1 rounded">git merge branch</code> - Merge branch into current
              </li>
              <li>
                <code className="bg-[#44475a] px-1 rounded">git branch -d name</code> - Delete branch
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div className="bg-[#282a36] p-4 rounded-md border border-[#6272a4]" variants={item}>
        <h3 className="text-[#8be9fd] font-semibold mb-2">Git Cheat Sheet</h3>
        <p className="text-[#f8f8f2] text-sm mb-4">
          Download our comprehensive Git cheat sheet for quick reference when working with Git commands.
        </p>
        <div className="flex justify-center">
          <motion.button
            className="bg-[#bd93f9] hover:bg-[#ff79c6] text-white font-bold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#8be9fd] focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Cheat Sheet (PDF)
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

