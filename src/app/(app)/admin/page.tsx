import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminEventForm from "@/components/admin/AdminEventForm"
import { Badge } from "@/components/ui/badge"

export default async function AdminPage() {
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
    <div className="container mx-auto grid gap-8 px-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Create campus events, add event details, and review student applicants.
        </p>
      </div>

      <AdminEventForm />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Published Events</h2>
          <Badge variant="secondary">{events.length} total</Badge>
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
                  <span className="font-medium text-foreground">Pricing:</span>{" "}
                  {event.isPaid && Number(event.price ?? 0) > 0
                    ? `${event.currency} ${Number(event.price).toLocaleString("en-IN")}`
                    : "Free"}
                </p>
                <p>
                  <span className="font-medium text-foreground">Venue:</span>{" "}
                  {event.details?.venue || "Not added yet"}
                </p>
                <p>
                  <span className="font-medium text-foreground">Event schedule:</span>{" "}
                  {event.details?.eventDate || "TBA"}
                  {event.details?.eventTime ? `, ${event.details.eventTime}` : ""}
                </p>
                <p>
                  <span className="font-medium text-foreground">Applicants:</span>{" "}
                  {event._count.applications}
                </p>
              </div>

              <Link href={`/admin/event/${event.id}`} className="text-primary underline">
                View Applicants
              </Link>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>
    </div>
  )
}
