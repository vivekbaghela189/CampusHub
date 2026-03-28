"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Code,
  Dumbbell,
  Music,
  PartyPopper,
  Plus,
  Quote,
  Sparkles,
  Trophy,
} from "lucide-react"

import FadeIn from "@/components/animations/FadeIn"
import AmbientBackdrop from "@/components/layout/AmbientBackdrop"
import { Button } from "@/components/ui/button"

const steps = [
  {
    num: "01",
    icon: Calendar,
    title: "Discover Events",
    desc: "Explore hackathons, sports competitions, cultural festivals and workshops happening on campus.",
    accent: "#6366f1",
    accentBg: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.2)",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "Register Instantly",
    desc: "Apply to events quickly without complicated forms or lengthy sign-up processes.",
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.08)",
    accentBorder: "rgba(139,92,246,0.2)",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Track Applications",
    desc: "View your event registrations and track their approval status in real time.",
    accent: "#a78bfa",
    accentBorder: "rgba(167,139,250,0.2)",
    accentBg: "rgba(167,139,250,0.08)",
  },
  {
    num: "04",
    icon: PartyPopper,
    title: "Participate & Enjoy",
    desc: "Join events, meet people and gain exciting experiences across campus.",
    accent: "#c084fc",
    accentBg: "rgba(192,132,252,0.08)",
    accentBorder: "rgba(192,132,252,0.2)",
  },
]

const categories = [
  {
    icon: Code,
    title: "Hackathons",
    description: "Build innovative projects and compete with developers.",
    accent: "#6366f1",
    accentBg: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.22)",
    num: "01",
  },
  {
    icon: Dumbbell,
    title: "Sports",
    description: "Participate in football, cricket, athletics and more.",
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.08)",
    accentBorder: "rgba(52,211,153,0.22)",
    num: "02",
  },
  {
    icon: Music,
    title: "Cultural Events",
    description: "Dance, music, drama and creative performances.",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.08)",
    accentBorder: "rgba(167,139,250,0.22)",
    num: "03",
  },
  {
    icon: BookOpen,
    title: "Workshops",
    description: "Learn new skills from industry experts and mentors.",
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.08)",
    accentBorder: "rgba(56,189,248,0.22)",
    num: "04",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Showcase your talent and win exciting prizes.",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.08)",
    accentBorder: "rgba(251,146,60,0.22)",
    num: "05",
  },
  {
    icon: Sparkles,
    title: "Festivals",
    description: "Celebrate college festivals and campus traditions.",
    accent: "#f472b6",
    accentBg: "rgba(244,114,182,0.08)",
    accentBorder: "rgba(244,114,182,0.22)",
    num: "06",
  },
]

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Computer Science Student",
    review: "This platform made it super easy to discover hackathons and competitions happening in our college.",
    accent: "#6366f1",
    accentBg: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.22)",
    initials: "RS",
  },
  {
    name: "Priya Patel",
    role: "Electronics Student",
    review: "I love how simple the registration process is. I never miss campus events anymore.",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.08)",
    accentBorder: "rgba(167,139,250,0.22)",
    initials: "PP",
  },
  {
    name: "Aman Verma",
    role: "Mechanical Student",
    review: "Tracking my event registrations and results from the dashboard is extremely convenient.",
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.08)",
    accentBorder: "rgba(56,189,248,0.22)",
    initials: "AV",
  },
  {
    name: "Sneha Iyer",
    role: "Information Technology",
    review: "The event discovery feature is fantastic. I found three competitions I didn't even know existed!",
    accent: "#f472b6",
    accentBg: "rgba(244,114,182,0.08)",
    accentBorder: "rgba(244,114,182,0.22)",
    initials: "SI",
  },
  {
    name: "Karan Mehta",
    role: "Civil Engineering Student",
    review: "Super intuitive UI. Even non-tech students like me can navigate and register with zero hassle.",
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.08)",
    accentBorder: "rgba(52,211,153,0.22)",
    initials: "KM",
  },
  {
    name: "Divya Nair",
    role: "Biotechnology Student",
    review: "Love the reminder notifications. I never forget an event deadline thanks to this platform.",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.08)",
    accentBorder: "rgba(251,146,60,0.22)",
    initials: "DN",
  },
  {
    name: "Arjun Das",
    role: "Data Science Student",
    review: "The leaderboard and results section gives a healthy competitive edge. Absolutely love it.",
    accent: "#facc15",
    accentBg: "rgba(250,204,21,0.08)",
    accentBorder: "rgba(250,204,21,0.22)",
    initials: "AD",
  },
  {
    name: "Meera Joshi",
    role: "MBA Student",
    review: "As a management student, I was skeptical, but the platform handles non-technical events just as well.",
    accent: "#e879f9",
    accentBg: "rgba(232,121,249,0.08)",
    accentBorder: "rgba(232,121,249,0.22)",
    initials: "MJ",
  },
]

const faqs = [
  {
    q: "How do I register for an event?",
    a: "Go to the events page, open the event details, and click the Apply button to register instantly.",
  },
  {
    q: "Do I need an account to apply?",
    a: "Yes. Creating an account allows you to track applications and manage your event registrations from your dashboard.",
  },
  {
    q: "Are events free to attend?",
    a: "Most campus events are free, but some workshops or competitions may require a small registration fee.",
  },
  {
    q: "Can I cancel my registration?",
    a: "Currently cancellations must be requested directly through the event organizer listed on the event page.",
  },
  {
    q: "What happens after I apply?",
    a: "Your application appears in your dashboard where you can track approval status in real time.",
  },
  {
    q: "What if an event becomes full?",
    a: "When event capacity is reached, new registrations are automatically disabled and the event is marked as full.",
  },
]

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

function TestimonialCard({
  t,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  t: (typeof testimonials)[0]
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        borderColor: isHovered ? t.accentBorder : "rgba(255,255,255,0.07)",
        background: isHovered ? t.accentBg : "rgba(255,255,255,0.02)",
        y: isHovered ? -10 : 0,
        scale: isHovered ? 1.03 : 1,
        boxShadow: isHovered
          ? `0 20px 60px -10px ${t.accent}33, 0 0 0 1px ${t.accentBorder}`
          : "0 0 0 0px transparent",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative flex w-[320px] shrink-0 cursor-default flex-col justify-between gap-8 overflow-hidden rounded-2xl border p-7"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        minHeight: 220,
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <Quote
        size={32}
        className="absolute top-6 right-6"
        style={{
          color: isHovered ? t.accent : "rgba(255,255,255,0.06)",
          transition: "color 0.22s",
        }}
      />

      <p
        className="relative z-10 pt-2 text-[14px] leading-relaxed"
        style={{
          color: isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)",
          transition: "color 0.22s",
        }}
      >
        &ldquo;{t.review}&rdquo;
      </p>

      <div className="relative z-10 flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
          style={{
            background: isHovered ? t.accentBg : "rgba(255,255,255,0.06)",
            border: `1px solid ${isHovered ? t.accentBorder : "rgba(255,255,255,0.1)"}`,
            color: isHovered ? t.accent : "rgba(255,255,255,0.4)",
            transition: "all 0.22s",
          }}
        >
          {t.initials}
        </div>

        <div>
          <p
            className="text-[14px] font-semibold leading-tight"
            style={{
              color: isHovered ? "#fff" : "rgba(255,255,255,0.75)",
              transition: "color 0.22s",
              letterSpacing: "-0.01em",
            }}
          >
            {t.name}
          </p>
          <p
            className="mt-0.5 text-[12px]"
            style={{
              color: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.22)",
              transition: "color 0.22s",
            }}
          >
            {t.role}
          </p>
        </div>
      </div>

      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{
          background: `linear-gradient(90deg, ${t.accent}, transparent)`,
        }}
      />
    </motion.div>
  )
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: typeof testimonials
  direction?: "left" | "right"
  speed?: number
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number | null>(null)
  const doubled = [...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const cardWidth = 320 + 12
    const totalWidth = items.length * cardWidth
    const dir = direction === "left" ? -1 : 1

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isPaused) {
        posRef.current += dir * (speed / 1000) * delta
        if (direction === "left" && posRef.current <= -totalWidth) {
          posRef.current += totalWidth
        }
        if (direction === "right" && posRef.current >= 0) {
          posRef.current -= totalWidth
        }
        track.style.transform = `translateX(${posRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPaused, direction, speed, items.length])

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        setHoveredIndex(null)
        lastTimeRef.current = null
      }}
      style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        ref={trackRef}
        className="flex gap-3 py-4"
        style={{
          width: "max-content",
          transform: direction === "right" ? `translateX(-${items.length * (320 + 12)}px)` : undefined,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            key={i}
            t={t}
            isHovered={hoveredIndex === i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
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
        <AmbientBackdrop variant="hero" />
        <HeroCanvas />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,11,18,0.2) 0%, rgba(8,11,18,0.68) 100%)",
          }}
        />

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

function FeaturesSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="features"
      className="relative overflow-hidden py-28"
      style={{ background: "#080b12" }}
    >
      <AmbientBackdrop variant="default" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "#6366f1" }}
            >
              How it works
            </p>
            <h2
              className="font-extrabold leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(36px,4vw,56px)", color: "#fff" }}
            >
              Four steps to your
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                next big experience.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isHovered = hovered === i

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  borderColor: isHovered ? step.accentBorder : "rgba(255,255,255,0.07)",
                  background: isHovered ? step.accentBg : "rgba(255,255,255,0.02)",
                  y: isHovered ? -6 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative flex cursor-default flex-col gap-6 overflow-hidden rounded-2xl border p-6"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  className="pointer-events-none absolute top-4 right-5 select-none font-extrabold leading-none"
                  style={{
                    fontSize: 72,
                    color: isHovered ? step.accent : "rgba(255,255,255,0.04)",
                    transition: "color 0.22s",
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {step.num}
                </span>

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: isHovered ? step.accentBg : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isHovered ? step.accentBorder : "rgba(255,255,255,0.08)"}`,
                    transition: "all 0.22s",
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isHovered ? step.accent : "rgba(255,255,255,0.35)",
                      transition: "color 0.22s",
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col gap-2">
                  <h3
                    className="text-[17px] font-bold leading-tight"
                    style={{
                      color: isHovered ? "#fff" : "rgba(255,255,255,0.8)",
                      letterSpacing: "-0.01em",
                      transition: "color 0.22s",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{
                      color: isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)",
                      transition: "color 0.22s",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                <motion.div
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${step.accent}, transparent)`,
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CategoriesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <section
      id="categories"
      className="relative overflow-hidden py-28"
      style={{ background: "#080b12" }}
    >
      <AmbientBackdrop variant="default" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-8">
        <div className="mb-16 text-center">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#6366f1" }}
          >
            Event Categories
          </p>
          <h2
            className="mx-auto font-extrabold leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(36px,4vw,56px)", color: "#fff" }}
          >
            Explore what&apos;s{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              happening.
            </span>
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            const isHovered = hovered === i

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  borderColor: isHovered ? cat.accentBorder : "rgba(255,255,255,0.07)",
                  background: isHovered ? cat.accentBg : "rgba(255,255,255,0.02)",
                  y: isHovered ? -6 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative cursor-default overflow-hidden rounded-2xl border p-6"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  minHeight: 200,
                }}
              >
                <span
                  className="pointer-events-none absolute top-4 right-5 select-none font-extrabold leading-none"
                  style={{
                    fontSize: 72,
                    color: isHovered ? cat.accent : "rgba(255,255,255,0.04)",
                    transition: "color 0.22s",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {cat.num}
                </span>

                <div
                  className="mb-12 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: isHovered ? cat.accentBg : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isHovered ? cat.accentBorder : "rgba(255,255,255,0.08)"}`,
                    transition: "all 0.22s",
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isHovered ? cat.accent : "rgba(255,255,255,0.35)",
                      transition: "color 0.22s",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <h3
                    className="mb-2 text-[17px] font-bold leading-tight"
                    style={{
                      color: isHovered ? "#fff" : "rgba(255,255,255,0.8)",
                      letterSpacing: "-0.01em",
                      transition: "color 0.22s",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{
                      color: isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)",
                      transition: "color 0.22s",
                    }}
                  >
                    {cat.description}
                  </p>
                </div>

                <motion.div
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${cat.accent}, transparent)`,
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const row1 = testimonials.slice(0, 4)
  const row2 = testimonials.slice(4)

  return (
    <section
      className="relative overflow-hidden py-28"
      style={{ background: "#080b12" }}
    >
      <AmbientBackdrop variant="default" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-16 px-8 text-center">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#6366f1" }}
          >
            Testimonials
          </p>
          <h2
            className="font-extrabold leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(36px,4vw,56px)", color: "#fff" }}
          >
            What students{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              say.
            </span>
          </h2>
        </div>

        <MarqueeRow items={row1} direction="left" speed={38} />
        <div className="mt-3">
          <MarqueeRow items={row2} direction="right" speed={32} />
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faqs"
      className="relative overflow-hidden py-28"
      style={{ background: "#080b12" }}
    >
      <AmbientBackdrop variant="subtle" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container relative z-10 mx-auto flex flex-col items-center px-8">
        <div className="mb-16 text-center">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#6366f1" }}
          >
            FAQs
          </p>
          <h2
            className="font-extrabold leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(36px,4vw,56px)", color: "#fff" }}
          >
            Got{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              questions?
            </span>
          </h2>
        </div>

        <div className="w-full max-w-2xl space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i

            return (
              <motion.div
                key={i}
                animate={{
                  borderColor: isOpen
                    ? "rgba(99,102,241,0.3)"
                    : "rgba(255,255,255,0.07)",
                  background: isOpen
                    ? "rgba(99,102,241,0.06)"
                    : "rgba(255,255,255,0.02)",
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-xl border"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className="text-[15px] font-medium leading-snug"
                    style={{
                      color: isOpen ? "#fff" : "rgba(255,255,255,0.7)",
                      transition: "color 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: isOpen
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isOpen ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                  >
                    <Plus
                      size={13}
                      style={{
                        color: isOpen ? "#818cf8" : "rgba(255,255,255,0.4)",
                        transition: "color 0.2s",
                      }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="px-6 pb-5 text-[14px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.42)" }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Button
            variant="outline"
            className="rounded-xl px-8 py-2.5 text-[14px] font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            See All FAQs &rarr;
          </Button>

          <p
            className="text-[13px]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Need more help?{" "}
            <a
              href="mailto:support@campushub.com"
              className="transition-colors duration-150"
              style={{ color: "#818cf8" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#a5b4fc")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#818cf8")}
            >
              support@campushub.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Homepage() {
  return (
    <main className="flex flex-col bg-[#080b12]">
      
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  )
}
