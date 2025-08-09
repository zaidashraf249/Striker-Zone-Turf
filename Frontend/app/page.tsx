import { Hero } from "@/components/hero"
import { SportsCategories } from "@/components/sports-categories"
import { InstagramFeed } from "@/components/instagram-feed"
import { Testimonials } from "@/components/testimonials"
import { ModernFeatures } from "@/components/modern-features"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SportsCategories />
      <ModernFeatures/>
      <InstagramFeed />
      <Testimonials />
    </main>
  )
}
