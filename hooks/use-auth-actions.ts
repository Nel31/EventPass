import { supabase } from "@/lib/supabase/client"
import { generateUsernameFromName, generateUniqueUsername } from "@/utils/username-generator"

export function useAuthActions() {
  const signUp = async (email: string, password: string, username?: string) => {
    if (!supabase) {
      console.warn("Supabase not configured")
      return Promise.resolve({ data: null, error: { message: "Supabase not configured" } })
    }

    try {
      // 1. Créer le compte auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) return { data: authData, error: authError }

      // 2. Si succès et qu'on a un user, créer le profil avec username
      if (authData.user && username) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          username: username,
          email: email,
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Erreur création profil:", profileError)
          // On pourrait supprimer le user auth ici si nécessaire
        }
      }

      return { data: authData, error: authError }
    } catch (error) {
      return { data: null, error: { message: "Erreur lors de l'inscription" } }
    }
  }

  const signIn = (email: string, password: string) => {
    if (!supabase) {
      console.warn("Supabase not configured")
      return Promise.resolve({ data: null, error: { message: "Supabase not configured" } })
    }
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signInWithMagicLink = (email: string) => {
    if (!supabase) {
      console.warn("Supabase not configured")
      return Promise.resolve({ data: null, error: { message: "Supabase not configured" } })
    }
    return supabase.auth.signInWithOtp({ email })
  }

  const signInWithGoogle = async () => {
    if (!supabase) {
      console.warn("Supabase not configured")
      return Promise.resolve({ data: null, error: { message: "Supabase not configured" } })
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    return { data, error }
  }

  const createProfileFromOAuth = async (user: any) => {
    if (!supabase || !user) return

    // Vérifier si le profil existe déjà
    const { data: existingProfile } = await supabase.from("profiles").select("username").eq("id", user.id).single()

    if (existingProfile) return // Profil déjà créé

    // Générer username à partir du nom Google/Facebook
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email
    let baseUsername = generateUsernameFromName(fullName)

    // Si pas de nom, utiliser la partie avant @ de l'email
    if (!baseUsername) {
      baseUsername = user.email.split("@")[0].toLowerCase()
    }

    // Vérifier l'unicité et générer un username unique
    const { data: existingUsernames } = await supabase.from("profiles").select("username")

    const takenUsernames = existingUsernames?.map((p) => p.username) || []
    const uniqueUsername = generateUniqueUsername(baseUsername, takenUsernames)

    // Créer le profil
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      username: uniqueUsername,
      email: user.email,
      avatar_url: user.user_metadata?.avatar_url,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Erreur création profil OAuth:", error)
    }
  }

  const signOut = () => {
    if (!supabase) {
      console.warn("Supabase not configured")
      return Promise.resolve({ error: null })
    }
    return supabase.auth.signOut()
  }

  return {
    signUp,
    signIn,
    signInWithMagicLink,
    signInWithGoogle,
    createProfileFromOAuth,
    signOut,
  }
}
