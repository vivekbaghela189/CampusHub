import { getServerSession } from "next-auth"
import { Prisma } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function normalizeRequiredString(value: unknown) {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const name = normalizeRequiredString(body.name)
    const imageUrl = normalizeRequiredString(body.imageUrl)

    if (!name || !imageUrl) {
      return Response.json(
        { error: "Image name and image URL are required." },
        { status: 400 }
      )
    }

    const createdItem = await prisma.$queryRaw<
      Array<{ id: string; name: string; imageUrl: string }>
    >(Prisma.sql`
      INSERT INTO "HighlightGalleryItem" ("id", "name", "imageUrl", "updatedAt")
      VALUES (${crypto.randomUUID()}, ${name}, ${imageUrl}, CURRENT_TIMESTAMP)
      RETURNING "id", "name", "imageUrl"
    `)

    return Response.json(createdItem[0])
  } catch (error) {
    console.error("HIGHLIGHTS CREATE ERROR:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
