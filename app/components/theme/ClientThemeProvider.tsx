"use client"

import * as React from "react"

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Force dark mode by adding the dark class to the document
    document.documentElement.classList.add('dark')
  }, [])

  // During SSR and initial hydration, render children without theme provider
  // This prevents hydration mismatches
  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>
  }

  return <>{children}</>
}
