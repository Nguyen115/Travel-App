'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import InfoPageTemplate from '@/components/InfoPageTemplate';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <InfoPageTemplate title={t.terms_service} lastUpdated="March 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using this website and services, you accept and agree to be bound by the terms, provision, and conditions of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>

      <h2>2. Use License</h2>
      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on Voyager's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul>
        <li>Modify or copy the materials</li>
        <li>Use the materials for any commercial purpose or for any public display</li>
        <li>Attempt to decompile or reverse engineer any software contained on the website</li>
        <li>Remove any copyright or other proprietary notations from the materials</li>
        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        <li>Use automated tools or scripts to access or download content</li>
      </ul>

      <h2>3. Disclaimer</h2>
      <p>
        The materials on Voyager's website are provided on an 'as is' basis. Voyager makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2>4. Limitations</h2>
      <p>
        In no event shall Voyager or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Voyager's website, even if Voyager or an authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>

      <h2>5. Accuracy of Materials</h2>
      <p>
        The materials appearing on Voyager's website could include technical, typographical, or photographic errors. Voyager does not warrant that any of the materials on its website are accurate, complete, or current. Voyager may make changes to the materials contained on its website at any time without notice.
      </p>

      <h2>6. Links</h2>
      <p>
        Voyager has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Voyager of the site. Use of any such linked website is at the user's own risk.
      </p>

      <h2>7. Modifications</h2>
      <p>
        Voyager may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Voyager is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>

      <h2>9. User Accounts</h2>
      <p>
        If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us of any unauthorized use of your account.
      </p>

      <h2>10. Contact Information</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@voyager.com">legal@voyager.com</a> or visit our <a href="/contact">contact page</a>.
      </p>
    </InfoPageTemplate>
  );
}
