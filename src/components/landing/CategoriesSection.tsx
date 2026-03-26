"use client"
 
import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Code, Music, BookOpen, Dumbbell, Sparkles } from "lucide-react"
 
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
 
export default function CategoriesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
 
  return (
    <section
      id="categories"
      className="relative py-28 overflow-hidden"
      style={{ background: "#080b12" }}
    >
      {/* top/bottom rules */}
 
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
          width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          top: "40%", left: "50%",
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
            Event Categories
          </p>
          <h2
            className="font-extrabold leading-[1.04] tracking-tight mx-auto"
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
 
        {/* ── GRID ── */}
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
                className="relative rounded-2xl p-6 cursor-default overflow-hidden border"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  minHeight: 200,
                }}
              >
                {/* Large number watermark */}
                <span
                  className="absolute top-4 right-5 font-extrabold leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 72,
                    color: isHovered ? cat.accent : "rgba(255,255,255,0.04)",
                    transition: "color 0.22s",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {cat.num}
                </span>
 
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-12"
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
 
                {/* Text */}
                <div className="relative z-10">
                  <h3
                    className="text-[17px] font-bold mb-2 leading-tight"
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
 
                {/* Bottom accent line */}
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
 
