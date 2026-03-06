'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import InfoPageTemplate from '@/components/InfoPageTemplate';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <InfoPageTemplate title={t.privacy_policy} lastUpdated="March 2026">
      <h2>1. Introduction</h2>
      <p>
        Voyager ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
      <ul>
        <li><strong>Personal Data:</strong> Name, email address, phone number, postal address, and payment information provided during registration.</li>
        <li><strong>Browsing Data:</strong> Information about your device, browser type, IP address, and pages visited.</li>
        <li><strong>Trip Data:</strong> Details about your travel preferences, destinations, dates, and itineraries.</li>
        <li><strong>Communication Data:</strong> Messages you send through our platform and customer support interactions.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and improve our services</li>
        <li>Create and manage your account</li>
        <li>Process transactions and send related information</li>
        <li>Send promotional communications (with your consent)</li>
        <li>Analyze usage patterns to improve user experience</li>
        <li>Comply with legal obligations</li>
        <li>Protect against fraud and ensure security</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>5. Third-Party Sharing</h2>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your information with:
      </p>
      <ul>
        <li>Service providers who assist us in operating our website and conducting our business</li>
        <li>Partners and vendors to fulfill your requests</li>
        <li>Law enforcement when required by law</li>
      </ul>

      <h2>6. Cookies and Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to enhance your experience, personalize content, and analyze traffic. You can control cookie settings through your browser preferences.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location, you may have the right to:
      </p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
        <li>Request data portability</li>
      </ul>

      <h2>8. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:privacy@voyager.com">privacy@voyager.com</a> or visit our <a href="/contact">contact page</a>.
      </p>
    </InfoPageTemplate>
  );
}
