"use client"

import { CommandCard } from "@/components/command-card"
import { CommitAnimation } from "@/components/animations/commit-animation"

export function BasicCommands() {
  return (
    <div className="space-y-6">
      <CommandCard
        title="Initializing a Repository"
        description="Create a new Git repository in your current directory"
        command={`
# Navigate to your project directory
cd my-project

# Initialize a new Git repository
git init
        `}
        explanation="The git init command creates a new Git repository. It adds a hidden .git directory to your project folder, which contains all the metadata and version history for your project."
        diagramType="general"
        examples={[
          "Starting a new project: Create a folder for your project, navigate to it, and run git init to start tracking changes.",
          "Converting an existing project: If you have a project that isn't using Git yet, navigate to its directory and run git init to start tracking it.",
        ]}
      />

      <CommandCard
        title="Staging Changes"
        description="Add files to the staging area before committing"
        command={`
# Add a specific file to staging
git add filename.txt

# Add multiple files
git add file1.txt file2.txt

# Add all files in the current directory
git add .
        `}
        explanation="The git add command adds changes to the staging area. This is a preparatory step before committing. You can add specific files or all changes at once."
        diagramType="commit"
        examples={[
          "Selective staging: Use git add file1.js file2.js to stage only specific files when you've made changes to multiple files but want to commit them separately.",
          "Adding all changes: After completing a feature, use git add . to stage all modified files for a single comprehensive commit.",
        ]}
      />

      <CommandCard
        title="Committing Changes"
        description="Save staged changes to the repository"
        command={`
# Commit with a message
git commit -m "Add new feature"

# Commit all modified files (skips staging)
git commit -am "Fix bugs"
        `}
        explanation="The git commit command saves your staged changes to the repository with a descriptive message. This creates a new commit object in the Git database that contains a snapshot of your changes."
        diagramType="commit"
        animation={<CommitAnimation />}
        examples={[
          'Feature completion: git commit -m "Add user authentication feature" to record the addition of a complete feature.',
          'Quick fix: git commit -am "Fix navigation bar styling" to stage and commit all changes in one command when making a quick fix.',
          'Conventional commits: git commit -m "fix: resolve memory leak in image carousel" to follow the conventional commits format for better changelog generation.',
        ]}
      />

      <CommandCard
        title="Checking Status"
        description="View the state of your working directory and staging area"
        command={`
# Check status
git status
        `}
        explanation="The git status command shows the state of your working directory and staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git."
        diagramType="general"
        examples={[
          "Before committing: Run git status to verify which files are staged and which are still untracked before making a commit.",
          "After pulling: Use git status to see if there are any conflicts or changes that need to be addressed after pulling from a remote repository.",
        ]}
      />

      <CommandCard
        title="Viewing History"
        description="See the commit history of your repository"
        command={`
# View commit history
git log

# View compact history
git log --oneline

# View history with graph
git log --graph --oneline --all
        `}
        explanation="The git log command shows the commit history of your repository. You can see commit messages, authors, dates, and commit IDs. Various flags can be used to format the output."
        diagramType="branch"
        examples={[
          "Investigating a bug: Use git log to find when a particular bug was introduced by looking through commit history.",
          "Visualizing branch structure: git log --graph --oneline --all --decorate to see a visual representation of your branch structure and merge history.",
          'Finding specific changes: git log -p -S"searchTerm" to find commits that added or removed code containing "searchTerm".',
        ]}
      />
    </div>
  )
}

