import { ProtectedRoute } from "@/components/protected-route"

export default function EventsPage() {
  return (
    <ProtectedRoute
      showAuthMessage={true}
      authMessageProps={{
        title: "Découvrez les événements",
        description: "Connectez-vous pour découvrir tous les événements disponibles et réserver vos places.",
        actionType: "events",
      }}
    >
      {/* ... tout le contenu existant de la page reste identique ... */}
    </ProtectedRoute>
  )
}
