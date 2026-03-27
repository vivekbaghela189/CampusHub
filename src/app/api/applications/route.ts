import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // 1️⃣ Must be logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (session.user.role === "ADMIN") {
      return NextResponse.json(
        { error: "Admins cannot register for events" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { eventId } = body

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID missing" },
        { status: 400 }
      )
    }

    // 2️⃣ Check event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    // 3️⃣ Check deadline
    if (new Date(event.deadline) < new Date()) {
      return NextResponse.json(
        { error: "Deadline passed" },
        { status: 400 }
      )
    }

    // 4️⃣ Prevent duplicate apply
    const existing = await prisma.application.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId
        }
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Already applied" },
        { status: 400 }
      )
    }

    // 5️⃣ Create application
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        eventId
      }
    })

    return NextResponse.json(application)

  } catch (error) {
    console.error("APPLICATION ERROR:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
