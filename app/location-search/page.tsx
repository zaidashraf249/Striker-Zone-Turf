"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Search, Navigation, Star, Phone, Calendar, Filter, Map, List } from "lucide-react"

const nearbyTurfs = [
  {
    id: 1,
    name: "Striker Zone Main",
    address: "Nagpur, Maharashtra",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 127,
    price: "₹800-1200/hr",
    image: "/placeholder.svg?height=200&width=300&text=Striker+Zone+Main",
    amenities: ["Parking", "WiFi", "Security", "Floodlights"],
    availability: "Available",
    phone: "+91 98765 43210",
    coordinates: { lat: 21.1458, lng: 79.0882 },
  },
  {
    id: 2,
    name: "Sports Arena Pro",
    address: "Civil Lines, Nagpur",
    distance: "1.2 km",
    rating: 4.6,
    reviews: 89,
    price: "₹700-1000/hr",
    image: "/placeholder.svg?height=200&width=300&text=Sports+Arena+Pro",
    amenities: ["Parking", "Cafeteria", "Changing Rooms"],
    availability: "Available",
    phone: "+91 98765 43211",
    coordinates: { lat: 21.1558, lng: 79.0982 },
  },
  {
    id: 3,
    name: "Green Field Sports",
    address: "Dharampeth, Nagpur",
    distance: "2.1 km",
    rating: 4.4,
    reviews: 156,
    price: "₹600-900/hr",
    image: "/placeholder.svg?height=200&width=300&text=Green+Field+Sports",
    amenities: ["Parking", "Security", "Equipment Rental"],
    availability: "Busy",
    phone: "+91 98765 43212",
    coordinates: { lat: 21.1358, lng: 79.1082 },
  },
  {
    id: 4,
    name: "Victory Ground",
    address: "Sitabuldi, Nagpur",
    distance: "3.5 km",
    rating: 4.2,
    reviews: 203,
    price: "₹500-800/hr",
    image: "/placeholder.svg?height=200&width=300&text=Victory+Ground",
    amenities: ["Parking", "Floodlights", "Spectator Seating"],
    availability: "Available",
    phone: "+91 98765 43213",
    coordinates: { lat: 21.1258, lng: 79.0782 },
  },
  {
    id: 5,
    name: "Champions Turf",
    address: "Ramdaspeth, Nagpur",
    distance: "4.2 km",
    rating: 4.7,
    reviews: 94,
    price: "₹900-1300/hr",
    image: "/placeholder.svg?height=200&width=300&text=Champions+Turf",
    amenities: ["Premium Facilities", "VIP Lounge", "Professional Coaching"],
    availability: "Available",
    phone: "+91 98765 43214",
    coordinates: { lat: 21.1158, lng: 79.0682 },
  },
]

const filters = [
  { id: "price", name: "Price Range", options: ["Under ₹500", "₹500-800", "₹800-1200", "Above ₹1200"] },
  { id: "rating", name: "Rating", options: ["4.5+ Stars", "4.0+ Stars", "3.5+ Stars", "All Ratings"] },
  { id: "distance", name: "Distance", options: ["Under 1km", "1-3km", "3-5km", "5km+"] },
  { id: "amenities", name: "Amenities", options: ["Parking", "WiFi", "Security", "Floodlights", "Cafeteria"] },
]

export default function LocationSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [sortBy, setSortBy] = useState("distance")
  const { toast } = useToast()

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  const handleFilterChange = (filterId: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || []
      const isSelected = currentFilters.includes(option)

      return {
        ...prev,
        [filterId]: isSelected ? currentFilters.filter((item) => item !== option) : [...currentFilters, option],
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({})
  }

  const handleGetDirections = (turf: (typeof nearbyTurfs)[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${turf.coordinates.lat},${turf.coordinates.lng}`
    window.open(url, "_blank")
  }

  const handleBookNow = (turfId: number) => {
    window.location.href = `/booking?turf=${turfId}`
  }

  const filteredTurfs = nearbyTurfs.filter((turf) => {
    // Search query filter
    if (
      searchQuery &&
      !turf.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !turf.address.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply other filters here based on selectedFilters
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Find Nearby Turfs</h1>
          <p className="text-base sm:text-xl text-gray-600">Discover and book the best turfs near your location</p>
        </div>

        {/* Search and Controls */}
        <div className="space-y-4 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by turf name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 pr-4 py-3 text-sm sm:text-base"
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 cursor-pointer text-sm"
              size="sm"
            >
              Search
            </Button>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 gap-3">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      toast({
                        title: "Location updated!",
                        description: "Showing turfs near your current location.",
                      })
                    })
                  }
                }}
                variant="outline"
                size="sm"
                className="cursor-pointer bg-transparent text-xs sm:text-sm"
              >
                <Navigation className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Use Current Location</span>
                <span className="sm:hidden">Location</span>
              </Button>

              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-green-600 text-white" : "text-gray-600"
                  }`}
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === "map" ? "bg-green-600 text-white" : "text-gray-600"
                  }`}
                >
                  <Map className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm cursor-pointer"
              >
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="availability">Sort by Availability</option>
              </select>

              <Button variant="outline" size="sm" className="cursor-pointer bg-transparent text-xs sm:text-sm">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm cursor-pointer"
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">{filter.name}</h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters[filter.id]?.includes(option) || false}
                            onChange={() => handleFilterChange(filter.id, option)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-xs sm:text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === "list" ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {filteredTurfs.length} turfs found near you
                  </h2>
                </div>

                <div className="space-y-4">
                  {filteredTurfs.map((turf) => (
                    <Card key={turf.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-48 h-32 sm:h-36 rounded-lg overflow-hidden bg-gray-200">
                            <img
                              src={turf.image || "/placeholder.svg"}
                              alt={turf.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{turf.name}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{turf.address}</span>
                                  <span>•</span>
                                  <span className="text-green-600 font-medium">{turf.distance}</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{turf.rating}</span>
                                    <span className="text-gray-500">({turf.reviews} reviews)</span>
                                  </div>
                                  <Badge
                                    className={
                                      turf.availability === "Available"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-orange-100 text-orange-800"
                                    }
                                  >
                                    {turf.availability}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right mt-2 sm:mt-0">
                                <div className="text-lg sm:text-xl font-bold text-gray-900">{turf.price}</div>
                                <div className="text-xs sm:text-sm text-gray-500">per hour</div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {turf.amenities.map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                              <Button
                                onClick={() => handleBookNow(turf.id)}
                                className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer text-sm"
                              >
                                <Calendar className="h-4 w-4 mr-2" />
                                Book Now
                              </Button>
                              <Button
                                onClick={() => handleGetDirections(turf)}
                                variant="outline"
                                className="flex-1 cursor-pointer bg-transparent text-sm"
                              >
                                <Navigation className="h-4 w-4 mr-2" />
                                Directions
                              </Button>
                              <Button variant="outline" size="sm" className="cursor-pointer bg-transparent text-sm">
                                <Phone className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Call</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive map view coming soon!</p>
                      <p className="text-sm text-gray-500 mt-2">Switch to list view to see all available turfs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
