import { Hero } from "@/components/hero"
import { SportsCategories } from "@/components/sports-categories"
import { QuickBooking } from "@/components/quick-booking"
import { Features } from "@/components/features"
import { TurfGallery } from "@/components/turf-gallery"
import { InstagramFeed } from "@/components/instagram-feed"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SportsCategories />
      <QuickBooking />
      <Features />
      <TurfGallery />
      <InstagramFeed />
      <Testimonials />
      <Contact />
    </main>
  )
}
