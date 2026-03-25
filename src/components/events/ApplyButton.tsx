"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface ApplyButtonProps {
  eventId: string
  isLoggedIn?: boolean
  disabled?: boolean
  disabledMessage?: string
}

export default function ApplyButton({
  eventId,
  isLoggedIn,
  disabled = false,
  disabledMessage,
}: ApplyButtonProps) {
  const router = useRouter()
  const { status: sessionStatus } = useSession()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const resolvedIsLoggedIn =
    typeof isLoggedIn === "boolean" ? isLoggedIn : sessionStatus === "authenticated"

  const handleApply = async () => {
    if (disabled) {
      if (disabledMessage) {
        setStatus(disabledMessage)
      }
      return
    }

    if (!resolvedIsLoggedIn) {
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
        disabled={loading || disabled}
        className="w-full"
      >
        {loading ? "Applying..." : "Apply Now"}
      </Button>

      {(status || disabledMessage) && (
        <p className="text-sm text-center text-muted-foreground">
          {status || disabledMessage}
        </p>
      )}
    </div>
  )
}
