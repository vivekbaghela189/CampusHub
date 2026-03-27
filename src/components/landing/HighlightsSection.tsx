"use client"

import { CalendarRange, Camera, Mic2, Sparkles, Star, Users2 } from "lucide-react"
import BackgroundLines from "@/components/layout/BackgroundLines"

const featuredEvents = [
  {
    title: "Rhythm Night 2026",
    type: "Cultural Evening",
    summary: "A packed arena of music, dance battles and crowd-led performances under a stadium light show.",
    accent: "#f97316",
    stats: ["8K+ attendees", "3 stages", "Live finale"],
  },
  {
    title: "CodeStorm Hack Summit",
    type: "Tech Fest",
    summary: "Builders, mentors and startup scouts come together for rapid prototyping, demos and prize reveals.",
    accent: "#6366f1",
    stats: ["36-hour sprint", "120 teams", "Industry jury"],
  },
  {
    title: "Campus Premier League",
    type: "Sports Showcase",
    summary: "High-energy league matches, fan zones and headline finals that turn the whole campus into one arena.",
    accent: "#34d399",
    stats: ["14 colleges", "6 sports", "Final day crowd"],
  },
]

const celebrityGuests = [
  {
    name: "Armaan Malik",
    role: "Live performance headliner",
    note: "Brought the closing concert alive with a singalong set and student interactions.",
  },
  {
    name: "Mithila Palkar",
    role: "Special guest appearance",
    note: "Joined the spotlight session and shared stories around creativity, career growth and campus life.",
  },
  {
    name: "Gaurav Taneja",
    role: "Fitness and motivation talk",
    note: "Led a packed conversation on discipline, personal branding and balancing ambition with consistency.",
  },
]

const experiencePillars = [
  {
    icon: Sparkles,
    title: "Event Glimpses",
    text: "Give visitors a quick visual preview of your flagship moments before they even open the events page.",
  },
  {
    icon: Star,
    title: "Celebrity Presence",
    text: "Highlight notable guests, performers and speakers to instantly build excitement and trust.",
  },
  {
    icon: Users2,
    title: "Campus Energy",
    text: "Show the scale of participation, audience vibe and crowd experience your platform helps create.",
  },
]

export default function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-[#080b12] py-28 scroll-mt-24"
    >
      <BackgroundLines />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 68%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-8">
        <div className="mb-16 max-w-3xl">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#f59e0b" }}
          >
            Campus Highlights
          </p>
          <h2
            className="font-extrabold leading-[1.04] tracking-tight text-white"
            style={{ fontSize: "clamp(36px,4vw,56px)" }}
          >
            Let visitors preview the
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}best moments{" "}
            </span>
            on campus.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/45">
            Add a dedicated section for featured events and celebrity appearances so students instantly
            understand the scale, vibe and credibility of your campus platform.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {featuredEvents.map((event) => (
              <article
                key={event.title}
                className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
                style={{
                  boxShadow: `0 18px 44px -28px ${event.accent}66`,
                }}
              >
                <div
                  className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border"
                  style={{
                    background: `${event.accent}18`,
                    borderColor: `${event.accent}45`,
                    color: event.accent,
                  }}
                >
                  <CalendarRange size={20} />
                </div>
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {event.type}
                </p>
                <h3 className="text-[22px] font-semibold tracking-tight text-white">{event.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/48">{event.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {event.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] text-white/60"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Celebrity Arrivals
                </p>
                <h3 className="mt-2 text-[28px] font-semibold tracking-tight text-white">
                  Spotlight guests
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
                <Camera size={20} />
              </div>
            </div>

            <div className="grid gap-4">
              {celebrityGuests.map((guest, index) => (
                <article
                  key={guest.name}
                  className="rounded-[24px] border border-white/[0.08] bg-black/20 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.18em] text-white/30">
                        Guest {index + 1}
                      </p>
                      <h4 className="mt-2 text-[20px] font-semibold tracking-tight text-white">
                        {guest.name}
                      </h4>
                      <p className="mt-1 text-sm text-amber-300">{guest.role}</p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/65">
                      <Mic2 size={18} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/48">{guest.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {experiencePillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <div
                key={pillar.title}
                className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/75">
                  <Icon size={18} />
                </div>
                <h4 className="text-lg font-semibold tracking-tight text-white">{pillar.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/45">{pillar.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
