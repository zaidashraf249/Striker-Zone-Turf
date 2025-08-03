"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Share2,
  Heart,
  Eye,
} from "lucide-react";
import Link from "next/link";

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/images/turf.png",
    title: "Main Football Turf - Evening View",
    description:
      "Premium artificial grass with professional floodlighting for night games",
    category: "Football",
    likes: 89,
    views: 2400,
    instagramUrl: "https://www.instagram.com/p/DLIUcJKS99J/",
  },
  {
    id: 2,
    type: "video",
    src: "/images/turf.png",
    title: "Live Match Action",
    description: "Exciting moments from recent tournament at Striker Zone",
    category: "Videos",
    likes: 156,
    views: 4200,
    instagramUrl: "https://www.instagram.com/reel/DLevY76SI6t/",
  },
  {
    id: 3,
    type: "image",
    src: "/images/turf.png",
    title: "Professional LED Floodlights",
    description: "State-of-the-art lighting system for perfect visibility",
    category: "Lighting",
    likes: 67,
    views: 1800,
    instagramUrl: "https://www.instagram.com/p/DL-PAfQI040/",
  },
  {
    id: 4,
    type: "video",
    src: "/images/turf.png",
    title: "Skills Training Session",
    description: "Players honing their skills at our premium facility",
    category: "Videos",
    likes: 134,
    views: 3600,
    instagramUrl: "https://www.instagram.com/reel/DLus2L5y0P9/",
  },
  {
    id: 5,
    type: "image",
    src: "/images/turf.png",
    title: "Victory Celebration",
    description: "Teams celebrating their wins at Striker Zone",
    category: "Football",
    likes: 98,
    views: 2100,
  },
  {
    id: 6,
    type: "image",
    src: "/images/turf.png",
    title: "Premium Turf Maintenance",
    description: "Regular maintenance ensures perfect playing conditions",
    category: "Facilities",
    likes: 45,
    views: 1200,
  },
  {
    id: 7,
    type: "video",
    src: "/video/Zaid-body.mp4",
    title: "Complete Facility Tour",
    description: "Virtual walkthrough of all our premium amenities",
    category: "Videos",
    likes: 203,
    views: 5800,
  },
  {
    id: 8,
    type: "image",
    src: "/images/turf.png",
    title: "Premium Changing Facilities",
    description: "Clean, spacious changing rooms with modern amenities",
    category: "Facilities",
    likes: 34,
    views: 890,
  },
  {
    id: 9,
    type: "image",
    src: "/images/turf.png",
    title: "Comfortable Spectator Seating",
    description: "Covered seating area for supporters and families",
    category: "Facilities",
    likes: 56,
    views: 1400,
  },
  {
    id: 10,
    type: "video",
    src: "/images/turf.png",
    title: "Best Goals Compilation",
    description: "Amazing goals scored at Striker Zone",
    category: "Videos",
    likes: 187,
    views: 4900,
  },
  {
    id: 11,
    type: "image",
    src: "/images/turf.png",
    title: "Corporate Tournament",
    description: "Professional corporate events and tournaments",
    category: "Football",
    likes: 78,
    views: 1900,
  },
  {
    id: 12,
    type: "image",
    src: "/images/turf.png",
    title: "Youth Development Program",
    description: "Training the next generation of football stars",
    category: "Football",
    likes: 112,
    views: 2800,
  },
];

const categories = [
  "All",
  "Football",
  "Cricket",
  "Facilities",
  "Lighting",
  "Videos",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const handleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        (selectedImage - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            📸 Visual Experience
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our world-class facilities through high-quality photos and
            videos. See why Striker Zone is the preferred choice for serious
            players.
          </p>
        </div>

        {/* Instagram Integration */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Follow @strikers.zone_
                </h3>
                <p className="text-gray-600 text-sm">
                  See more photos and videos on Instagram
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/strikers.zone_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all cursor-pointer"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">60+</div>
            <div className="text-gray-600">Photos & Videos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">15+</div>
            <div className="text-gray-600">Instagram Reels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">25K+</div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">1.2K+</div>
            <div className="text-gray-600">Instagram Followers</div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                {/* Video Play Button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  {item.category}
                </Badge>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(item.id);
                    }}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      likedItems.includes(item.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  {item.instagramUrl && (
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between items-center text-white text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>
                          {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience It Yourself?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Pictures speak louder than words, but playing here speaks the
              loudest. Book your slot and experience our premium facilities
              firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" passHref legacyBehavior>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer">
                  Book Now
                </Button>
              </Link>
              <Link href="/booking" passHref legacyBehavior>
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-xl border-2 bg-transparent cursor-pointer"
                >
                  Schedule a Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image */}
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={filteredItems[selectedImage]?.src || "/placeholder.svg"}
                  alt={filteredItems[selectedImage]?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Info */}
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold mb-2">
                  {filteredItems[selectedImage]?.title}
                </h3>
                <p className="text-gray-300">
                  {filteredItems[selectedImage]?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
