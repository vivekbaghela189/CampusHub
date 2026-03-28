import HighlightsSection from "@/components/landing/HighlightsSection"
import AmbientBackdrop from "@/components/layout/AmbientBackdrop"

export default function HighlightsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b12] pt-8">
      <AmbientBackdrop variant="default" />
      <HighlightsSection />
    </main>
  )
}
