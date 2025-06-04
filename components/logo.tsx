import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function Logo({ size = "medium", className = "" }: LogoProps) {
  // Définir les tailles selon l'option choisie
  const sizes = {
    small: {
      container: "h-6 sm:h-7",
    },
    medium: {
      container: "h-7 sm:h-8 md:h-9",
    },
    large: {
      container: "h-9 sm:h-11 md:h-12",
    },
  }

  return (
    <img
      src="/logo-horizontal.png"
      alt="EventPass"
      className={cn(sizes[size].container, "w-auto object-contain", className)}
      loading="eager"
      decoding="async"
    />
  )
}
