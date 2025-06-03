import { Upload, Calendar, MapPin, Euro, Users, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const categories = [
  "Musique",
  "Technologie",
  "Art",
  "Culture",
  "Sport",
  "Gastronomie",
  "Business",
  "Éducation",
  "Santé",
  "Famille",
  "Autre",
]

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
      </div>

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
              <Link href="/events" className="text-white hover:text-princeton-orange transition-colors">
                Événements
              </Link>
              <Link href="/create-event" className="text-princeton-orange font-semibold">
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
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-selective-yellow mb-4">Créer un événement</h1>
          <p className="text-orange-web/80 text-lg max-w-2xl mx-auto">
            Partagez votre passion et créez des expériences inoubliables
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-2xl flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  Informations générales
                </CardTitle>
                <CardDescription className="text-orange-web/80">
                  Les informations de base de votre événement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Titre de l'événement *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ex: Festival de Musique Électronique"
                      className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">
                      Catégorie *
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description courte *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre événement en quelques mots..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long-description" className="text-white">
                    Description détaillée
                  </Label>
                  <Textarea
                    id="long-description"
                    placeholder="Décrivez votre événement en détail, le programme, les intervenants..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange min-h-[150px]"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-white">Image de l'événement</Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-princeton-orange transition-colors">
                    <ImageIcon className="h-12 w-12 text-orange-web/80 mx-auto mb-4" />
                    <p className="text-orange-web/80 mb-2">Glissez votre image ici ou cliquez pour sélectionner</p>
                    <p className="text-orange-web/80 text-sm">PNG, JPG jusqu'à 10MB</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choisir un fichier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date and Location */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-2xl flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Date et lieu
                </CardTitle>
                <CardDescription className="text-orange-web/80">Quand et où se déroule votre événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-white">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      className="bg-white/10 border-white/20 text-white focus:border-princeton-orange"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-white">
                      Heure de début *
                    </Label>
                    <Input
                      id="start-time"
                      type="time"
                      className="bg-white/10 border-white/20 text-white focus:border-princeton-orange"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-white">
                      Heure de fin
                    </Label>
                    <Input
                      id="end-time"
                      type="time"
                      className="bg-white/10 border-white/20 text-white focus:border-princeton-orange"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-white">
                      Lieu *
                    </Label>
                    <Input
                      id="venue"
                      placeholder="Ex: Palais des Sports"
                      className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Adresse complète *
                    </Label>
                    <Input
                      id="address"
                      placeholder="Ex: 8 Boulevard de Bercy, 75012 Paris"
                      className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tickets */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-2xl flex items-center">
                  <Euro className="h-6 w-6 mr-2" />
                  Billets et tarification
                </CardTitle>
                <CardDescription className="text-orange-web/80">
                  Configurez les types de billets et leurs prix
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Free Event Option */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="free-event" />
                  <Label htmlFor="free-event" className="text-white">
                    Événement gratuit
                  </Label>
                </div>

                {/* Ticket Types */}
                <div className="space-y-4">
                  <div className="border border-white/20 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-4">Type de billet 1</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Nom du billet *</Label>
                        <Input
                          placeholder="Ex: Accès Standard"
                          className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Prix (€) *</Label>
                        <Input
                          type="number"
                          placeholder="45"
                          className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Quantité *</Label>
                        <Input
                          type="number"
                          placeholder="100"
                          className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label className="text-white">Description</Label>
                      <Textarea
                        placeholder="Décrivez ce qui est inclus avec ce billet..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                  >
                    + Ajouter un type de billet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Settings */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-selective-yellow text-2xl flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Paramètres additionnels
                </CardTitle>
                <CardDescription className="text-orange-web/80">Options avancées pour votre événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="age-restriction" />
                      <Label htmlFor="age-restriction" className="text-white">
                        Restriction d'âge (18+)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="refundable" />
                      <Label htmlFor="refundable" className="text-white">
                        Billets remboursables
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="transferable" />
                      <Label htmlFor="transferable" className="text-white">
                        Billets transférables
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-tickets" className="text-white">
                        Limite par personne
                      </Label>
                      <Input
                        id="max-tickets"
                        type="number"
                        placeholder="Ex: 4"
                        className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizer" className="text-white">
                        Nom de l'organisateur
                      </Label>
                      <Input
                        id="organizer"
                        placeholder="Votre nom ou organisation"
                        className="bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 focus:border-princeton-orange"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-princeton-orange text-rich-black bg-white hover:bg-white/90 px-8 py-3"
              >
                Enregistrer comme brouillon
              </Button>
              <Button className="bg-sinopia hover:bg-engineering-orange text-white px-8 py-3 text-lg">
                Publier l'événement
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
