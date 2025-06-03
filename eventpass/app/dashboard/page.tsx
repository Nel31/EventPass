import { Calendar, Users, Euro, TrendingUp, Plus, QrCode, Download, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"
import { ResponsiveContainer } from "@/components/responsive-container"
import Link from "next/link"

const userTickets = [
  {
    id: 1,
    eventTitle: "Festival de Musique Électronique",
    eventDate: "15 Mars 2024",
    eventTime: "20:00",
    ticketType: "Accès VIP",
    price: "85€",
    status: "valid",
    qrCode: "QR123456789",
    venue: "Palais des Sports, Paris",
  },
  {
    id: 2,
    eventTitle: "Conférence Tech Innovation",
    eventDate: "22 Mars 2024",
    eventTime: "09:00",
    ticketType: "Accès Standard",
    price: "120€",
    status: "valid",
    qrCode: "QR987654321",
    venue: "Centre de Congrès, Lyon",
  },
]

const userEvents = [
  {
    id: 1,
    title: "Soirée Jazz & Blues",
    date: "28 Mars 2024",
    status: "published",
    ticketsSold: 45,
    totalTickets: 100,
    revenue: "1,575€",
    category: "Musique",
  },
  {
    id: 2,
    title: "Atelier Photographie",
    date: "5 Avril 2024",
    status: "draft",
    ticketsSold: 0,
    totalTickets: 20,
    revenue: "0€",
    category: "Art",
  },
]

const stats = {
  totalEvents: 12,
  totalTicketsSold: 1250,
  totalRevenue: "45,680€",
  avgRating: 4.8,
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Header */}
      <SiteHeader currentPath="/dashboard" isLoggedIn={true} userName="John Doe" userInitials="JD" />

      <ResponsiveContainer className="py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-selective-yellow mb-2">Bonjour, John Doe !</h1>
          <p className="text-orange-web/80 text-lg">Gérez vos événements et vos billets depuis votre tableau de bord</p>
        </div>

        <Tabs defaultValue="tickets" className="space-y-8">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="tickets" className="data-[state=active]:bg-sinopia data-[state=active]:text-white">
              Mes billets
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-sinopia data-[state=active]:text-white">
              Mes événements
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-sinopia data-[state=active]:text-white">
              Statistiques
            </TabsTrigger>
          </TabsList>

          {/* My Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-selective-yellow">Mes billets</h2>
              <Button className="bg-sinopia hover:bg-engineering-orange text-white">
                <Link href="/events">Acheter des billets</Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {userTickets.map((ticket) => (
                <Card key={ticket.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-white">{ticket.eventTitle}</h3>
                          <Badge className="bg-green-500 text-white">
                            {ticket.status === "valid" ? "Valide" : "Utilisé"}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-orange-web/80">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-princeton-orange" />
                            <span>
                              {ticket.eventDate} à {ticket.eventTime}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold text-selective-yellow">{ticket.ticketType}</span>
                            <span className="ml-2">- {ticket.price}</span>
                          </div>
                        </div>

                        <p className="text-orange-web/80 mt-2">{ticket.venue}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          QR Code
                        </Button>
                        <Button
                          variant="outline"
                          className="border-princeton-orange text-rich-black bg-white hover:bg-white/90"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-selective-yellow">Mes événements</h2>
              <Button className="bg-sinopia hover:bg-engineering-orange text-white">
                <Plus className="h-4 w-4 mr-2" />
                <Link href="/create-event">Créer un événement</Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {userEvents.map((event) => (
                <Card key={event.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                          <Badge className={event.status === "published" ? "bg-green-500" : "bg-yellow-500"}>
                            {event.status === "published" ? "Publié" : "Brouillon"}
                          </Badge>
                          <Badge variant="outline" className="border-princeton-orange text-princeton-orange">
                            {event.category}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-orange-web/80">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-princeton-orange" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-princeton-orange" />
                            <span>
                              {event.ticketsSold}/{event.totalTickets} billets
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Euro className="h-4 w-4 mr-2 text-princeton-orange" />
                            <span>{event.revenue}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-princeton-orange text-rich-black bg-white hover:bg-white/90"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-2xl font-bold text-selective-yellow">Statistiques</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-selective-yellow text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Événements créés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.totalEvents}</div>
                  <p className="text-orange-web/80 text-sm">Total depuis le début</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-selective-yellow text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Billets vendus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.totalTicketsSold}</div>
                  <p className="text-orange-web/80 text-sm">Participants au total</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-selective-yellow text-lg flex items-center">
                    <Euro className="h-5 w-5 mr-2" />
                    Revenus totaux
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.totalRevenue}</div>
                  <p className="text-orange-web/80 text-sm">Chiffre d'affaires</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-selective-yellow text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Note moyenne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.avgRating}/5</div>
                  <p className="text-orange-web/80 text-sm">Satisfaction client</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-xl">Activité récente</CardTitle>
                <CardDescription className="text-orange-web/80">Vos dernières ventes et interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="text-white font-medium">Nouveau billet vendu</p>
                      <p className="text-orange-web/80 text-sm">Soirée Jazz & Blues - Accès VIP</p>
                    </div>
                    <div className="text-right">
                      <p className="text-selective-yellow font-semibold">+85€</p>
                      <p className="text-orange-web/80 text-sm">Il y a 2h</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="text-white font-medium">Nouvel avis reçu</p>
                      <p className="text-orange-web/80 text-sm">Festival de Musique Électronique - 5 étoiles</p>
                    </div>
                    <div className="text-right">
                      <p className="text-selective-yellow font-semibold">★★★★★</p>
                      <p className="text-orange-web/80 text-sm">Il y a 5h</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white font-medium">Événement publié</p>
                      <p className="text-orange-web/80 text-sm">Atelier Photographie</p>
                    </div>
                    <div className="text-right">
                      <p className="text-selective-yellow font-semibold">Publié</p>
                      <p className="text-orange-web/80 text-sm">Hier</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ResponsiveContainer>
    </div>
  )
}
