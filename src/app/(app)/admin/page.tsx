import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/admin/events/${event.id}`}
                className="text-primary underline"
              >
                View Applicants
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}