import { Calendar, CreditCard, Camera, User, Star, Bell, Phone, Gift, MapPin, Settings } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Real-time Booking System",
    description: "Check availability instantly and book your preferred slots with our live calendar system.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Gateway",
    description: "Multiple payment options including UPI, cards, and wallets with instant confirmation.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Camera,
    title: "Turf Gallery & Details",
    description: "High-quality photos, amenities details, and virtual tour of our premium facilities.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: User,
    title: "Personal Dashboard",
    description: "Manage your profile, booking history, and upcoming reservations in one place.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Share your experience and read authentic reviews from our community.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get booking confirmations, reminders, and updates via SMS, email, and WhatsApp.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Live chat, WhatsApp support, and dedicated helpline for all your queries.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Gift,
    title: "Special Offers",
    description: "Exclusive discounts, group packages, and membership plans for regular players.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: MapPin,
    title: "Location-based Search",
    description: "Find and book nearby turfs with integrated maps and directions.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: Settings,
    title: "Admin Dashboard",
    description: "Comprehensive management system for bookings, payments, and customer relations.",
    color: "bg-gray-100 text-gray-600",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Strike Zone?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most advanced turf booking platform with features designed for players, by players.
            Everything you need for the perfect game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ready to Experience the Difference?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied players who have made Strike Zone their home ground. Book your first session
              and discover why we're rated #1.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Booking Now
              </button>
              <button className="border border-gray-300 hover:border-green-300 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Take a Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
