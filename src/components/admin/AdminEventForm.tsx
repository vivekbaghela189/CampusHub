"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EVENT_TYPES = [
  { value: "GENERAL", label: "General" },
  { value: "TECH", label: "Tech" },
  { value: "SPORTS", label: "Sports" },
  { value: "CULTURAL", label: "Cultural" },
  { value: "FEST", label: "Fest" },
  { value: "SCREENING", label: "Screening" },
]

const INITIAL_FORM = {
  title: "",
  description: "",
  type: "GENERAL",
  deadline: "",
  isPaid: false,
  price: "",
  currency: "INR",
  eventDate: "",
  eventTime: "",
  venue: "",
  rules: "",
  privacyNote: "",
}

export default function AdminEventForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: form.isPaid ? form.price : "",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create event")
      }

      setForm(INITIAL_FORM)
      setSuccess("Event created successfully.")
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.12),transparent_24%),linear-gradient(180deg,rgba(17,20,34,0.96),rgba(15,23,42,0.94))] text-white shadow-[0_25px_60px_-35px_rgba(15,23,42,0.85)]">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-2xl text-white">Create Event</CardTitle>
        <CardDescription className="text-white/65">
          Add a new event with schedule, rules, and pricing details for students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-white/85">Event title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Hackathon 2026"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-white/85">Short description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="min-h-28 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus-visible:border-white/25 focus-visible:ring-[3px] focus-visible:ring-white/10"
              placeholder="Tell students what the event is about."
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-white/85">Event type</Label>
              <select
                id="type"
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({ ...current, type: event.target.value }))
                }
                className="h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus-visible:border-white/25 focus-visible:ring-[3px] focus-visible:ring-white/10"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deadline" className="text-white/85">Registration deadline</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={form.deadline}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    deadline: event.target.value,
                  }))
                }
                className="border-white/10 bg-white/5 text-white [color-scheme:dark]"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="eventDate" className="text-white/85">Event date</Label>
              <Input
                id="eventDate"
                value={form.eventDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    eventDate: event.target.value,
                  }))
                }
                placeholder="12 April 2026"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eventTime" className="text-white/85">Event time</Label>
              <Input
                id="eventTime"
                value={form.eventTime}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    eventTime: event.target.value,
                  }))
                }
                placeholder="10:00 AM onwards"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="venue" className="text-white/85">Venue</Label>
              <Input
                id="venue"
                value={form.venue}
                onChange={(event) =>
                  setForm((current) => ({ ...current, venue: event.target.value }))
                }
                placeholder="Main auditorium"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
              />
            </div>
          </div>

          <div className="grid gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <label className="flex items-center gap-3 text-sm font-medium text-white/85">
              <input
                type="checkbox"
                checked={form.isPaid}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    isPaid: event.target.checked,
                    price: event.target.checked ? current.price : "",
                  }))
                }
              />
              Paid event
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-white/85">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, price: event.target.value }))
                  }
                  placeholder="199"
                  disabled={!form.isPaid}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency" className="text-white/85">Currency</Label>
                <Input
                  id="currency"
                  value={form.currency}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      currency: event.target.value.toUpperCase(),
                    }))
                  }
                  maxLength={5}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rules" className="text-white/85">Rules and instructions</Label>
            <textarea
              id="rules"
              value={form.rules}
              onChange={(event) =>
                setForm((current) => ({ ...current, rules: event.target.value }))
              }
              className="min-h-32 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus-visible:border-white/25 focus-visible:ring-[3px] focus-visible:ring-white/10"
              placeholder={"Add one rule per line.\nCarry your college ID.\nReach 15 minutes early."}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="privacyNote" className="text-white/85">Consent / privacy note</Label>
            <textarea
              id="privacyNote"
              value={form.privacyNote}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  privacyNote: event.target.value,
                }))
              }
              className="min-h-24 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus-visible:border-white/25 focus-visible:ring-[3px] focus-visible:ring-white/10"
              placeholder="Students must accept this before applying."
            />
          </div>

          {error ? (
            <p className="text-sm text-rose-300">{error}</p>
          ) : null}

          {success ? (
            <p className="text-sm text-emerald-300">{success}</p>
          ) : null}

          <Button
            type="submit"
            disabled={submitting}
            className="h-12 w-full rounded-full bg-white text-sm font-semibold text-slate-950 hover:bg-white/90 md:w-fit md:px-8"
          >
            {submitting ? "Creating..." : "Create event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
