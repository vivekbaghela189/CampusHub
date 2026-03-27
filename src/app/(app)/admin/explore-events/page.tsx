import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function AdminExploreEventsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  const events = await prisma.event.findMany({
    include: {
      details: true,
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container mx-auto grid gap-6 px-6 py-16">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Explore Events</h1>
          <p className="text-muted-foreground">
            Review all active events and jump to student registrations for each one.
          </p>
        </div>
        <Badge variant="secondary">{events.length} events</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{event.description}</p>
                <p>
                  <span className="font-medium text-foreground">Type:</span>{" "}
                  {event.type}
                </p>
                <p>
                  <span className="font-medium text-foreground">Deadline:</span>{" "}
                  {new Date(event.deadline).toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="font-medium text-foreground">Price:</span>{" "}
                  {event.isPaid && Number(event.price ?? 0) > 0
                    ? `${event.currency} ${Number(event.price).toLocaleString("en-IN")}`
                    : "Free"}
                </p>
                <p>
                  <span className="font-medium text-foreground">Venue:</span>{" "}
                  {event.details?.venue || "Not added yet"}
                </p>
                <p>
                  <span className="font-medium text-foreground">Event date:</span>{" "}
                  {event.details?.eventDate || "TBA"}
                  {event.details?.eventTime ? `, ${event.details.eventTime}` : ""}
                </p>
                <p>
                  <span className="font-medium text-foreground">Registered students:</span>{" "}
                  {event._count.applications}
                </p>
              </div>

              <Button asChild variant="outline">
                <Link href={`/admin/event/${event.id}`}>View Event Registrations</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
