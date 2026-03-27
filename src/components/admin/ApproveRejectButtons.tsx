"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Props {
  applicationId: string
  currentStatus: string
}

export default function ApproveRejectButtons({
  applicationId,
  currentStatus,
}: Props) {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (status: string) => {
    setLoading(true)

    await fetch("/api/applications/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, status })
    })

    setLoading(false)
    location.reload()
  }

  if (currentStatus !== "PENDING") return null

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => updateStatus("APPROVED")}
        disabled={loading}
        className="rounded-full bg-white text-slate-950 hover:bg-white/90"
      >
        Approve
      </Button>

      <Button
        variant="destructive"
        onClick={() => updateStatus("REJECTED")}
        disabled={loading}
        className="rounded-full bg-rose-500 text-white hover:bg-rose-500/90"
      >
        Reject
      </Button>
    </div>
  )
}
