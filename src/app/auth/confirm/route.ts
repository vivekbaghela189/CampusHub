import { NextResponse } from "next/server"
import type { EmailOtpType } from "@supabase/supabase-js"
import { prisma } from "@/lib/prisma"
import { createSupabaseAuthClient, getBaseUrl } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const baseUrl = getBaseUrl()

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      `${baseUrl}/login?verification=invalid`
    )
  }

  try {
    const supabase = createSupabaseAuthClient()
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    })

    if (error || !data.user?.email) {
      return NextResponse.redirect(
        `${baseUrl}/login?verification=invalid`
      )
    }

    await prisma.user.updateMany({
      where: {
        OR: [
          { supabaseAuthId: data.user.id },
          { email: data.user.email.toLowerCase() },
        ],
      },
      data: {
        supabaseAuthId: data.user.id,
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    })

    return NextResponse.redirect(
      `${baseUrl}/login?verification=success`
    )
  } catch (error) {
    console.error("EMAIL CONFIRM ERROR:", error)

    return NextResponse.redirect(
      `${baseUrl}/login?verification=invalid`
    )
  }
}
