import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { EventCard } from "@/components/event-card"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveGrid } from "@/components/responsive-grid"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const events = [
  {
    id: 1,
    title: "Festival de Musique Électronique",
    description: "Une nuit inoubliable avec les meilleurs DJs internationaux",
    date: "15 Mars 2024",
    time: "20:00",
    location: "Paris, France",
    price: "45€",
    category: "Musique",
    rating: 4.8,
    participants: 1250,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Conférence Tech Innovation",
    description: "Découvrez les dernières tendances technologiques",
    date: "22 Mars 2024",
    time: "09:00",
    location: "Lyon, France",
    price: "120€",
    category: "Technologie",
    rating: 4.9,
    participants: 500,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Spectacle de Danse Contemporaine",
    description: "Une performance artistique exceptionnelle",
    date: "28 Mars 2024",
    time: "19:30",
    location: "Marseille, France",
    price: "35€",
    category: "Art",
    rating: 4.7,
    participants: 300,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Salon du Livre",
    description: "Rencontrez vos auteurs préférés et découvrez de nouveaux talents",
    date: "5 Avril 2024",
    time: "10:00",
    location: "Toulouse, France",
    price: "15€",
    category: "Culture",
    rating: 4.6,
    participants: 800,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Marathon de la Ville",
    description: "Participez au plus grand marathon de la région",
    date: "12 Avril 2024",
    time: "08:00",
    location: "Nice, France",
    price: "25€",
    category: "Sport",
    rating: 4.5,
    participants: 2000,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Festival Gastronomique",
    description: "Dégustez les spécialités de chefs renommés",
    date: "18 Avril 2024",
    time: "12:00",
    location: "Bordeaux, France",
    price: "80€",
    category: "Gastronomie",
    rating: 4.9,
    participants: 600,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = ["Tous", "Musique", "Technologie", "Art", "Culture", "Sport", "Gastronomie"]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Animated blobs - optimisés pour être moins intrusifs sur mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <SiteHeader currentPath="/events" />

      <ResponsiveContainer className="py-8">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-selective-yellow mb-2 sm:mb-4">
            Découvrir les événements
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-orange-web/80 max-w-2xl mx-auto">
            Explorez une sélection d'événements exceptionnels près de chez vous
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 h-4 w-4" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                  />
                </div>

                {/* Category */}
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date */}
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="all">Toutes les dates</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location */}
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                    <SelectItem value="toulouse">Toulouse</SelectItem>
                    <SelectItem value="nice">Nice</SelectItem>
                    <SelectItem value="bordeaux">Bordeaux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} className="mb-8 sm:mb-12">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ResponsiveGrid>

        {/* Pagination - Responsive */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-0">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                />
              </PaginationItem>
              <PaginationItem className="hidden xs:inline-block">
                <PaginationLink href="#" isActive className="bg-sinopia text-white border-sinopia">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden xs:inline-block">
                <PaginationLink href="#" className="border-princeton-orange text-rich-black bg-white hover:bg-white/90">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden sm:inline-block">
                <PaginationLink href="#" className="border-princeton-orange text-rich-black bg-white hover:bg-white/90">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden sm:inline-block">
                <PaginationEllipsis className="text-white" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
