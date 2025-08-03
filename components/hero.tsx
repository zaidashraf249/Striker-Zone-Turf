"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Memoized stat component to prevent re-renders
const StatItem = memo(({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-xs sm:text-sm text-gray-600">{label}</div>
  </div>
))

StatItem.displayName = "StatItem"

// Memoized info item component
const InfoItem = memo(({ icon: Icon, text, color }: { icon: any; text: string; color: string }) => (
  <div className="flex items-center space-x-2">
    <Icon className={`h-4 w-4 ${color}`} />
    <span>{text}</span>
  </div>
))

InfoItem.displayName = "InfoItem"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium">
                🏟️ Premium Sports Facility in Nagpur
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Play at
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 block">
                  Striker Zone
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Book your favorite sports instantly. Premium turf with floodlights, modern amenities, and seamless
                booking experience in Nagpur.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <StatItem value="500+" label="Games Played" />
              <StatItem value="4.9★" label="User Rating" />
              <StatItem value="24/7" label="Support" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/booking" passHref legacyBehavior>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl shadow-lg"
                  asChild
                >
                  <a>Book Now</a>
                </Button>
              </Link>
              <Link href="/gallery" passHref legacyBehavior>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-xl border-2 bg-transparent"
                  asChild
                >
                  <a>Virtual Tour</a>
                </Button>
              </Link>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
              <InfoItem icon={Clock} text="Open 6 AM - 11 PM" color="text-green-600" />
              <InfoItem icon={MapPin} text="Nagpur, Maharashtra" color="text-blue-600" />
              <InfoItem icon={Star} text="4.8 (127 reviews)" color="text-yellow-500 fill-current" />
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 shadow-2xl">
              {/* Use next/image for optimized image loading */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/turf.png"
                  alt="Striker Zone Turf"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Available Now</p>
                  <p className="text-xs sm:text-sm text-gray-600">Book instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




// "use client"

// import { Button } from "@/components/ui/button"
// import { Calendar, Star, MapPin, Clock } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// // Clean stat component
// const StatItem = ({ value, label }: { value: string; label: string }) => (
//   <div className="text-center">
//     <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
//     <div className="text-xs sm:text-sm text-gray-600">{label}</div>
//   </div>
// )

// // Clean info item
// const InfoItem = ({
//   icon: Icon,
//   text,
//   color,
// }: {
//   icon: any
//   text: string
//   color: string
// }) => (
//   <div className="flex items-center space-x-2">
//     <Icon className={`h-4 w-4 ${color}`} />
//     <span>{text}</span>
//   </div>
// )

// export function Hero() {
//   return (
//     <section className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 sm:py-20 lg:py-28">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="grid lg:grid-cols-2 gap-10 items-center">
//           {/* LEFT SIDE */}
//           <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
//             <div className="space-y-4">
//               <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
//                 🏟️ Premium Sports Facility in Nagpur
//               </span>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                 Play at
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
//                   Striker Zone
//                 </span>
//               </h1>

//               <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
//                 Book your favorite sports instantly. Premium turf with floodlights,
//                 modern amenities, and seamless booking experience in Nagpur.
//               </p>
//             </div>

//             {/* STATS */}
//             <div className="grid grid-cols-3 gap-6">
//               <StatItem value="500+" label="Games Played" />
//               <StatItem value="4.9★" label="User Rating" />
//               <StatItem value="24/7" label="Support" />
//             </div>

//             {/* CTA BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Link href="/booking" passHref>
//                 <Button
//                   size="lg"
//                   className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 text-lg rounded-xl shadow-md"
//                 >
//                   Book Now
//                 </Button>
//               </Link>

//               <Link href="/gallery" passHref>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="px-6 py-4 text-lg rounded-xl border-2"
//                 >
//                   Virtual Tour
//                 </Button>
//               </Link>
//             </div>

//             {/* INFO TAGS */}
//             <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-600">
//               <InfoItem icon={Clock} text="Open 6 AM - 11 PM" color="text-green-600" />
//               <InfoItem icon={MapPin} text="Nagpur, Maharashtra" color="text-blue-600" />
//               <InfoItem icon={Star} text="4.8 (127 reviews)" color="text-yellow-500 fill-current" />
//             </div>
//           </div>

//           {/* RIGHT SIDE - IMAGE */}
//           <div className="relative max-w-md mx-auto">
//             <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 shadow-xl">
//               <Image
//                 src="/placeholder.svg?height=600&width=600&text=Striker+Zone+Turf"
//                 alt="Striker Zone Turf"
//                 width={600}
//                 height={600}
//                 priority
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             {/* FLOATING CARD */}
//             <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 sm:p-5 w-64 sm:w-72">
//               <div className="flex items-center space-x-3">
//                 <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
//                   <Calendar className="h-6 w-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm sm:text-base">Available Now</p>
//                   <p className="text-sm text-gray-600">Book instantly</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
