import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

function normalizeOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const title = normalizeOptionalString(body.title)
    const description = normalizeOptionalString(body.description)
    const deadlineValue = normalizeOptionalString(body.deadline)

    if (!title || !description || !deadlineValue) {
      return Response.json(
        { error: "Title, description, and deadline are required." },
        { status: 400 }
      )
    }

    const deadline = new Date(deadlineValue)

    if (Number.isNaN(deadline.getTime())) {
      return Response.json({ error: "Invalid deadline." }, { status: 400 })
    }

    const numericPrice =
      body.price === null || body.price === undefined || body.price === ""
        ? 0
        : Number(body.price)

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return Response.json({ error: "Invalid price." }, { status: 400 })
    }

    const isPaid = Boolean(body.isPaid) && numericPrice > 0

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        type: normalizeOptionalString(body.type) || "GENERAL",
        deadline,
        isPaid,
        price: isPaid ? numericPrice : 0,
        currency: normalizeOptionalString(body.currency) || "INR",
        details: {
          upsert: {
            create: {
              eventDate: normalizeOptionalString(body.eventDate),
              eventTime: normalizeOptionalString(body.eventTime),
              venue: normalizeOptionalString(body.venue),
              rules: normalizeOptionalString(body.rules),
              privacyNote: normalizeOptionalString(body.privacyNote),
            },
            update: {
              eventDate: normalizeOptionalString(body.eventDate),
              eventTime: normalizeOptionalString(body.eventTime),
              venue: normalizeOptionalString(body.venue),
              rules: normalizeOptionalString(body.rules),
              privacyNote: normalizeOptionalString(body.privacyNote),
            },
          },
        },
      },
      include: {
        details: true,
      },
    })

    return Response.json(updatedEvent)
  } catch (error) {
    console.error("EVENT UPDATE ERROR:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
