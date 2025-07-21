"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Clock, Users, CreditCard, CheckCircle, CalendarIcon, MapPin, Zap, Eye } from "lucide-react"

const timeSlots = [
  { time: "6:00 AM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "7:00 AM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "8:00 AM", price: 800, available: false, type: "off-peak", bookedBy: "Team Alpha" },
  { time: "9:00 AM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "10:00 AM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "11:00 AM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "12:00 PM", price: 800, available: false, type: "off-peak", bookedBy: "FC Warriors" },
  { time: "1:00 PM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "2:00 PM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "3:00 PM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "4:00 PM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "5:00 PM", price: 800, available: true, type: "off-peak", bookedBy: null },
  { time: "6:00 PM", price: 1200, available: true, type: "peak", bookedBy: null },
  { time: "7:00 PM", price: 1200, available: false, type: "peak", bookedBy: "Thunder FC" },
  { time: "8:00 PM", price: 1200, available: true, type: "peak", bookedBy: null },
  { time: "9:00 PM", price: 1200, available: true, type: "peak", bookedBy: null },
  { time: "10:00 PM", price: 1200, available: true, type: "peak", bookedBy: null },
]

export default function RealtimeBookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [duration, setDuration] = useState(1)
  const [liveViewers, setLiveViewers] = useState(23)
  const [recentBookings, setRecentBookings] = useState<string[]>([])
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) => Math.max(15, prev + Math.floor(Math.random() * 5) - 2))

      // Simulate recent bookings
      const bookingMessages = [
        "Rahul just booked 8:00 PM slot",
        "Team Phoenix reserved 6:00 PM",
        "Arjun booked tomorrow's 7:00 AM slot",
        "Corporate FC booked weekend slot",
      ]

      if (Math.random() > 0.7) {
        const newBooking = bookingMessages[Math.floor(Math.random() * bookingMessages.length)]
        setRecentBookings((prev) => [newBooking, ...prev.slice(0, 4)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please select date and time",
        description: "Choose your preferred date and time slot to continue.",
        variant: "destructive",
      })
      return
    }

    // Redirect to booking page with parameters
    window.location.href = `/booking?date=${selectedDate.toISOString()}&time=${selectedSlot}&duration=${duration}`
  }

  const selectedSlotData = timeSlots.find((s) => s.time === selectedSlot)
  const totalPrice = selectedSlotData ? selectedSlotData.price * duration : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Real-time Booking System
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Book Your Turf - Live Updates</h1>
          <p className="text-xl text-gray-600">Real-time availability with instant confirmations</p>
        </div>

        {/* Live Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <Eye className="h-4 w-4 text-green-600" />
                <span className="font-semibold">{liveViewers} people viewing</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-semibold text-green-600">12 slots available today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-semibold text-orange-600">5 bookings in last hour</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-8">
          {/* Main Booking Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Activity */}
            {recentBookings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentBookings.slice(0, 3).map((booking, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        🔥 {booking}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Select Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Available Time Slots</span>
                  <Badge variant="secondary" className="ml-auto">
                    Live Updates
                  </Badge>
                </CardTitle>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>Peak Hours</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedSlot(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        selectedSlot === slot.time
                          ? "border-green-500 bg-green-50 text-green-700"
                          : slot.available
                            ? slot.type === "peak"
                              ? "border-orange-200 hover:border-orange-300 bg-orange-50 hover:bg-orange-100"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <div className="font-semibold">{slot.time}</div>
                      <div className="text-sm">₹{slot.price}</div>
                      {slot.type === "peak" && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Peak
                        </Badge>
                      )}
                      {!slot.available && <div className="text-xs text-red-500 mt-1">Booked by {slot.bookedBy}</div>}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Duration Selection */}
            {selectedSlot && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Duration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4].map((hours) => (
                      <button
                        key={hours}
                        onClick={() => setDuration(hours)}
                        className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                          duration === hours
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                        }`}
                      >
                        {hours} Hour{hours > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Striker Zone</p>
                    <p className="text-sm text-gray-600">Nagpur, Maharashtra</p>
                  </div>
                </div>

                {selectedDate && (
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-sm text-gray-600">{selectedDate.toDateString()}</p>
                    </div>
                  </div>
                )}

                {selectedSlot && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-sm text-gray-600">
                        {selectedSlot} ({duration} hour{duration > 1 ? "s" : ""})
                      </p>
                    </div>
                  </div>
                )}

                {selectedSlot && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Base Price</span>
                      <span>₹{selectedSlotData?.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Duration</span>
                      <span>
                        {duration} hour{duration > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Book Now Button */}
            <Button
              onClick={handleBooking}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg cursor-pointer"
              disabled={!selectedDate || !selectedSlot}
            >
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Proceed to Payment - </span>₹{totalPrice}
            </Button>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free cancellation up to 4 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
