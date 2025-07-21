"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Play } from "lucide-react"

const instagramPosts = [
  {
    id: 1,
    type: "image",
    src: "/placeholder.svg?height=400&width=400&text=Striker+Zone+Evening+Lights",
    caption: "Sharpen your skills, master your moves, apply at the turf. 🏟️ Striker Zone - Ready to Play! ⚽",
    likes: 89,
    comments: 12,
    timestamp: "2 days ago",
    url: "https://www.instagram.com/p/DLIUcJKS99J/",
  },
  {
    id: 2,
    type: "video",
    src: "/placeholder.svg?height=400&width=400&text=Match+Highlights+Reel",
    caption: "Epic match moments at Striker Zone! 🔥 Book your slot now! ⚽",
    likes: 156,
    comments: 23,
    timestamp: "4 days ago",
    url: "https://www.instagram.com/reel/DLevY76SI6t/",
  },
  {
    id: 3,
    type: "image",
    src: "/placeholder.svg?height=400&width=400&text=Professional+Turf+Setup",
    caption: "Premium facilities for the ultimate football experience! 🏆",
    likes: 67,
    comments: 8,
    timestamp: "1 week ago",
    url: "https://www.instagram.com/p/DL-PAfQI040/",
  },
  {
    id: 4,
    type: "video",
    src: "/placeholder.svg?height=400&width=400&text=Skills+Training+Session",
    caption: "Training session vibes! 💪 Where champions are made! ⚽",
    likes: 134,
    comments: 19,
    timestamp: "1 week ago",
    url: "https://www.instagram.com/reel/DLus2L5y0P9/",
  },
]

export function InstagramFeed() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 rounded-full text-sm font-medium mb-4">
            📸 Follow Our Journey
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Latest from Instagram</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated with the latest action, events, and moments from Striker Zone. Follow us for daily updates!
          </p>

          {/* Instagram Profile Link */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900">@strikers.zone_</h3>
              <p className="text-gray-600">1.2K followers • Nagpur</p>
            </div>
            <a
              href="https://www.instagram.com/strikers.zone_/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all cursor-pointer"
            >
              Follow
            </a>
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {instagramPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.src || "/placeholder.svg"}
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Video Play Button */}
                {post.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Instagram Link */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-2 cursor-pointer">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
              </div>

              <CardContent className="p-4">
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{post.caption}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 cursor-pointer ${
                        likedPosts.includes(post.id) ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                      <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{post.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Don't Miss Any Action!</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow us on Instagram for daily updates, match highlights, player stories, and exclusive
              behind-the-scenes content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/strikers.zone_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all cursor-pointer"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow @strikers.zone_
              </a>
              <Button variant="outline" className="px-8 py-3 rounded-xl border-2 bg-transparent cursor-pointer">
                Share with Friends
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
