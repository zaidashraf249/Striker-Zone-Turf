const PrivacyPolicy = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Title */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Privacy Policy
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium">
          Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>
      </header>

      {/* Content */}
      <div className="space-y-12 text-base md:text-lg leading-relaxed">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Information Collection
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Name, email, and phone number during booking.</li>
            <li>Payment details for transaction processing.</li>
            <li>Information submitted through contact forms.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To confirm and manage bookings.</li>
            <li>To send service updates or notifications.</li>
            <li>To respond to your queries or support requests.</li>
            <li>To improve our site and services.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Data Security
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use of encryption and secure protocols.</li>
            <li>Restricted access to sensitive data.</li>
            <li>Regular monitoring and system updates.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Cookies & Tracking
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Cookies to remember your preferences.</li>
            <li>Analytics to understand usage patterns.</li>
            <li>Personalization of content and ads.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Sharing Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Only shared with trusted partners for payments or analytics.</li>
            <li>No sale or unauthorized distribution of data.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Right to request data access or correction.</li>
            <li>Right to deletion of personal information.</li>
            <li>Right to withdraw consent at any time.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Policy Updates
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We may update this policy as needed.</li>
            <li>Updates will be published on this page.</li>
          </ul>
        </section>
      </div>

      {/* Footer Note */}
      <footer className="mt-16 border-t border-gray-700 pt-6 text-sm text-gray-700">
        Last updated on August 3, 2025.
      </footer>
    </section>
  );
};

export default PrivacyPolicy;
