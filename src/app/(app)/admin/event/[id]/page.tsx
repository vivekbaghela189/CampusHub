import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import ApproveRejectButtons from "@/components/admin/ApproveRejectButtons"

export default async function EventApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) redirect("/login")
  if (session.user.role !== "ADMIN") redirect("/")

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      applications: {
        include: {
          user: true
        }
      }
    }
  })

  if (!event) return notFound()

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">
        Applicants for {event.title}
      </h1>

      {event.applications.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="space-y-6">
          {event.applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-4 space-y-2"
            >
              <p><strong>Name:</strong> {app.user.name}</p>
              <p><strong>Email:</strong> {app.user.email}</p>
              <p><strong>Status:</strong> {app.status}</p>

              <ApproveRejectButtons
                applicationId={app.id}
                currentStatus={app.status}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}