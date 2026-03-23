"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/LogoutButton"

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-6">CampusHub</h2>

        <nav className="space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>

          <Link href="/events">
            <Button variant="ghost" className="w-full justify-start">
              Browse Events
            </Button>
          </Link>

          <Link href="/my-events">
            <Button variant="ghost" className="w-full justify-start">
              My Registrations
            </Button>
          </Link>
        </nav>
      </div>

      <LogoutButton />
    </aside>
  )
}