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
      >
        Approve
      </Button>

      <Button
        variant="destructive"
        onClick={() => updateStatus("REJECTED")}
        disabled={loading}
      >
        Reject
      </Button>
    </div>
  )
}