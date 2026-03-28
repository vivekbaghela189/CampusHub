"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const INITIAL_FORM = {
  name: "",
  imageUrl: "",
}

type AdminHighlightsFormProps = {
  existingItems: Array<{
    id: string
    name: string
    imageUrl: string
  }>
}

export default function AdminHighlightsForm({
  existingItems,
}: AdminHighlightsFormProps) {
  const router = useRouter()
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
      const response = await fetch("/api/highlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add highlight image")
      }

      setForm(INITIAL_FORM)
      setSuccess("Highlight image added successfully.")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.12),transparent_24%),linear-gradient(180deg,rgba(17,20,34,0.96),rgba(15,23,42,0.94))] text-white shadow-[0_25px_60px_-35px_rgba(15,23,42,0.85)]">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-2xl text-white">Add Highlight Image</CardTitle>
          <CardDescription className="text-white/65">
            Paste an image URL and a display name to publish it in the public highlights gallery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white/85">Image name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Armaan Malik Live"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl" className="text-white/85">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(event) =>
                  setForm((current) => ({ ...current, imageUrl: event.target.value }))
                }
                placeholder="https://example.com/highlight-image.jpg"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/35"
                required
              />
            </div>

            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            {success ? <p className="text-sm text-emerald-300">{success}</p> : null}

            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-full bg-white text-sm font-semibold text-slate-950 hover:bg-white/90 md:w-fit md:px-8"
            >
              {submitting ? "Adding..." : "Add to highlights"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 text-white shadow-[0_25px_60px_-35px_rgba(15,23,42,0.85)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Current Gallery
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Preview the images that will appear in the public highlights section.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white/70">
            {existingItems.length} items
          </span>
        </div>

        {existingItems.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-white/12 bg-white/[0.03] p-8 text-white/55">
            No highlight images added yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {existingItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0f1626]"
              >
                <div className="aspect-[4/3] bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-base font-semibold text-white">{item.name}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
