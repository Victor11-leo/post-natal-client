import { HeroSection } from "./sections/hero-section"
import { FeaturesSection } from "./sections/features-section"
import { AppMockupSection } from "./sections/app-mockup-section"
import { Footer } from "./sections/footer"

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
