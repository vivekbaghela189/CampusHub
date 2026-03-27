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
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-10 md:px-8">
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_24%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(244,114,182,0.85)]" />
            Applicant Review
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Applicants for {event.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65 md:text-[1.2rem]">
            Review registrations for this event and approve or reject pending students.
          </p>
        </div>

        <div className="mt-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 w-fit">
          {event.applications.length} applicants
        </div>

        {event.applications.length === 0 ? (
          <div className="mt-10 rounded-[28px] border border-dashed border-white/12 bg-white/[0.03] p-8 text-white/55">
            No applicants yet.
          </div>
        ) : (
          <div className="mt-10 grid gap-5">
            {event.applications.map((app) => (
              <div
                key={app.id}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.85)]"
              >
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {app.user.name || "No name"}
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      {app.user.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] ${
                      app.status === "APPROVED"
                        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                        : app.status === "REJECTED"
                          ? "border-rose-400/25 bg-rose-400/10 text-rose-100"
                          : "border-amber-300/25 bg-amber-300/10 text-amber-100"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm leading-7 text-white/65">
                    <span className="font-semibold text-white">Name:</span>{" "}
                    {app.user.name || "No name"}
                  </p>
                  <p className="text-sm leading-7 text-white/65">
                    <span className="font-semibold text-white">Email:</span>{" "}
                    {app.user.email}
                  </p>
                  <p className="text-sm leading-7 text-white/65">
                    <span className="font-semibold text-white">Status:</span>{" "}
                    {app.status}
                  </p>
                </div>

                <div className="mt-5">
                  <ApproveRejectButtons
                    applicationId={app.id}
                    currentStatus={app.status}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
