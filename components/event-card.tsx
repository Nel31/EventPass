import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    date: string
    location: string
    price: string
    category: string
    image?: string
  }
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card
      className={cn(
        "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group h-full flex flex-col",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={event.image || "/placeholder.svg?height=200&width=300"}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <Badge className="absolute top-4 left-4 bg-princeton-orange text-rich-black font-semibold">
          {event.category}
        </Badge>
      </div>

      <CardContent className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-white group-hover:text-selective-yellow transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-orange-web/80 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-princeton-orange" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-orange-web/80 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-princeton-orange" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-2xl text-selective-yellow">{event.price}</span>
        </div>

        <Button className="w-full bg-sinopia hover:bg-engineering-orange text-white">
          <Link href={`/events/${event.id}`}>Acheter maintenant</Link>
        </Button>
      </CardContent>
    </Card>
  )
}