"use client"
 
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
 
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
 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
 
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
 
    setLoading(false)
 
    if (!res?.error) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
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
        position: "fixed",
        inset: 0,
        background: "#080c14",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Glow — top center */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.24) 0%, transparent 65%)",
          top: -220,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />
      {/* Glow — bottom right */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192,100,255,0.12) 0%, transparent 65%)",
          bottom: -90,
          right: "3%",
          pointerEvents: "none",
        }}
      />
 
      <Card
        className="w-full relative overflow-hidden"
        style={{
          maxWidth: 430,
          background: "rgba(16, 10, 34, 0.92)",
          border: "1px solid rgba(167,139,250,0.2)",
          borderRadius: 24,
          backdropFilter: "blur(20px)",
          zIndex: 2,
        }}
      >
        {/* Top shine */}
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
 
        <CardHeader className="text-center pt-8 pb-4 px-8 space-y-3">
          {/* Badge */}
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
 
        <CardContent className="px-8 pt-1 pb-7">
          <form
            onSubmit={handleLogin}
            className="space-y-3.5"
            autoComplete="off"
          >
            <div className="space-y-1.5">
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
 
            <div className="space-y-1.5">
              <Label style={labelStyle}>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={inputStyle}
                className="placeholder:text-[rgba(200,185,255,0.25)] focus-visible:ring-[rgba(124,58,237,0.35)] focus-visible:border-[rgba(167,139,250,0.6)]"
              />
            </div>
 
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
 
            <Button
              type="submit"
              className="w-full font-bold tracking-wide text-white mt-1"
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
              {loading ? "Signing in..." : "Sign In →"}
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
 
      <style>{`
        @keyframes livepulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(167,139,250,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(167,139,250,0); }
        }
      `}</style>
    </div>
  )
}