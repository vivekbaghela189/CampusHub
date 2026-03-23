"use client"
 
import { useState } from "react"
import { motion } from "framer-motion"
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
]
 
export default function TestimonialsSection() {
  const [hovered, setHovered] = useState<number | null>(null)
 
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#080b12" }}
    >
      {/* top/bottom rules */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
 
      {/* Grid — matches hero */}
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
 
      {/* Ambient orb */}
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
 
      <div className="container mx-auto px-8 relative z-10">
 
        {/* ── HEADER ── */}
        <div className="text-center mb-16">
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
 
        {/* ── CARDS ── */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const isHovered = hovered === i
 
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  borderColor: isHovered ? t.accentBorder : "rgba(255,255,255,0.07)",
                  background: isHovered ? t.accentBg : "rgba(255,255,255,0.02)",
                  y: isHovered ? -6 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative rounded-2xl p-7 cursor-default overflow-hidden border flex flex-col justify-between gap-8"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  minHeight: 220,
                }}
              >
                {/* Quote icon — top right */}
                <Quote
                  size={32}
                  className="absolute top-6 right-6"
                  style={{
                    color: isHovered ? t.accent : "rgba(255,255,255,0.06)",
                    transition: "color 0.22s",
                  }}
                />
 
                {/* Review text */}
                <p
                  className="text-[14px] leading-relaxed relative z-10 pt-2"
                  style={{
                    color: isHovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.38)",
                    transition: "color 0.22s",
                  }}
                >
                  "{t.review}"
                </p>
 
                {/* User row */}
                <div className="flex items-center gap-3 relative z-10">
                  {/* Avatar */}
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
 
                {/* Bottom accent line */}
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
          })}
        </div>
 
      </div>
    </section>
  )
}