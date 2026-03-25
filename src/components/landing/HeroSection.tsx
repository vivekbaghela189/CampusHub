"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

import FadeIn from "@/components/animations/FadeIn"
import { Button } from "@/components/ui/button"

function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = "rgba(255,255,255,0.03)"
      ctx.lineWidth = 1

      for (let x = 0; x < w; x += 54) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      for (let y = 0; y < h; y += 54) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      const orbs = [
        { bx: 0.15, by: 0.25, r: 340, c: "99,102,241" },
        { bx: 0.85, by: 0.38, r: 280, c: "139,92,246" },
        { bx: 0.5, by: 0.85, r: 240, c: "59,130,246" },
      ]

      orbs.forEach((orb, index) => {
        const ox = w * orb.bx + Math.sin(t * 0.38 + index * 2.2) * 40
        const oy = h * orb.by + Math.cos(t * 0.28 + index * 1.7) * 26
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r)
        gradient.addColorStop(0, `rgba(${orb.c},.09)`)
        gradient.addColorStop(1, `rgba(${orb.c},0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      t += 0.007
      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

function EventPill({ label, color }: { label: string; color: string }) {
  return (
    <div className="inline-flex cursor-default select-none items-center gap-2 rounded-full border border-white/[0.09] bg-white/5 px-3.5 py-1.5 text-[13px] text-white/50 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white/80">
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: color }} />
      {label}
    </div>
  )
}

function StatItem({
  value,
  suffix = "",
  label,
}: {
  value: string
  suffix?: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 border-r border-white/[0.07] px-8 last:border-r-0">
      <span className="text-[26px] leading-none tracking-tight text-white">
        {value}
        <span className="text-indigo-400">{suffix}</span>
      </span>
      <span className="text-[12px] tracking-wide text-white/35">{label}</span>
    </div>
  )
}

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,.5); }
          50% { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
        }
        .badge-ring { animation: badgePulse 2.8s ease-in-out infinite; }
        .dot-blink { animation: badgePulse 2s ease-in-out infinite; }

        .btn-indigo {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          box-shadow: 0 0 0 1px rgba(99,102,241,.45), 0 8px 28px rgba(99,102,241,.35) !important;
          border: none !important;
          transition: box-shadow .2s, transform .2s !important;
        }
        .btn-indigo:hover {
          box-shadow: 0 0 0 1px rgba(139,92,246,.7), 0 14px 44px rgba(139,92,246,.55) !important;
          transform: translateY(-1px) !important;
        }
        .btn-glass {
          background: rgba(255,255,255,.055) !important;
          border: 1px solid rgba(255,255,255,.13) !important;
          color: rgba(255,255,255,.8) !important;
          transition: background .2s, border-color .2s, transform .2s !important;
        }
        .btn-glass:hover {
          background: rgba(255,255,255,.09) !important;
          border-color: rgba(255,255,255,.24) !important;
          transform: translateY(-1px) !important;
        }
      `}</style>

      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#080b12]">
        <HeroCanvas />

        <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <FadeIn>
            <div className="badge-ring mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="dot-blink inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <span className="text-xs font-medium tracking-wide text-indigo-300">
                Register & Enjoy
              </span>
              <span className="text-xs text-indigo-400/40">-&gt;</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <h1 className="mx-auto mb-6 max-w-3xl text-[clamp(42px,6vw,76px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
              Your campus,
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                fully alive.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p className="mx-auto mb-10 max-w-[500px] text-[17px] font-light leading-relaxed text-white/40">
              Discover hackathons, cultural fests, sports tournaments and workshops,
              all in one place. Register in seconds, never miss a moment.
            </p>
          </FadeIn>

          <FadeIn delay={0.36}>
            <div className="mb-14 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="btn-indigo rounded-xl px-9 text-[15px] font-medium text-white"
              >
                <Link href="/events">Explore Events -&gt;</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-glass rounded-xl px-9 text-[15px] font-medium"
              >
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.48}>
            <div className="mb-16 flex flex-wrap justify-center gap-2.5">
              <EventPill label="Hackathons" color="#6366f1" />
              <EventPill label="Cultural Fest" color="#f97316" />
              <EventPill label="Sports" color="#a78bfa" />
              <EventPill label="Workshops" color="#34d399" />
              <EventPill label="Competitions" color="#fb7185" />
              <EventPill label="Seminars" color="#38bdf8" />
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mx-auto flex w-full max-w-[600px] items-stretch border-y border-white/[0.07] py-6">
              <StatItem value="4,200" suffix="+" label="Students" />
              <StatItem value="18" label="Colleges" />
              <StatItem value="200" suffix="+" label="Events/year" />
              <StatItem value="42" label="Live now" />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
