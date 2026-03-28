import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import AmbientBackdrop from "@/components/layout/AmbientBackdrop"
import Navbar from "@/components/layout/Navbar"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // 🔒 Not logged in → redirect
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#080b12]">
      <Navbar />
      <main className="relative flex-1 overflow-hidden bg-[#0b0d1b] px-4 py-6 md:px-6">
        <AmbientBackdrop variant="subtle" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(99,102,241,0.12) 0%, transparent 28%), radial-gradient(circle at top right, rgba(236,72,153,0.08) 0%, transparent 24%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  )
}
