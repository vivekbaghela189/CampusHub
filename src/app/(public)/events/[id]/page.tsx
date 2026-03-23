import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notFound } from "next/navigation"
import ApplyButton from "@/components/events/ApplyButton"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await getServerSession(authOptions)
  let event: {
    id: string
    title: string
    description: string
    type: string
    deadline: Date
  } | null = null
  let databaseError = false

  try {
    event = await prisma.event.findUnique({
      where: { id },
    })
  } catch {
    databaseError = true
  }

  if (databaseError) {
    return (
      <div className="container mx-auto px-6 py-20">
        <Card className="mx-auto mt-6 max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle>Event details are temporarily unavailable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The app could not connect to the database. Check your `DATABASE_URL`
              and Supabase credentials, then try again.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!event) {
    return notFound()
  }

  const deadlineDate = new Date(event.deadline)
  const isExpired = deadlineDate < new Date()

  return (
    <div className="container mx-auto px-6 py-20">

      {/* Back Button */}
      <Link
        href="/events"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Events
      </Link>

      <Card className="max-w-3xl mx-auto mt-6 shadow-lg">
        <CardHeader className="space-y-4">

          {/* Title + Type */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-3xl">
              {event.title}
            </CardTitle>

            <Badge variant="secondary">
              {event.type}
            </Badge>
          </div>

          {/* Deadline Highlight */}
          <div>
            <p className="text-sm text-muted-foreground">
              Registration Deadline
            </p>
            <p className={`font-medium ${isExpired ? "text-destructive" : ""}`}>
              {deadlineDate.toLocaleDateString()}
              {isExpired && " (Closed)"}
            </p>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 pt-6">

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About This Event</h3>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Apply Button */}
          <ApplyButton
            eventId={event.id}
            isLoggedIn={!!session}
          />
        </CardContent>
      </Card>
    </div>
  )
}
