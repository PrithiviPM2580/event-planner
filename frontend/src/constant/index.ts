import type { EventItems, TimeItems } from "@/types"
import { ChartNoAxesCombined, CirclePlus, Users } from "lucide-react"

export const EVENT_ITEMS: EventItems[] = [
  {
    id: 1,
    icon: CirclePlus,
    title: "Create Events",
    description:
      "Seamlessly design and launch your events with our intuitive mood-board style interface.",
  },
  {
    id: 2,
    icon: Users,
    title: "RSVP System",
    description:
      "Manage guest lists and real-time confirmations with our sophisticated tracking system.",
  },
  {
    id: 3,
    icon: ChartNoAxesCombined,
    title: "Analytics",
    description:
      "Gain deep insights into attendee engagement and event performance metrics.",
  },
]

export const TIME_ITEMS: TimeItems[] = [
  {
    id: 1,
    title: "12k+",
    description: "Events Hosted",
  },
  {
    id: 2,
    title: "450k",
    description: "Tickets Sold",
  },
  {
    id: 3,
    title: "99%",
    description: "Satisfaction",
  },
  {
    id: 4,
    title: "24/7",
    description: "Premium Support",
  },
]
