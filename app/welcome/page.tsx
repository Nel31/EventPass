"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveLogo } from "@/components/responsive-logo"
import { useUser } from "@/hooks/use-user"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export default function WelcomePage() {
  const router = useRouter()
  const { user, loading } = useUser()
  const { toast } = useToast()
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleChoice = (choice: "find" | "organize") => {
    setSelectedChoice(choice)

    toast({
      title: "Parfait !",
      description: choice === "find" ? "Explorons les événements disponibles !" : "Créons votre premier événement !",
      variant: "success",
    })

    setTimeout(() => {
      if (choice === "find") {
        router.push("/events")
      } else {
        router.push("/create-event")
      }
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-princeton-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-selective-yellow rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-2000"></div>
      </div>

      <ResponsiveContainer className="py-8 relative z-10">
        {/* Header avec logo */}
        <div className="text-center mb-12">
          <ResponsiveLogo size="large" className="justify-center mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-selective-yellow mb-4">Bienvenue sur EventPass ! 🎉</h1>
          <p className="text-orange-web/80 text-lg max-w-2xl mx-auto">
            Pour commencer, dites-nous ce qui vous intéresse le plus
          </p>
        </div>

        {/* Choix principal */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Trouver des événements */}
            <Card
              className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedChoice === "find" ? "ring-2 ring-princeton-orange" : ""
              }`}
              onClick={() => handleChoice("find")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-princeton-orange to-sinopia rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-selective-yellow">Trouver des événements</CardTitle>
                <CardDescription className="text-orange-web/80">
                  Découvrez et participez à des événements près de chez vous
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Calendar className="h-5 w-5 mr-3 text-princeton-orange" />
                    <span>Parcourir les événements disponibles</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Users className="h-5 w-5 mr-3 text-princeton-orange" />
                    <span>Acheter des billets en toute sécurité</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Search className="h-5 w-5 mr-3 text-princeton-orange" />
                    <span>Filtrer par catégorie et localisation</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-sinopia hover:bg-engineering-orange text-white mt-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleChoice("find")
                  }}
                >
                  Explorer les événements
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Organiser des événements */}
            <Card
              className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedChoice === "organize" ? "ring-2 ring-princeton-orange" : ""
              }`}
              onClick={() => handleChoice("organize")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-selective-yellow to-orange-web rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-rich-black" />
                </div>
                <CardTitle className="text-2xl text-selective-yellow">Organiser un événement</CardTitle>
                <CardDescription className="text-orange-web/80">Créez et gérez vos propres événements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Calendar className="h-5 w-5 mr-3 text-princeton-orange" />
                    <span>Créer des événements facilement</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Users className="h-5 w-5 mr-3 text-princeton-orange" />
                    <span>Gérer les inscriptions et billets</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Search className="h-5 w-5 mr-3 text-princeton-orange" />
                    <span>Suivre les statistiques en temps réel</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-selective-yellow to-orange-web hover:from-orange-web hover:to-selective-yellow text-rich-black font-semibold mt-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleChoice("organize")
                  }}
                >
                  Créer mon événement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Option pour continuer plus tard */}
          <div className="text-center">
            <p className="text-orange-web/60 text-sm mb-4">
              Pas sûr de votre choix ? Vous pourrez toujours changer d'avis plus tard.
            </p>
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-princeton-orange hover:text-selective-yellow hover:bg-white/10"
            >
              Aller au tableau de bord
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
