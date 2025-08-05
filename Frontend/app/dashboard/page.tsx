"use client"

import type React from "react"

import { useState, useCallback, memo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Settings, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Static data to prevent re-renders
const upcomingBookings = [
  {
    id: 1,
    date: "Today",
    time: "7:00 PM - 8:00 PM",
    turf: "Main Ground",
    status: "confirmed",
    price: "₹1,200",
  },
  {
    id: 2,
    date: "Tomorrow",
    time: "6:00 PM - 7:00 PM",
    turf: "Practice Area",
    status: "confirmed",
    price: "₹800",
  },
]

const recentBookings = [
  {
    id: 1,
    date: "Jan 20, 2024",
    time: "8:00 PM",
    turf: "Main Ground",
    status: "completed",
    price: "₹1,200",
  },
  {
    id: 2,
    date: "Jan 18, 2024",
    time: "7:00 PM",
    turf: "Practice Area",
    status: "completed",
    price: "₹800",
  },
]

// Memoized stat card component
const StatCard = memo(({ title, value, color }: { title: string; value: string; color: string }) => (
  <Card>
    <CardContent className="p-4 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </CardContent>
  </Card>
))

StatCard.displayName = "StatCard"

// Memoized booking card component
const BookingCard = memo(
  ({ booking, type }: { booking: (typeof upcomingBookings)[0]; type: "upcoming" | "recent" }) => (
    <div
      key={booking.id}
      className={`flex items-center justify-between p-3 ${type === "upcoming" ? "bg-gray-50" : "border"} rounded-lg`}
    >
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {booking.date} • {booking.time}
        </div>
        <div className="text-sm text-gray-600">{booking.turf}</div>
      </div>
      <div className="text-right">
        <div className="font-medium text-gray-900">{booking.price}</div>
        <Badge
          className={type === "upcoming" ? "bg-green-100 text-green-800 text-xs" : "bg-gray-100 text-gray-800 text-xs"}
        >
          {booking.status}
        </Badge>
      </div>
    </div>
  ),
)

BookingCard.displayName = "BookingCard"

// Memoized tab button component
const TabButton = memo(
  ({
    id,
    label,
    icon: Icon,
    activeTab,
    onClick,
  }: {
    id: string
    label: string
    icon: any
    activeTab: string
    onClick: (id: string) => void
  }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        activeTab === id ? "bg-green-600 text-white" : "text-gray-600 hover:text-gray-900"
      }`}
      aria-pressed={activeTab === id}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  ),
)

TabButton.displayName = "TabButton"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Memoized tab change handler
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
  }, [])

  // Handle booking cancellation
  const handleCancelBooking = useCallback(
    (bookingId: number) => {
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      })
    },
    [toast],
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and profile</p>
        </div>

        {/* Mobile Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 bg-white rounded-lg p-1 min-w-max">
            <TabButton id="overview" label="Overview" icon={User} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="bookings" label="Bookings" icon={Calendar} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="profile" label="Profile" icon={Settings} activeTab={activeTab} onClick={handleTabChange} />
          </div>
        </div>

        {/* Content - Only render active tab to improve performance */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Bookings" value="12" color="text-green-600" />
              <StatCard title="Upcoming" value="2" color="text-blue-600" />
              <StatCard title="Total Spent" value="₹15,600" color="text-orange-600" />
              <StatCard title="Your Rating" value="4.8★" color="text-purple-600" />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Link href="/booking" passHref legacyBehavior>
                    <Button className="bg-green-600 hover:bg-green-700 justify-start" asChild>
                      <a>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book New Slot
                      </a>
                    </Button>
                  </Link>
                  <Link href="/booking" passHref legacyBehavior>
                    <Button variant="outline" className="justify-start bg-transparent" asChild>
                      <a>
                        <Clock className="h-4 w-4 mr-2" />
                        View Schedule
                      </a>
                    </Button>
                  </Link>
                  <Link href="/reviews" passHref legacyBehavior>
                    <Button variant="outline" className="justify-start bg-transparent" asChild>
                      <a>
                        <Star className="h-4 w-4 mr-2" />
                        Rate Experience
                      </a>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} type="upcoming" />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/bookings" passHref legacyBehavior>
                    <Button variant="outline" size="sm" className="bg-transparent" asChild>
                      <a>View All Bookings</a>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Bookings</CardTitle>
                <Link href="/booking" passHref legacyBehavior>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                    <a>New Booking</a>
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {booking.date} • {booking.time}
                        </div>
                        <div className="text-sm text-gray-600">{booking.turf}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{booking.price}</div>
                        <Badge variant="secondary" className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {upcomingBookings.map((booking) => (
                    <div
                      key={`upcoming-${booking.id}`}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {booking.date} • {booking.time}
                        </div>
                        <div className="text-sm text-gray-600">{booking.turf}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{booking.price}</div>
                          <Badge className="bg-green-100 text-green-800 text-xs">{booking.status}</Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Rahul Sharma</h3>
                    <p className="text-gray-600">rahul.sharma@email.com</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="text-gray-900">+91 98765 43210</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="text-gray-900">Nagpur, Maharashtra</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <div className="text-gray-900">January 2024</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Button variant="outline" className="bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive booking confirmations and updates</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-gray-600">Get booking reminders via SMS</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-gray-600">Receive offers and promotions</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Import the Switch component
function Switch({ checked = false }: { checked?: boolean }) {
  return (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-green-600" : "bg-gray-200"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  )
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
