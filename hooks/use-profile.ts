"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useUser } from "./use-user"

export function useProfile() {
  const { user } = useUser()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (!user || !supabase) {
      setProfile(null)
      return
    }

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setProfile(data))
  }, [user])

  return profile
}
