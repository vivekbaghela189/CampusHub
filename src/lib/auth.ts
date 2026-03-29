import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { createSupabaseAdminClient } from "./supabase"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const normalizedEmail = credentials.email.trim().toLowerCase()

        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail }
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) return null

        if (!user.emailVerified) {
          if (!user.supabaseAuthId) {
            throw new Error("Please verify your email before signing in.")
          }

          try {
            const supabaseAdmin = createSupabaseAdminClient()
            const { data, error } = await supabaseAdmin.auth.admin.getUserById(
              user.supabaseAuthId
            )

            if (error) {
              throw error
            }

            const confirmedAt = data.user?.email_confirmed_at

            if (!confirmedAt) {
              throw new Error("Please verify your email before signing in.")
            }

            await prisma.user.update({
              where: { id: user.id },
              data: {
                emailVerified: true,
                emailVerifiedAt: new Date(confirmedAt),
              },
            })
          } catch (error) {
            if (error instanceof Error) {
              throw error
            }

            throw new Error("Please verify your email before signing in.")
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role
        }
      }
    })
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id   // 🔥 VERY IMPORTANT
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string   // 🔥 VERY IMPORTANT
        session.user.role = token.role as string
      }
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}
