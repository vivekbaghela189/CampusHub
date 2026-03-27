import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Homepage from "@/components/landing/Homepage"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/events")
  }

  return <Homepage />
}
