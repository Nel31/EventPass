import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EventPass - Découvrez des événements extraordinaires",
  description:
    "EventPass vous connecte aux meilleurs événements près de chez vous. Achetez vos billets en toute sécurité et vivez des expériences inoubliables.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
