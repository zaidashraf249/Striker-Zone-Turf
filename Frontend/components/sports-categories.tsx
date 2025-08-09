"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Static data to prevent re-renders
const sportsCategories = [
  {
    id: 1,
    name: "Football",
    icon: "⚽",
    description: "11v11 & 7v7 matches",
    price: "₹800-1200/hr",
    popular: true,
    features: ["Professional turf", "Floodlights", "Goal posts"],
  },
  {
    id: 2,
    name: "Cricket",
    icon: "🏏",
    description: "Practice nets & matches",
    price: "₹600-900/hr",
    popular: false,
    features: ["Bowling machine", "Practice nets", "Stumps"],
  },
  // {
  //   id: 3,
  //   name: "Badminton",
  //   icon: "🏸",
  //   description: "Indoor courts available",
  //   price: "₹400-600/hr",
  //   popular: false,
  //   features: ["Wooden flooring", "Professional nets", "Shuttlecocks"],
  // },
]

// Memoized feature item component
const FeatureItem = memo(({ text }: { text: string }) => (
  <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-600">
    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
    <span>{text}</span>
  </div>
))

FeatureItem.displayName = "FeatureItem"

// Memoized sport card component
const SportCard = memo(({ sport }: { sport: (typeof sportsCategories)[0] }) => (
  <Card
    key={sport.id}
    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white relative overflow-hidden lg:p-10 lg:m-10"
  >
    {sport.popular && <Badge className="absolute top-4 right-4 bg-orange-500 text-white z-10">Popular</Badge>}

    <CardContent className="p-6 sm:p-8">
      <div className="text-center space-y-4">
        <div className="text-4xl sm:text-5xl mb-4">{sport.icon}</div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{sport.name}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3">{sport.description}</p>
          <div className="text-lg sm:text-xl font-bold text-green-600">{sport.price}</div>
        </div>

        <div className="space-y-2">
          {sport.features.map((feature, idx) => (
            <FeatureItem key={idx} text={feature} />
          ))}
        </div>

        <Link href="/booking" passHref legacyBehavior>
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 sm:py-3 mt-4"
            asChild
          >
            <a>Book {sport.name}</a>
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
))

SportCard.displayName = "SportCard"

export function SportsCategories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Choose Your Sport</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Professional facilities for every sport. Book your preferred game and enjoy world-class amenities.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {sportsCategories.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>

        {/* <div className="text-center mt-8 sm:mt-12">
          <Link href="/booking" passHref legacyBehavior>
            <Button
              variant="outline"
              size="lg"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-2 bg-transparent"
              asChild
            >
              <a>View All Sports & Pricing</a>
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  )
}
