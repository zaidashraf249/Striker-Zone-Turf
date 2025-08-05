"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  CreditCard,
  Shield,
  CheckCircle,
  Smartphone,
  Wallet,
  Building,
  Lock,
  ArrowLeft,
  Clock,
  MapPin,
} from "lucide-react"

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Pay using UPI ID or QR code",
    popular: true,
    processingTime: "Instant",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, RuPay accepted",
    popular: false,
    processingTime: "Instant",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: Building,
    description: "All major banks supported",
    popular: false,
    processingTime: "2-3 minutes",
  },
  {
    id: "wallet",
    name: "Digital Wallets",
    icon: Wallet,
    description: "Paytm, PhonePe, Google Pay",
    popular: true,
    processingTime: "Instant",
  },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("upi")
  const [paymentData, setPaymentData] = useState({
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    bankName: "",
    walletType: "paytm",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  // Mock booking data - in real app, this would come from booking context
  const bookingDetails = {
    turf: "Striker Zone Main",
    date: "January 25, 2024",
    time: "7:00 PM - 8:00 PM",
    duration: "1 hour",
    basePrice: 1200,
    taxes: 216,
    total: 1416,
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Check your email for details.",
      })
      // Redirect to success page
      window.location.href = "/booking-success"
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
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
            {/* Security Banner */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">256-bit SSL Encrypted</p>
                    <p className="text-sm text-green-700">Your payment information is completely secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                      className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedMethod === method.id
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

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedMethod === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                      <Input
                        type="text"
                        placeholder="yourname@upi"
                        value={paymentData.upiId}
                        onChange={(e) => handleInputChange("upiId", e.target.value)}
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Alternative:</strong> You can also scan the QR code that will appear after clicking "Pay
                        Now"
                      </p>
                    </div>
                  </div>
                )}

                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <Input
                          type="text"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <Input
                        type="text"
                        placeholder="Name as on card"
                        value={paymentData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === "netbanking" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                        value={paymentData.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedMethod === "wallet" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {["paytm", "phonepe", "googlepay"].map((wallet) => (
                          <button
                            key={wallet}
                            onClick={() => handleInputChange("walletType", wallet)}
                            className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                              paymentData.walletType === wallet
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <p className="font-medium capitalize">{wallet}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardContent className="p-4">
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>PCI Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Instant Refunds</span>
                  </div>
                </div>
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
                    <span>₹{bookingDetails.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{bookingDetails.taxes}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Amount</span>
                    <span>₹{bookingDetails.total}</span>
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

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-600 space-y-2">
                <p>• Free cancellation up to 4 hours before booking</p>
                <p>• 50% refund for cancellations 2-4 hours before</p>
                <p>• No refund for cancellations within 2 hours</p>
                <p>• Weather-related cancellations: Full refund</p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
