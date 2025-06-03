"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useBreakpoint } from "@/hooks/use-breakpoint"

interface MainNavigationProps {
  currentPath?: string
}

export function MainNavigation({ currentPath = "/" }: MainNavigationProps) {
  const { isAbove } = useBreakpoint()

  // Ajuster la taille du texte en fonction de la taille de l'écran
  const textSize = isAbove("xl") ? "text-base" : "text-sm"

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-1 lg:space-x-2">
        <NavigationMenuItem>
          <Link href="/events" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-white/10 text-white hover:text-princeton-orange px-2 lg:px-4",
                textSize,
                currentPath.startsWith("/events") && "text-princeton-orange font-semibold",
              )}
            >
              Événements
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/create-event" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-white/10 text-white hover:text-princeton-orange px-2 lg:px-4",
                textSize,
                currentPath === "/create-event" && "text-princeton-orange font-semibold",
              )}
            >
              Créer un événement
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-white/10 text-white hover:text-princeton-orange px-2 lg:px-4",
                textSize,
                currentPath === "/dashboard" && "text-princeton-orange font-semibold",
              )}
            >
              Tableau de bord
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
