import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
 
// ─── Type config for colors per event type ────────────────────────────────────
const TYPE_CONFIG: Record<string, { bar: string; color: string; bg: string; border: string }> = {
  TECH:     { bar: "#3d9bff", color: "#3d9bff", bg: "rgba(61,155,255,0.10)",   border: "rgba(61,155,255,0.28)"  },
  SPORTS:   { bar: "#42e8a0", color: "#42e8a0", bg: "rgba(66,232,160,0.10)",   border: "rgba(66,232,160,0.28)"  },
  CULTURAL: { bar: "#c084fc", color: "#c084fc", bg: "rgba(192,132,252,0.10)",  border: "rgba(192,132,252,0.28)" },
  FEST:     { bar: "#ffb940", color: "#ffb940", bg: "rgba(255,185,64,0.10)",   border: "rgba(255,185,64,0.28)"  },
}
const DEFAULT_CFG = { bar: "#9998a8", color: "#9998a8", bg: "rgba(153,152,168,0.10)", border: "rgba(153,152,168,0.28)" }
 
export default async function EventsPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    type?: string
  }
}) {
  // ── Original Prisma logic completely intact ──────────────────────────────
  const search = searchParams.search || ""
  const type   = searchParams.type   || ""
 
  let events: Array<{
    id: string
    title: string
    description: string
    type: string
    deadline: Date
  }> = []
  let databaseError = false
 
  try {
    events = await prisma.event.findMany({
      where: {
        AND: [
          search ? { title: { contains: search, mode: "insensitive" } } : {},
          type   ? { type }                                             : {},
        ],
      },
      orderBy: { deadline: "asc" },
    })
  } catch {
    databaseError = true
  }
  // ────────────────────────────────────────────────────────────────────────
 
  return (
    <>
      {/* ── Google Fonts + animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        .ev-card { transition: border-color .22s, transform .22s, box-shadow .22s; }
        .ev-card:hover { border-color: rgba(255,255,255,.13) !important; transform: translateY(-4px); }
        .ev-card:hover .card-arrow { transform: translate(2px,-2px) !important; background: rgba(200,245,66,0.12) !important; }
        .ev-card:hover .view-btn { color: #c8f542 !important; }
        .pill-btn:hover { border-color: rgba(255,255,255,.15) !important; color: #f0efe8 !important; background: rgba(255,255,255,.05) !important; }
        .filter-input:focus { border-color: rgba(124,95,230,.55) !important; outline: none; }
        .filter-select:focus { border-color: rgba(124,95,230,.55) !important; outline: none; }
        .submit-btn:hover { opacity: .84 !important; }
        select option { background: #12121f; }
        ::placeholder { color: #3e3d45 !important; }
      `}</style>
 
      {/* ── MAIN ── */}
      <main style={{
        background:"linear-gradient(180deg,#0a0a18 0%,#0d0d1f 100%)",
        minHeight:"100vh", fontFamily:"'DM Sans',sans-serif",
        position:"relative", overflow:"hidden",
      }}>
 
        {/* Subtle grid lines — matches homepage */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
        }}/>
 
        {/* Purple ambient glow */}
        <div style={{
          position:"absolute", top:"-100px", left:"50%", transform:"translateX(-50%)",
          width:"900px", height:"500px",
          background:"radial-gradient(ellipse,rgba(124,95,230,0.11) 0%,transparent 65%)",
          pointerEvents:"none",
        }}/>
 
        <div style={{ maxWidth:"1120px", margin:"0 auto", padding:"4rem 2rem 6rem", position:"relative", zIndex:1 }}>
 
          {/* ── PAGE HEADER ── */}
          <div style={{ marginBottom:"3rem" }}>
            {/* Live count pill */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)",
              borderRadius:"100px", padding:"5px 14px 5px 10px", marginBottom:"1.3rem",
            }}>
              <span style={{
                width:"6px", height:"6px", borderRadius:"50%", background:"#c8f542",
                display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite",
              }}/>
              <span style={{ fontSize:"12px", color:"#9998a8", letterSpacing:"0.3px" }}>
                {databaseError
                  ? "Live events"
                  : `${events.length} event${events.length !== 1 ? "s" : ""} found`}
              </span>
            </div>
 
            <h1 style={{
              fontFamily:"'Syne',sans-serif",
              fontSize:"clamp(36px,5.5vw,56px)",
              fontWeight:800, letterSpacing:"-2px", lineHeight:1.07,
              color:"#f0efe8", marginBottom:"0.5rem",
            }}>
              Explore{" "}
              <span style={{
                background:"linear-gradient(135deg,#9b7ff0,#c084fc)",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                backgroundClip:"text",
              }}>Events</span>
            </h1>
            <p style={{ color:"#6b6a72", fontSize:"15px", fontWeight:300 }}>
              Discover upcoming campus activities, competitions, and experiences.
            </p>
          </div>
 
          {/* ── FILTER FORM (original form + searchParams + submit fully preserved) ── */}
          <form style={{ display:"flex", gap:"10px", marginBottom:"1.4rem", flexWrap:"wrap", alignItems:"center" }}>
 
            {/* Search input */}
            <div style={{ position:"relative", flex:1, minWidth:"220px", maxWidth:"380px" }}>
              <span style={{
                position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)",
                color:"#3e3d45", pointerEvents:"none", display:"flex",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                name="search"
                type="text"
                placeholder="Search events..."
                defaultValue={search}
                className="filter-input"
                style={{
                  width:"100%", height:"44px", padding:"0 14px 0 40px",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"11px", color:"#f0efe8",
                  fontFamily:"'DM Sans',sans-serif", fontSize:"14px",
                }}
              />
            </div>
 
            {/* Type select */}
            <select
              name="type"
              defaultValue={type}
              className="filter-select"
              style={{
                height:"44px", padding:"0 14px",
                background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:"11px", color:"#f0efe8",
                fontFamily:"'DM Sans',sans-serif", fontSize:"14px", cursor:"pointer",
              }}
            >
              <option value="">All Types</option>
              <option value="TECH">Tech</option>
              <option value="SPORTS">Sports</option>
              <option value="CULTURAL">Cultural</option>
              <option value="FEST">Fest</option>
            </select>
 
            {/* Submit */}
            <button
              type="submit"
              className="submit-btn"
              style={{
                height:"44px", padding:"0 24px",
                background:"linear-gradient(135deg,#7c5fe6,#9b7ff0)",
                color:"#fff", fontFamily:"'Syne',sans-serif",
                fontWeight:700, fontSize:"13px",
                border:"none", borderRadius:"11px", cursor:"pointer",
                transition:"opacity 0.2s",
              }}
            >
              Filter
            </button>
 
            {/* Clear — only when filters active */}
            {(search || type) && (
              <Link href="/events" style={{ textDecoration:"none" }}>
                <button type="button" style={{
                  height:"44px", padding:"0 18px",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"11px", color:"#9998a8",
                  fontFamily:"'DM Sans',sans-serif", fontSize:"13px", cursor:"pointer",
                }}>
                  Clear ✕
                </button>
              </Link>
            )}
          </form>
 
          {/* ── Quick type pills (server-side link navigation) ── */}
          <div style={{ display:"flex", gap:"7px", marginBottom:"2.2rem", flexWrap:"wrap" }}>
            {[
              { label:"All",      val:"",         color:"#c8f542", bg:"rgba(200,245,66,0.08)",  border:"rgba(200,245,66,0.38)"  },
              { label:"Tech",     val:"TECH",     color:"#3d9bff", bg:"rgba(61,155,255,0.10)",  border:"rgba(61,155,255,0.38)"  },
              { label:"Sports",   val:"SPORTS",   color:"#42e8a0", bg:"rgba(66,232,160,0.10)",  border:"rgba(66,232,160,0.38)"  },
              { label:"Cultural", val:"CULTURAL", color:"#c084fc", bg:"rgba(192,132,252,0.10)", border:"rgba(192,132,252,0.38)" },
              { label:"Fest",     val:"FEST",     color:"#ffb940", bg:"rgba(255,185,64,0.10)",  border:"rgba(255,185,64,0.38)"  },
            ].map((p) => {
              const isActive = type === p.val || (p.val === "" && !type)
              const href = p.val
                ? `/events?type=${p.val}${search ? `&search=${encodeURIComponent(search)}` : ""}`
                : "/events"
              return (
                <Link key={p.val} href={href} style={{ textDecoration:"none" }}>
                  <button
                    className="pill-btn"
                    style={{
                      height:"32px", padding:"0 16px", borderRadius:"100px",
                      fontSize:"11.5px", fontWeight:500, cursor:"pointer",
                      transition:"all 0.18s",
                      border:`1px solid ${isActive ? p.border : "rgba(255,255,255,0.08)"}`,
                      background: isActive ? p.bg : "transparent",
                      color: isActive ? p.color : "#6b6a72",
                    }}
                  >
                    {p.label}
                  </button>
                </Link>
              )
            })}
          </div>
 
          {/* ── EVENTS GRID — original 3-state logic fully preserved ── */}
 
          {databaseError ? (
            /* DB Error */
            <div style={{
              borderRadius:"18px", border:"1px solid rgba(255,80,80,0.16)",
              background:"rgba(255,60,60,0.04)", padding:"5rem 2rem", textAlign:"center",
            }}>
              <div style={{
                width:"48px", height:"48px", borderRadius:"14px",
                background:"rgba(255,80,80,0.1)", border:"1px solid rgba(255,80,80,0.18)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 1rem",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#ff6060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h2 style={{
                fontFamily:"'Syne',sans-serif", fontSize:"18px",
                fontWeight:700, color:"#f0efe8", marginBottom:"8px",
              }}>
                Events are temporarily unavailable
              </h2>
              <p style={{ fontSize:"14px", color:"#6b6a72", maxWidth:"420px", margin:"0 auto" }}>
                The app could not connect to the database. Check your{" "}
                <code style={{
                  background:"rgba(255,255,255,0.08)", padding:"1px 6px",
                  borderRadius:"4px", fontSize:"12px", color:"#c084fc",
                }}>DATABASE_URL</code>{" "}
                and Supabase credentials, then refresh this page.
              </p>
            </div>
 
          ) : events.length === 0 ? (
            /* Empty state */
            <div style={{
              borderRadius:"18px", border:"1px solid rgba(255,255,255,0.06)",
              background:"rgba(255,255,255,0.02)", padding:"5rem 2rem", textAlign:"center",
            }}>
              <div style={{
                width:"48px", height:"48px", borderRadius:"14px",
                background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 1rem",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#6b6a72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h2 style={{
                fontFamily:"'Syne',sans-serif", fontSize:"18px",
                fontWeight:700, color:"#f0efe8", marginBottom:"8px",
              }}>
                No Events Found
              </h2>
              <p style={{ fontSize:"14px", color:"#6b6a72" }}>
                Try adjusting your search or filters.
              </p>
              <Link href="/events" style={{ textDecoration:"none" }}>
                <button style={{
                  marginTop:"1.2rem", height:"40px", padding:"0 20px",
                  background:"rgba(124,95,230,0.12)", border:"1px solid rgba(124,95,230,0.28)",
                  borderRadius:"10px", color:"#9b7ff0",
                  fontFamily:"'DM Sans',sans-serif", fontSize:"13px", cursor:"pointer",
                }}>Clear filters</button>
              </Link>
            </div>
 
          ) : (
            /* Cards grid */
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",
              gap:"14px",
            }}>
              {events.map((event) => {
                const cfg = TYPE_CONFIG[event.type] ?? DEFAULT_CFG
                return (
                  <div
                    key={event.id}
                    className="ev-card"
                    style={{
                      background:"#12121f",
                      border:"1px solid rgba(255,255,255,0.07)",
                      borderRadius:"18px", overflow:"hidden",
                      display:"flex", flexDirection:"column",
                    }}
                  >
                    {/* Colored accent bar per type */}
                    <div style={{ height:"3px", background:cfg.bar, width:"100%" }}/>
 
                    {/* Body */}
                    <div style={{
                      padding:"1.2rem 1.3rem",
                      display:"flex", flexDirection:"column", gap:"10px", flex:1,
                    }}>
                      {/* Title + Badge (original Badge component kept) */}
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
                        <p style={{
                          fontFamily:"'Syne',sans-serif", fontSize:"15px", fontWeight:700,
                          color:"#f0efe8", lineHeight:1.35, letterSpacing:"-0.2px",
                        }}>
                          {event.title}
                        </p>
                        <Badge
                          variant="secondary"
                          style={{
                            flexShrink:0, fontSize:"9.5px", fontWeight:700,
                            letterSpacing:"1px", textTransform:"uppercase",
                            padding:"3.5px 9px", borderRadius:"100px",
                            border:`1px solid ${cfg.border}`,
                            color:cfg.color, background:cfg.bg,
                          }}
                        >
                          {event.type}
                        </Badge>
                      </div>
 
                      {/* Description */}
                      <p style={{
                        fontSize:"13px", color:"#6b6a72", lineHeight:1.65, fontWeight:300,
                        display:"-webkit-box", WebkitLineClamp:2,
                        WebkitBoxOrient:"vertical", overflow:"hidden",
                      }}>
                        {event.description}
                      </p>
 
                      {/* Deadline */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{
                          fontSize:"10.5px", color:"#3e3d45",
                          letterSpacing:"0.5px", textTransform:"uppercase",
                        }}>
                          Deadline
                        </span>
                        <span style={{
                          fontFamily:"'Syne',sans-serif", fontSize:"13px",
                          fontWeight:600, color:"#f0efe8",
                        }}>
                          {new Date(event.deadline).toLocaleDateString("en-IN", {
                            day:"numeric", month:"short", year:"numeric",
                          })}
                        </span>
                      </div>
                    </div>
 
                    {/* Divider */}
                    <div style={{ height:"1px", background:"rgba(255,255,255,0.06)", margin:"0 1.3rem" }}/>
 
                    {/* Footer — original Link + Button structure kept */}
                    <div style={{ padding:"0.8rem 1.3rem" }}>
                      <Link href={`/events/${event.id}`} style={{ textDecoration:"none", display:"block" }}>
                        <button
                          className="view-btn"
                          style={{
                            width:"100%", height:"38px",
                            background:"rgba(255,255,255,0.04)",
                            border:"1px solid rgba(255,255,255,0.08)",
                            borderRadius:"10px",
                            fontFamily:"'Syne',sans-serif", fontSize:"12.5px", fontWeight:700,
                            color:"#f0efe8", cursor:"pointer",
                            display:"flex", alignItems:"center", justifyContent:"center", gap:"7px",
                            transition:"color 0.2s",
                          }}
                        >
                          View Details
                          <span
                            className="card-arrow"
                            style={{
                              width:"18px", height:"18px", borderRadius:"5px",
                              background:"rgba(255,255,255,0.06)",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:"10px", transition:"transform 0.2s, background 0.2s",
                            }}
                          >↗</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
 
    </>
  )
}