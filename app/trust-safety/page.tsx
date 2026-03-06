'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import InfoPageTemplate from '@/components/InfoPageTemplate';

export default function TrustSafetyPage() {
  const { t } = useLanguage();

  return (
    <InfoPageTemplate title={t.trust_safety}>
      <h2>Our Commitment to Trust</h2>
      <p>
        At Voyager, trust is the foundation of everything we do. We've built comprehensive safety features to ensure every traveler feels confident exploring new destinations and booking experiences with our vetted partners.
      </p>

      <h2>Verified Partnerships</h2>
      <p>
        Every business partner on Voyager undergoes thorough verification:
      </p>
      <ul>
        <li><strong>Business Verification:</strong> We confirm legal status and business credentials</li>
        <li><strong>Safety Inspections:</strong> Partners must comply with local safety regulations</li>
        <li><strong>Identity Confirmation:</strong> Key contacts are verified through multi-factor authentication</li>
        <li><strong>Background Checks:</strong> We conduct screening for all customer-facing staff</li>
      </ul>

      <h2>Review System</h2>
      <p>
        Our review system is designed to be transparent and trustworthy:
      </p>
      <ul>
        <li><strong>Verified Reviewers:</strong> Only travelers who booked through Voyager can leave reviews</li>
        <li><strong>Anti-Fraud Detection:</strong> We use advanced algorithms to detect and remove fake reviews</li>
        <li><strong>Response System:</strong> Businesses can respond to reviews and address concerns</li>
        <li><strong>Moderation:</strong> Our team reviews all submissions to maintain standards</li>
      </ul>

      <h2>Payment Security</h2>
      <p>
        Your payment information is protected with industry-leading security:
      </p>
      <ul>
        <li><strong>PCI Compliance:</strong> We comply with Payment Card Industry Data Security Standards</li>
        <li><strong>Encrypted Transactions:</strong> All payments use SSL encryption</li>
        <li><strong>Secure Processing:</strong> We never store full credit card information</li>
        <li><strong>Fraud Protection:</strong> Advanced monitoring detects and prevents fraudulent activity</li>
      </ul>

      <h2>Data Protection</h2>
      <p>
        We take data privacy seriously and implement comprehensive protection measures:
      </p>
      <ul>
        <li><strong>Encryption:</strong> Your data is encrypted both in transit and at rest</li>
        <li><strong>Access Controls:</strong> Only authorized personnel can access user information</li>
        <li><strong>Regular Audits:</strong> We conduct security audits and penetration testing</li>
        <li><strong>Compliance:</strong> We comply with international data protection regulations</li>
      </ul>

      <h2>Reporting Concerns</h2>
      <p>
        We take all safety concerns seriously. If you encounter any issues:
      </p>
      <ul>
        <li>Report suspicious activity through your account dashboard</li>
        <li>Contact our Safety Team at <a href="mailto:safety@voyager.com">safety@voyager.com</a></li>
        <li>All reports are investigated thoroughly and confidentially</li>
        <li>We provide resources and support to affected users</li>
      </ul>

      <h2>Our Promise</h2>
      <p>
        We're committed to maintaining the highest standards of trust and safety. If you ever have concerns about a partner or experience, please don't hesitate to reach out. Your safety and satisfaction are our top priorities.
      </p>

      <h2>Get Help</h2>
      <p>
        For trust and safety concerns, visit our <a href="/contact">contact page</a> or email us at <a href="mailto:safety@voyager.com">safety@voyager.com</a>.
      </p>
    </InfoPageTemplate>
  );
}
