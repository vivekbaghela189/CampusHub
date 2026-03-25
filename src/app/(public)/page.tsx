import HeroSection from "@/components/landing/HeroSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import CategoriesSection from "@/components/landing/CategoriesSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import FAQSection from "@/components/landing/FAQSection"

export default function Home() {
  return (
    <main className="flex flex-col bg-[#080b12]">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  )
}
