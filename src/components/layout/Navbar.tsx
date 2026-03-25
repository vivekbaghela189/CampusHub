"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  LogOut,
  MessageSquareMore,
  NotebookTabs,
  ScrollText,
} from "lucide-react"

function getInitial(name?: string | null, email?: string | null) {
  const source = (name || email || "U").trim()
  return source.charAt(0).toUpperCase()
}

export default function Navbar() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.createElement("div")
    root.setAttribute("data-profile-sheet-root", "true")
    document.body.appendChild(root)
    setPortalRoot(root)

    return () => {
      root.remove()
    }
  }, [])

  useEffect(() => {
    document.body.dataset.profileOpen = open ? "true" : "false"

    if (!open) {
      document.body.style.overflow = ""
      return () => {
        delete document.body.dataset.profileOpen
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
      delete document.body.dataset.profileOpen
    }
  }, [open])

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
        .profile-sheet-item {
          transition: background-color .18s ease !important;
        }
        .profile-sheet-item:hover {
          background: #f7f7f8 !important;
        }
        .profile-sheet {
          width: min(40vw, 560px);
          min-width: 380px;
        }
        body > * {
          transition: filter .24s ease, transform .24s ease, opacity .24s ease;
        }
        body[data-profile-open="true"] > *:not([data-profile-sheet-root]) {
          filter: blur(16px) saturate(.95);
        }
        @media (max-width: 900px) {
          .profile-sheet {
            width: min(92vw, 420px);
            min-width: 0;
          }
        }
        @media (max-width: 640px) {
          .profile-sheet {
            width: 100vw;
            min-width: 0;
          }
        }
      `}</style>

      <header className="campus-navbar sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div
              className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] text-[11px] font-bold"
              style={{
                background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                boxShadow: "0 4px 14px rgba(99,102,241,.45)",
              }}
            >
              CH
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">CampusHub</span>
          </Link>

          <nav className="flex items-center gap-2">
            {status === "authenticated" ? (
              <>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open profile"
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

                {open && portalRoot && createPortal(
                  <>
                    <div
                      style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 90,
                        background: "rgba(244,241,255,0.18)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                      }}
                    />
                    <div
                      ref={panelRef}
                      className="profile-sheet"
                      style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: 91,
                        height: "100vh",
                        background: "#f3f2f5",
                        color: "#191621",
                        boxShadow: "-20px 0 50px rgba(0,0,0,0.18)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "18px 26px",
                          borderBottom: "1px solid rgba(25,22,33,0.08)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          aria-label="Close profile"
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#191621",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                          }}
                        >
                          <ArrowLeft size={24} />
                        </button>
                        <span style={{ fontSize: 20, fontWeight: 700 }}>Profile</span>
                      </div>

                      <div
                        style={{
                          padding: "30px 30px 34px",
                          display: "grid",
                          gap: 28,
                          overflowY: "auto",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                          <div
                            style={{
                              width: 88,
                              height: 88,
                              borderRadius: "999px",
                              background: "linear-gradient(135deg, #d8cdfd, #bba9ff)",
                              color: "#5b39d9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: 42,
                              flexShrink: 0,
                              boxShadow: "inset 0 0 0 1px rgba(91,57,217,0.12)",
                            }}
                          >
                            {avatarInitial}
                          </div>

                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{userName}</p>
                            <p
                              style={{
                                fontSize: 15,
                                color: "#655d71",
                                lineHeight: 1.45,
                                wordBreak: "break-word",
                              }}
                            >
                              {userEmail}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/dashboard"
                          onClick={() => setOpen(false)}
                          className="profile-sheet-item"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 22,
                            padding: "22px 22px",
                            background: "#fff",
                            textDecoration: "none",
                            color: "#191621",
                            fontSize: 17,
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <NotebookTabs size={22} />
                            <span>View all bookings</span>
                          </span>
                          <ChevronRight size={22} />
                        </Link>

                        <div style={{ display: "grid", gap: 14 }}>
                          <p style={{ fontSize: 15, fontWeight: 700 }}>Support</p>
                          <a
                            href="mailto:support@campushub.com"
                            className="profile-sheet-item"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderRadius: 22,
                              padding: "22px 22px",
                              background: "#fff",
                              textDecoration: "none",
                              color: "#191621",
                              fontSize: 17,
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                              <MessageSquareMore size={22} />
                              <span>Chat with us</span>
                            </span>
                            <ChevronRight size={22} />
                          </a>
                        </div>

                        <div style={{ display: "grid", gap: 14 }}>
                          <p style={{ fontSize: 15, fontWeight: 700 }}>More</p>
                          <div
                            style={{
                              background: "#fff",
                              borderRadius: 22,
                              overflow: "hidden",
                            }}
                          >
                            <a
                              href="#"
                              className="profile-sheet-item"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "20px 22px",
                                textDecoration: "none",
                                color: "#191621",
                                fontSize: 17,
                                borderBottom: "1px solid rgba(25,22,33,0.08)",
                              }}
                            >
                              <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <ScrollText size={22} />
                                <span>Terms & Conditions</span>
                              </span>
                              <ChevronRight size={22} />
                            </a>

                            <a
                              href="#"
                              className="profile-sheet-item"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "20px 22px",
                                textDecoration: "none",
                                color: "#191621",
                                fontSize: 17,
                              }}
                            >
                              <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <FileText size={22} />
                                <span>Privacy Policy</span>
                              </span>
                              <ChevronRight size={22} />
                            </a>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/login" })}
                          className="profile-sheet-item"
                          style={{
                            border: "none",
                            width: "100%",
                            borderRadius: 22,
                            padding: "22px 22px",
                            background: "#fff",
                            color: "#191621",
                            fontSize: 17,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                          }}
                        >
                          <LogOut size={22} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>,
                  portalRoot
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-1.5 text-sm text-white/45 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                >
                  Login
                </Link>

                <Button asChild className="btn-indigo-nav ml-2 cursor-pointer rounded-[10px] px-5 text-sm font-medium text-white">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
