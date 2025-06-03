"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { useBreakpoint } from "@/hooks/use-breakpoint"

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { isAbove } = useBreakpoint()

  // Exemple de résultats de recherche
  const searchResults = [
    {
      id: 1,
      title: "Festival de Musique Électronique",
      category: "Musique",
      location: "Paris",
      date: "15 Mars 2024",
    },
    {
      id: 2,
      title: "Conférence Tech Innovation",
      category: "Technologie",
      location: "Lyon",
      date: "22 Mars 2024",
    },
    {
      id: 3,
      title: "Spectacle de Danse Contemporaine",
      category: "Art",
      location: "Marseille",
      date: "28 Mars 2024",
    },
  ]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (id: number) => {
    setOpen(false)
    router.push(`/events/${id}`)
  }

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="relative w-full justify-start text-sm text-orange-web/80 bg-white/10 border-white/20 hover:bg-white/15 py-3 sm:py-4 px-4"
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="text-xs sm:text-sm">Rechercher un événement, un lieu, un artiste...</span>
          {isAbove("md") && (
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-orange-web/80">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher un événement, un lieu, un artiste..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Événements">
            {searchResults.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => handleSelect(result.id)}
                className="flex flex-col sm:flex-row sm:justify-between"
              >
                <div>
                  <span className="font-medium">{result.title}</span>
                  <span className="text-sm text-muted-foreground ml-2">{result.category}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
                  {result.location} • {result.date}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
