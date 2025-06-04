"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { AuthRequiredMessage } from "@/components/auth-required-message"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  fallback?: React.ReactNode
  showAuthMessage?: boolean
  authMessageProps?: {
    title: string
    description: string
    actionType: "events" | "create-event"
  }
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
  fallback,
  showAuthMessage = false,
  authMessageProps,
}: ProtectedRouteProps) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && !showAuthMessage) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo, showAuthMessage])

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

  if (!user) {
    if (showAuthMessage && authMessageProps) {
      return <AuthRequiredMessage {...authMessageProps} />
    }
    return null
  }

  return <>{children}</>
}
