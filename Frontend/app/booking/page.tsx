"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Clock, Users, CreditCard, CheckCircle, CalendarIcon, MapPin } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// Static data to prevent re-renders
const timeSlots = [
  { time: "6:00 AM", price: 800, available: true, type: "off-peak" },
  { time: "7:00 AM", price: 800, available: true, type: "off-peak" },
  { time: "8:00 AM", price: 800, available: false, type: "off-peak" },
  { time: "9:00 AM", price: 800, available: true, type: "off-peak" },
  { time: "10:00 AM", price: 800, available: true, type: "off-peak" },
  { time: "11:00 AM", price: 800, available: true, type: "off-peak" },
  { time: "12:00 PM", price: 800, available: false, type: "off-peak" },
  { time: "1:00 PM", price: 800, available: true, type: "off-peak" },
  { time: "2:00 PM", price: 800, available: true, type: "off-peak" },
  { time: "3:00 PM", price: 800, available: true, type: "off-peak" },
  { time: "4:00 PM", price: 800, available: true, type: "off-peak" },
  { time: "5:00 PM", price: 800, available: true, type: "off-peak" },
  { time: "6:00 PM", price: 1200, available: true, type: "peak" },
  { time: "7:00 PM", price: 1200, available: false, type: "peak" },
  { time: "8:00 PM", price: 1200, available: true, type: "peak" },
  { time: "9:00 PM", price: 1200, available: true, type: "peak" },
  { time: "10:00 PM", price: 1200, available: true, type: "peak" },
]

// Memoized time slot component
const TimeSlot = memo(
  ({
    slot,
    isSelected,
    onSelect,
  }: {
    slot: (typeof timeSlots)[0]
    isSelected: boolean
    onSelect: (time: string) => void
  }) => (
    <button
      onClick={() => slot.available && onSelect(slot.time)}
      disabled={!slot.available}
      className={`p-3 rounded-lg border text-center transition-all ${isSelected
        ? "border-green-500 bg-green-50 text-green-700"
        : slot.available
          ? slot.type === "peak"
            ? "border-orange-200 hover:border-orange-300 bg-orange-50 hover:bg-orange-100"
            : "border-gray-200 hover:border-green-300 hover:bg-green-50"
          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      aria-pressed={isSelected}
      aria-disabled={!slot.available}
    >
      <div className="font-semibold">{slot.time}</div>
      <div className="text-sm">₹{slot.price}</div>
      {slot.type === "peak" && (
        <Badge variant="secondary" className="text-xs mt-1">
          Peak
        </Badge>
      )}
      {!slot.available && <div className="text-xs text-red-500 mt-1">Booked</div>}
    </button>
  ),
)

TimeSlot.displayName = "TimeSlot"

// Memoized duration button component
const DurationButton = memo(
  ({
    hours,
    isSelected,
    onSelect,
  }: {
    hours: number
    isSelected: boolean
    onSelect: (hours: number) => void
  }) => (
    <button
      onClick={() => onSelect(hours)}
      className={`px-4 py-2 rounded-lg border transition-all ${isSelected
        ? "border-green-500 bg-green-50 text-green-700"
        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
        }`}
      aria-pressed={isSelected}
    >
      {hours} Hour{hours > 1 ? "s" : ""}
    </button>
  ),
)

DurationButton.displayName = "DurationButton"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  // Initialize state from URL params if available
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const dateParam = searchParams.get("date")
    return dateParam ? new Date(dateParam) : new Date()
  })

  const [selectedSlot, setSelectedSlot] = useState<string | null>(() => {
    return searchParams.get("time") || null
  })

  const [duration, setDuration] = useState(() => {
    return Number.parseInt(searchParams.get("duration") || "1", 10)
  })

  // Memoized handlers
  const handleSelectSlot = useCallback((time: string) => {
    setSelectedSlot(time)
  }, [])

  const handleSelectDuration = useCallback((hours: number) => {
    setDuration(hours)
  }, [])

  const handleBooking = useCallback(() => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please select date and time",
        description: "Choose your preferred date and time slot to continue.",
        variant: "destructive",
      })
      return
    }

    const slot = timeSlots.find((s) => s.time === selectedSlot)
    const totalPrice = slot ? slot.price * duration : 0

    // Navigate to payment page
    router.push(
      `/payment?date=${selectedDate.toISOString()}&time=${selectedSlot}&duration=${duration}&price=${totalPrice}`,
    )
  }, [selectedDate, selectedSlot, duration, toast, router])

  // Memoized calculations
  const selectedSlotData = useMemo(() => timeSlots.find((s) => s.time === selectedSlot), [selectedSlot])

  const totalPrice = useMemo(
    () => (selectedSlotData ? selectedSlotData.price * duration : 0),
    [selectedSlotData, duration],
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Book Your Turf</h1>
          <p className="text-xl text-gray-600">Select your preferred date and time for the perfect game experience</p>
          {/* <a href="upi://pay?pa=8275435110@ybl&pn=AbdulRahim&am=19&cu=INR">Pay via UPI</a> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar & Time Selection */}
          <div className="lg:col-span-2 space-y-6">
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
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // midnight today

                    const minDate = new Date("1900-01-01");

                    const maxDate = new Date();
                    maxDate.setMonth(maxDate.getMonth() + 2); // 2 months ahead
                    maxDate.setHours(0, 0, 0, 0);

                    return date < today || date < minDate || date > maxDate;
                  }}
                  className="rounded-md border"
                  initialFocus
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Available Time Slots</span>
                </CardTitle>
                <div className="flex flex-wrap gap-2 sm:space-x-4 text-sm">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <TimeSlot
                      key={slot.time}
                      slot={slot}
                      isSelected={selectedSlot === slot.time}
                      onSelect={handleSelectSlot}
                    />
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
                  <div className="flex flex-wrap gap-2 sm:space-x-4">
                    {[1, 2, 3, 4].map((hours) => (
                      <DurationButton
                        key={hours}
                        hours={hours}
                        isSelected={duration === hours}
                        onSelect={handleSelectDuration}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Strike Zone</p>
                    <p className="text-sm text-gray-600">Sector 18, Noida</p>
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

            {/* Special Offers */}
            <Card>
              <CardHeader>
                <CardTitle>Special Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 text-sm">Group Discount</p>
                    <p className="text-green-700 text-xs">Book 5+ hours and get 1 hour free!</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800 text-sm">First Time Bonus</p>
                    <p className="text-blue-700 text-xs">Get 10% off on your first booking</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Now Button */}
            <Button
              onClick={handleBooking}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              disabled={!selectedDate || !selectedSlot}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Book Now - ₹{totalPrice}
            </Button>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Accepted Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-gray-50 rounded">UPI</div>
                  <div className="text-center p-2 bg-gray-50 rounded">Cards</div>
                  <div className="text-center p-2 bg-gray-50 rounded">Wallets</div>
                </div>
                <div className="mt-3 flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure payment with instant confirmation</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
