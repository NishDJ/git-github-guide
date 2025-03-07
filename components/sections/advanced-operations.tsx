"use client"

import { CommandCard } from "@/components/command-card"
import { ConflictAnimation } from "@/components/animations/conflict-animation"

export function AdvancedOperations() {
  return (
    <div className="space-y-6">
      <CommandCard
        title="Resolving Merge Conflicts"
        description="Handle conflicting changes between branches"
        command={`
# When a merge conflict occurs:
# 1. Open the conflicted files and resolve the conflicts
# 2. Add the resolved files
git add resolved-file.txt

# 3. Complete the merge
git commit
        `}
        explanation="Merge conflicts occur when Git can't automatically merge changes. You'll need to manually edit the conflicted files, resolve the conflicts, then add and commit the resolved files."
        diagramType="conflict"
        animation={<ConflictAnimation />}
      />

      <CommandCard
        title="Reverting Changes"
        description="Undo commits while preserving history"
        command={`
# Revert a specific commit
git revert commit-hash

# Revert the last commit
git revert HEAD
        `}
        explanation="The git revert command creates a new commit that undoes the changes made in a previous commit. This is a safe way to undo changes because it doesn't alter the commit history."
        diagramType="general"
      />

      <CommandCard
        title="Resetting Changes"
        description="Move the branch pointer to a different commit"
        command={`
# Soft reset (keeps changes staged)
git reset --soft commit-hash

# Mixed reset (keeps changes unstaged)
git reset commit-hash

# Hard reset (discards changes)
git reset --hard commit-hash
        `}
        explanation="The git reset command moves the branch pointer to a different commit. The --soft flag keeps your changes staged, the default (--mixed) keeps your changes but unstaged, and --hard discards your changes entirely."
        diagramType="general"
      />

      <CommandCard
        title="Stashing Changes"
        description="Temporarily save changes without committing"
        command={`
# Stash current changes
git stash

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{n}

# Remove most recent stash
git stash drop
        `}
        explanation="The git stash command temporarily saves your changes so you can switch branches without committing. You can later reapply these changes with git stash apply."
        diagramType="general"
      />

      <CommandCard
        title="Cherry-Picking Commits"
        description="Apply specific commits from one branch to another"
        command={`
# Cherry-pick a specific commit
git cherry-pick commit-hash

# Cherry-pick multiple commits
git cherry-pick commit-hash-1 commit-hash-2

# Cherry-pick without committing
git cherry-pick -n commit-hash
        `}
        explanation="The git cherry-pick command applies the changes from specific commits to your current branch. This is useful when you want to apply only certain changes from another branch."
        diagramType="branch"
      />

      <CommandCard
        title="Rebasing Branches"
        description="Reapply commits on top of another branch"
        command={`
# Rebase current branch onto another branch
git rebase target-branch

# Interactive rebase for editing commits
git rebase -i HEAD~3
        `}
        explanation="The git rebase command reapplies your commits on top of another branch. This creates a linear history and can be cleaner than merging. Interactive rebasing (-i) allows you to edit, squash, or drop commits during the process."
        diagramType="branch"
      />
    </div>
  )
}

