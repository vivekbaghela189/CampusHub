import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, branch, year, role, adminInviteCode } = body
    const normalizedEmail = String(email || "").trim().toLowerCase()
    const requestedRole = role === "ADMIN" ? "ADMIN" : "STUDENT"

    if (!name || !normalizedEmail || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    if (requestedRole === "STUDENT" && (!branch || !year)) {
      return NextResponse.json(
        { error: "Branch and year are required for students" },
        { status: 400 }
      )
    }

    if (requestedRole === "ADMIN") {
      const configuredInviteCode = process.env.ADMIN_INVITE_CODE

      if (!configuredInviteCode) {
        return NextResponse.json(
          { error: "Admin registration is not configured yet" },
          { status: 500 }
        )
      }

      if (!adminInviteCode || adminInviteCode !== configuredInviteCode) {
        return NextResponse.json(
          { error: "Invalid admin invite code" },
          { status: 403 }
        )
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        branch: requestedRole === "ADMIN" ? null : branch,
        year: requestedRole === "ADMIN" ? null : year,
        role: requestedRole,
      },
    })

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    )
  } catch (error) {
    console.error("REGISTER ERROR:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
