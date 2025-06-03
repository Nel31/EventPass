import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  fluid?: boolean
  narrow?: boolean
  wide?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  narrow = false,
  wide = false,
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        "w-full px-4 mx-auto",
        {
          "max-w-7xl": !narrow && !wide && !fluid,
          "max-w-5xl": narrow,
          "max-w-screen-2xl": wide,
          "px-4 sm:px-6 lg:px-8": !fluid,
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}
