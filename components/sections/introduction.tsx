"use client"

import { Card, CardContent } from "@/components/ui/card"
import { VisualDiagram } from "../visual-diagram"

export function Introduction() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-[#8be9fd]">What is Git?</h2>
        <p>
          Git is a distributed version control system that tracks changes in your code over time. It allows you to
          revert to previous versions, compare changes, and collaborate with others. Unlike older version control
          systems, Git stores a complete copy of the repository on each developer's machine.
        </p>

        <h2 className="text-[#8be9fd]">What is GitHub?</h2>
        <p>
          GitHub is a cloud-based hosting service that lets you manage Git repositories. It provides a web interface to
          Git, along with features like pull requests, issues, and actions. GitHub makes it easier to collaborate on
          projects with other developers around the world.
        </p>

        <h2 className="text-[#8be9fd]">Key Concepts</h2>
        <ul>
          <li>
            <strong className="text-[#50fa7b]">Repository:</strong> A storage location for your project. It contains all
            of your project's files and the entire revision history.
          </li>
          <li>
            <strong className="text-[#50fa7b]">Commit:</strong> A snapshot of your repository at a specific point in
            time. Each commit has a unique identifier (hash) and includes information about what changed.
          </li>
          <li>
            <strong className="text-[#50fa7b]">Branch:</strong> A parallel version of your repository. Branches allow
            you to work on different features or fixes simultaneously without affecting the main codebase.
          </li>
          <li>
            <strong className="text-[#50fa7b]">Merge:</strong> Combining changes from different branches. Merging
            integrates the changes from one branch into another.
          </li>
          <li>
            <strong className="text-[#50fa7b]">Pull Request:</strong> A request to merge changes from one branch to
            another. Pull requests on GitHub provide a way to review code before it's merged.
          </li>
        </ul>

        <h2 className="text-[#8be9fd]">Why Use Git?</h2>
        <ul>
          <li>
            <strong className="text-[#ff79c6]">History:</strong> Track changes to your code over time
          </li>
          <li>
            <strong className="text-[#ff79c6]">Collaboration:</strong> Work with others on the same project
          </li>
          <li>
            <strong className="text-[#ff79c6]">Branching:</strong> Develop features in isolation
          </li>
          <li>
            <strong className="text-[#ff79c6]">Backup:</strong> Store your code safely in multiple locations
          </li>
          <li>
            <strong className="text-[#ff79c6]">Experimentation:</strong> Try new ideas without risk
          </li>
        </ul>
      </div>

      <Card className="bg-[#252630] border-[#8be9fd]">
        <CardContent className="pt-6">
          <h3 className="text-[#ff79c6] font-semibold mb-2">Git Workflow Overview:</h3>
          <VisualDiagram type="workflow" />
        </CardContent>
      </Card>
    </div>
  )
}

