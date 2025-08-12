// You can put this page into your /pages/ (if using pages router) or /app/ (if using the App Router in Next.js)
export default function BookingSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
        {/* Glow backgrounds */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>

        {/* Tick icon using SVG */}
        <div className="flex justify-center mb-6">
          <span className="bg-emerald-100 p-4 rounded-full inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-emerald-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" className="text-emerald-200" fill="currentColor" />
              <path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3.5L16 9" />
            </svg>
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Thank you for booking with us. Your reservation has been successfully confirmed.<br/>
          We can’t wait to see you!
        </p>

        {/* Booking summary (replace static values as needed) */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left mb-6">
          <div className="flex items-center gap-3 mb-2">
            {/* Calendar SVG */}
            {/* <span className="w-5 h-5 text-emerald-500 inline-flex items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect width="18" height="14" x="3" y="5" rx="2" stroke="currentColor"/>
                <path stroke="currentColor" d="M16 3v4M8 3v4M3 9h18"/>
              </svg>
            </span>
            <span className="font-medium text-gray-700">Date:</span>
            <span className="text-gray-600">12 Aug 2025</span> */}
          </div>
          <div className="flex items-center gap-3">
            {/* Location/house SVG */}
            <span className="w-5 h-5 text-emerald-500 inline-flex items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path stroke="currentColor" d="M3 12l9-9 9 9M9 21V12H15V21"/>
              </svg>
            </span>
            <span className="font-medium text-gray-700">Location:</span>
            <span className="text-gray-600">Nagpur, India</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 transition text-white rounded-lg font-semibold shadow-md"
          >
            Go Home
          </a>
          {/* <a
            href="/my-bookings"
            className="px-6 py-3 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition rounded-lg font-semibold shadow-sm"
          >
            View Bookings
          </a> */}
        </div>
      </div>
    </section>
  );
}
