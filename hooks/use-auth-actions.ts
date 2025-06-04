import { supabase } from "@/lib/supabase/client"

export function useAuthActions() {
  const signUp = (email: string, password: string) =>
    supabase.auth.signUp({ email, password })

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })

  const signInWithMagicLink = (email: string) =>
    supabase.auth.signInWithOtp({ email })

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: "google" })

  const signOut = () => supabase.auth.signOut()

  return { signUp, signIn, signInWithMagicLink, signInWithGoogle, signOut }
}
