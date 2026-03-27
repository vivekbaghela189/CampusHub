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
    <Card>
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>
          Add a new event with schedule, rules, and pricing details for students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Event title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Hackathon 2026"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Short description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="border-input min-h-28 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder="Tell students what the event is about."
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="type">Event type</Label>
              <select
                id="type"
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({ ...current, type: event.target.value }))
                }
                className="border-input h-9 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deadline">Registration deadline</Label>
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
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="eventDate">Event date</Label>
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
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eventTime">Event time</Label>
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
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={form.venue}
                onChange={(event) =>
                  setForm((current) => ({ ...current, venue: event.target.value }))
                }
                placeholder="Main auditorium"
              />
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border p-4">
            <label className="flex items-center gap-3 text-sm font-medium">
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
                <Label htmlFor="price">Price</Label>
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
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
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
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rules">Rules and instructions</Label>
            <textarea
              id="rules"
              value={form.rules}
              onChange={(event) =>
                setForm((current) => ({ ...current, rules: event.target.value }))
              }
              className="border-input min-h-32 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder={"Add one rule per line.\nCarry your college ID.\nReach 15 minutes early."}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="privacyNote">Consent / privacy note</Label>
            <textarea
              id="privacyNote"
              value={form.privacyNote}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  privacyNote: event.target.value,
                }))
              }
              className="border-input min-h-24 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder="Students must accept this before applying."
            />
          </div>

          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : null}

          {success ? (
            <p className="text-sm text-green-600">{success}</p>
          ) : null}

          <Button type="submit" disabled={submitting} className="w-full md:w-fit">
            {submitting ? "Creating..." : "Create event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
