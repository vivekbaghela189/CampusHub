import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json()
const { name, email, password, branch, year } = body
    // 1️⃣ Basic validation
  if (!name || !email || !password || !branch || !year) {
  return NextResponse.json(
    { error: "All fields are required" },
    { status: 400 }
  )
}

    // 2️⃣ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4️⃣ Create user
   const newUser = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    branch,
    year,
    role: "STUDENT"
  }
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