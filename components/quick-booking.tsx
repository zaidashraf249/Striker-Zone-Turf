"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Clock, MapPin, CreditCard, CheckCircle, ArrowRight, Zap } from "lucide-react"

const timeSlots = [
  { time: "6:00 AM", available: true, price: 800 },
  { time: "7:00 AM", available: true, price: 800 },
  { time: "8:00 AM", available: false, price: 800 },
  { time: "9:00 AM", available: true, price: 800 },
  { time: "10:00 AM", available: true, price: 800 },
  { time: "6:00 PM", available: true, price: 1200 },
  { time: "7:00 PM", available: false, price: 1200 },
  { time: "8:00 PM", available: true, price: 1200 },
  { time: "9:00 PM", available: true, price: 1200 },
  { time: "10:00 PM", available: true, price: 1200 },
]

export function QuickBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDuration, setSelectedDuration] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleQuickBook = () => {
    if (!selectedTime) {
      toast({
        title: "Please select a time slot",
        description: "Choose your preferred time to continue booking.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/booking"
    }, 1000)
  }

  const getNextAvailableSlots = () => {
    return timeSlots.filter((slot) => slot.available).slice(0, 6)
  }

  const calculateTotal = () => {
    const selectedSlot = timeSlots.find((slot) => slot.time === selectedTime)
    return selectedSlot ? selectedSlot.price * selectedDuration : 0
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="bg-green-100 text-green-800 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium mb-4">
            ⚡ Quick Booking
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Book in 30 Seconds</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Skip the hassle. Select your preferred time slot and book instantly with our lightning-fast booking system.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Quick Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    <span>Quick Book Now</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[0, 1, 2].map((dayOffset) => {
                        const date = new Date()
                        date.setDate(date.getDate() + dayOffset)
                        const dateStr = date.toISOString().split("T")[0]
                        const isToday = dayOffset === 0
                        const isTomorrow = dayOffset === 1

                        return (
                          <button
                            key={dayOffset}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center ${
                              selectedDate === dateStr
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-gray-200 hover:border-green-300 text-gray-700"
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-medium">
                              {isToday
                                ? "Today"
                                : isTomorrow
                                  ? "Tomorrow"
                                  : date.toLocaleDateString("en", { weekday: "short" })}
                            </div>
                            <div className="text-lg sm:text-xl font-bold">{date.getDate()}</div>
                            <div className="text-xs text-gray-500">
                              {date.toLocaleDateString("en", { month: "short" })}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {getNextAvailableSlots().map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center ${
                            selectedTime === slot.time
                              ? "border-green-500 bg-green-50 text-green-700"
                              : slot.available
                                ? "border-gray-200 hover:border-green-300 text-gray-700"
                                : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <div className="text-sm sm:text-base font-semibold">{slot.time}</div>
                          <div className="text-xs text-gray-500">₹{slot.price}/hr</div>
                          {!slot.available && <div className="text-xs text-red-500 mt-1">Booked</div>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Duration (Hours)</label>
                    <div className="grid grid-cols-4 gap-2 sm:gap-3">
                      {[1, 2, 3, 4].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setSelectedDuration(duration)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            selectedDuration === duration
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-gray-200 hover:border-green-300 text-gray-700"
                          }`}
                        >
                          <div className="text-base sm:text-lg font-bold">{duration}</div>
                          <div className="text-xs text-gray-500">{duration === 1 ? "hour" : "hours"}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Book Button */}
                  <Button
                    onClick={handleQuickBook}
                    disabled={isLoading || !selectedTime}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Quick Book - ₹{calculateTotal()}</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary & Features */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Not selected"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime || "Not selected"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {selectedDuration} hour{selectedDuration > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between text-base font-semibold">
                        <span>Total:</span>
                        <span className="text-green-600">₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  {selectedTime && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Slot Available</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Why Quick Book?</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Zap, text: "Instant confirmation" },
                      { icon: CreditCard, text: "Secure payment" },
                      { icon: Clock, text: "Save time" },
                      { icon: CheckCircle, text: "Best price guarantee" },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-white rounded-full p-2">
                          <feature.icon className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Need Help?</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Nagpur, Maharashtra</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Open 6 AM - 11 PM</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full bg-transparent"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
