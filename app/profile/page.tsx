"use client"

import { useState, useEffect } from "react"
import { User, Mail, MapPin, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ProtectedRoute } from "@/components/protected-route"
import { useUser } from "@/hooks/use-user"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"

interface ProfileData {
  username: string
  full_name: string
  email: string
  bio: string
  location: string
  avatar_url: string
}

export default function ProfilePage() {
  const { user } = useUser()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    full_name: "",
    email: "",
    bio: "",
    location: "",
    avatar_url: "",
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!supabase || !user) return

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error) throw error

      if (data) {
        setProfileData({
          username: data.username || "",
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          bio: data.bio || "",
          location: data.location || "",
          avatar_url: data.avatar_url || "",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSave = async () => {
    if (!supabase || !user) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: profileData.username,
          full_name: profileData.full_name,
          bio: profileData.bio,
          location: profileData.location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès",
        variant: "success",
      })

      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le profil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    fetchProfile() // Restaurer les données originales
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative">
        <SiteHeader currentPath="/profile" />

        <ResponsiveContainer className="py-8">
          <div className="max-w-4xl mx-auto">
            {/* En-tête du profil */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-selective-yellow mb-2">Mon Profil</h1>
              <p className="text-orange-web/80">Gérez vos informations personnelles</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Photo de profil */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage
                        src={profileData.avatar_url || "/placeholder.svg?height=128&width=128"}
                        alt={profileData.full_name}
                      />
                      <AvatarFallback className="bg-princeton-orange text-rich-black text-2xl">
                        {profileData.full_name ? profileData.full_name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold text-white mb-2">{profileData.full_name || "Utilisateur"}</h2>
                    <p className="text-orange-web/80 mb-4">@{profileData.username}</p>
                    <Button
                      variant="outline"
                      className="border-princeton-orange text-rich-black bg-white hover:bg-princeton-orange hover:text-white"
                    >
                      Changer la photo
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Informations du profil */}
              <div className="lg:col-span-2">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-selective-yellow text-2xl flex items-center">
                        <User className="h-6 w-6 mr-2" />
                        Informations personnelles
                      </CardTitle>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="bg-sinopia hover:bg-engineering-orange text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isLoading ? "Sauvegarde..." : "Sauvegarder"}
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Annuler
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white">Nom d'utilisateur</Label>
                        {isEditing ? (
                          <Input
                            value={profileData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        ) : (
                          <div className="p-2 bg-white/5 rounded text-white">
                            @{profileData.username || "Non défini"}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Nom complet</Label>
                        {isEditing ? (
                          <Input
                            value={profileData.full_name}
                            onChange={(e) => handleInputChange("full_name", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        ) : (
                          <div className="p-2 bg-white/5 rounded text-white">
                            {profileData.full_name || "Non défini"}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-princeton-orange" />
                        Email
                      </Label>
                      <div className="p-2 bg-white/5 rounded text-white">{profileData.email}</div>
                      <p className="text-xs text-orange-web/60">L'email ne peut pas être modifié depuis cette page</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-princeton-orange" />
                        Localisation
                      </Label>
                      {isEditing ? (
                        <Input
                          value={profileData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Ex: Paris, France"
                          className="bg-white/10 border-white/20 text-white"
                        />
                      ) : (
                        <div className="p-2 bg-white/5 rounded text-white">{profileData.location || "Non définie"}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          value={profileData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          placeholder="Parlez-nous de vous..."
                          className="bg-white/10 border-white/20 text-white min-h-[100px]"
                        />
                      ) : (
                        <div className="p-2 bg-white/5 rounded text-white min-h-[60px]">
                          {profileData.bio || "Aucune biographie"}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Statistiques */}
            <div className="mt-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-selective-yellow text-xl">Statistiques</CardTitle>
                  <CardDescription className="text-orange-web/80">Votre activité sur EventPass</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-selective-yellow mb-2">0</div>
                      <div className="text-orange-web/80">Événements créés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-selective-yellow mb-2">0</div>
                      <div className="text-orange-web/80">Billets achetés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-selective-yellow mb-2">
                        {new Date(user?.created_at || "").toLocaleDateString("fr-FR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-orange-web/80">Membre depuis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </ProtectedRoute>
  )
}
