"use client"

import { Button } from "@/components/ui/button"
import { ResponsiveLogo } from "@/components/responsive-logo"
import { MobileMenu } from "@/components/mobile-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResponsiveContainer } from "@/components/responsive-container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  currentPath?: string
  isLoggedIn?: boolean
  userName?: string
  userInitials?: string
}

export function SiteHeader({
  currentPath = "/",
  isLoggedIn,
  userName = "John Doe",
  userInitials = "JD",
}: SiteHeaderProps) {
  const { signOut } = useAuthActions()
  const { user, loading } = useUser()

  // Utiliser l'état réel de l'utilisateur si isLoggedIn n'est pas fourni
  const userIsLoggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user

  return (
    <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0">
      <ResponsiveContainer className="py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <ResponsiveLogo />
          </div>

          {/* Navigation pour desktop - Toujours afficher Événements et Créer un événement */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/events"
              className={cn(
                "text-white hover:text-princeton-orange transition-colors",
                currentPath.startsWith("/events") && "text-princeton-orange font-semibold",
              )}
            >
              Événements
            </Link>

            <Link
              href="/create-event"
              className={cn(
                "text-white hover:text-princeton-orange transition-colors",
                currentPath === "/create-event" && "text-princeton-orange font-semibold",
              )}
            >
              Créer un événement
            </Link>

            {/* Afficher le tableau de bord seulement si connecté */}
            {userIsLoggedIn && (
              <Link
                href="/dashboard"
                className={cn(
                  "text-white hover:text-princeton-orange transition-colors",
                  currentPath === "/dashboard" && "text-princeton-orange font-semibold",
                )}
              >
                Tableau de bord
              </Link>
            )}
          </div>

          {/* Boutons d'authentification pour desktop - Seulement si déconnecté */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {!userIsLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  className="text-white bg-transparent border-2 border-white/30 hover:border-princeton-orange hover:text-princeton-orange hover:bg-transparent transition-all duration-200 rounded-full"
                  size="sm"
                >
                  <Link href="/login" className="text-xs sm:text-sm px-2">
                    Connexion
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-white bg-transparent border-2 border-princeton-orange hover:border-selective-yellow hover:text-selective-yellow hover:bg-transparent transition-all duration-200 rounded-full"
                  size="sm"
                >
                  <Link href="/register" className="text-xs sm:text-sm px-2">
                    S'inscrire
                  </Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-110">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
                      <AvatarFallback className="bg-princeton-orange text-rich-black">{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="w-full">
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={signOut}>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Menu mobile */}
          <MobileMenu isLoggedIn={userIsLoggedIn} />
        </nav>
      </ResponsiveContainer>
    </header>
  )
}
