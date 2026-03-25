"use client"
 
import { useState, useRef, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { Quote } from "lucide-react"
 
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
      className="relative rounded-2xl p-7 cursor-default overflow-hidden border flex flex-col justify-between gap-8 shrink-0"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        width: 320,
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
        className="text-[14px] leading-relaxed relative z-10 pt-2"
        style={{
          color: isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)",
          transition: "color 0.22s",
        }}
      >
        &ldquo;{t.review}&rdquo;
      </p>
 
      <div className="flex items-center gap-3 relative z-10">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
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
            className="text-[12px] mt-0.5"
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
 
  // Duplicate items for seamless loop
  const doubled = [...items, ...items]
 
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
 
    const cardWidth = 320 + 12 // width + gap
    const totalWidth = items.length * cardWidth
    const dir = direction === "left" ? -1 : 1
 
    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time
 
      if (!isPaused) {
        posRef.current += dir * (speed / 1000) * delta
        // Seamless loop
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
      className="overflow-hidden w-full"
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
 
export default function TestimonialsSection() {
  const row1 = testimonials.slice(0, 4)
  const row2 = testimonials.slice(4)
 
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#080b12" }}
    >
 
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />
 
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
        {/* Header */}
        <div className="text-center mb-16 px-8">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
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
 
        {/* Row 1 — scrolls left */}
        <MarqueeRow items={row1} direction="left" speed={38} />
 
        {/* Row 2 — scrolls right */}
        <div className="mt-3">
          <MarqueeRow items={row2} direction="right" speed={32} />
        </div>
      </div>
    </section>
  )
}
