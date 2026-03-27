import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import BackgroundLines from "@/components/layout/BackgroundLines"
import Navbar from "@/components/layout/Navbar"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/events")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#080b12]">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10">
        <BackgroundLines />
        {children}
      </main>
    </div>
  )
}
