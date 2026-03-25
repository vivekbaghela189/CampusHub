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
    const {
      title,
      description,
      deadline,
      type,
      isPaid,
      price,
      currency,
    } = body

    const numericPrice =
      price === null || price === undefined || price === ""
        ? 0
        : Number(price)
    const hasPaidPrice = Number.isFinite(numericPrice) && numericPrice > 0

    const event = await prisma.event.create({
      data: {
        title,
        description,
        type: type || "GENERAL",
        deadline: new Date(deadline),
        isPaid: typeof isPaid === "boolean" ? isPaid : hasPaidPrice,
        price: hasPaidPrice ? numericPrice : 0,
        currency: currency || "INR",
        createdById: session.user.id
      }
    })

    return Response.json(event)

  } catch (error) {
    console.error("EVENT CREATE ERROR:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
