"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs")
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth
      setWidth(currentWidth)

      if (currentWidth >= breakpoints["3xl"]) {
        setBreakpoint("3xl")
      } else if (currentWidth >= breakpoints["2xl"]) {
        setBreakpoint("2xl")
      } else if (currentWidth >= breakpoints.xl) {
        setBreakpoint("xl")
      } else if (currentWidth >= breakpoints.lg) {
        setBreakpoint("lg")
      } else if (currentWidth >= breakpoints.md) {
        setBreakpoint("md")
      } else if (currentWidth >= breakpoints.sm) {
        setBreakpoint("sm")
      } else {
        setBreakpoint("xs")
      }
    }

    // Set initial breakpoint
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isAbove = (bp: Breakpoint) => width >= breakpoints[bp]
  const isBelow = (bp: Breakpoint) => width < breakpoints[bp]

  return { breakpoint, width, isAbove, isBelow }
}
