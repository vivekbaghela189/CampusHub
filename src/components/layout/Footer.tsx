"use client"
 
import Link from "next/link"
import AmbientBackdrop from "@/components/layout/AmbientBackdrop"
 
const links = {
  Platform: [
    { label: "Browse Events",   href: "/events"    },
    { label: "My Applications", href: "/dashboard" },
    { label: "Create Account",  href: "/register"  },
  ],
  Resources: [
    { label: "Student Guide",    href: "#" },
    { label: "Event Organizers", href: "#" },
    { label: "Support",          href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy",   href: "#" },
    { label: "Guidelines",       href: "#" },
  ],
}
 
const socials = ["GitHub", "LinkedIn", "Twitter"]
 
export default function Footer() {
  return (
    <footer style={{ background: "#080b12", position: "relative", overflow: "hidden" }}>
      <AmbientBackdrop variant="subtle" />
      {/* Orb */}
      <div
        style={{
          position: "absolute", pointerEvents: "none",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          bottom: -150, left: -100,
        }}
      />
 
      {/* Top rule */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.06)" }} />
 
      {/* Main */}
      <div className="container mx-auto px-8 py-16" style={{ position: "relative", zIndex: 10 }}>
        <div className="grid gap-12 md:grid-cols-4">
 
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                boxShadow: "0 4px 14px rgba(99,102,241,.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>🎓</div>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 20, letterSpacing: "-0.5px" }}>CampusHub</span>
            </div>
 
            <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>
              Discover and register for campus events — hackathons, competitions, festivals and sports.
            </p>
 
            {/* Socials */}
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map((s) => (
                <Link
                  key={s}
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 12,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#fff"
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"
                    e.currentTarget.style.background = "rgba(99,102,241,0.08)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
 
          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 style={{
                color: "rgba(255,255,255,0.28)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}>
                {section}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, textDecoration: "none", transition: "color 0.15s" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
 
      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 10 }}>
        <div
          className="container mx-auto px-8"
          style={{ padding: "20px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}
        >
          <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 12 }}>
            © {new Date().getFullYear()} CampusHub. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>
            Made with ♥ for students everywhere
          </p>
        </div>
      </div>
 
    </footer>
  )
}
