"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
 
export default function RegisterCard() {
  const router = useRouter();
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
 
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          branch,
          year: Number(year),
        }),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
 
      router.push("/login");
    } catch (err) {
      setError("Registration failed");
      setLoading(false);
    }
  };
 
  const labelStyle = {
    color: "rgba(220,210,255,0.8)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
  };
 
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(167,139,250,0.22)",
    borderRadius: 10,
    color: "#ede9ff",
    fontSize: 13.5,
    height: 38,
  };
 
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
      {/* Glow — top center */}
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
      {/* Glow — bottom right */}
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
 
      <Card
        className="w-full relative overflow-hidden"
        style={{
          maxWidth: 430,
          background: "rgba(16, 10, 34, 0.92)",
          border: "1px solid rgba(167,139,250,0.2)",
          borderRadius: 24,
          backdropFilter: "blur(20px)",
          boxShadow: "0 18px 42px rgba(0,0,0,0.2)",
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
 
        <CardHeader className="space-y-2.5 px-8 pb-3 pt-6 text-center">
          {/* Live badge */}
          <div className="flex justify-center">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(124,58,237,0.18)",
                border: "1px solid rgba(167,139,250,0.38)",
                borderRadius: 100,
                padding: "4px 14px",
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
              42 events live now
            </span>
          </div>
 
          <CardTitle
            className="font-extrabold"
            style={{
              color: "#f0eeff",
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Join &amp; explore{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #e879f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              campus events.
            </span>
          </CardTitle>
 
          <CardDescription
            style={{
              color: "rgba(200,185,255,0.45)",
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            Create your account and never miss a moment.
          </CardDescription>
        </CardHeader>
 
        <CardContent className="px-8 pb-5 pt-1">
          {/* autoComplete="off" on the form prevents browser autofill entirely */}
          <form onSubmit={handleRegister} className="space-y-3" autoComplete="off">
 
            <div className="space-y-1">
              <Label style={labelStyle}>Full Name</Label>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                style={inputStyle}
                className="placeholder:text-[rgba(200,185,255,0.25)] focus-visible:ring-[rgba(124,58,237,0.35)] focus-visible:border-[rgba(167,139,250,0.6)]"
              />
            </div>
 
            <div className="space-y-1">
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
 
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label style={labelStyle}>Branch</Label>
                <Select onValueChange={setBranch} value={branch}>
                  <SelectTrigger style={{ ...inputStyle }}>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "#120c26",
                      border: "1px solid rgba(167,139,250,0.2)",
                      color: "#ede9ff",
                    }}
                  >
                    <SelectItem value="CSE">Computer Science</SelectItem>
                    <SelectItem value="IT">Information Technology</SelectItem>
                    <SelectItem value="ECE">Electronics</SelectItem>
                    <SelectItem value="ME">Mechanical</SelectItem>
                    <SelectItem value="CE">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
 
              <div className="space-y-1">
                <Label style={labelStyle}>Year</Label>
                <Select onValueChange={(value) => setYear(value)} value={year}>
                  <SelectTrigger style={{ ...inputStyle }}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "#120c26",
                      border: "1px solid rgba(167,139,250,0.2)",
                      color: "#ede9ff",
                    }}
                  >
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
 
            <div className="space-y-1">
              <Label style={labelStyle}>Password</Label>
              <Input
                type="password"
                placeholder="Create strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
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
                height: 42,
                fontSize: 14,
                letterSpacing: "0.03em",
                boxShadow:
                  "0 4px 20px rgba(109,40,217,0.5), 0 0 0 1px rgba(167,139,250,0.15)",
              }}
            >
              {loading ? "Creating account..." : "Register & Enjoy →"}
            </Button>
          </form>
 
          <Separator
            className="my-4"
            style={{ background: "rgba(167,139,250,0.1)" }}
          />
 
          <p
            className="text-xs text-center"
            style={{ color: "rgba(200,185,255,0.38)" }}
          >
            Already have an account?{" "}
            <Button
              asChild
              variant="link"
              className="p-0 text-xs font-semibold h-auto"
              style={{ color: "#c084fc" }}
            >
              <Link href="/login">Sign in</Link>
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
  );
}
