import { GitGuide } from "@/components/git-guide"
import { ParallaxHeader } from "@/components/parallax-header"
import { CommandSearch } from "@/components/command-search"
import { ProgressTracker } from "@/components/progress-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ParallaxHeader />

      <div id="content" className="container mx-auto px-4 py-16">
        {/* Search and progress tracking */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-primary">Git & GitHub Guide</h2>
          <div className="flex flex-wrap items-center gap-3">
            <CommandSearch />
            <ProgressTracker />
          </div>
        </div>

        <GitGuide />
      </div>

      <footer className="bg-muted py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-primary font-semibold">Git & GitHub Visual Guide</h3>
              <p className="text-sm text-muted-foreground mt-1">Created with the Dracula theme for Git visualization</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300">
                About
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300">
                Resources
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Git Visual Guide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

