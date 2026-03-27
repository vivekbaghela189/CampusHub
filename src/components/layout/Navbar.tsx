"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ChevronRight,
  Pencil,
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
          background: #080b12 !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.055) !important;
        }
        .profile-sheet-item {
          transition: background-color .18s ease, border-color .18s ease, transform .18s ease, box-shadow .18s ease !important;
        }
        .profile-sheet-item:hover {
          background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(124,58,237,0.14) 55%, rgba(8,11,18,0.72) 100%) !important;
          border-color: rgba(167,139,250,0.22) !important;
          box-shadow: 0 12px 28px rgba(0,0,0,0.22) !important;
          transform: translateY(-1px) !important;
        }
        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.58);
          transition: color .2s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, rgba(99,102,241,1), rgba(244,114,182,1));
          transition: transform .2s ease;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.92);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
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
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div
              className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] text-[20px] font-bold"
              style={{
                background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                boxShadow: "0 4px 14px rgba(99,102,241,.45)",
              }}
            >
              🎓
            </div>
            <span className="text-[20px] font-semibold tracking-tight text-white">CampusHub</span>
          </Link>

          <div className="hidden md:block" />

          <nav className="flex items-center gap-2">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/highlights"
                  className="nav-link inline-flex h-9 items-center rounded-lg px-3 py-1.5 text-sm font-medium text-white/60 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                >
                  Highlights
                </Link>

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
                        background: "rgba(10,12,20,0.34)",
                        backdropFilter: "blur(10px) saturate(0.92)",
                        WebkitBackdropFilter: "blur(10px) saturate(0.92)",
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
                        background: "linear-gradient(180deg, #12121f 0%, #161629 100%)",
                        color: "#f0efe8",
                        boxShadow: "-20px 0 50px rgba(0,0,0,0.34)",
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
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          aria-label="Close profile"
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#f0efe8",
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
                          padding: "22px 28px 28px",
                          display: "grid",
                          gap: 18,
                          overflowY: "auto",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 14,
                            borderRadius: 24,
                            padding: "18px 18px",
                            background: "linear-gradient(180deg, rgba(99,102,241,0.1) 0%, rgba(124,58,237,0.08) 45%, rgba(18,18,31,0.94) 100%)",
                            border: "1px solid rgba(167,139,250,0.16)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                          <div
                            style={{
                              width: 58,
                              height: 58,
                              borderRadius: "999px",
                              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                              color: "#f5f3ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: 28,
                              flexShrink: 0,
                              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.18), 0 12px 24px rgba(99,102,241,0.24)",
                            }}
                          >
                            {avatarInitial}
                          </div>

                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 2, color: "#f0efe8" }}>{userName}</p>
                            <p
                              style={{
                                fontSize: 13,
                                color: "#9998a8",
                                lineHeight: 1.45,
                                wordBreak: "break-word",
                              }}
                            >
                              {userEmail}
                            </p>
                          </div>
                        </div>
                          <button
                            type="button"
                            style={{
                              border: "none",
                              borderRadius: 999,
                              background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(124,58,237,0.24))",
                              color: "#ddd6fe",
                              fontWeight: 700,
                              fontSize: 13,
                              padding: "8px 15px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              flexShrink: 0,
                              border: "1px solid rgba(167,139,250,0.2)",
                            }}
                          >
                            <Pencil size={13} />
                            <span>Edit</span>
                          </button>
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
                            padding: "18px 20px",
                            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.1) 55%, rgba(8,11,18,0.62) 100%)",
                            textDecoration: "none",
                            color: "#f0efe8",
                            fontSize: 16,
                            border: "1px solid rgba(167,139,250,0.16)",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <span
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 14,
                                background: "linear-gradient(135deg, rgba(99,102,241,0.28), rgba(139,92,246,0.2))",
                                color: "#c4b5fd",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                border: "1px solid rgba(167,139,250,0.22)",
                              }}
                            >
                              <NotebookTabs size={20} />
                            </span>
                            <span>View all bookings</span>
                          </span>
                          <ChevronRight size={22} />
                        </Link>

                        <div style={{ display: "grid", gap: 14 }}>
                          <p style={{ fontSize: 13, fontWeight: 800, color: "#9a97a7", letterSpacing: "0.08em" }}>SUPPORT</p>
                          <a
                            href="mailto:support@campushub.com"
                            className="profile-sheet-item"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderRadius: 22,
                              padding: "18px 20px",
                              background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.1) 55%, rgba(8,11,18,0.62) 100%)",
                              textDecoration: "none",
                              color: "#f0efe8",
                              fontSize: 16,
                              border: "1px solid rgba(167,139,250,0.16)",
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                              <span
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius: 14,
                                  background: "linear-gradient(135deg, rgba(99,102,241,0.28), rgba(139,92,246,0.2))",
                                  color: "#c4b5fd",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  border: "1px solid rgba(167,139,250,0.22)",
                                }}
                              >
                                <MessageSquareMore size={20} />
                              </span>
                              <span>Chat with us</span>
                            </span>
                            <ChevronRight size={22} />
                          </a>
                        </div>

                        <div style={{ display: "grid", gap: 14 }}>
                          <p style={{ fontSize: 13, fontWeight: 800, color: "#9a97a7", letterSpacing: "0.08em" }}>MORE</p>
                          <div
                            style={{
                              background: "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(124,58,237,0.06) 35%, rgba(18,18,31,0.92) 100%)",
                              borderRadius: 22,
                              overflow: "hidden",
                              border: "1px solid rgba(167,139,250,0.16)",
                            }}
                          >
                            <Link
                              href="/terms"
                              onClick={() => setOpen(false)}
                              className="profile-sheet-item"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "18px 20px",
                                textDecoration: "none",
                                color: "#f0efe8",
                                fontSize: 16,
                                background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.1) 55%, rgba(8,11,18,0.62) 100%)",
                                borderBottom: "1px solid rgba(167,139,250,0.12)",
                              }}
                              >
                              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span
                                  style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 14,
                                    background: "linear-gradient(135deg, rgba(99,102,241,0.28), rgba(139,92,246,0.2))",
                                    color: "#c4b5fd",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    border: "1px solid rgba(167,139,250,0.22)",
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                                  }}
                                >
                                  <ScrollText size={20} />
                                </span>
                                <span>Terms & Conditions</span>
                              </span>
                              <ChevronRight size={22} />
                            </Link>

                            <Link
                              href="/privacy-policy"
                              onClick={() => setOpen(false)}
                              className="profile-sheet-item"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "18px 20px",
                                textDecoration: "none",
                                color: "#f0efe8",
                                fontSize: 16,
                                background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.1) 55%, rgba(8,11,18,0.62) 100%)",
                              }}
                              >
                              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span
                                  style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 14,
                                    background: "linear-gradient(135deg, rgba(99,102,241,0.28), rgba(139,92,246,0.2))",
                                    color: "#c4b5fd",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    border: "1px solid rgba(167,139,250,0.22)",
                                  }}
                                >
                                  <FileText size={20} />
                                </span>
                                <span>Privacy Policy</span>
                              </span>
                              <ChevronRight size={22} />
                            </Link>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="profile-sheet-item"
                          style={{
                            border: "1px solid rgba(167,139,250,0.16)",
                            width: "100%",
                            borderRadius: 22,
                            padding: "18px 20px",
                            background: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(124,58,237,0.12) 55%, rgba(8,11,18,0.68) 100%)",
                            color: "#f0e9ff",
                            fontSize: 16,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
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
                  href="/highlights"
                  className="nav-link inline-flex h-9 items-center rounded-lg px-3 py-1.5 text-sm font-medium text-white/60 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                >
                  Highlights
                </Link>

                <Link
                  href="/login"
                  className="nav-link inline-flex h-9 items-center rounded-lg px-3 py-1.5 text-sm font-medium text-white/45 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
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
