"use client"
 
import Link from "next/link"
import { Button } from "@/components/ui/button"
 
export default function Navbar() {
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
      `}</style>
 
      <header className="campus-navbar sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-8">
 
          {/* Logo */}
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
 
          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            <Link
              href="/events"
              className="text-sm text-white/45 hover:text-white transition-colors duration-150 px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
            >
              Events
            </Link>
 
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
          </nav>
 
        </div>
      </header>
    </>
  )
}
