"use client"

import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Badge } from "@/components/ui/badge"
import ApplyButton from "@/components/events/ApplyButton"

type EventDetailsModalProps = {
  event: {
    id: string
    title: string
    description: string
    type: string
    deadline: string | Date
    price: number | string | null
    currency: string
    eventDate?: string | null
    eventTime?: string | null
    venue?: string | null
    rules?: string | null
    privacyNote?: string | null
  }
}

const TYPE_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  TECH: { color: "#3d9bff", bg: "rgba(61,155,255,0.10)", border: "rgba(61,155,255,0.28)" },
  SPORTS: { color: "#42e8a0", bg: "rgba(66,232,160,0.10)", border: "rgba(66,232,160,0.28)" },
  CULTURAL: { color: "#c084fc", bg: "rgba(192,132,252,0.10)", border: "rgba(192,132,252,0.28)" },
  FEST: { color: "#ffb940", bg: "rgba(255,185,64,0.10)", border: "rgba(255,185,64,0.28)" },
  SCREENING: { color: "#9b7ff0", bg: "rgba(155,127,240,0.10)", border: "rgba(155,127,240,0.28)" },
}

function getSchedule(type: string) {
  switch (type) {
    case "TECH":
      return {
        eventDate: "Announced by the organizing team",
        time: "10:00 AM onwards",
        venue: "Innovation Lab / Seminar Hall",
      }
    case "SPORTS":
      return {
        eventDate: "Match day schedule shared after registrations",
        time: "8:00 AM reporting",
        venue: "College Sports Ground",
      }
    case "CULTURAL":
      return {
        eventDate: "Published with the final lineup",
        time: "4:30 PM onwards",
        venue: "Main Auditorium",
      }
    case "FEST":
      return {
        eventDate: "As per fest calendar",
        time: "5:00 PM onwards",
        venue: "Central Campus Stage",
      }
    case "SCREENING":
      return {
        eventDate: "On the published screening day",
        time: "6:30 PM onwards",
        venue: "AV Room / Main Hall",
      }
    default:
      return {
        eventDate: "Schedule shared by the organizer",
        time: "Timing to be announced",
        venue: "Venue announced before the event",
      }
  }
}

function getRules(type: string) {
  const commonRules = [
    "Carry your valid college ID while attending the event.",
    "Reach the venue at least 15 minutes before the reporting time.",
    "Follow the coordinators' instructions throughout the event.",
    "Any misconduct or damage to campus property may lead to disqualification.",
  ]

  switch (type) {
    case "TECH":
      return [
        ...commonRules,
        "Teams must use only fair and original work during the event.",
        "Submission after the final deadline may not be accepted.",
      ]
    case "SPORTS":
      return [
        ...commonRules,
        "Participants must wear suitable sports attire and maintain discipline.",
        "Referee and organizer decisions will be final.",
      ]
    case "SCREENING":
      return [
        ...commonRules,
        "Please maintain decorum and avoid disturbing the screening experience.",
        "Outside interference, unsafe behavior, or crowding may lead to removal.",
      ]
    default:
      return [
        ...commonRules,
        "Organizer decisions regarding participation and eligibility will be final.",
        "Photography and recordings may be used for campus event promotion.",
      ]
  }
}

function parseRules(rules: string | null | undefined, fallbackRules: string[]) {
  if (!rules) {
    return fallbackRules
  }

  return rules
    .split(/\r?\n/)
    .map((rule) => rule.trim())
    .filter(Boolean)
}

export default function EventDetailsModal({ event }: EventDetailsModalProps) {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  const schedule = useMemo(() => getSchedule(event.type), [event.type])
  const hasCustomDetails = Boolean(
    event.eventDate || event.eventTime || event.venue || event.rules || event.privacyNote
  )
  const rules = useMemo(
    () =>
      hasCustomDetails
        ? parseRules(event.rules, getRules(event.type))
        : ["Details will be added soon by the organizer."],
    [event.rules, event.type, hasCustomDetails]
  )
  const cfg = TYPE_STYLES[event.type] ?? TYPE_STYLES.SCREENING
  const priceValue = Number(event.price ?? 0)
  const priceLabel =
    priceValue > 0
      ? `${event.currency === "INR" ? "Rs " : `${event.currency} `}${priceValue.toLocaleString("en-IN")}`
      : "Free entry"
  const displaySchedule = {
    eventDate: hasCustomDetails ? (event.eventDate || schedule.eventDate) : "Details will be added soon",
    time: hasCustomDetails ? (event.eventTime || schedule.time) : "Details will be added soon",
    venue: hasCustomDetails ? (event.venue || schedule.venue) : "Details will be added soon",
  }
  const privacyText =
    hasCustomDetails
      ? (
          event.privacyNote ||
          "I agree to the event rules, campus privacy standards, organizer instructions, and the final decisions taken by the organizing team."
        )
      : "Details and registration instructions will be added soon by the organizer."

  return (
    <>
      <button
        type="button"
        className="view-btn"
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          height: "38px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          fontFamily: "'Syne',sans-serif",
          fontSize: "12.5px",
          fontWeight: 700,
          color: "#f0efe8",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          transition: "color 0.2s",
        }}
      >
        View Details
        <span
          className="card-arrow"
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "5px",
            background: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            transition: "transform 0.2s, background 0.2s",
          }}
        >
          {"↗"}
        </span>
      </button>

      {mounted && open && createPortal(
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7,8,18,0.72)",
            backdropFilter: "blur(10px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(evt) => evt.stopPropagation()}
            style={{
              width: "min(760px, 100%)",
              maxHeight: "88vh",
              overflowY: "auto",
              background: "#10111d",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.42)",
            }}
          >
            <div style={{ height: "3px", background: cfg.color, width: "100%" }} />

            <div style={{ padding: "24px", display: "grid", gap: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "30px", lineHeight: 1.15, color: "#f5f4ef", marginBottom: "10px" }}>
                    {event.title}
                  </p>
                  <p style={{ color: "#878596", fontSize: "15px", lineHeight: 1.7 }}>
                    {event.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#d9d8df",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  X
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <Badge
                  variant="secondary"
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    borderRadius: "999px",
                    border: `1px solid ${cfg.border}`,
                    color: cfg.color,
                    background: cfg.bg,
                  }}
                >
                  {event.type}
                </Badge>
                <span style={{ color: "#f5f4ef", fontFamily: "'Syne',sans-serif", fontSize: "18px" }}>
                  {priceLabel}
                </span>
                <span style={{ color: "#6f6b7d", fontSize: "14px" }}>
                  Registration closes on {new Date(event.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {[
                  { label: "Event Date", value: displaySchedule.eventDate },
                  { label: "Timing", value: displaySchedule.time },
                  { label: "Venue", value: displaySchedule.venue },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                      padding: "16px",
                    }}
                  >
                    <p style={{ color: "#6f6b7d", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>
                      {item.label}
                    </p>
                    <p style={{ color: "#f5f4ef", fontSize: "15px", lineHeight: 1.5 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "18px",
                  padding: "18px",
                }}
              >
                <p style={{ color: "#f5f4ef", fontFamily: "'Syne',sans-serif", fontSize: "18px", marginBottom: "12px" }}>
                  Rules & Regulations
                </p>
                <div style={{ display: "grid", gap: "10px" }}>
                  {rules.map((rule) => (
                    <div key={rule} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "#c8f542", marginTop: "2px" }}>•</span>
                      <p style={{ color: "#c9c7d3", fontSize: "14px", lineHeight: 1.65 }}>{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              <label
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  background: "rgba(155,127,240,0.08)",
                  border: "1px solid rgba(155,127,240,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(evt) => setAccepted(evt.target.checked)}
                  style={{ marginTop: "3px" }}
                />
                <span style={{ color: "#d8d6e2", fontSize: "14px", lineHeight: 1.6 }}>
                  {privacyText}
                </span>
              </label>

              <ApplyButton
                eventId={event.id}
                disabled={!accepted}
                disabledMessage="Please accept the rules and privacy terms before applying."
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
