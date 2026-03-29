import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createSupabaseAdminClient, createSupabaseAuthClient, getBaseUrl } from "@/lib/supabase"
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

    let supabaseUserId: string | undefined

    try {
      const supabase = createSupabaseAuthClient()
      const redirectTo = `${getBaseUrl()}/auth/confirm`
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            name,
            role: requestedRole,
          },
        },
      })

      if (error) {
        return NextResponse.json(
          { error: error.message || "Could not send verification email" },
          { status: 400 }
        )
      }

      supabaseUserId = data.user?.id

      if (!supabaseUserId) {
        return NextResponse.json(
          { error: "Could not create verification request" },
          { status: 500 }
        )
      }
    } catch (error) {
      console.error("SUPABASE SIGNUP ERROR:", error)

      return NextResponse.json(
        {
          error:
            "Supabase email verification is not configured. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      await prisma.user.create({
        data: {
          supabaseAuthId: supabaseUserId,
          name,
          email: normalizedEmail,
          password: hashedPassword,
          branch: requestedRole === "ADMIN" ? null : branch,
          year: requestedRole === "ADMIN" ? null : year,
          role: requestedRole,
          emailVerified: false,
        },
      })
    } catch (error) {
      console.error("PRISMA REGISTER ERROR:", error)

      try {
        const supabaseAdmin = createSupabaseAdminClient()
        await supabaseAdmin.auth.admin.deleteUser(supabaseUserId)
      } catch (cleanupError) {
        console.error("SUPABASE CLEANUP ERROR:", cleanupError)
      }

      throw error
    }

    return NextResponse.json(
      {
        message:
          "Account created. Please verify your email before signing in.",
      },
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
