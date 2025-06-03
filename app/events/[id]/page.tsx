import { Calendar, MapPin, Users, Star, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Mock data for the event
const event = {
  id: 1,
  title: "Festival de Musique Électronique",
  description:
    "Plongez dans l'univers électrisant de la musique électronique avec les meilleurs DJs internationaux. Une nuit inoubliable vous attend avec des performances exceptionnelles, des effets visuels époustouflantes et une ambiance unique.",
  longDescription: `
    Le Festival de Musique Électronique revient pour sa 5ème édition avec une programmation exceptionnelle. 
    
    Cette année, nous accueillons les plus grands noms de la scène électronique internationale pour une soirée mémorable. 
    
    Au programme :
    • 8 heures de musique non-stop
    • 6 DJs internationaux
    • Effets visuels et mapping 3D
    • 3 scènes différentes
    • Food trucks et bars
    • Vestiaire et consigne gratuits
    
    L'événement se déroule dans un cadre exceptionnel avec une sonorisation de qualité professionnelle et des installations artistiques uniques.
  `,
  date: "15 Mars 2024",
  time: "20:00",
  endTime: "04:00",
  location: "Palais des Sports, Paris",
  fullAddress: "8 Boulevard de Bercy, 75012 Paris",
  price: "45€",
  category: "Musique",
  rating: 4.8,
  participants: 1250,
  maxParticipants: 2000,
  organizer: "ElectroEvents Paris",
  image: "/placeholder.svg?height=400&width=800",
  tickets: [
    {
      id: 1,
      name: "Accès Standard",
      price: "45€",
      description: "Accès à toutes les scènes, vestiaire inclus",
      available: 750,
    },
    {
      id: 2,
      name: "Accès VIP",
      price: "85€",
      description: "Accès VIP, bar privé, parking inclus",
      available: 150,
    },
    {
      id: 3,
      name: "Accès Backstage",
      price: "150€",
      description: "Accès backstage, meet & greet avec les artistes",
      available: 25,
    },
  ],
}

const relatedEvents = [
  {
    id: 2,
    title: "Soirée Jazz & Blues",
    date: "22 Mars 2024",
    location: "Paris",
    price: "35€",
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 3,
    title: "Concert Rock Alternatif",
    date: "28 Mars 2024",
    location: "Paris",
    price: "40€",
    image: "/placeholder.svg?height=150&width=200",
  },
]

export default function EventDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo-main.png" alt="EventPass" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              <span className="text-2xl font-bold text-selective-yellow">EventPass</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-princeton-orange transition-colors">
                Accueil
              </Link>
              <Link href="/events" className="text-princeton-orange font-semibold">
                Événements
              </Link>
              <Link href="/create-event" className="text-white hover:text-princeton-orange transition-colors">
                Créer un événement
              </Link>
              <Link href="/dashboard" className="text-white hover:text-princeton-orange transition-colors">
                Tableau de bord
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-princeton-orange hover:bg-white/10">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button className="bg-sinopia hover:bg-engineering-orange text-white">
                <Link href="/register">S'inscrire</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-orange-web/80 text-sm">
            <Link href="/" className="hover:text-princeton-orange">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link href="/events" className="hover:text-princeton-orange">
              Événements
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{event.title}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-princeton-orange text-rich-black font-semibold mb-3">{event.category}</Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
                    <p className="text-orange-web/80 text-lg">{event.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-rich-black bg-white hover:text-princeton-orange hover:bg-white/90"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-rich-black bg-white hover:text-princeton-orange hover:bg-white/90"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-2xl">Informations de l'événement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-white">
                      <Calendar className="h-5 w-5 mr-3 text-princeton-orange" />
                      <div>
                        <div className="font-semibold">{event.date}</div>
                        <div className="text-orange-web/80 text-sm">
                          {event.time} - {event.endTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-white">
                      <MapPin className="h-5 w-5 mr-3 text-princeton-orange" />
                      <div>
                        <div className="font-semibold">{event.location}</div>
                        <div className="text-orange-web/80 text-sm">{event.fullAddress}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-white">
                      <Users className="h-5 w-5 mr-3 text-princeton-orange" />
                      <div>
                        <div className="font-semibold">
                          {event.participants} / {event.maxParticipants} participants
                        </div>
                        <div className="text-orange-web/80 text-sm">Places disponibles</div>
                      </div>
                    </div>

                    <div className="flex items-center text-white">
                      <Star className="h-5 w-5 mr-3 text-princeton-orange" />
                      <div>
                        <div className="font-semibold">{event.rating}/5</div>
                        <div className="text-orange-web/80 text-sm">Note moyenne</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div>
                  <h3 className="text-white font-semibold mb-2">Organisé par</h3>
                  <p className="text-orange-web/80">{event.organizer}</p>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-2xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-orange-web/80 whitespace-pre-line leading-relaxed">{event.longDescription}</div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Selection */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-xl">Choisir vos billets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-white/20 rounded-lg p-4 hover:border-princeton-orange transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{ticket.name}</h4>
                      <span className="text-selective-yellow font-bold text-lg">{ticket.price}</span>
                    </div>
                    <p className="text-orange-web/80 text-sm mb-3">{ticket.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-web/80 text-sm">{ticket.available} places restantes</span>
                      <Button size="sm" className="bg-sinopia hover:bg-engineering-orange text-white">
                        Sélectionner
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full bg-sinopia hover:bg-engineering-orange text-white text-lg py-3">
                  <Link href={`/checkout/${event.id}`}>Acheter maintenant</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Related Events */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-xl">Événements similaires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedEvents.map((relatedEvent) => (
                  <div key={relatedEvent.id} className="flex space-x-3">
                    <img
                      src={relatedEvent.image || "/placeholder.svg"}
                      alt={relatedEvent.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{relatedEvent.title}</h4>
                      <p className="text-orange-web/80 text-xs mb-1">{relatedEvent.date}</p>
                      <p className="text-orange-web/80 text-xs">{relatedEvent.location}</p>
                      <p className="text-selective-yellow font-semibold text-sm">{relatedEvent.price}</p>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                >
                  <Link href="/events">Voir plus d'événements</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
