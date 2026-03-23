"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ApplyButtonProps {
  eventId: string
  isLoggedIn: boolean
}

export default function ApplyButton({
  eventId,
  isLoggedIn,
}: ApplyButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleApply = async () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus(data.error)
      } else {
        setStatus("Application submitted successfully 🎉")
      }
    } catch (error) {
      setStatus("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleApply}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Applying..." : "Apply Now"}
      </Button>

      {status && (
        <p className="text-sm text-center text-muted-foreground">
          {status}
        </p>
      )}
    </div>
  )
}