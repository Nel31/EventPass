import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { ResponsiveLogo } from "@/components/responsive-logo"
import { SearchCommand } from "@/components/search-command"
import { EventCard } from "@/components/event-card"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveGrid } from "@/components/responsive-grid"
import Link from "next/link"

const featuredEvents = [
  {
    id: 1,
    title: "Festival de Musique Électronique",
    description: "Une nuit inoubliable avec les meilleurs DJs internationaux",
    date: "15 Mars 2024",
    location: "Paris, France",
    price: "45€",
    category: "Musique",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Conférence Tech Innovation",
    description: "Découvrez les dernières tendances technologiques",
    date: "22 Mars 2024",
    location: "Lyon, France",
    price: "120€",
    category: "Technologie",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Spectacle de Danse Contemporaine",
    description: "Une performance artistique exceptionnelle",
    date: "28 Mars 2024",
    location: "Marseille, France",
    price: "35€",
    category: "Art",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Salon du Livre",
    description: "Rencontrez vos auteurs préférés et découvrez de nouveaux talents",
    date: "5 Avril 2024",
    location: "Toulouse, France",
    price: "15€",
    category: "Culture",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative overflow-hidden">
      {/* Animated blobs - optimisés pour être moins intrusifs sur mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] bg-selective-yellow rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <SiteHeader currentPath="/" />

      {/* Hero Section */}
      <section className="relative z-10 py-12 md:py-20 text-center">
        <ResponsiveContainer>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              Découvrez des <span className="text-selective-yellow">événements</span> extraordinaires
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-orange-web/80 mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto">
              EventPass vous connecte aux meilleurs événements près de chez vous. Achetez vos billets en toute sécurité
              et vivez des expériences inoubliables.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 md:mb-16">
              <SearchCommand />
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Featured Events */}
      <section className="relative z-10 py-12 md:py-16">
        <ResponsiveContainer>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-selective-yellow mb-3 md:mb-4">
              Événements en vedette
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-orange-web/80">
              Découvrez les événements les plus populaires du moment
            </p>
          </div>

          <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} className="mb-8 md:mb-12">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} featured={true} compact={false} />
            ))}
          </ResponsiveGrid>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3"
            >
              <Link href="/events">Voir tous les événements</Link>
            </Button>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 md:py-16">
        <ResponsiveContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-selective-yellow mb-2">10,000+</div>
              <div className="text-orange-web/80">Événements organisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-selective-yellow mb-2">500,000+</div>
              <div className="text-orange-web/80">Billets vendus</div>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-selective-yellow mb-2">50,000+</div>
              <div className="text-orange-web/80">Utilisateurs actifs</div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <ResponsiveContainer className="py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <ResponsiveLogo size="small" className="mb-4" />
              <p className="text-orange-web/80 text-sm">
                La plateforme de référence pour découvrir et organiser des événements exceptionnels.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Événements</h3>
              <ul className="space-y-2 text-orange-web/80 text-sm">
                <li>
                  <Link href="/events" className="hover:text-princeton-orange transition-colors">
                    Découvrir
                  </Link>
                </li>
                <li>
                  <Link href="/create-event" className="hover:text-princeton-orange transition-colors">
                    Créer
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-princeton-orange transition-colors">
                    Catégories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-orange-web/80 text-sm">
                <li>
                  <Link href="/help" className="hover:text-princeton-orange transition-colors">
                    Aide & FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-princeton-orange transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-princeton-orange transition-colors">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Compte</h3>
              <ul className="space-y-2 text-orange-web/80 text-sm">
                <li>
                  <Link href="/login" className="hover:text-princeton-orange transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-princeton-orange transition-colors">
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-princeton-orange transition-colors">
                    Tableau de bord
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-orange-web/80 text-sm">
            <p>&copy; 2024 EventPass. Tous droits réservés.</p>
          </div>
        </ResponsiveContainer>
      </footer>
    </div>
  )
}
