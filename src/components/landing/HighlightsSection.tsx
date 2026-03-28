"use client"

import Image from "next/image"
import BackgroundLines from "@/components/layout/BackgroundLines"

const highlightGallery = [
  {
    name: "Armaan Malik",
    role: "Concert Night",
    event: "Main Stage Finale",
    tone: "from-orange-400/30 via-pink-500/18 to-transparent",
    image: "",
  },
  {
    name: "Mithila Palkar",
    role: "Creator Session",
    event: "Spotlight Stories",
    tone: "from-fuchsia-400/28 via-violet-500/18 to-transparent",
    image: "",
  },
  {
    name: "Gaurav Taneja",
    role: "Campus Talk",
    event: "Discipline & Growth",
    tone: "from-emerald-400/28 via-cyan-500/18 to-transparent",
    image: "",
  },
  {
    name: "DJ Crowd Set",
    role: "Night Experience",
    event: "Culture Fest Lights",
    tone: "from-sky-400/28 via-indigo-500/18 to-transparent",
    image: "",
  },
  {
    name: "Finale Moments",
    role: "Audience Energy",
    event: "Packed Arena Frames",
    tone: "from-amber-300/28 via-rose-500/18 to-transparent",
    image: "",
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
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Highlights Gallery
          </p>
          <h2
            className="font-extrabold leading-[1.04] tracking-tight text-white"
            style={{ fontSize: "clamp(36px,4vw,56px)" }}
          >
            A wall full of
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fb7185, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}event faces{" "}
            </span>
            and moments
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/45">
            Showcase guest appearances, crowd reactions and standout event moments in a dense
            photo-wall layout that instantly feels alive.
          </p>
        </div>

        <div className="mt-8">
          <div className="grid auto-rows-[180px] gap-4 md:grid-cols-6">
            {highlightGallery.map((item, index) => {
              const tileClass =
                index === 0
                  ? "md:col-span-2 md:row-span-2"
                  : index === 1
                    ? "md:col-span-2"
                    : index === 2
                      ? "md:col-span-2"
                      : index === 3
                        ? "md:col-span-3"
                        : "md:col-span-3"

              const initials = item.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()

              return (
                <article
                  key={item.name}
                  className={`group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0e1320] ${tileClass}`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(180deg,rgba(10,14,24,0.15),rgba(10,14,24,0.8))]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
                      <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                          {item.role}
                        </span>
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-lg font-semibold text-white/90">
                          {initials}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(5,8,15,0.2)_45%,rgba(5,8,15,0.88)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                      {item.event}
                    </p>
                    <h4 className="mt-2 text-[22px] font-semibold tracking-tight text-white">
                      {item.name}
                    </h4>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
