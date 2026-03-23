import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, deadline } = body

    const event = await prisma.event.create({
      data: {
        title,
        description,
        type: "GENERAL",
        deadline: new Date(deadline),
        createdById: session.user.id
      }
    })

    return Response.json(event)

  } catch (error) {
    console.error("EVENT CREATE ERROR:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}