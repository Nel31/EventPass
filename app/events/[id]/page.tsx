import { Calendar, MapPin, Users, Star, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
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
  location: "Palais des Sports, Cotonou",
  fullAddress: "8 Boulevard de Bercy, Cotonou, Bénin",
  price: "10000 FCFA",
  category: "Musique",
  rating: 4.8,
  participants: 1250,
  maxParticipants: 2000,
  organizer: "ElectroEvents Bénin",
  image: "/placeholder.svg?height=400&width=800",
}

const relatedEvents = [
  {
    id: 2,
    title: "Soirée Jazz & Blues",
    date: "22 Mars 2024",
    location: "Cotonou",
    price: "8000 FCFA",
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 3,
    title: "Concert Rock Alternatif",
    date: "28 Mars 2024",
    location: "Cotonou",
    price: "7000 FCFA",
    image: "/placeholder.svg?height=150&width=200",
  },
]

export default function EventDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Header */}
      <SiteHeader currentPath={`/events/${event.id}`} />

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
                <CardTitle className="text-selective-yellow text-xl">Acheter des billets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-white font-semibold text-2xl">{event.price}</h4>
                  </div>
                  <p className="text-orange-web/80 text-sm mb-6">
                    Places restantes : {event.maxParticipants - event.participants}
                  </p>
                  <Button className="w-full bg-sinopia hover:bg-engineering-orange text-white text-lg py-3">
                    <Link href={`/checkout/${event.id}`}>Acheter avec Mobile Money</Link>
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                  asChild
                >
                  <Link href={`https://wa.me/?text=${encodeURIComponent(`Découvrez ${event.title} sur EventPass!`)}`}>
                    Partager sur WhatsApp
                  </Link>
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