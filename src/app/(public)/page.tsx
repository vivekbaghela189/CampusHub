import HeroSection from "@/components/landing/HeroSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import CategoriesSection from "@/components/landing/CategoriesSection"
import StatsSection from "@/components/landing/StatsSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import FAQSection from "@/components/landing/FAQSection"
import SectionDivider from "@/components/landing/SectionDivider"
import FadeIn from "@/components/animations/FadeIn"

export default function Home() {
  return (
    <main className="flex flex-col">

      <HeroSection />

      <FeaturesSection />

      
      <CategoriesSection />

      

      
      <TestimonialsSection />

      
      
      <FAQSection />
       

    </main>
  )
}