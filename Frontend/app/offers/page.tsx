"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Gift, Clock, Users, Calendar, Star, Copy, Share2, Tag, Zap, Crown, Heart } from "lucide-react"

const offers = [
  {
    id: 1,
    title: "Weekend Warrior",
    description: "Special discount for weekend bookings",
    discount: "20% OFF",
    code: "WEEKEND20",
    validUntil: "2024-02-29",
    minBooking: "₹1000",
    category: "weekend",
    popular: true,
    icon: Calendar,
    color: "from-orange-500 to-red-500",
    terms: ["Valid only on weekends", "Minimum booking of ₹1000", "Cannot be combined with other offers"],
  },
  {
    id: 2,
    title: "First Timer Bonus",
    description: "Welcome offer for new customers",
    discount: "30% OFF",
    code: "FIRST30",
    validUntil: "2024-12-31",
    minBooking: "₹500",
    category: "new-user",
    popular: false,
    icon: Star,
    color: "from-green-500 to-green-600",
    terms: ["Valid for first booking only", "Minimum booking of ₹500", "One-time use per customer"],
  },
  {
    id: 3,
    title: "Group Play Special",
    description: "Book 5 hours and get 1 hour absolutely free",
    discount: "1 Hour FREE",
    code: "GROUP5",
    validUntil: "2024-03-31",
    minBooking: "5 hours",
    category: "group",
    popular: true,
    icon: Users,
    color: "from-blue-500 to-blue-600",
    terms: ["Book minimum 5 hours", "Free hour of same value", "Valid for group bookings"],
  },
  {
    id: 4,
    title: "Early Bird Offer",
    description: "Book before 12 PM and save big",
    discount: "25% OFF",
    code: "EARLY25",
    validUntil: "2024-02-15",
    minBooking: "₹800",
    category: "time-based",
    popular: false,
    icon: Clock,
    color: "from-purple-500 to-purple-600",
    terms: ["Valid for bookings before 12 PM", "Minimum booking of ₹800", "Advance booking required"],
  },
  {
    id: 5,
    title: "Corporate Package",
    description: "Special rates for corporate tournaments",
    discount: "15% OFF",
    code: "CORP15",
    validUntil: "2024-06-30",
    minBooking: "₹5000",
    category: "corporate",
    popular: false,
    icon: Crown,
    color: "from-indigo-500 to-indigo-600",
    terms: ["Minimum booking of ₹5000", "Valid for corporate events", "Advance booking required"],
  },
  {
    id: 6,
    title: "Flash Sale",
    description: "Limited time mega discount",
    discount: "40% OFF",
    code: "FLASH40",
    validUntil: "2024-01-31",
    minBooking: "₹1200",
    category: "flash",
    popular: true,
    icon: Zap,
    color: "from-red-500 to-pink-500",
    terms: ["Limited time offer", "Minimum booking of ₹1200", "Subject to availability"],
  },
]

const categories = [
  { id: "all", name: "All Offers", icon: Gift },
  { id: "weekend", name: "Weekend", icon: Calendar },
  { id: "new-user", name: "New User", icon: Star },
  { id: "group", name: "Group", icon: Users },
  { id: "time-based", name: "Time Based", icon: Clock },
  { id: "corporate", name: "Corporate", icon: Crown },
  { id: "flash", name: "Flash Sale", icon: Zap },
]

export default function OffersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [likedOffers, setLikedOffers] = useState<number[]>([])
  const { toast } = useToast()

  const filteredOffers = offers.filter((offer) => selectedCategory === "all" || offer.category === selectedCategory)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast({
      title: "Code copied!",
      description: `Promo code ${code} has been copied to clipboard.`,
    })
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const toggleLike = (offerId: number) => {
    setLikedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]))
  }

  const handleBookNow = (code: string) => {
    window.location.href = `/booking?promo=${code}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            <Gift className="h-4 w-4 mr-2" />
            Special Offers & Deals
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Exclusive Offers</h1>
          <p className="text-base sm:text-xl text-gray-600">Save big on your turf bookings with our special deals</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {filteredOffers.map((offer) => (
            <Card
              key={offer.id}
              className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
            >
              {offer.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">Popular</Badge>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${offer.color}`}></div>

              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-r ${offer.color} flex items-center justify-center`}
                  >
                    <offer.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <button
                    onClick={() => toggleLike(offer.id)}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      likedOffers.includes(offer.id)
                        ? "text-red-500 bg-red-50"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${likedOffers.includes(offer.id) ? "fill-current" : ""}`}
                    />
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{offer.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${offer.color} bg-clip-text text-transparent`}
                  >
                    {offer.discount}
                  </div>
                  <div className="text-right text-xs sm:text-sm text-gray-500">
                    <div>Min: {offer.minBooking}</div>
                    <div>Valid till: {new Date(offer.validUntil).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Promo Code</p>
                      <p className="font-mono font-bold text-sm sm:text-base text-gray-900">{offer.code}</p>
                    </div>
                    <Button
                      onClick={() => copyCode(offer.code)}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer bg-transparent text-xs sm:text-sm"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Terms & Conditions:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {offer.terms.map((term, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    onClick={() => handleBookNow(offer.code)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-pointer text-sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm" className="cursor-pointer bg-transparent text-sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers found</h3>
              <p className="text-gray-600 mb-6">
                No offers available in the selected category. Check back soon for new deals!
              </p>
              <Button
                onClick={() => setSelectedCategory("all")}
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                View All Offers
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6 sm:p-8 text-center">
            <Gift className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Never Miss a Deal!</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive offers, flash sales, and special
              promotions.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <Input type="email" placeholder="Enter your email address" className="flex-1" />
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white cursor-pointer">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
