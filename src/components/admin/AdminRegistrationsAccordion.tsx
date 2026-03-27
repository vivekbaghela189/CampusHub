"use client"

import Link from "next/link"

type RegistrationEvent = {
  id: string
  title: string
  type: string
  applications: Array<{
    id: string
    status: string
    user: {
      name: string | null
      email: string
    }
  }>
}

type Props = {
  events: RegistrationEvent[]
}

export default function AdminRegistrationsAccordion({ events }: Props) {
  return (
    <div className="grid gap-5">
      {events.map((event) => (
        <div
          key={event.id}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.12),transparent_24%),linear-gradient(180deg,rgba(17,20,34,0.96),rgba(15,23,42,0.94))] px-0 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.85)]"
        >
          <div className="px-6 py-6 md:px-7">
            <div className="flex w-full flex-col gap-4 text-left md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
                  {event.type}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {event.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Total registrations for this event:{" "}
                  <span className="font-semibold text-white">
                    {event.applications.length}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
                  Total: {event.applications.length}
                </span>
                <Link
                  href={`/admin/event/${event.id}`}
                  className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  See Registrations
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
