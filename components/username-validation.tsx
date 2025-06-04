"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UsernameValidationProps {
  username: string
  className?: string
  onValidationChange?: (isValid: boolean, isAvailable: boolean) => void
}

export function UsernameValidation({ username, className, onValidationChange }: UsernameValidationProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [validationMessage, setValidationMessage] = useState("")

  const validateUsername = (username: string) => {
    // Validation format
    if (!username) return { isValid: false, message: "" }
    if (username.length < 3)
      return { isValid: false, message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }
    if (username.length > 20)
      return { isValid: false, message: "Le nom d'utilisateur ne peut pas dépasser 20 caractères" }
    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      return { isValid: false, message: "Seuls les lettres, chiffres, points, tirets et underscores sont autorisés" }
    }
    if (username.startsWith(".") || username.endsWith(".")) {
      return { isValid: false, message: "Le nom d'utilisateur ne peut pas commencer ou finir par un point" }
    }
    return { isValid: true, message: "Format valide" }
  }

  const checkUsernameAvailability = async (username: string) => {
    // Simulation de vérification d'unicité
    // En production, ceci ferait un appel à Supabase
    setIsChecking(true)

    try {
      // Simule un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simule quelques usernames déjà pris
      const takenUsernames = ["admin", "test", "user", "john.doe", "jane.smith"]
      const available = !takenUsernames.includes(username.toLowerCase())

      setIsAvailable(available)
      return available
    } catch (error) {
      setIsAvailable(null)
      return false
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    const validation = validateUsername(username)

    if (!validation.isValid) {
      setValidationMessage(validation.message)
      setIsAvailable(null)
      onValidationChange?.(false, false)
      return
    }

    setValidationMessage(validation.message)

    // Vérifier la disponibilité seulement si le format est valide
    if (username.length >= 3) {
      checkUsernameAvailability(username).then((available) => {
        if (available) {
          setValidationMessage("Nom d'utilisateur disponible !")
        } else {
          setValidationMessage("Ce nom d'utilisateur est déjà pris")
        }
        onValidationChange?.(validation.isValid, available)
      })
    }
  }, [username, onValidationChange])

  if (!username) return null

  const getIcon = () => {
    if (isChecking) return <Loader2 className="h-3 w-3 animate-spin text-orange-web/80" />
    if (!validateUsername(username).isValid) return <XCircle className="h-3 w-3 text-red-400" />
    if (isAvailable === true) return <CheckCircle className="h-3 w-3 text-green-400" />
    if (isAvailable === false) return <XCircle className="h-3 w-3 text-red-400" />
    return null
  }

  const getTextColor = () => {
    if (isChecking) return "text-orange-web/80"
    if (!validateUsername(username).isValid) return "text-red-400"
    if (isAvailable === true) return "text-green-400"
    if (isAvailable === false) return "text-red-400"
    return "text-orange-web/80"
  }

  return (
    <div className={cn("flex items-center mt-1 text-xs", className)}>
      {getIcon()}
      <span className={cn("ml-1", getTextColor())}>{validationMessage}</span>
    </div>
  )
}
