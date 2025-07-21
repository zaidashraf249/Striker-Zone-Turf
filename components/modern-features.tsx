import { Smartphone, Zap, Shield, Clock, Star, Users, CreditCard, Bell } from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Instant Booking",
    description: "Book in seconds with our mobile-first platform",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live availability and instant confirmations",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure transactions with multiple payment options",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Book anytime, play anytime with flexible hours",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Top-rated facilities with 5-star amenities",
    color: "from-pink-500 to-red-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with players and build your sports network",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: CreditCard,
    title: "Flexible Pricing",
    description: "Transparent pricing with no hidden charges",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Never miss a game with intelligent reminders",
    color: "from-orange-500 to-red-500",
  },
]

export function ModernFeatures() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            ⚡ Powered by Technology
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Players Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of sports booking with cutting-edge features designed for modern players.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ready to Play?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of players who have made Striker Zone their home ground. Experience the difference today.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Start Playing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
