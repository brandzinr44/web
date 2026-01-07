"use client"

import type React from "react"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { usePathname } from "next/navigation"
// import { LoadingReveal } from "@/components/loading-reveal"

export function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isGalleryRoute = pathname.startsWith("/gallery")

  return (
    <>
      {/* <LoadingReveal /> */}
      {!isGalleryRoute && <SiteHeader />}
      {children}
      <Footer />
      <ThemeToggleButton />
    </>
  )
}
