"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, XCircle } from "lucide-react"

interface FieldValidationProps {
  value: string
  type: "email" | "password" | "confirmPassword" | "required"
  compareValue?: string
  className?: string
}

export function FieldValidation({ value, type, compareValue, className }: FieldValidationProps) {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword && password.length > 0
  }

  const validateRequired = (value: string) => {
    return value.trim().length > 0
  }

  const getValidation = () => {
    if (!value) return { isValid: null, message: "" }

    switch (type) {
      case "email":
        const isValidEmail = validateEmail(value)
        return {
          isValid: isValidEmail,
          message: isValidEmail ? "Adresse email valide" : "Adresse email invalide",
        }
      case "password":
        const isValidPassword = validatePassword(value)
        return {
          isValid: isValidPassword,
          message: isValidPassword ? "Mot de passe valide" : "Le mot de passe doit contenir au moins 8 caractères",
        }
      case "confirmPassword":
        const isValidConfirm = validateConfirmPassword(compareValue || "", value)
        return {
          isValid: isValidConfirm,
          message: isValidConfirm ? "Les mots de passe correspondent" : "Les mots de passe ne correspondent pas",
        }
      case "required":
        const isValidRequired = validateRequired(value)
        return {
          isValid: isValidRequired,
          message: isValidRequired ? "Champ valide" : "Ce champ est requis",
        }
      default:
        return { isValid: null, message: "" }
    }
  }

  const { isValid, message } = getValidation()

  if (isValid === null) return null

  return (
    <div className={cn("flex items-center mt-1 text-xs", className)}>
      {isValid ? (
        <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
      ) : (
        <XCircle className="h-3 w-3 text-red-400 mr-1" />
      )}
      <span className={cn(isValid ? "text-green-400" : "text-red-400")}>{message}</span>
    </div>
  )
}
