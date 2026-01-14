import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our website
          and services.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-600">
            We may collect personal information such as your name, email
            address, phone number, and any other details you provide while
            using our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600">
            We use your information to provide and improve our services,
            communicate with you, and ensure the security of our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Data Protection
          </h2>
          <p className="text-gray-600">
            We take appropriate security measures to protect your personal
            data from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Third-Party Services
          </h2>
          <p className="text-gray-600">
            We may use third-party services to support our platform. These
            services have their own privacy policies, and we are not
            responsible for their practices.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Changes to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us through our support channels.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
