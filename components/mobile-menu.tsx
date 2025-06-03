"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResponsiveLogo } from "@/components/responsive-logo"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  isLoggedIn?: boolean
}

export function MobileMenu({ isLoggedIn = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/events", label: "Événements" },
    { href: "/create-event", label: "Créer un événement" },
    { href: "/dashboard", label: "Tableau de bord" },
  ]

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gradient-to-r hover:from-princeton-orange/20 hover:to-sinopia/20 transition-all duration-200 border border-transparent hover:border-princeton-orange/30"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[350px] p-0 border-0 bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood"
        >
          {/* Header avec gradient */}
          <SheetHeader className="bg-chocolate-cosmos p-4 border-b border-white/20 relative overflow-hidden">
            <SheetTitle asChild>
              <div className="relative z-10">
                <ResponsiveLogo size="medium" />
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Navigation avec effets de gradient */}
          <nav className="flex flex-col p-4 space-y-2 relative">
            {/* Blob animé en arrière-plan */}
            <div className="absolute top-10 right-4 w-32 h-32 bg-gradient-to-br from-princeton-orange/20 to-sinopia/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 left-4 w-24 h-24 bg-gradient-to-br from-selective-yellow/20 to-orange-web/20 rounded-full blur-xl animate-pulse delay-1000"></div>

            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-white hover:text-selective-yellow transition-all duration-300 py-3 px-4 text-lg rounded-xl group overflow-hidden",
                  "hover:bg-gradient-to-r hover:from-princeton-orange/20 hover:via-sinopia/20 hover:to-engineering-orange/20",
                  "hover:border hover:border-princeton-orange/30 hover:shadow-lg hover:shadow-princeton-orange/20",
                  "transform hover:translate-x-2 hover:scale-105",
                )}
                onClick={handleLinkClick}
              >
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}

            {/* Section des boutons d'authentification avec gradient */}
            <div className="pt-6 mt-6 border-t border-gradient-to-r from-transparent via-princeton-orange/30 to-transparent flex flex-col space-y-3 relative">
              {/* Effet de fond dégradé pour la section */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-chocolate-cosmos/50 rounded-xl"></div>

              {!isLoggedIn ? (
                <div className="relative z-10 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-princeton-orange/50 text-rich-black bg-white hover:bg-white/90 hover:border-princeton-orange transition-all duration-300 hover:shadow-lg hover:shadow-princeton-orange/20"
                    onClick={handleLinkClick}
                  >
                    <Link href="/login">Connexion</Link>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-sinopia via-engineering-orange to-princeton-orange hover:from-engineering-orange hover:via-sinopia hover:to-penn-red text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sinopia/30"
                    onClick={handleLinkClick}
                  >
                    <Link href="/register">S'inscrire</Link>
                  </Button>
                </div>
              ) : (
                <div className="relative z-10">
                  <Button
                    variant="outline"
                    className="w-full border-princeton-orange/50 text-rich-black bg-white hover:bg-white/90 hover:border-princeton-orange transition-all duration-300 hover:shadow-lg hover:shadow-princeton-orange/20"
                    onClick={handleLinkClick}
                  >
                    Déconnexion
                  </Button>
                </div>
              )}
            </div>
          </nav>

          {/* Effet de bordure dégradée */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-princeton-orange/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sinopia/50 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-princeton-orange/30 to-transparent"></div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
