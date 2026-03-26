"use client"
 
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ClipboardCheck, BarChart3, PartyPopper } from "lucide-react"
 
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
 
export default function HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null)
 
  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
      style={{ background: "#080b12" }}
    >
      {/* top/bottom rules */}
 
      {/* Grid — matches hero section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "54px 54px",
        }}
      />
 
      {/* Ambient orb */}
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
 
      <div className="container mx-auto px-8 relative z-10">
 
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
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
 
        {/* ── CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                className="relative rounded-2xl p-6 cursor-default flex flex-col gap-6 border overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {/* Large number watermark */}
                <span
                  className="absolute top-4 right-5 font-extrabold leading-none select-none pointer-events-none"
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
 
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
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
 
                {/* Text */}
                <div className="flex flex-col gap-2 relative z-10">
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
 
                {/* Bottom accent line */}
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
