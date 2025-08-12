"use client"

import { useState, useCallback, useMemo, memo, useEffect, useRef } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Clock, CreditCard, CheckCircle, CalendarIcon, MapPin, PersonStanding } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"

const TimeSlot = memo(
  ({
    slot,
    isSelected,
    onSelect,
  }: {
    slot: any
    isSelected: boolean
    onSelect: (time: string) => void
  }) => (
    <button
      onClick={() => slot.available && !slot.cannotBook && onSelect(slot.time)}
      disabled={!slot.available || slot.cannotBook}
      aria-disabled={!slot.available || slot.cannotBook}
      className={`p-3 rounded-lg border text-center transition-all ${isSelected
        ? "border-green-500 bg-green-50 text-green-700"
        : slot.cannotBook
          ? "border-gray-200 bg-gray-200 text-gray-500 cursor-not-allowed"
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
      {slot.cannotBook && (
        <div className="text-xs text-red-600 mt-1 font-semibold"></div>
      )}
      {!slot.available && !slot.cannotBook && (
        <div className="text-xs text-red-500 mt-1">Booked</div>
      )}
    </button>

  ),
)
TimeSlot.displayName = "TimeSlot"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const bookingSummaryRef = useRef<HTMLDivElement>(null)
  const personalDetailsRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const dateParam = searchParams.get("date")
    return dateParam ? new Date(dateParam) : new Date()
  })

  const [timeSlots, setTimeSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(() => {
    return searchParams.get("time") || null
  })

  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const formattedDate = selectedDate?.toLocaleDateString("en-CA")
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/avail-time-slots`, {
          params: { date: formattedDate },
        })
        setTimeSlots(res.data)
        console.log(res.data)
      } catch (error) {
        console.error("❌ Error fetching time slots", error)
      }
    }
    fetchTimeSlots()
  }, [selectedDate])

  const handleSelectSlot = useCallback((time: string) => {
    setSelectedSlot(time)
    if (bookingSummaryRef.current) {
      const elementPosition = bookingSummaryRef.current.getBoundingClientRect().top + window.pageYOffset
      const offset = 80 // adjust this to your header height in pixels

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
  }, [])

  const handleBooking = useCallback(() => {
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim()) {
      toast({
        title: "Missing Details",
        description: "Please fill in your name, phone number, and email.",
        variant: "destructive",
      })
      if (personalDetailsRef.current) {
        const elementPosition = personalDetailsRef.current.getBoundingClientRect().top + window.pageYOffset;
        const offset = 80; // adjust if you have sticky headers
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please select date and time",
        description: "Choose your preferred date and time slot to continue.",
        variant: "destructive",
      })
      return
    }

    const slot = timeSlots.find((s) => s.time === selectedSlot)
    const totalPrice = slot ? slot.price : 0

    // Format date & time: dd-mm-yyyy hh:mm
    const formattedDateTime = `${selectedDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-")} ${selectedSlot}`

    router.push(
      `/payment?date=${encodeURIComponent(formattedDateTime)}&price=${totalPrice}&name=${encodeURIComponent(
        fullName,
      )}&phone=${encodeURIComponent(phoneNumber)}&email=${encodeURIComponent(email)}`,
    )
  }, [fullName, phoneNumber, email, selectedDate, selectedSlot, toast, router, timeSlots])

  const selectedSlotData = useMemo(() => timeSlots.find((s) => s.time === selectedSlot), [selectedSlot, timeSlots])
  const totalPrice = useMemo(() => (selectedSlotData ? selectedSlotData.price : 0), [selectedSlotData])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Book Your Turf</h1>
          <p className="text-xl text-gray-600">Select your preferred date and time for the perfect game experience</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <Card ref={personalDetailsRef} className="bg-white rounded-xl shadow-md border border-gray-200">
              <CardHeader className="px-6 py-4 border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <PersonStanding className="h-5 w-5 text-gray-500" />
                  <span>Personal Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email (Required for notification)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date Picker */}
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
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const maxDate = new Date()
                    maxDate.setMonth(maxDate.getMonth() + 2)
                    maxDate.setHours(0, 0, 0, 0)
                    return date < today || date > maxDate
                  }}
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
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <TimeSlot key={slot.time} slot={slot} isSelected={selectedSlot === slot.time} onSelect={handleSelectSlot} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <Card ref={bookingSummaryRef}>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Strike Zone</p>
                    <p className="text-sm text-gray-600">Kamptee Road, Nagpur</p>
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
                      <p className="text-sm text-gray-600">{selectedSlot}</p>
                    </div>
                  </div>
                )}

                {selectedSlot && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Book Button */}
            <Button onClick={handleBooking} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Book Now - ₹{totalPrice}
            </Button>

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
