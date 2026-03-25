"use client"
 
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
 
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
 
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
 
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#080b12" }}
    >
      {/* top/bottom rules */}
 
      {/* Grid */}
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
 
      <div className="container mx-auto px-8 relative z-10 flex flex-col items-center">
 
        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
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
 
        {/* ── ACCORDION ── */}
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
                className="rounded-xl overflow-hidden border"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
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
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
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
 
                {/* Answer */}
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
 
        {/* ── FOOTER ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <Button
            variant="outline"
            className="px-8 py-2.5 rounded-xl text-[14px] font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            See All FAQs →
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
 
