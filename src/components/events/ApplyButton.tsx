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
  const { data: session, status: sessionStatus } = useSession()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const resolvedIsLoggedIn =
    typeof isLoggedIn === "boolean" ? isLoggedIn : sessionStatus === "authenticated"
  const isAdmin = session?.user?.role === "ADMIN"
  const isBlocked = disabled || isAdmin
  const blockedMessage =
    disabledMessage || (isAdmin ? "Admins cannot register for events." : undefined)

  const handleApply = async () => {
    if (isBlocked) {
      if (blockedMessage) {
        setStatus(blockedMessage)
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
    } catch {
      setStatus("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleApply}
        disabled={loading || isBlocked}
        className="w-full"
      >
        {loading ? "Applying..." : isAdmin ? "Admin Access Only" : "Apply Now"}
      </Button>

      {(status || blockedMessage) && (
        <p className="text-sm text-center text-muted-foreground">
          {status || blockedMessage}
        </p>
      )}
    </div>
  )
}
