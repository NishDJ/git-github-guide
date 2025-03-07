"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FAQSection() {
  return (
    <div className="space-y-6">
      <Card className="bg-[#252630] border-[#8be9fd]">
        <CardHeader>
          <CardTitle className="text-[#50fa7b]">Frequently Asked Questions</CardTitle>
          <CardDescription className="text-[#f8f8f2]">Common questions about Git and GitHub</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-[#6272a4]">
              <AccordionTrigger className="text-[#ff79c6] hover:text-[#ff79c6] hover:no-underline">
                What's the difference between Git and GitHub?
              </AccordionTrigger>
              <AccordionContent className="text-[#f8f8f2]">
                <p>
                  <strong className="text-[#8be9fd]">Git</strong> is a distributed version control system that tracks
                  changes in your code. It runs locally on your computer.
                </p>
                <p className="mt-2">
                  <strong className="text-[#8be9fd]">GitHub</strong> is a cloud-based hosting service for Git
                  repositories. It adds collaboration features like pull requests, issues, and actions on top of Git.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-[#6272a4]">
              <AccordionTrigger className="text-[#ff79c6] hover:text-[#ff79c6] hover:no-underline">
                How do I undo my last commit?
              </AccordionTrigger>
              <AccordionContent className="text-[#f8f8f2]">
                <p>To undo your last commit while keeping the changes in your working directory:</p>
                <pre className="bg-[#282a36] p-2 rounded-md mt-2 overflow-x-auto">
                  <code>git reset --soft HEAD~1</code>
                </pre>
                <p className="mt-2">To completely remove the last commit and all changes:</p>
                <pre className="bg-[#282a36] p-2 rounded-md mt-2 overflow-x-auto">
                  <code>git reset --hard HEAD~1</code>
                </pre>
                <p className="mt-2">To create a new commit that undoes the last commit (safer for shared branches):</p>
                <pre className="bg-[#282a36] p-2 rounded-md mt-2 overflow-x-auto">
                  <code>git revert HEAD</code>
                </pre>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-[#6272a4]">
              <AccordionTrigger className="text-[#ff79c6] hover:text-[#ff79c6] hover:no-underline">
                What should I do if I have a merge conflict?
              </AccordionTrigger>
              <AccordionContent className="text-[#f8f8f2]">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    First, identify which files have conflicts using{" "}
                    <code className="bg-[#44475a] px-1 rounded">git status</code>
                  </li>
                  <li>
                    Open each conflicted file in your editor and look for the conflict markers (
                    <code className="bg-[#44475a] px-1 rounded">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>,{" "}
                    <code className="bg-[#44475a] px-1 rounded">=======</code>, and{" "}
                    <code className="bg-[#44475a] px-1 rounded">&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>)
                  </li>
                  <li>Edit the files to resolve the conflicts by choosing which changes to keep</li>
                  <li>Remove the conflict markers</li>
                  <li>
                    Stage the resolved files with{" "}
                    <code className="bg-[#44475a] px-1 rounded">git add &lt;filename&gt;</code>
                  </li>
                  <li>
                    Complete the merge with <code className="bg-[#44475a] px-1 rounded">git commit</code>
                  </li>
                </ol>
                <p className="mt-2">
                  If the conflict is too complex, you can abort the merge with{" "}
                  <code className="bg-[#44475a] px-1 rounded">git merge --abort</code>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-[#6272a4]">
              <AccordionTrigger className="text-[#ff79c6] hover:text-[#ff79c6] hover:no-underline">
                How do I contribute to an open source project on GitHub?
              </AccordionTrigger>
              <AccordionContent className="text-[#f8f8f2]">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Fork the repository to your GitHub account</li>
                  <li>
                    Clone your fork to your local machine:{" "}
                    <code className="bg-[#44475a] px-1 rounded">
                      git clone https://github.com/your-username/repository.git
                    </code>
                  </li>
                  <li>
                    Create a new branch for your changes:{" "}
                    <code className="bg-[#44475a] px-1 rounded">git checkout -b feature-branch</code>
                  </li>
                  <li>Make your changes and commit them</li>
                  <li>
                    Push your branch to your fork:{" "}
                    <code className="bg-[#44475a] px-1 rounded">git push origin feature-branch</code>
                  </li>
                  <li>Go to the original repository on GitHub and create a pull request</li>
                  <li>Describe your changes in the pull request</li>
                </ol>
                <p className="mt-2">
                  Always check the project's contributing guidelines before submitting a pull request.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-[#6272a4]">
              <AccordionTrigger className="text-[#ff79c6] hover:text-[#ff79c6] hover:no-underline">
                What's the difference between merge and rebase?
              </AccordionTrigger>
              <AccordionContent className="text-[#f8f8f2]">
                <p>
                  <strong className="text-[#8be9fd]">Merge</strong> creates a new "merge commit" that combines the
                  changes from both branches. It preserves the branch history exactly as it happened.
                </p>
                <pre className="bg-[#282a36] p-2 rounded-md mt-2 overflow-x-auto">
                  <code>git checkout main git merge feature-branch</code>
                </pre>

                <p className="mt-3">
                  <strong className="text-[#8be9fd]">Rebase</strong> moves or "replays" your branch commits on top of
                  the latest version of the target branch. This creates a linear history but rewrites the commit
                  history.
                </p>
                <pre className="bg-[#282a36] p-2 rounded-md mt-2 overflow-x-auto">
                  <code>git checkout feature-branch git rebase main</code>
                </pre>

                <p className="mt-3 text-[#ff5555]">
                  <strong>Important:</strong> Never rebase commits that have been pushed to a shared repository unless
                  you're absolutely sure no one else is using them.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

