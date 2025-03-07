import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { AnimationProvider } from "@/contexts/animation-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { AnimationSettings } from "@/components/animation-settings"
import { ParticleBackground } from "@/components/particle-background"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { SkipLink } from "@/components/skip-link"
import { BrowserCompatibility } from "@/components/browser-compatibility"

export const metadata: Metadata = {
  title: "Git & GitHub: A Visual Guide for Beginners",
  description: "Learn version control concepts with interactive visualizations and practical examples",
  keywords: "git, github, version control, tutorial, guide, visualization",
  authors: [{ name: "Nishant Jain" }],
  creator: "Git Visual Guide Team",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#252630" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gradient-CiLCsBvbGDi15UczwiyMgmxnHm0VlO.png"
          as="image"
        />
      </head>
      <body className="antialiased font-hack">
        <ThemeProvider>
          <AnimationProvider>
            <SkipLink />
            <ParticleBackground />
            {children}
            <AnimationSettings />
            <ThemeSwitcher />
            <BrowserCompatibility />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'