import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
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

  const approvedCount = applications.filter((app) => app.status === "APPROVED").length
  const pendingCount = applications.filter((app) => app.status === "PENDING").length
  const rejectedCount = applications.filter((app) => app.status === "REJECTED").length

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_28%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
              Applications Dashboard
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">My Applications</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/65 md:text-lg">
              Track every registration, review approval progress, and jump back into upcoming
              campus events from one clean place.
            </p>
          </div>

          <Link href="/events">
            <Button className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 hover:bg-white/90">
              Browse Events
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
            <p className="text-sm text-white/60">Total registrations</p>
            <p className="mt-3 text-3xl font-semibold">{applications.length}</p>
          </div>
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm">Approved</p>
            </div>
            <p className="mt-3 text-3xl font-semibold text-white">{approvedCount}</p>
          </div>
          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-100">
              <Clock3 className="h-4 w-4" />
              <p className="text-sm">Pending</p>
            </div>
            <p className="mt-3 text-3xl font-semibold text-white">{pendingCount}</p>
          </div>
          <div className="rounded-3xl border border-rose-300/20 bg-rose-300/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-rose-100">
              <XCircle className="h-4 w-4" />
              <p className="text-sm">Rejected</p>
            </div>
            <p className="mt-3 text-3xl font-semibold text-white">{rejectedCount}</p>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.08),transparent_28%)]" />
          <div className="relative mx-auto flex min-h-[380px] max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#6366f1,#ec4899)] text-white shadow-[0_20px_40px_-20px_rgba(99,102,241,0.8)]">
              <CalendarClock className="h-10 w-10" />
            </div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Start your journey
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              No Applications Yet
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              You have not registered for any campus events yet. Explore the latest fests,
              workshops, and competitions to submit your first application.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Link href="/events">
                <Button className="h-11 rounded-full px-6 text-sm font-semibold">
                  Browse Events
                </Button>
              </Link>
              <Link href="/my-events">
                <Button variant="outline" className="h-11 rounded-full px-6 text-sm font-semibold">
                  My Registrations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {applications.map((app) => {
            const statusColor =
              app.status === "APPROVED"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : app.status === "REJECTED"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            const typeAccent =
              app.event.type === "TECH"
                ? "from-sky-500/16 to-indigo-500/10 text-sky-700 border-sky-200"
                : app.event.type === "SPORTS"
                ? "from-emerald-500/16 to-lime-500/10 text-emerald-700 border-emerald-200"
                : app.event.type === "CULTURAL"
                ? "from-fuchsia-500/16 to-violet-500/10 text-fuchsia-700 border-fuchsia-200"
                : app.event.type === "FEST"
                ? "from-amber-500/16 to-orange-500/10 text-amber-700 border-amber-200"
                : "from-indigo-500/16 to-pink-500/10 text-indigo-700 border-indigo-200"

            return (
              <Card
                key={app.id}
                className="group overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,255,0.96))] shadow-[0_25px_55px_-32px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_35px_80px_-35px_rgba(79,70,229,0.45)]"
              >
                <CardHeader className="relative overflow-hidden border-b border-slate-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(247,249,255,0.95))] px-6 pb-6 pt-7">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#6366f1,#ec4899)]" />
                  <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-indigo-500/8 blur-3xl" />

                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${typeAccent}`}
                    >
                      <Ticket className="h-3.5 w-3.5" />
                      {app.event.type}
                    </div>
                    <Badge className={`border px-3 py-1 text-[11px] font-semibold tracking-[0.16em] ${statusColor}`}>
                      {app.status}
                    </Badge>
                  </div>

                  <CardTitle className="max-w-[92%] text-[2rem] font-semibold leading-tight tracking-tight text-slate-950">
                    {app.event.title}
                  </CardTitle>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                    Keep an eye on your application progress and jump back into open campus events
                    whenever you want to register for more.
                  </p>
                </CardHeader>

                <CardContent className="space-y-6 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.94))] p-6 text-sm">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Event type
                      </p>
                      <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                        {app.event.type}
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Deadline
                      </p>
                      <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                        {new Date(app.event.deadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <Link href="/events">
                    <Button
                      className="h-12 w-full rounded-full bg-slate-950 text-sm font-semibold text-white transition group-hover:bg-indigo-600 hover:bg-indigo-600"
                    >
                      Browse Events
                      <ArrowRight className="ml-2 h-4 w-4" />
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
