"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Star, Search, Plus } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    bookingDate: "Jan 15, 2024",
    comment:
      "Excellent turf quality! The floodlights are perfect for evening games. Staff is very professional and the booking process was seamless. Highly recommend for serious players.",
    helpful: 12,
    notHelpful: 1,
    images: ["/placeholder.svg?height=100&width=100&text=Review+Photo+1"],
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 month ago",
    verified: true,
    bookingDate: "Dec 28, 2023",
    comment:
      "Amazing facilities and very well maintained. The changing rooms are clean and spacious. Great parking facility too. Will definitely book again!",
    helpful: 8,
    notHelpful: 0,
    images: [],
  },
  {
    id: 3,
    name: "Arjun Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "3 weeks ago",
    verified: true,
    bookingDate: "Jan 5, 2024",
    comment:
      "Great turf for football. Good changing rooms and parking. The surface is excellent for ball control. Only suggestion is to add more seating for spectators.",
    helpful: 15,
    notHelpful: 2,
    images: [
      "/placeholder.svg?height=100&width=100&text=Review+Photo+2",
      "/placeholder.svg?height=100&width=100&text=Review+Photo+3",
    ],
  },
  {
    id: 4,
    name: "Sneha Gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 week ago",
    verified: true,
    bookingDate: "Jan 20, 2024",
    comment:
      "Perfect for our corporate tournament. The management was very helpful in organizing everything. Great facilities and professional service.",
    helpful: 6,
    notHelpful: 0,
    images: [],
  },
  {
    id: 5,
    name: "Vikram Mehta",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2 months ago",
    verified: true,
    bookingDate: "Nov 15, 2023",
    comment:
      "Good turf with decent facilities. The artificial grass quality is good. Parking can get crowded during peak hours but overall a great experience.",
    helpful: 9,
    notHelpful: 1,
    images: [],
  },
]

const ratingStats = {
  average: 4.8,
  total: 127,
  breakdown: {
    5: 89,
    4: 28,
    3: 7,
    2: 2,
    1: 1,
  },
}

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    photos: [],
  })
  const { toast } = useToast()

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = selectedRating === 0 || review.rating === selectedRating
    const matchesSearch =
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRating && matchesSearch
  })

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Rating is required to submit your review.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review will be published after verification.",
    })

    setNewReview({ rating: 0, comment: "", photos: [] })
    setShowWriteReview(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Reviews & Ratings</h1>
          <p className="text-xl text-gray-600">See what our players say about Striker Zone</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar - Rating Overview */}
          <div className="space-y-6">
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{ratingStats.average}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(ratingStats.average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{ratingStats.total} reviews</p>
              </CardContent>
            </Card>

            {/* Rating Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg transition-colors cursor-pointer text-sm sm:text-base ${
                      selectedRating === rating ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${(ratingStats.breakdown[rating] / ratingStats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{ratingStats.breakdown[rating]}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Write Review Button */}
            <Button
              onClick={() => setShowWriteReview(true)}
              className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Write Review Form */}
            {showWriteReview && (
              <Card>
                <CardHeader>
                  <CardTitle>Write Your Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewReview((prev) => ({ ...prev, rating }))}
                          className={`px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer ${newReview.rating === rating ? "bg-green-50 border-green-500" : ""}`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your experience..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      onClick={handleSubmitReview}
                      className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                      Submit Review
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowWriteReview(false)}
                      className="flex-1 cursor-pointer bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4 sm:space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                        />
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</p>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full w-fit">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">Booked: {review.bookingDate}</div>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base mb-4">{review.comment}</p>

                    {review.images.length > 0 && (
                      <div className="flex space-x-2 mb-4">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Review photo ${index + 1}`}
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-xs sm:text-sm">
                        <button className="text-gray-600 hover:text-green-600 cursor-pointer">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="text-gray-600 hover:text-red-600 cursor-pointer">
                          👎 Not helpful ({review.notHelpful})
                        </button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm cursor-pointer">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-600 mb-6">
                    {selectedRating > 0
                      ? `No reviews with ${selectedRating} star${selectedRating > 1 ? "s" : ""} found.`
                      : searchTerm
                        ? `No reviews matching "${searchTerm}" found.`
                        : "Be the first to write a review!"}
                  </p>
                  <Button
                    onClick={() => setShowWriteReview(true)}
                    className="bg-green-600 hover:bg-green-700 cursor-pointer"
                  >
                    Write First Review
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
