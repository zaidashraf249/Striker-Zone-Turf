const RefundPolicy = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Title */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Refund Policy
        </h1>
        <p className="text-2xl font-semibold mb-4 text-gray-500">
          Please read our refund policy carefully before making a booking or payment.
        </p>
      </header>

      {/* Content */}
      <div className="space-y-12 text-base md:text-lg leading-relaxed">
        {/* Eligibility for Refund */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            1. Eligibility for Refund
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds are only applicable for bookings canceled within the allowed cancellation window.</li>
            <li>No refunds will be processed after the booking date has passed.</li>
            <li>Refunds are not applicable for no-shows or partial usage of services.</li>
          </ul>
        </section>

        {/* Refund Process */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            2. Refund Process
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To initiate a refund, users must contact our support team with booking details.</li>
            <li>Approved refunds will be processed to the original payment method within 7–10 business days.</li>
            <li>Processing fees or transaction charges may be deducted from the refund amount.</li>
          </ul>
        </section>

        {/* Non-Refundable Situations */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            3. Non-Refundable Situations
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Services availed in full are not eligible for refunds.</li>
            <li>Bookings canceled after the refund window are non-refundable.</li>
            <li>Any abuse or violation of our terms disqualifies a user from claiming a refund.</li>
          </ul>
        </section>

        {/* Policy Updates */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            4. Policy Updates
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We reserve the right to update or change this refund policy at any time.</li>
            <li>Changes will be posted on this page with the updated date.</li>
            <li>We recommend reviewing the policy periodically.</li>
          </ul>
        </section>
      </div>

      {/* Footer Note */}
      <footer className="mt-16 border-t border-gray-700 pt-6 text-sm text-gray-500">
        Last updated on August 3, 2025.
      </footer>
    </section>
  );
};

export default RefundPolicy;
