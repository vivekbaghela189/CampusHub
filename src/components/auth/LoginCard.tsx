"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import FadeIn from "@/components/animations/FadeIn"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LoginCard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verificationEmail = searchParams.get("email")
  const verificationState = searchParams.get("verification")

  const [email, setEmail] = useState(verificationEmail ?? "")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    })

    setLoading(false)

    if (!res?.error) {
      router.replace("/post-login")
      router.refresh()
    } else {
      setError(
        res.error === "Please verify your email before signing in."
          ? res.error
          : "Invalid email or password"
      )
    }
  }

  const labelStyle = {
    color: "rgba(220,210,255,0.8)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(167,139,250,0.22)",
    borderRadius: 10,
    color: "#ede9ff",
    fontSize: 13.5,
    height: 40,
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 9rem)",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "24px 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.14) 0%, transparent 65%)",
          top: -220,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192,100,255,0.07) 0%, transparent 65%)",
          bottom: -90,
          right: "3%",
          pointerEvents: "none",
        }}
      />

      <FadeIn amount={0.35} distance={30}>
      <Card
        className="w-full relative overflow-hidden"
        style={{
          maxWidth: 760,
          background: "rgba(16, 10, 34, 0.92)",
          border: "1px solid rgba(167,139,250,0.2)",
          borderRadius: 24,
          backdropFilter: "blur(20px)",
          boxShadow: "0 18px 42px rgba(0,0,0,0.2)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(167,139,250,0.9), transparent)",
          }}
        />

        <CardHeader className="text-center pt-9 pb-5 px-9 space-y-3.5">
          <div className="flex justify-center">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(124,58,237,0.18)",
                border: "1px solid rgba(167,139,250,0.38)",
                borderRadius: 100,
                padding: "5px 16px",
                fontSize: 11,
                fontWeight: 600,
                color: "#d8b4fe",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#a78bfa",
                  boxShadow: "0 0 0 2px rgba(167,139,250,0.3)",
                  display: "inline-block",
                  animation: "livepulse 2s infinite",
                }}
              />
              Campus Events Platform
            </span>
          </div>

          <CardTitle
            className="font-extrabold"
            style={{
              color: "#f0eeff",
              fontSize: 26,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Welcome{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #e879f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              back.
            </span>
          </CardTitle>

          <CardDescription
            style={{
              color: "rgba(200,185,255,0.45)",
              fontSize: 12.5,
              lineHeight: 1.5,
            }}
          >
            Sign in to access campus events
          </CardDescription>
        </CardHeader>

        <CardContent className="px-9 pt-2 pb-8 md:px-10">
          <form
            onSubmit={handleLogin}
            className="grid gap-4 md:grid-cols-2"
            autoComplete="off"
          >
            <div className="space-y-1.5 md:col-span-1">
              <Label style={labelStyle}>Email</Label>
              <Input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                style={inputStyle}
                className="placeholder:text-[rgba(200,185,255,0.25)] focus-visible:ring-[rgba(124,58,237,0.35)] focus-visible:border-[rgba(167,139,250,0.6)]"
              />
            </div>

            {verificationState === "pending" && (
              <p className="text-xs text-amber-300 md:col-span-2">
                Verification email sent{verificationEmail ? ` to ${verificationEmail}` : ""}. Please confirm it before signing in.
              </p>
            )}

            {verificationState === "success" && (
              <p className="text-xs text-emerald-400 md:col-span-2">
                Email verified successfully. You can sign in now.
              </p>
            )}

            {verificationState === "invalid" && (
              <p className="text-xs text-amber-300 md:col-span-2">
                That verification link is invalid or expired. Please register again or resend verification from Supabase.
              </p>
            )}

            <div className="space-y-1.5 md:col-span-1">
              <Label style={labelStyle}>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  className="placeholder:text-[rgba(200,185,255,0.25)] focus-visible:ring-[rgba(124,58,237,0.35)] focus-visible:border-[rgba(167,139,250,0.6)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,185,255,0.65)] hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive md:col-span-2">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full font-bold tracking-wide text-white mt-1 md:col-span-2"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(135deg, #6d28d9 0%, #9333ea 55%, #c026d3 100%)",
                border: "none",
                borderRadius: 11,
                height: 44,
                fontSize: 14,
                letterSpacing: "0.03em",
                boxShadow:
                  "0 4px 20px rgba(109,40,217,0.5), 0 0 0 1px rgba(167,139,250,0.15)",
              }}
            >
              {loading ? "Signing in..." : "Sign In ->"}
            </Button>
          </form>

          <Separator
            className="my-5"
            style={{ background: "rgba(167,139,250,0.1)" }}
          />

          <p
            className="text-xs text-center"
            style={{ color: "rgba(200,185,255,0.38)" }}
          >
            Don&apos;t have an account?{" "}
            <Button
              asChild
              variant="link"
              className="p-0 text-xs font-semibold h-auto"
              style={{ color: "#c084fc" }}
            >
              <Link href="/register">Create one</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
      </FadeIn>

      <style>{`
        @keyframes livepulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(167,139,250,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(167,139,250,0); }
        }
      `}</style>
    </div>
  )
}
