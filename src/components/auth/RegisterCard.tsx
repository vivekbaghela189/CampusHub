"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

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

type RegisterCardProps = {
  mode?: "student" | "admin";
};

export default function RegisterCard({
  mode = "student",
}: RegisterCardProps) {
  const router = useRouter();
  const isAdminMode = mode === "admin";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [adminInviteCode, setAdminInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          branch: isAdminMode ? undefined : branch,
          year: isAdminMode ? undefined : Number(year),
          role: isAdminMode ? "ADMIN" : "STUDENT",
          adminInviteCode: isAdminMode ? adminInviteCode : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const verificationEmail = encodeURIComponent(email.trim().toLowerCase());
      router.push(`/login?verification=pending&email=${verificationEmail}`);
    } catch {
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

      <motion.div
        initial={isAdminMode ? false : { opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={isAdminMode ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.35 }}
      >
      <Card
        className="w-full relative overflow-hidden"
        style={{
          maxWidth: isAdminMode ? 430 : 820,
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

        <CardHeader className="space-y-2.5 px-8 pb-4 pt-7 text-center">
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
              {isAdminMode ? "Admin onboarding" : "42 events live now"}
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
            {isAdminMode ? "Create an " : "Join and explore "}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #e879f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {isAdminMode ? "admin account." : "campus events."}
            </span>
          </CardTitle>

          <CardDescription
            style={{
              color: "rgba(200,185,255,0.45)",
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            {isAdminMode
              ? "Use your admin invite code to create a privileged account."
              : "Create your account and never miss a moment."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-7 pt-2 md:px-10">
          <form
            onSubmit={handleRegister}
            className={isAdminMode ? "space-y-3" : "grid gap-4 md:grid-cols-2"}
            autoComplete="off"
          >
            <div className="space-y-1 md:col-span-1">
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

            <div className="space-y-1 md:col-span-1">
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

            {!isAdminMode && (
              <div className="grid grid-cols-2 gap-3 md:col-span-2">
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
            )}

            <div className="space-y-1 md:col-span-1">
              <Label style={labelStyle}>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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

            <div className="space-y-1 md:col-span-1">
              <Label style={labelStyle}>Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  className="placeholder:text-[rgba(200,185,255,0.25)] focus-visible:ring-[rgba(124,58,237,0.35)] focus-visible:border-[rgba(167,139,250,0.6)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,185,255,0.65)] hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isAdminMode && (
              <div className="space-y-1 md:col-span-2">
                <Label style={labelStyle}>Admin Invite Code</Label>
                <Input
                  type="password"
                  placeholder="Enter admin invite code"
                  value={adminInviteCode}
                  onChange={(e) => setAdminInviteCode(e.target.value)}
                  required
                  autoComplete="off"
                  style={inputStyle}
                  className="placeholder:text-[rgba(200,185,255,0.25)] focus-visible:ring-[rgba(124,58,237,0.35)] focus-visible:border-[rgba(167,139,250,0.6)]"
                />
              </div>
            )}

            {error && <p className="text-xs text-destructive md:col-span-2">{error}</p>}

            <Button
              type="submit"
              className="w-full font-bold tracking-wide text-white mt-1 md:col-span-2"
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
              {loading
                ? "Creating account..."
                : isAdminMode
                  ? "Create Admin Account ->"
                  : "Register and Enjoy ->"}
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

          {!isAdminMode && (
            <p
              className="mt-3 text-xs text-center"
              style={{ color: "rgba(200,185,255,0.38)" }}
            >
              Need admin access?{" "}
              <Button
                asChild
                variant="link"
                className="p-0 text-xs font-semibold h-auto"
                style={{ color: "#c084fc" }}
              >
                <Link href="/admin-register">Register as admin</Link>
              </Button>
            </p>
          )}
        </CardContent>
      </Card>
      </motion.div>

      <style>{`
        @keyframes livepulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(167,139,250,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(167,139,250,0); }
        }
      `}</style>
    </div>
  );
}
