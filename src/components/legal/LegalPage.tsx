import Link from "next/link"
import AmbientBackdrop from "@/components/layout/AmbientBackdrop"

type LegalSection = {
  title: string
  points: string[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  intro: string
  effectiveDate: string
  sections: LegalSection[]
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #080b12 0%, #0d1020 55%, #12142b 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AmbientBackdrop variant="subtle" />
      <div
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 420,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(124,58,237,0.12) 38%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 980,
          margin: "0 auto",
          padding: "72px 24px 96px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 999,
            padding: "7px 16px",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            color: "#c4b5fd",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            borderRadius: 30,
            background:
              "linear-gradient(180deg, rgba(18,18,31,0.96) 0%, rgba(22,22,41,0.94) 100%)",
            border: "1px solid rgba(167,139,250,0.14)",
            boxShadow: "0 22px 60px rgba(0,0,0,0.34)",
            padding: "40px 32px",
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                color: "#f5f3ff",
                fontSize: "clamp(32px, 6vw, 52px)",
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 14,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                color: "rgba(226,232,255,0.72)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 760,
                marginBottom: 16,
              }}
            >
              {intro}
            </p>
            <p
              style={{
                color: "rgba(196,181,253,0.82)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Effective date: {effectiveDate}
            </p>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            {sections.map((section) => (
              <section
                key={section.title}
                style={{
                  borderRadius: 22,
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.09), rgba(124,58,237,0.08) 50%, rgba(8,11,18,0.56) 100%)",
                  border: "1px solid rgba(167,139,250,0.12)",
                  padding: "22px 20px",
                }}
              >
                <h2
                  style={{
                    color: "#f5f3ff",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {section.title}
                </h2>
                <div style={{ display: "grid", gap: 12 }}>
                  {section.points.map((point) => (
                    <p
                      key={point}
                      style={{
                        color: "rgba(226,232,255,0.74)",
                        fontSize: 15,
                        lineHeight: 1.75,
                      }}
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Link
              href="/events"
              style={{
                textDecoration: "none",
                borderRadius: 12,
                padding: "12px 18px",
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
