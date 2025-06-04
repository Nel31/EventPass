"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Calendar, Plus } from "lucide-react"
import Link from "next/link"

interface AuthRequiredMessageProps {
  title: string
  description: string
  actionType: "events" | "create-event"
}

export function AuthRequiredMessage({ title, description, actionType }: AuthRequiredMessageProps) {
  const icon = actionType === "events" ? Calendar : Plus

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative flex items-center justify-center">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Logo - Sans Link wrapper pour éviter l'imbrication */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <img
              src="/logo-horizontal.png"
              alt="EventPass"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 transition-all duration-300 hover:bg-white/15">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-princeton-orange/20 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-princeton-orange" />
            </div>
            <CardTitle className="text-2xl font-bold text-selective-yellow flex items-center justify-center gap-2">
              {React.createElement(icon, { className: "h-6 w-6" })}
              {title}
            </CardTitle>
            <CardDescription className="text-orange-web/80 text-lg">{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button
                className="w-full bg-sinopia hover:bg-engineering-orange text-white py-3 transition-all duration-200 hover:scale-[1.02]"
                asChild
              >
                <Link href="/register">Créer un compte gratuit</Link>
              </Button>

              <Button
                variant="outline"
                className="w-full border-princeton-orange text-white bg-transparent hover:bg-princeton-orange/10 transition-all duration-200 hover:scale-[1.02]"
                asChild
              >
                <Link href="/login">Se connecter</Link>
              </Button>
            </div>

            <div className="text-center">
              <Link href="/" className="text-orange-web/60 hover:text-princeton-orange text-sm transition-colors">
                ← Retour à l'accueil
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
