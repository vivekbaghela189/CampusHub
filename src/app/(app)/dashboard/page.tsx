import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const applications = await prisma.application.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      event: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto px-6 py-20">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">My Applications</h1>
        <p className="text-muted-foreground mt-2">
          Track the status of your event registrations.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-24 border rounded-lg">
          <h2 className="text-xl font-semibold">
            No Applications Yet
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore events and start participating in campus activities.
          </p>
          <Link href="/events">
            <Button className="mt-6">Browse Events</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {applications.map((app) => {
            const statusColor =
              app.status === "APPROVED"
                ? "bg-green-500/10 text-green-600"
                : app.status === "REJECTED"
                ? "bg-red-500/10 text-red-600"
                : "bg-yellow-500/10 text-yellow-600"

            return (
              <Card
                key={app.id}
                className="transition hover:shadow-lg hover:-translate-y-1 duration-200"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {app.event.title}

                    <Badge className={statusColor}>
                      {app.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                  <p>
                    <strong>Type:</strong> {app.event.type}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(app.event.deadline).toLocaleDateString()}
                  </p>

                  <Link href={`/events/${app.event.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                    >
                      View Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}