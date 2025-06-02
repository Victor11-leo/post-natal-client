import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features"
import { AppMockupSection } from "@/components/sections/mockup"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <AppMockupSection />
      <Footer />
    </div>
  )
}