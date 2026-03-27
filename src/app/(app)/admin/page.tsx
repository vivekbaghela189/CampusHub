import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { CalendarPlus2, LayoutGrid, UsersRound } from "lucide-react"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"

const ACTIONS = [
  {
    title: "Register New Event",
    description:
      "Add a new event with deadline, price, venue, rules, and every detail students need before registering.",
    href: "/admin/register-event",
    buttonLabel: "Register Event",
    icon: CalendarPlus2,
    accent:
      "from-fuchsia-500/20 via-violet-500/10 to-indigo-500/10",
  },
  {
    title: "Explore Events",
    description:
      "Review all ongoing and published events with pricing, deadlines, schedules, and event visibility.",
    href: "/admin/explore-events",
    buttonLabel: "Explore Events",
    icon: LayoutGrid,
    accent:
      "from-sky-500/20 via-indigo-500/10 to-cyan-500/10",
  },
  {
    title: "Registered Students",
    description:
      "Open event-wise registrations, see every student grouped by event, and review approvals quickly.",
    href: "/admin/registrations",
    buttonLabel: "View Registrations",
    icon: UsersRound,
    accent:
      "from-emerald-500/20 via-teal-500/10 to-lime-500/10",
  },
] as const

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  const [eventsCount, applicationsCount] = await Promise.all([
    prisma.event.count(),
    prisma.application.count(),
  ])

  const metrics = {
    "/admin/register-event": "Create and publish",
    "/admin/explore-events": `${eventsCount} live events`,
    "/admin/registrations": `${applicationsCount} registrations`,
  } as const

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-10 md:px-8">
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_24%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(244,114,182,0.85)]" />
            Admin Control Center
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Admin Panel
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65 md:text-[1.2rem]">
            Manage events, explore what is currently live, and monitor student
            registrations from one focused dashboard.
          </p>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {ACTIONS.map((action) => {
            const Icon = action.icon

            return (
              <div
                key={action.href}
                className="group relative flex h-full min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.75)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_25px_50px_-24px_rgba(99,102,241,0.35)]"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${action.accent} opacity-70`}
                />
                <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl transition duration-300 group-hover:scale-110" />

                <div className="relative flex h-full w-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      Action
                    </div>

                    <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/70">
                      {metrics[action.href]}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {action.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-7 text-white/65">
                    {action.description}
                  </p>

                  <Button
                    asChild
                    className="mt-6 h-12 rounded-full bg-white text-sm font-semibold text-slate-950 transition hover:bg-white/90 group-hover:bg-fuchsia-200"
                  >
                    <Link href={action.href}>{action.buttonLabel}</Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
