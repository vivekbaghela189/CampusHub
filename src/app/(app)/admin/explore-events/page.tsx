import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const TYPE_STYLES: Record<
  string,
  { color: string; bg: string; border: string; glow: string; accent: string }
> = {
  TECH: {
    color: "#7dd3fc",
    bg: "rgba(125,211,252,0.10)",
    border: "rgba(125,211,252,0.25)",
    glow: "rgba(14,165,233,0.18)",
    accent: "linear-gradient(90deg,#60a5fa,#8b5cf6)",
  },
  SPORTS: {
    color: "#86efac",
    bg: "rgba(134,239,172,0.10)",
    border: "rgba(134,239,172,0.25)",
    glow: "rgba(34,197,94,0.18)",
    accent: "linear-gradient(90deg,#22c55e,#14b8a6)",
  },
  CULTURAL: {
    color: "#f0abfc",
    bg: "rgba(240,171,252,0.10)",
    border: "rgba(240,171,252,0.25)",
    glow: "rgba(217,70,239,0.18)",
    accent: "linear-gradient(90deg,#d946ef,#8b5cf6)",
  },
  FEST: {
    color: "#fdba74",
    bg: "rgba(253,186,116,0.10)",
    border: "rgba(253,186,116,0.25)",
    glow: "rgba(249,115,22,0.18)",
    accent: "linear-gradient(90deg,#f97316,#fb7185)",
  },
  SCREENING: {
    color: "#c4b5fd",
    bg: "rgba(196,181,253,0.10)",
    border: "rgba(196,181,253,0.25)",
    glow: "rgba(139,92,246,0.18)",
    accent: "linear-gradient(90deg,#8b5cf6,#ec4899)",
  },
  GENERAL: {
    color: "#cbd5e1",
    bg: "rgba(203,213,225,0.10)",
    border: "rgba(203,213,225,0.25)",
    glow: "rgba(148,163,184,0.18)",
    accent: "linear-gradient(90deg,#94a3b8,#64748b)",
  },
}

function EventCard({
  event,
  expired = false,
}: {
  event: {
    id: string
    title: string
    description: string
    type: string
    deadline: Date
    isPaid: boolean
    price: unknown
    currency: string
    details: {
      venue: string | null
      eventDate: string | null
      eventTime: string | null
    } | null
    _count: {
      applications: number
    }
  }
  expired?: boolean
}) {
  const typeStyle = TYPE_STYLES[event.type] ?? TYPE_STYLES.GENERAL
  const price =
    event.isPaid && Number(event.price ?? 0) > 0
      ? `${event.currency} ${Number(event.price).toLocaleString("en-IN")}`
      : "Free"

  return (
    <div
      className={`group relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-[30px] border shadow-[0_25px_60px_-35px_rgba(15,23,42,0.85)] transition duration-300 ${
        expired
          ? "border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] opacity-90 hover:border-white/15"
          : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_25px_60px_-28px_rgba(99,102,241,0.30)]"
      }`}
    >
      <div
        className="pointer-events-none h-1 w-full"
        style={{ background: typeStyle.accent }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl transition duration-300 group-hover:scale-110"
        style={{ background: typeStyle.glow }}
      />

      <div className="relative flex h-full flex-col gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Badge
            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{
              color: typeStyle.color,
              background: typeStyle.bg,
              borderColor: typeStyle.border,
            }}
          >
            {event.type}
          </Badge>

          <div className="flex flex-wrap justify-end gap-2 sm:flex-col sm:items-end">
            {expired ? (
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100">
                Expired
              </span>
            ) : null}
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white/70">
              {event._count.applications} registrations
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {event.title}
        </h2>

        <p className="min-h-[96px] text-sm leading-7 text-white/60">
          {event.description}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Deadline
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {new Date(event.deadline).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Price
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {price}
            </p>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Venue
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {event.details?.venue || "Not added yet"}
            </p>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Event date
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {event.details?.eventDate || "TBA"}
              {event.details?.eventTime ? `, ${event.details.eventTime}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            asChild
            variant="outline"
            className="h-12 flex-1 rounded-full border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <Link href={`/admin/edit-event/${event.id}`}>Edit Event</Link>
          </Button>

          <Button
            asChild
            className="h-12 flex-1 rounded-full bg-white text-sm font-semibold text-slate-950 hover:bg-white/90"
          >
            <Link href={`/admin/event/${event.id}`}>View Event Registrations</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default async function AdminExploreEventsPage() {
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

  const now = new Date()
  const activeEvents = events.filter((event) => new Date(event.deadline) >= now)
  const expiredEvents = events.filter((event) => new Date(event.deadline) < now)

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-10 md:px-8">
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_24%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:p-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(244,114,182,0.85)]" />
              Event Explorer
            </div>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
              Explore Events
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65 md:text-[1.2rem]">
              Review all active events, pricing, schedules, and jump straight to registrations for each one.
            </p>
          </div>

          <Badge className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
            {events.length} total events
          </Badge>
        </div>

        <div className="mt-10 space-y-10">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Active Events</h2>
                <p className="mt-1 text-sm text-white/55">
                  Events with an upcoming or ongoing registration deadline.
                </p>
              </div>
              <Badge className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                {activeEvents.length} active
              </Badge>
            </div>

            {activeEvents.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.03] p-8 text-white/55">
                No active events available right now.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Expired Events</h2>
                <p className="mt-1 text-sm text-white/55">
                  Events whose registration deadline has already passed.
                </p>
              </div>
              <Badge className="w-fit rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
                {expiredEvents.length} expired
              </Badge>
            </div>

            {expiredEvents.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.03] p-8 text-white/55">
                No expired events yet.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {expiredEvents.map((event) => (
                  <EventCard key={event.id} event={event} expired />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
