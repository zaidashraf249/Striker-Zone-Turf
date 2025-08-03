const TermsOfService = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 ">
      {/* Page Title */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Terms of Service
        </h1>
        <p className="text-lg md:text-xl text-gray-500">
          Please read these terms carefully before using our services.
        </p>
      </header>

      {/* Content */}
      <div className="space-y-12 text-base md:text-lg leading-relaxed">
        {/* Usage */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Usage</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the platform only for lawful and intended purposes.</li>
            <li>Do not engage in any form of abuse, harassment, or spamming.</li>
            <li>Any fraudulent or harmful activity will result in account termination.</li>
          </ul>
        </section>

        {/* Account Responsibility */}
        <section>
          <h2 className="text-2xl font-semibold  mb-3">2. Account Responsibility</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You are responsible for maintaining the confidentiality of your credentials.</li>
            <li>All actions performed under your account are your responsibility.</li>
            <li>Notify us immediately of any unauthorized account activity.</li>
          </ul>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-2xl font-semibold  mb-3">3. Changes to the Terms</h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li>We reserve the right to update these terms at any time.</li>
            <li>Changes will be reflected on this page with a revised date.</li>
            <li>Continued use of our services implies your acceptance of changes.</li>
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

export default TermsOfService;
