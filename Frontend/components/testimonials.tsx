import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Regular Player",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Strike Zone has the best turf in the city! The booking system is so easy to use, and the facilities are top-notch. Been playing here for 2 years now.",
    date: "2 weeks ago",
  },
  {
    name: "Priya Patel",
    role: "Team Captain",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Amazing experience every time! The floodlights are perfect for evening games, and the staff is very helpful. Highly recommend for serious players.",
    date: "1 month ago",
  },
  {
    name: "Arjun Singh",
    role: "Weekend Warrior",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Love the real-time booking feature. No more calling and waiting! The turf quality is excellent and the changing rooms are always clean.",
    date: "3 weeks ago",
  },
  {
    name: "Sneha Gupta",
    role: "Corporate Team Lead",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Perfect for our company tournaments. The group booking discounts are great, and the payment process is seamless. Will definitely book again!",
    date: "1 week ago",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Players Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community of players has to say about their Strike Zone
            experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-green-600 mb-4" />

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-bold mb-2">4.9</p>
              <p className="text-green-100">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold mb-2">500+</p>
              <p className="text-green-100">Happy Players</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold mb-2">1000+</p>
              <p className="text-green-100">Games Played</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold mb-2">98%</p>
              <p className="text-green-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Community?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the difference yourself. Book your first session and see why Strike Zone is the preferred choice
            for serious players.
          </p>
          <Link href="/booking">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
            Book Your First Game
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
