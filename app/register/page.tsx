"use client"

import type React from "react"

import { Mail, Lock, Eye, EyeOff, CheckCircle, Loader2, Info, AtSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { FieldValidation } from "@/components/field-validation"
import { PasswordStrength } from "@/components/password-strength"
import { UsernameValidation } from "@/components/username-validation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GuestOnlyRoute } from "@/components/guest-only-route"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { useUser } from "@/hooks/use-user"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

function RegisterPageContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)

  const { signUp, signInWithGoogle } = useAuthActions()
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Calculate form progress
  useEffect(() => {
    const fields = [username, email, password, confirmPassword]
    const filledFields = fields.filter((field) => field.trim().length > 0).length
    const newProgress = (filledFields / fields.length) * 100
    setProgress(newProgress)
  }, [username, email, password, confirmPassword])

  const isFormValid = () => {
    return (
      isUsernameValid &&
      isUsernameAvailable &&
      email.includes("@") &&
      password.length >= 8 &&
      password === confirmPassword &&
      acceptTerms
    )
  }

  const handleUsernameValidation = (isValid: boolean, isAvailable: boolean) => {
    setIsUsernameValid(isValid)
    setIsUsernameAvailable(isAvailable)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid()) {
      toast({
        variant: "destructive",
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs requis et accepter les conditions.",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
      })
      return
    }

    if (!isUsernameAvailable) {
      toast({
        variant: "destructive",
        title: "Nom d'utilisateur indisponible",
        description: "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signUp(email, password, username)
      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            variant: "destructive",
            title: "Compte existant",
            description: "Cette adresse email est déjà utilisée. Essayez de vous connecter.",
          })
        } else if (error.message.includes("username")) {
          toast({
            variant: "destructive",
            title: "Nom d'utilisateur invalide",
            description: "Ce nom d'utilisateur n'est pas disponible.",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Erreur d'inscription",
            description: "Une erreur est survenue. Veuillez réessayer.",
          })
        }
      } else {
        setIsSuccess(true)
        toast({
          variant: "success",
          title: "Compte créé avec succès !",
          description: `Bienvenue @${username} ! Ravi de vous compter parmi nous !`,
        })
        setTimeout(() => {
          router.push("/welcome")
        }, 2000)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le compte. Vérifiez votre connexion internet.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: "Impossible de s'inscrire avec Google. Veuillez réessayer.",
        })
      } else {
        toast({
          variant: "success",
          title: "Inscription réussie !",
          description:
            "Votre nom d'utilisateur a été généré automatiquement. Vous pourrez le modifier dans vos paramètres.",
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

  const handleTermsClick = () => {
    setAcceptTerms(true)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-rich-black via-chocolate-cosmos to-rosewood relative flex items-center justify-center py-8">
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sinopia rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-princeton-orange rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-selective-yellow rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-2000"></div>
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
                    <span>Compte créé !</span>
                  </div>
                ) : (
                  "Créer un compte"
                )}
              </CardTitle>
              <CardDescription className="text-orange-web/80">
                {isSuccess
                  ? "Redirection en cours..."
                  : "Rejoignez EventPass et découvrez des événements extraordinaires"}
              </CardDescription>

              {/* Progress bar */}
              {!isSuccess && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-orange-web/80">Progression</span>
                    <span className="text-xs text-selective-yellow">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-princeton-orange to-selective-yellow h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white flex items-center">
                    Nom d'utilisateur *
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1 text-orange-web/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Votre nom d'utilisateur sera affiché publiquement et doit être unique</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 h-4 w-4" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="mon.username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase())}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading || isSuccess}
                      className={cn(
                        "pl-10 bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 transition-all duration-200",
                        focusedField === "username" &&
                          "ring-2 ring-princeton-orange border-princeton-orange scale-[1.02]",
                        "focus:border-princeton-orange",
                      )}
                      aria-label="Nom d'utilisateur"
                    />
                  </div>
                  <UsernameValidation username={username} onValidationChange={handleUsernameValidation} />
                  <div className="text-xs text-orange-web/60">
                    <p>• 3-20 caractères • Lettres, chiffres, points, tirets autorisés</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center">
                    Email *
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1 text-orange-web/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nous ne partagerons jamais votre email</p>
                      </TooltipContent>
                    </Tooltip>
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
                    />
                  </div>
                  <FieldValidation value={email} type="email" />
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
                  <PasswordStrength password={password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirmer le mot de passe *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading || isSuccess}
                      className={cn(
                        "pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-orange-web/80 transition-all duration-200",
                        focusedField === "confirmPassword" &&
                          "ring-2 ring-princeton-orange border-princeton-orange scale-[1.02]",
                        "focus:border-princeton-orange",
                      )}
                      aria-label="Confirmer le mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-web/80 hover:text-princeton-orange transition-colors"
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldValidation value={confirmPassword} type="confirmPassword" compareValue={password} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      disabled={isLoading || isSuccess}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-orange-web/80 text-sm leading-relaxed">
                      J'accepte les{" "}
                      <Link
                        href="/terms"
                        onClick={handleTermsClick}
                        className="text-princeton-orange hover:text-selective-yellow underline transition-colors"
                      >
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link
                        href="/privacy"
                        className="text-princeton-orange hover:text-selective-yellow underline transition-colors"
                      >
                        politique de confidentialité
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={newsletter}
                      onCheckedChange={(checked) => setNewsletter(checked as boolean)}
                      disabled={isLoading || isSuccess}
                    />
                    <Label htmlFor="newsletter" className="text-orange-web/80 text-sm">
                      Je souhaite recevoir les actualités et offres spéciales par email
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || isSuccess || !isFormValid()}
                  className="w-full bg-sinopia hover:bg-engineering-orange text-white py-3 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Création du compte...</span>
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Compte créé !</span>
                    </div>
                  ) : (
                    "Créer mon compte"
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
                  onClick={handleGoogleSignUp}
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
                  {isLoading ? "Inscription..." : "S'inscrire avec Google"}
                </Button>
                <div className="text-center text-xs text-orange-web/60">
                  <p>Avec Google, votre nom d'utilisateur sera généré automatiquement</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-orange-web/80 text-sm">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/login"
                    className="text-princeton-orange hover:text-selective-yellow font-semibold transition-colors"
                  >
                    Se connecter
                  </Link>
                </p>
                <Link
                  href="/"
                  className="text-orange-web/60 hover:text-princeton-orange text-xs transition-colors block"
                >
                  ← Retour à l'accueil
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default function RegisterPage() {
  return (
    <GuestOnlyRoute>
      <RegisterPageContent />
    </GuestOnlyRoute>
  )
}
