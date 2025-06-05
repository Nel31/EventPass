import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveGrid } from "@/components/responsive-grid"
import { EventCard } from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Search, WhatsApp } from "lucide-react"
import Link from "next/link"

const featuredEvents = [
  {
    id: 1,
    title: "Festival de Musique Électronique",
    description: "Une nuit inoubliable avec les meilleurs DJs internationaux",
    date: "15 Mars 2024",
    location: "Cotonou, Bénin",
    price: "10000 FCFA",
    category: "Musique",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Conférence Tech Innovation",
    description: "Découvrez les dernières tendances technologiques",
    date: "22 Mars 2024",
    location: "Cotonou, Bénin",
    price: "5000 FCFA",
    category: "Technologie",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Spectacle de Danse Contemporaine",
    description: "Une performance artistique exceptionnelle",
    date: "28 Mars 2024",
    location: "Cotonou, Bénin",
    price: "3000 FCFA",
    category: "Art",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Salon du Livre",
    description: "Rencontrez vos auteurs préférés et découvrez de nouveaux talents",
    date: "5 Avril 2024",
    location: "Cotonou, Bénin", 
    price: "2000 FCFA",
    category: "Culture",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Header */}
      <SiteHeader currentPath="/" />

      <ResponsiveContainer className="py-8">
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 h-4 w-4" />
          <Input
            placeholder="Rechercher un événement ou un lieu..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange h-12 text-lg"
          />
        </div>

        {/* Events Grid */}
        <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} className="mb-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ResponsiveGrid>

        {/* WhatsApp Support Button */}
        <Button
          className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg z-50 flex items-center gap-2"
          size="lg"
          asChild
        >
          <Link href="https://wa.me/22990000000" target="_blank" rel="noopener noreferrer">
            <WhatsApp className="h-6 w-6" />
            <span className="hidden sm:inline">Besoin d'aide ?</span>
          </Link>
        </Button>
      </ResponsiveContainer>
    </div>
  )
}