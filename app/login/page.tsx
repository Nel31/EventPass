"use client"

import type React from "react"

import { Mail, Lock, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { FieldValidation } from "@/components/field-validation"
import { GuestOnlyRoute } from "@/components/guest-only-route"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { useUser } from "@/hooks/use-user"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

function LoginPageContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { signIn, signInWithGoogle } = useAuthActions()
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description:
            error.message === "Invalid login credentials"
              ? "Identifiants incorrects. Vérifiez votre email et mot de passe."
              : "Une erreur est survenue. Veuillez réessayer.",
        })
      } else {
        setIsSuccess(true)
        toast({
          variant: "success",
          title: "Connexion réussie !",
          description: "Heureux de vous revoir ! Redirection en cours...",
        })
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de se connecter. Vérifiez votre connexion internet.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Impossible de se connecter avec Google. Veuillez réessayer.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue avec Google.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault()
      const form = e.currentTarget.closest("form")
      if (form) {
        form.requestSubmit()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative flex items-center justify-center">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <img
              src="/logo-horizontal.png"
              alt="EventPass"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-110"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 transition-all duration-300 hover:bg-white/15">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-selective-yellow">
              {isSuccess ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span>Connexion réussie !</span>
                </div>
              ) : (
                "Connexion"
              )}
            </CardTitle>
            <CardDescription className="text-orange-web/80">
              {isSuccess ? "Redirection en cours..." : "Heureux de vous revoir ! Connectez-vous à votre compte"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading || isSuccess}
                    className={cn(
                      "pl-10 bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 transition-all duration-200",
                      focusedField === "email" && "ring-2 ring-princeton-orange border-princeton-orange scale-[1.02]",
                      "focus:border-princeton-orange",
                    )}
                    aria-label="Adresse email"
                    aria-describedby="email-validation"
                  />
                </div>
                <div id="email-validation">
                  <FieldValidation value={email} type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Mot de passe *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading || isSuccess}
                    className={cn(
                      "pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 transition-all duration-200",
                      focusedField === "password" &&
                        "ring-2 ring-princeton-orange border-princeton-orange scale-[1.02]",
                      "focus:border-princeton-orange",
                    )}
                    aria-label="Mot de passe"
                    aria-describedby="password-validation"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 hover:text-princeton-orange transition-colors"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div id="password-validation">
                  <FieldValidation value={password} type="required" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading || isSuccess}
                  />
                  <Label htmlFor="remember" className="text-orange-web/80 text-sm cursor-pointer">
                    Se souvenir de moi
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-princeton-orange hover:text-selective-yellow text-sm transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading || isSuccess || !email || !password}
                className="w-full bg-sinopia hover:bg-engineering-orange text-white py-3 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connexion en cours...</span>
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Connecté !</span>
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-chocolate-cosmos px-3 text-orange-web/80 text-sm">ou</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading || isSuccess}
                className="w-full border-princeton-orange text-rich-black bg-white hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Connexion..." : "Continuer avec Google"}
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-orange-web/80 text-sm">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-princeton-orange hover:text-selective-yellow font-semibold transition-colors"
                >
                  Créer un compte
                </Link>
              </p>
              <Link href="/" className="text-orange-web/60 hover:text-princeton-orange text-xs transition-colors block">
                ← Retour à l'accueil
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <GuestOnlyRoute>
      <LoginPageContent />
    </GuestOnlyRoute>
  )
}
