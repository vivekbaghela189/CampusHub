import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function AdminRegistrationsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  const events = await prisma.event.findMany({
    include: {
      applications: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto grid gap-6 px-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Registered Students</h1>
        <p className="text-muted-foreground">
          Students are grouped event-wise so you can review registrations quickly.
        </p>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle>{event.title}</CardTitle>
              <Button asChild variant="outline">
                <Link href={`/admin/event/${event.id}`}>Open Full Review</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.applications.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No students have registered for this event yet.
                </p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {event.applications.map((application) => (
                    <div
                      key={application.id}
                      className="rounded-lg border p-4 text-sm"
                    >
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {application.user.name || "No name"}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {application.user.email}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {application.status}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
