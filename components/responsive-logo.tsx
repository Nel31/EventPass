import Link from "next/link"
import { cn } from "@/lib/utils"

interface ResponsiveLogoProps {
  size?: "small" | "medium" | "large"
  withText?: boolean
  className?: string
}

export function ResponsiveLogo({ size = "medium", withText = true, className = "" }: ResponsiveLogoProps) {
  // Définir les tailles selon l'option choisie
  const sizes = {
    small: {
      container: "h-6 sm:h-7",
      spacing: "space-x-1 sm:space-x-2",
    },
    medium: {
      container: "h-7 sm:h-8 md:h-9",
      spacing: "space-x-1.5 sm:space-x-2",
    },
    large: {
      container: "h-9 sm:h-11 md:h-12",
      spacing: "space-x-2 sm:space-x-3",
    },
  }

  return (
    <Link href="/" className={cn(`flex items-center ${sizes[size].spacing}`, className)}>
      <img
        src="/logo-horizontal.png"
        alt="EventPass"
        className={cn(sizes[size].container, "w-auto object-contain")}
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}
