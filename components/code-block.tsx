import { CodeSnippet } from "@/components/code-snippet"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  caption?: string
}

/**
 * CodeBlock component
 * Wrapper around CodeSnippet with consistent styling
 */
export function CodeBlock({ code, language = "bash", showLineNumbers = true, caption }: CodeBlockProps) {
  return <CodeSnippet code={code} language={language} showLineNumbers={showLineNumbers} caption={caption} />
}

