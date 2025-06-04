"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"

interface GuestOnlyRouteProps {
  children: React.ReactNode
  redirectTo?: string
  fallback?: React.ReactNode
}

export function GuestOnlyRoute({ children, redirectTo = "/dashboard", fallback }: GuestOnlyRouteProps) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  if (loading) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-princeton-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Vérification de votre connexion...</p>
          </div>
        </div>
      )
    )
  }

  if (user) {
    return null
  }

  return <>{children}</>
}
