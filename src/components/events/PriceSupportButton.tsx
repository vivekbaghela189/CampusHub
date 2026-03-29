"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { createPortal } from "react-dom"

type PriceSupportButtonProps = {
  eventId: string
  priceDisplay: string
  isFree: boolean
}

export default function PriceSupportButton({
  eventId,
  priceDisplay,
  isFree,
}: PriceSupportButtonProps) {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const [showMessage, setShowMessage] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const mounted = typeof window !== "undefined"

  useEffect(() => {
    if (!showMessage) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMessage(false)
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [showMessage])

  const handlePraise = async () => {
    if (sessionStatus !== "authenticated") {
      router.push("/login")
      return
    }

    if (session?.user?.role === "ADMIN") {
      setStatusMessage("Admins cannot register for events.")
      return
    }

    setLoading(true)
    setStatusMessage("")

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      })

      const data = await res.json()

      if (!res.ok && data.error !== "Already applied") {
        setStatusMessage(data.error || "Could not register for this event.")
        setLoading(false)
        return
      }

      setStatusMessage(
        data.error === "Already applied"
          ? "You are already registered. Opening the support page."
          : "You are registered for the event. Opening the support page."
      )

      window.open("https://www.chai4.me/vivek189", "_blank", "noopener,noreferrer")
      router.refresh()
    } catch {
      setStatusMessage("Could not register for this event.")
    }

    setLoading(false)
  }

  return (
    <div style={{ flex: 1 }}>
      <button
        type="button"
        onClick={() => {
          setShowMessage(true)
          setStatusMessage("")
        }}
        style={{
          width: "100%",
          height: "38px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          background: isFree ? "rgba(200,245,66,0.07)" : "rgba(99,102,241,0.08)",
          border: `1px solid ${isFree ? "rgba(200,245,66,0.25)" : "rgba(99,102,241,0.28)"}`,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "'Syne',sans-serif",
            color: isFree ? "#c8f542" : "#9b7ff0",
            letterSpacing: "0.2px",
          }}
        >
          {priceDisplay}
        </span>
      </button>

      {mounted && showMessage && createPortal(
        <div
          onClick={() => setShowMessage(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(8,9,20,0.62)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(460px, 100%)",
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.1)",
              background:
                "linear-gradient(180deg, rgba(25,24,42,0.98) 0%, rgba(16,15,31,0.98) 100%)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "74px",
                height: "30px",
                padding: "0 12px",
                borderRadius: "999px",
                background: "rgba(124,95,230,0.14)",
                border: "1px solid rgba(155,127,240,0.26)",
                color: "#c9b8ff",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Payments
            </div>

            <h3
              style={{
                marginTop: "18px",
                color: "#f5f4ef",
                fontFamily: "'Syne',sans-serif",
                fontSize: "32px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              We&apos;re working on it.
            </h3>

            <p
              style={{
                marginTop: "14px",
                color: "#cfcddd",
                fontSize: "15px",
                lineHeight: 1.75,
              }}
            >
              Online payments are not live yet. If you click below, we&apos;ll register you for this
              event and then open my support page where you can praise my work with any amount.
            </p>

            <div
              style={{
                marginTop: "22px",
                display: "grid",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={handlePraise}
                disabled={loading}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  borderRadius: "999px",
                  border: "none",
                  background: "linear-gradient(135deg,#7c5fe6,#9b7ff0)",
                  color: "#fff",
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {loading ? "Registering..." : "Praise My Work"}
              </button>

              <button
                type="button"
                onClick={() => setShowMessage(false)}
                style={{
                  width: "100%",
                  minHeight: "44px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#d8d6e2",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>

            {statusMessage && (
              <p
                style={{
                  marginTop: "14px",
                  fontSize: "13px",
                  color: "#b7b4c8",
                  lineHeight: 1.6,
                }}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
