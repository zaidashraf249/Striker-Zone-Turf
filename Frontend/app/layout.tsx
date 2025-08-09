import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ToastProvider } from "@radix-ui/react-toast"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Striker Zone - Premium Turf Booking Platform",
  description:
    "Book premium turf facilities online with real-time availability, instant payments, and seamless experience. Best turf booking platform in Nagpur.",
  keywords: "turf booking, football turf, cricket turf, sports facility, online booking, Striker Zone, Nagpur",
  authors: [{ name: "Striker Zone" }],
  openGraph: {
    title: "Striker Zone - Premium Turf Booking Platform",
    description: "Book premium turf facilities online with real-time availability and instant payments in Nagpur.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Striker Zone - Premium Turf Booking Platform",
      },
    ],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#22c55e",
    generator: 'v0.dev'
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-t-green-600 border-gray-200 animate-spin"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* ... */}
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <main>{children}</main>
          </Suspense>
          <Footer />
          <Toaster /> {/* Render just the UI, not wrapped in ToastProvider */}
        </ToastProvider>
      </body>
    </html>
  );
}
