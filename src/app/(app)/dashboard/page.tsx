import Link from "next/link"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Download,
  Sparkles,
  Ticket,
  XCircle,
} from "lucide-react"
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

  if (session.user.role === "ADMIN") {
    redirect("/admin")
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

  const eventIds = applications.map((app) => app.eventId)
  const eventDetails = eventIds.length
    ? await prisma.$queryRaw<Array<{ eventId: string; eventDate: string | null; eventTime: string | null }>>(
        Prisma.sql`
          SELECT "eventId", "eventDate", "eventTime"
          FROM "EventDetails"
          WHERE "eventId" IN (${Prisma.join(eventIds)})
        `
      )
    : []

  const detailsByEventId = new Map(eventDetails.map((detail) => [detail.eventId, detail]))

  const approvedCount = applications.filter((app) => app.status === "APPROVED").length
  const pendingCount = applications.filter((app) => app.status === "PENDING").length
  const rejectedCount = applications.filter((app) => app.status === "REJECTED").length

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-10 md:px-8">
      <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_28%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-10 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:min-h-[820px] md:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
              Registrations Dashboard
            </div>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">My Registrations</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65 md:text-[1.45rem]">
              Track every registration, review approval progress, and jump back into upcoming
              campus events from one clean place.
            </p>
          </div>

          <Link href="/events">
            <Button className="h-14 rounded-full bg-white px-8 text-base font-semibold text-slate-950 shadow-[0_18px_40px_-24px_rgba(255,255,255,0.7)] transition duration-300 hover:-translate-y-1 hover:bg-fuchsia-200 hover:text-slate-950 hover:shadow-[0_24px_50px_-24px_rgba(99,102,241,0.45)]">
              Browse Events
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[30px] border border-white/10 bg-white/6 p-7 backdrop-blur-sm">
            <p className="text-base text-white/60">Total registrations</p>
            <p className="mt-4 text-5xl font-semibold">{applications.length}</p>
          </div>
          <div className="rounded-[30px] border border-emerald-400/20 bg-emerald-400/10 p-7 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-base">Approved</p>
            </div>
            <p className="mt-4 text-5xl font-semibold text-white">{approvedCount}</p>
          </div>
          <div className="rounded-[30px] border border-amber-300/20 bg-amber-300/10 p-7 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-100">
              <Clock3 className="h-5 w-5" />
              <p className="text-base">Pending</p>
            </div>
            <p className="mt-4 text-5xl font-semibold text-white">{pendingCount}</p>
          </div>
          <div className="rounded-[30px] border border-rose-300/20 bg-rose-300/10 p-7 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-rose-100">
              <XCircle className="h-5 w-5" />
              <p className="text-base">Rejected</p>
            </div>
            <p className="mt-4 text-5xl font-semibold text-white">{rejectedCount}</p>
          </div>
        </div>
        <div className="mt-10">
          {applications.length === 0 ? (
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-sm md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.12),transparent_28%)]" />
              <div className="relative mx-auto flex min-h-[380px] max-w-3xl flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#6366f1,#ec4899)] text-white shadow-[0_20px_40px_-20px_rgba(99,102,241,0.8)]">
                  <CalendarClock className="h-10 w-10" />
                </div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Start your journey
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  No Applications Yet
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
                  You have not registered for any campus events yet. Explore the latest fests,
                  workshops, and competitions to submit your first application.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                  <Link href="/events">
                    <Button className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 shadow-[0_16px_36px_-24px_rgba(255,255,255,0.7)] transition duration-300 hover:-translate-y-1 hover:bg-fuchsia-200 hover:text-slate-950 hover:shadow-[0_22px_44px_-24px_rgba(99,102,241,0.45)]">
                      Browse Events
                    </Button>
                  </Link>
                  <Link href="/my-events">
                    <Button variant="outline" className="h-11 rounded-full border-white/15 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10">
                      My Registrations
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {applications.map((app) => {
                const eventDetail = detailsByEventId.get(app.eventId)
                const downloadContent = [
                  `Event: ${app.event.title}`,
                  `Status: ${app.status}`,
                  `Type: ${app.event.type}`,
                  `Event Date: ${eventDetail?.eventDate || "Date to be announced"}`,
                  `Event Time: ${eventDetail?.eventTime || "Time to be announced"}`,
                ].join("\n")
                const downloadName = `${app.event.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "") || "registration"}-details.txt`
                const statusColor =
                  app.status === "APPROVED"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : app.status === "REJECTED"
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                const typeAccent =
                  app.event.type === "TECH"
                    ? "from-sky-500/18 to-indigo-500/12 text-sky-700 border-sky-200"
                    : app.event.type === "SPORTS"
                    ? "from-emerald-500/18 to-lime-500/12 text-emerald-700 border-emerald-200"
                    : app.event.type === "CULTURAL"
                    ? "from-fuchsia-500/18 to-violet-500/12 text-fuchsia-700 border-fuchsia-200"
                    : app.event.type === "FEST"
                    ? "from-amber-500/18 to-orange-500/12 text-amber-700 border-amber-200"
                    : "from-indigo-500/18 to-pink-500/12 text-indigo-700 border-indigo-200"
                const accentBar =
                  app.event.type === "TECH"
                    ? "linear-gradient(90deg,#60a5fa,#8b5cf6,#ec4899)"
                    : app.event.type === "SPORTS"
                    ? "linear-gradient(90deg,#22c55e,#14b8a6,#84cc16)"
                    : app.event.type === "CULTURAL"
                    ? "linear-gradient(90deg,#d946ef,#a855f7,#6366f1)"
                    : app.event.type === "FEST"
                    ? "linear-gradient(90deg,#fb923c,#f97316,#fb7185)"
                    : "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)"
                const eventIcon =
                  app.event.type === "TECH"
                    ? "💻"
                    : app.event.type === "SPORTS"
                    ? "🏅"
                    : app.event.type === "CULTURAL"
                    ? "🎭"
                    : app.event.type === "FEST"
                    ? "🎉"
                    : "🎬"

                return (
                  <Card
                    key={app.id}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.12),transparent_28%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_30%),linear-gradient(180deg,#161a2b_0%,#111827_100%)] shadow-[0_18px_38px_-24px_rgba(15,23,42,0.72)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(79,70,229,0.32)]"
                  >
                    <CardHeader className="relative flex min-h-[272px] flex-col overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(24,30,50,0.96),rgba(19,24,41,0.95))] px-5 pb-6 pt-5">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: accentBar }} />
                      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-indigo-500/12 blur-3xl" />
                      <div className="pointer-events-none absolute left-0 bottom-0 h-24 w-24 rounded-full bg-sky-400/8 blur-3xl" />

                      <div className="mb-5 flex items-start justify-between gap-3">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] ${typeAccent}`}
                        >
                          <Ticket className="h-3.5 w-3.5" />
                          {app.event.type}
                        </div>
                        <Badge className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ${statusColor}`}>
                          {app.status}
                        </Badge>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(99,102,241,0.24),rgba(244,114,182,0.16))] text-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                          {eventIcon}
                        </div>
                        <CardTitle className="max-w-[92%] min-h-[72px] text-[1.45rem] font-semibold leading-tight tracking-tight text-white">
                          {app.event.title}
                        </CardTitle>
                      </div>

                      <p className="mt-5 min-h-[78px] max-w-2xl text-[13.5px] leading-7 text-white/60">
                        Keep an eye on your application progress and jump back into open campus events
                        whenever you want to register for more.
                      </p>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col space-y-5 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.06),transparent_30%),linear-gradient(180deg,rgba(19,24,41,0.96),rgba(15,23,42,0.94))] p-4 text-sm">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                            Event date
                          </p>
                          <p className="mt-3 text-[15px] font-semibold tracking-tight text-white">
                            {eventDetail?.eventDate || "Date to be announced"}
                          </p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                            Event time
                          </p>
                          <p className="mt-3 text-[15px] font-semibold tracking-tight text-white">
                            {eventDetail?.eventTime || "Time to be announced"}
                          </p>
                        </div>
                      </div>

                      <Button
                        asChild
                        className="mt-auto h-11 w-full rounded-full bg-slate-950 text-xs font-semibold text-white transition group-hover:bg-indigo-600 hover:bg-indigo-600"
                      >
                        <a
                          href={`data:text/plain;charset=utf-8,${encodeURIComponent(downloadContent)}`}
                          download={downloadName}
                        >
                          Download
                          <Download className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
