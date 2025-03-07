"use client"

import { CommandCard } from "@/components/command-card"
import { PushPullAnimation } from "@/components/animations/push-pull-animation"
import { PullRequestAnimation } from "@/components/animations/pull-request-animation"

export function RemoteRepositories() {
  return (
    <div className="space-y-6">
      <CommandCard
        title="Connecting to GitHub"
        description="Link your local repository to a GitHub repository"
        command={`
# Add a remote repository
git remote add origin https://github.com/username/repository.git

# Verify remote connections
git remote -v
        `}
        explanation="The git remote add command connects your local repository to a remote repository (like one on GitHub). 'Origin' is the conventional name for the primary remote repository."
        diagramType="push-pull"
        examples={[
          "Setting up a new project: After creating a repository on GitHub, connect your local project with git remote add origin https://github.com/username/my-project.git",
          "Adding multiple remotes: For open source contributions, you might have both origin (your fork) and upstream (the original repository) as remotes",
        ]}
      />

      <CommandCard
        title="Pushing to GitHub"
        description="Upload your local commits to GitHub"
        command={`
# Push current branch to remote
git push origin branch-name

# Push and set upstream (track remote branch)
git push -u origin branch-name

# Push all branches
git push --all origin
        `}
        explanation="The git push command uploads your commits to the remote repository. The -u flag sets up tracking, which simplifies future push and pull commands."
        diagramType="push-pull"
        animation={<PushPullAnimation />}
        examples={[
          "First push: git push -u origin main to push your main branch and set up tracking",
          "Feature branch: git push origin feature-login to share a feature branch with your team",
          "Force push (use with caution): git push --force origin branch-name when you've rewritten history locally",
        ]}
      />

      <CommandCard
        title="Pulling from GitHub"
        description="Download and integrate changes from GitHub"
        command={`
# Pull changes from remote
git pull origin branch-name

# Pull with rebase instead of merge
git pull --rebase origin branch-name
        `}
        explanation="The git pull command fetches changes from the remote repository and merges them into your current branch. It's essentially a combination of git fetch and git merge."
        diagramType="push-pull"
        examples={[
          "Daily workflow: git pull origin main to get the latest changes from your team",
          "Clean history: git pull --rebase origin main to incorporate remote changes without creating merge commits",
          "Specific branch: git pull origin feature-auth to get updates to a feature branch you're collaborating on",
        ]}
      />

      <CommandCard
        title="Creating Pull Requests"
        description="Request to merge your changes into another branch"
        command={`
# Push your branch to GitHub first
git push -u origin your-branch-name

# Then create a pull request on GitHub.com
# Navigate to your repository > Pull requests > New pull request
# Select the base branch and your branch, then create the pull request
        `}
        explanation="Pull requests are a GitHub feature that lets you notify others about changes you've pushed to a branch. They're central to collaborative workflows, allowing code review and discussion before changes are merged."
        diagramType="push-pull"
        animation={<PullRequestAnimation />}
        examples={[
          "Feature completion: Create a pull request when you've finished a feature and want it reviewed before merging to main",
          "Bug fix: Submit a pull request for a critical bug fix that needs immediate review",
          "Open source contribution: Submit a pull request to an open source project after forking and making improvements",
        ]}
      />

      <CommandCard
        title="Cloning Repositories"
        description="Create a local copy of a GitHub repository"
        command={`
# Clone a repository
git clone https://github.com/username/repository.git

# Clone to a specific directory
git clone https://github.com/username/repository.git my-directory

# Clone a specific branch
git clone -b branch-name https://github.com/username/repository.git
        `}
        explanation="The git clone command creates a copy of a remote repository on your local machine. It automatically sets up the remote connection and checks out the default branch."
        diagramType="push-pull"
        examples={[
          "Starting with an existing project: git clone https://github.com/organization/project.git to get a complete copy of the repository",
          "Specific version: git clone -b v2.0 https://github.com/username/app.git to clone a specific tagged version",
          "Shallow clone: git clone --depth=1 https://github.com/username/large-repo.git to clone only the latest commit (useful for large repositories)",
        ]}
      />

      <CommandCard
        title="Working with Forks"
        description="Contribute to projects you don't have direct access to"
        command={`
# Add the original repository as a remote
git remote add upstream https://github.com/original-owner/repository.git

# Fetch changes from the original repository
git fetch upstream

# Merge changes from the original repository
git merge upstream/main
        `}
        explanation="Forking is a GitHub feature that creates a copy of a repository under your account. You can then clone your fork, make changes, and submit pull requests to the original repository."
        diagramType="push-pull"
        examples={[
          "Open source contribution: Fork a repository, clone your fork, create a branch for your changes, then submit a pull request",
          "Staying updated: Regularly fetch and merge from the upstream repository to keep your fork in sync",
          "Team workflow: In some teams, each developer works on their own fork of the main repository",
        ]}
      />
    </div>
  )
}

