import { Calendar, MapPin, Users, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    date: string
    time?: string
    location: string
    price: string
    category: string
    rating?: number
    participants?: number
    image?: string
  }
  featured?: boolean
  className?: string
  compact?: boolean
}

export function EventCard({ event, featured = false, className, compact = false }: EventCardProps) {
  return (
    <Card
      className={cn(
        "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group h-full flex flex-col",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={event.image || "/placeholder.svg?height=200&width=300"}
          alt={event.title}
          className={cn(
            "w-full object-cover group-hover:scale-105 transition-transform duration-300",
            compact ? "h-36" : "h-48",
          )}
          loading="lazy"
        />
        <Badge className="absolute top-4 left-4 bg-princeton-orange text-rich-black font-semibold">
          {event.category}
        </Badge>
        {event.rating && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-selective-yellow fill-current mr-1" />
                  <span className="text-white text-xs font-semibold">{event.rating}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Note: {event.rating}/5</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <CardHeader className={cn("pb-3", compact && "p-3")}>
        <CardTitle
          className={cn(
            "text-white group-hover:text-selective-yellow transition-colors line-clamp-2",
            compact ? "text-base" : "text-lg",
          )}
        >
          {event.title}
        </CardTitle>
        {!compact && (
          <CardDescription className="text-orange-web/80 text-sm line-clamp-2">{event.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className={cn("pt-0 flex-1 flex flex-col", compact && "p-3 pt-0")}>
        <div className={cn("space-y-2 mb-4 flex-1", compact && "space-y-1")}>
          <div className="flex items-center text-orange-web/80 text-sm">
            <Calendar className={cn("mr-2 text-princeton-orange", compact ? "h-3 w-3" : "h-4 w-4")} />
            <span className={compact ? "text-xs" : ""}>
              {event.date}
              {event.time && ` à ${event.time}`}
            </span>
          </div>
          <div className="flex items-center text-orange-web/80 text-sm">
            <MapPin className={cn("mr-2 text-princeton-orange", compact ? "h-3 w-3" : "h-4 w-4")} />
            <span className={compact ? "text-xs" : ""}>{event.location}</span>
          </div>
          {event.participants && !compact && (
            <div className="flex items-center text-orange-web/80 text-sm">
              <Users className="h-4 w-4 mr-2 text-princeton-orange" />
              <span>{event.participants} participants</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={cn("font-bold text-selective-yellow", compact ? "text-lg" : "text-2xl")}>{event.price}</span>
        </div>

        <Button
          className="w-full bg-sinopia hover:bg-engineering-orange text-white mt-auto"
          size={compact ? "sm" : "default"}
        >
          <Link href={`/events/${event.id}`}>{compact ? "Détails" : "Voir les détails"}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
