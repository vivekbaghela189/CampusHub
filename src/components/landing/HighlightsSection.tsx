import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import BackgroundLines from "@/components/layout/BackgroundLines"

const highlightGallery: Array<{
  name: string
  image: string
  tone?: string
}> = [
  {
    name: "Armaan Malik",
    tone: "from-orange-400/30 via-pink-500/18 to-transparent",
    image: "",
  },
  {
    name: "Mithila Palkar",
    tone: "from-fuchsia-400/28 via-violet-500/18 to-transparent",
    image: "",
  },
  {
    name: "Gaurav Taneja",
    tone: "from-emerald-400/28 via-cyan-500/18 to-transparent",
    image: "",
  },
  {
    name: "DJ Crowd Set",
    tone: "from-sky-400/28 via-indigo-500/18 to-transparent",
    image: "",
  },
  {
    name: "Finale Moments",
    tone: "from-amber-300/28 via-rose-500/18 to-transparent",
    image: "",
  },
]

export default async function HighlightsSection() {
  const storedItems = await prisma.$queryRaw<
    Array<{ name: string; imageUrl: string }>
  >(Prisma.sql`
    SELECT "name", "imageUrl"
    FROM "HighlightGalleryItem"
    ORDER BY "createdAt" DESC
  `)

  const galleryItems =
    storedItems.length > 0
      ? storedItems.map((item) => ({
          name: item.name,
          image: item.imageUrl,
        }))
      : highlightGallery

  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-[#080b12] py-7 scroll-mt-24"
    >
      <BackgroundLines />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 68%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-8">
        <div className="mb-14 max-w-3xl">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Highlights Gallery
          </p>
          <h2
            className="font-extrabold leading-[1.04] tracking-tight text-white"
            style={{ fontSize: "clamp(36px,4vw,56px)" }}
          >
            A wall full of
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fb7185, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}event faces{" "}
            </span>
            and moments
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/45">
            Showcase guest appearances, crowd reactions and standout event moments in a dense
            photo-wall layout that instantly feels alive.
          </p>
        </div>

        <div className="mt-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item, index) => {
              return (
                <article
                  key={`${item.name}-${index}`}
                  className="group relative aspect-[1.28/1] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0e1320]"
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : item.tone ? (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(180deg,rgba(10,14,24,0.15),rgba(10,14,24,0.8))]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
                    </div>
                  ) : null}

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(5,8,15,0.2)_45%,rgba(5,8,15,0.88)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h4 className="text-[22px] font-semibold tracking-tight text-white">
                      {item.name}
                    </h4>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
