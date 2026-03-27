import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import AdminRegistrationsAccordion from "@/components/admin/AdminRegistrationsAccordion"

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

  const serializedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    type: event.type,
    applications: event.applications.map((application) => ({
      id: application.id,
      status: application.status,
      user: {
        name: application.user.name,
        email: application.user.email,
      },
    })),
  }))

  const totalRegistrations = events.reduce(
    (sum, event) => sum + event.applications.length,
    0
  )

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-10 md:px-8">
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_24%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(244,114,182,0.85)]" />
            Event Registrations
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Registered Students
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65 md:text-[1.2rem]">
            Open an event section to see the students who registered for that specific event.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
            {events.length} events
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
            {totalRegistrations} total registrations
          </div>
        </div>

        <div className="mt-10">
          <AdminRegistrationsAccordion events={serializedEvents} />
        </div>
      </section>
    </div>
  )
}
