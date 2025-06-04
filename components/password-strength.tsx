"use client"

import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const getStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return ""
    if (score <= 2) return "Faible"
    if (score <= 3) return "Moyen"
    if (score <= 4) return "Fort"
    return "Très fort"
  }

  const getStrengthColor = (score: number) => {
    if (score <= 2) return "bg-red-500"
    if (score <= 3) return "bg-yellow-500"
    if (score <= 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const strength = getStrength(password)
  const strengthText = getStrengthText(strength)
  const strengthColor = getStrengthColor(strength)

  if (!password) return null

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-xs text-orange-web/80">Force du mot de passe</span>
        <span
          className={cn("text-xs font-medium", {
            "text-red-400": strength <= 2,
            "text-yellow-400": strength === 3,
            "text-blue-400": strength === 4,
            "text-green-400": strength === 5,
          })}
        >
          {strengthText}
        </span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all duration-300", strengthColor)}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      {password && (
        <div className="text-xs text-orange-web/60 space-y-1">
          <div className="grid grid-cols-2 gap-2">
            <div className={cn("flex items-center", password.length >= 8 ? "text-green-400" : "text-red-400")}>
              <span className="mr-1">{password.length >= 8 ? "✓" : "✗"}</span>
              8+ caractères
            </div>
            <div className={cn("flex items-center", /[A-Z]/.test(password) ? "text-green-400" : "text-red-400")}>
              <span className="mr-1">{/[A-Z]/.test(password) ? "✓" : "✗"}</span>
              Majuscule
            </div>
            <div className={cn("flex items-center", /[a-z]/.test(password) ? "text-green-400" : "text-red-400")}>
              <span className="mr-1">{/[a-z]/.test(password) ? "✓" : "✗"}</span>
              Minuscule
            </div>
            <div className={cn("flex items-center", /[0-9]/.test(password) ? "text-green-400" : "text-red-400")}>
              <span className="mr-1">{/[0-9]/.test(password) ? "✓" : "✗"}</span>
              Chiffre
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
