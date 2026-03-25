"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

function getInitial(name?: string | null, email?: string | null) {
  const source = (name || email || "U").trim()
  return source.charAt(0).toUpperCase()
}

export default function Navbar() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const userName = session?.user?.name || "User"
  const userEmail = session?.user?.email || "user@campushub.com"
  const avatarInitial = useMemo(
    () => getInitial(session?.user?.name, session?.user?.email),
    [session?.user?.name, session?.user?.email]
  )

  return (
    <>
      <style>{`
        .btn-indigo-nav {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          box-shadow: 0 0 0 1px rgba(99,102,241,.45), 0 4px 16px rgba(99,102,241,.3) !important;
          border: none !important;
          transition: box-shadow .2s, transform .2s !important;
        }
        .btn-indigo-nav:hover {
          box-shadow: 0 0 0 1px rgba(139,92,246,.7), 0 8px 28px rgba(139,92,246,.5) !important;
          transform: translateY(-1px) !important;
        }
        .campus-navbar {
          background: rgba(8, 11, 18, 0.92) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.055) !important;
        }
        .profile-card-link:hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.08) !important;
        }
      `}</style>

      <header className="campus-navbar sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div
              className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center text-[14px] shrink-0"
              style={{
                background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                boxShadow: "0 4px 14px rgba(99,102,241,.45)",
              }}
            >
              🎓
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">CampusHub</span>
          </Link>

          <nav className="flex items-center gap-2">
            {status === "authenticated" ? (
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  aria-label="Open profile menu"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "linear-gradient(135deg, rgba(167,139,250,0.28), rgba(251,191,36,0.12))",
                    color: "#f5f3ff",
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 28px rgba(0,0,0,0.24)",
                  }}
                >
                  {avatarInitial}
                </button>

                {open && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      width: 310,
                      borderRadius: 22,
                      background: "#f3f2f5",
                      color: "#14121c",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
                      overflow: "hidden",
                      zIndex: 60,
                    }}
                  >
                    <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(20,18,28,0.08)", fontSize: 12, fontWeight: 600 }}>
                      ← Profile
                    </div>

                    <div style={{ padding: 14, display: "grid", gap: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#e7e6ea", borderRadius: 16, padding: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "999px",
                            background: "linear-gradient(135deg, #c4b5fd, #a78bfa)",
                            color: "#5b21b6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 18,
                            flexShrink: 0,
                          }}
                        >
                          {avatarInitial}
                        </div>
                        <div
                          style={{
                            background: "#f8b4b4",
                            border: "1px solid rgba(127,29,29,0.25)",
                            borderRadius: 8,
                            padding: "8px 10px",
                            minWidth: 0,
                          }}
                        >
                          <p style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2, color: "#241b2f" }}>{userName}</p>
                          <p style={{ fontSize: 11, color: "#5c5167", lineHeight: 1.25, wordBreak: "break-word" }}>{userEmail}</p>
                        </div>
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#6b6477", paddingLeft: 2 }}>Support</p>
                        <Link
                          href="/dashboard"
                          onClick={() => setOpen(false)}
                          className="profile-card-link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 12,
                            padding: "12px 14px",
                            background: "#fff",
                            border: "1px solid transparent",
                            textDecoration: "none",
                            color: "#14121c",
                            fontSize: 12,
                          }}
                        >
                          <span>View all bookings</span>
                          <span>›</span>
                        </Link>
                        <a
                          href="mailto:support@campushub.com"
                          className="profile-card-link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 12,
                            padding: "12px 14px",
                            background: "#fff",
                            border: "1px solid transparent",
                            textDecoration: "none",
                            color: "#14121c",
                            fontSize: 12,
                          }}
                        >
                          <span>Chat with us</span>
                          <span>›</span>
                        </a>
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#6b6477", paddingLeft: 2 }}>More</p>
                        <a
                          href="#"
                          className="profile-card-link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 12,
                            padding: "12px 14px",
                            background: "#fff",
                            border: "1px solid transparent",
                            textDecoration: "none",
                            color: "#14121c",
                            fontSize: 12,
                          }}
                        >
                          <span>Terms & Conditions</span>
                          <span>›</span>
                        </a>
                        <a
                          href="#"
                          className="profile-card-link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 12,
                            padding: "12px 14px",
                            background: "#fff",
                            border: "1px solid transparent",
                            textDecoration: "none",
                            color: "#14121c",
                            fontSize: 12,
                          }}
                        >
                          <span>Privacy Policy</span>
                          <span>›</span>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          borderRadius: 12,
                          padding: "12px 14px",
                          background: "#fff",
                          border: "1px solid transparent",
                          color: "#14121c",
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        ← Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-white/45 hover:text-white transition-colors duration-150 px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
                >
                  Login
                </Link>

                <Button asChild className="btn-indigo-nav ml-2 px-5 rounded-[10px] text-sm font-medium text-white cursor-pointer">
                  <Link href="/register">
                    Register
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
