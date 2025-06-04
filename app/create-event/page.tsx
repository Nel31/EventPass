import { ProtectedRoute } from "@/components/protected-route"

export default function CreateEventPage() {
  return (
    <ProtectedRoute
      showAuthMessage={true}
      authMessageProps={{
        title: "Créez votre événement",
        description: "Connectez-vous pour créer et organiser vos propres événements.",
        actionType: "create-event",
      }}
    >
      {/* ... tout le contenu existant de la page reste identique ... */}
    </ProtectedRoute>
  )
}
