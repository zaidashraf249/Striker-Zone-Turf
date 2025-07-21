"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Car, Lightbulb, Wifi, Coffee, Shield, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Main Football Turf",
    title: "Premium Football Turf",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cricket Practice Area",
    title: "Cricket Practice Nets",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Changing Rooms",
    title: "Premium Changing Rooms",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Parking Area",
    title: "Ample Parking Space",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Seating Area",
    title: "Comfortable Seating",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cafeteria",
    title: "Refreshment Area",
  },
]

const amenities = [
  { icon: Lightbulb, name: "Floodlights", description: "Professional LED lighting" },
  { icon: Car, name: "Parking", description: "50+ vehicle capacity" },
  { icon: Shield, name: "Security", description: "24/7 CCTV monitoring" },
  { icon: Wifi, name: "Free WiFi", description: "High-speed internet" },
  { icon: Coffee, name: "Cafeteria", description: "Snacks & beverages" },
  { icon: Users, name: "Changing Rooms", description: "Separate for men & women" },
]

export function TurfGallery() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explore Our Premium Facilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of Strike Zone and discover world-class amenities designed for the ultimate sports
            experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
              <img
                src={galleryImages[currentImage].src || "/placeholder.svg"}
                alt={galleryImages[currentImage].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Image Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-semibold">{galleryImages[currentImage].title}</h3>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-6 gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImage === index
                      ? "border-green-500 ring-2 ring-green-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Turf Details */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strike Zone Sports Complex</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">Striker Zone, Nagpur, Maharashtra</p>
                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
                      View on Google Maps →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Operating Hours</p>
                    <p className="text-gray-600">6:00 AM - 11:00 PM (All Days)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Capacity</p>
                    <p className="text-gray-600">11v11 Football, 6v6 Mini Football</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Premium Amenities</h4>

              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <amenity.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{amenity.name}</p>
                      <p className="text-gray-600 text-xs">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Pricing</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Peak Hours</p>
                    <p className="text-sm text-gray-600">6:00 PM - 10:00 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹1,200</p>
                    <p className="text-sm text-gray-600">per hour</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Off-Peak Hours</p>
                    <p className="text-sm text-gray-600">6:00 AM - 6:00 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹800</p>
                    <p className="text-sm text-gray-600">per hour</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-green-600">Special Offer</Badge>
                </div>
                <p className="text-sm text-green-800">Book 5 hours and get 1 hour free! Valid for group bookings.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 cursor-pointer">
                Book This Turf
              </Button>
              <Button variant="outline" className="flex-1 py-3 bg-transparent cursor-pointer">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
