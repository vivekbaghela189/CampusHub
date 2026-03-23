import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default async function EventsPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    type?: string
  }
}) {
  const search = searchParams.search || ""
  const type = searchParams.type || ""
  let events: Array<{
    id: string
    title: string
    description: string
    type: string
    deadline: Date
  }> = []
  let databaseError = false

  try {
    events = await prisma.event.findMany({
      where: {
        AND: [
          search
            ? {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},
          type ? { type } : {},
        ],
      },
      orderBy: {
        deadline: "asc",
      },
    })
  } catch {
    databaseError = true
  }

  return (
    <div className="container mx-auto px-6 py-20">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Explore Events</h1>
        <p className="text-muted-foreground mt-2">
          Discover upcoming campus activities.
        </p>
      </div>

      {/* Filter Bar */}
      <form className="flex flex-col md:flex-row gap-4 mb-12">
        <Input
          name="search"
          placeholder="Search events..."
          defaultValue={search}
          className="md:w-1/2"
        />

        <select
          name="type"
          defaultValue={type}
          className="border rounded-md px-3 py-2 bg-background"
        >
          <option value="">All Types</option>
          <option value="TECH">Tech</option>
          <option value="SPORTS">Sports</option>
          <option value="CULTURAL">Cultural</option>
          <option value="FEST">Fest</option>
        </select>

        <Button type="submit">Filter</Button>
      </form>

      {/* Events Grid */}
      {databaseError ? (
        <div className="rounded-lg border py-24 text-center">
          <h2 className="text-xl font-semibold">Events are temporarily unavailable</h2>
          <p className="mt-2 text-muted-foreground">
            The app could not connect to the database. Check your `DATABASE_URL`
            and Supabase credentials, then refresh this page.
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-24 border rounded-lg">
          <h2 className="text-xl font-semibold">
            No Events Found
          </h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="transition hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {event.title}
                  <Badge variant="secondary">
                    {event.type}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground line-clamp-2">
                  {event.description}
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(event.deadline).toLocaleDateString()}
                </p>

                <Link href={`/events/${event.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
