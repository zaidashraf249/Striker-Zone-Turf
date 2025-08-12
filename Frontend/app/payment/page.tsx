"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Smartphone,
  Lock,
  ArrowLeft,
  Clock,
  MapPin,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import axios from "axios"

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Pay using UPI",
    popular: true,
    processingTime: "Instant",
  },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()

  // Mock booking data - in real app, this would come from booking context
  // Extract values from URL
  const bookingDetails = {
    turf: "Striker Zone Main",
    date: searchParams.get("date") || "",
    price: Number(searchParams.get("price") || 0),
    additional: Number(searchParams.get("additional") || 0),
    name: searchParams.get("name") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "",
  }

  const formatDate = (dateStr: string) => {
    const [day, month, yearAndTime] = dateStr.split("-")
    const [year, time, meridian] = yearAndTime.split(/[\s:]+/) // year, hour, minute, AM/PM
    let hour = parseInt(time)
    const minute = dateStr.match(/:(\d+)/)?.[1] || "00"
    const ampm = dateStr.includes("PM") ? "PM" : "AM"

    if (ampm === "PM" && hour < 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0

    return `${month}-${day}-${year} ${hour.toString().padStart(2, "0")}:${minute}`
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    window.location.href = "upi://pay?pa=8275435110@ybl&pn=AbdulRahim&am=19&cu=INR"

    const sendBooking = async () => {
      try {
        const payload = {
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          date: formatDate(bookingDetails.date),
          amountPaid: bookingDetails.price + bookingDetails.additional,
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/`, payload)

        console.log("✅ Booking successful", res.data)
      } catch (error) {
        console.error("❌ Error sending booking", error)
      }
    }

    sendBooking()



    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Check your email for details.",
      })
      // Redirect to success page
      window.location.href = "/booking-success"
    }, 20000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="mr-4 cursor-pointer" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Booking
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
            <p className="text-gray-600">Complete your booking with secure payment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${selectedMethod === method.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="flex items-start space-x-3">
                        <method.icon className="h-6 w-6 text-gray-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold">{method.name}</p>
                            {method.popular && <Badge className="bg-orange-100 text-orange-800 text-xs">Popular</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                          <p className="text-xs text-green-600 mt-1">⚡ {method.processingTime}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Support */}
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Need help with payment?</p>
                <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
            
            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-600 space-y-2">
                <p>• Free cancellation up to 2 day before booking</p>
                <p>• 50% refund for cancellations 4 hours before</p>
                <p>• No refund for cancellations within 2 hours</p>
                <p>• Weather-related cancellations: Full refund</p>
              </CardContent>
            </Card>

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
                    <p className="font-semibold">{bookingDetails.turf}</p>
                    <p className="text-sm text-gray-600">Nagpur, Maharashtra</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">{bookingDetails.date}</p>
                    <p className="text-sm text-gray-600">{bookingDetails.time}</p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Base Price ({bookingDetails.duration})</span>
                    <span>₹{bookingDetails.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{bookingDetails.additional}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Amount</span>
                    <span>₹{bookingDetails.price + bookingDetails.additional}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 text-base sm:text-lg cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                  <span className="hidden sm:inline">Processing Payment...</span>
                  <span className="sm:hidden">Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Pay ₹{bookingDetails.total}</span>
                  <span className="sm:hidden">Pay Now</span>
                </>
              )}
            </Button>




          </div>
        </div>
      </div>
    </div>
  )
}
