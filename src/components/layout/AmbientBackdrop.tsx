"use client"

type AmbientBackdropProps = {
  variant?: "hero" | "default" | "subtle"
}

const variantClasses: Record<NonNullable<AmbientBackdropProps["variant"]>, string> = {
  hero: "ambient-backdrop ambient-backdrop-hero",
  default: "ambient-backdrop ambient-backdrop-default",
  subtle: "ambient-backdrop ambient-backdrop-subtle",
}

export default function AmbientBackdrop({
  variant = "default",
}: AmbientBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${variantClasses[variant]}`}
    >
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-noise absolute inset-0 opacity-40" />
      <div className="ambient-orb ambient-orb-left absolute" />
      <div className="ambient-orb ambient-orb-right absolute" />
      <div className="ambient-orb ambient-orb-bottom absolute" />
    </div>
  )
}
