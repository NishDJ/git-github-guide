"use client"

import { CommandCard } from "@/components/command-card"
import { BranchAnimation } from "@/components/animations/branch-animation"
import { MergeAnimation } from "@/components/animations/merge-animation"

export function Branching() {
  return (
    <div className="space-y-6">
      <CommandCard
        title="Creating Branches"
        description="Create a new branch to work on features or fixes"
        command={`
# Create a new branch
git branch feature-branch

# Create and switch to a new branch
git checkout -b feature-branch

# Using the newer switch command (Git 2.23+)
git switch -c feature-branch
        `}
        explanation="Branches allow you to develop features, fix bugs, or experiment without affecting the main codebase. The git branch command creates a new branch, while git checkout -b or git switch -c creates and switches to the new branch in one step."
        diagramType="branch"
        animation={<BranchAnimation />}
      />

      <CommandCard
        title="Switching Branches"
        description="Move between different branches"
        command={`
# Switch to an existing branch
git checkout branch-name

# Using the newer switch command (Git 2.23+)
git switch branch-name

# List all branches
git branch
        `}
        explanation="The git checkout or git switch command lets you navigate between branches. The git branch command without arguments lists all local branches, with the current branch highlighted."
        diagramType="branch"
      />

      <CommandCard
        title="Merging Branches"
        description="Combine changes from different branches"
        command={`
# First, switch to the target branch
git checkout main

# Merge another branch into the current branch
git merge feature-branch
        `}
        explanation="The git merge command incorporates changes from one branch into another. You first switch to the branch that should receive the changes (often main), then merge the source branch (e.g., a feature branch)."
        diagramType="merge"
        animation={<MergeAnimation />}
      />

      <CommandCard
        title="Deleting Branches"
        description="Remove branches after they're no longer needed"
        command={`
# Delete a branch that has been merged
git branch -d branch-name

# Force delete a branch (even if not merged)
git branch -D branch-name
        `}
        explanation="After merging a branch, you can delete it with git branch -d. If the branch contains changes that haven't been merged, you'll need to use -D to force deletion."
        diagramType="branch"
      />

      <CommandCard
        title="Viewing Branch History"
        description="See the commit history of specific branches"
        command={`
# View commit history of current branch
git log

# View commit history of specific branch
git log branch-name

# View branch structure visually
git log --graph --oneline --all
        `}
        explanation="The git log command can show the commit history of specific branches. Adding the --graph flag creates a text-based visualization of the branch structure."
        diagramType="branch"
      />
    </div>
  )
}

