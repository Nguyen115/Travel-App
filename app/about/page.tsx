'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import InfoPageTemplate from '@/components/InfoPageTemplate';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <InfoPageTemplate title={t.about_us}>
      <p>
        Voyager is a premium travel discovery platform designed for travelers who seek meaningful, curated experiences. We believe that travel is more than just visiting places—it's about discovering hidden gems, connecting with local cultures, and creating memories that last a lifetime.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to empower travelers with intelligent tools and curated recommendations that help them explore the world with confidence and intention. We partner with vetted local experiences and premium establishments to bring you authentic, trustworthy travel options.
      </p>

      <h2>Why Voyager?</h2>
      <ul>
        <li><strong>Curated Experiences:</strong> Every place on Voyager is carefully selected by our team of travel experts.</li>
        <li><strong>AI-Powered Planning:</strong> Our advanced AI assistant helps you create personalized itineraries in seconds.</li>
        <li><strong>Trust & Transparency:</strong> Verified reviews, trust signals, and transparent vendor information.</li>
        <li><strong>Community-Driven:</strong> Connect with fellow travelers and share your journey with the world.</li>
        <li><strong>Premium Quality:</strong> We focus on quality over quantity, ensuring every recommendation meets our standards.</li>
      </ul>

      <h2>Our Story</h2>
      <p>
        Founded in 2024, Voyager emerged from a simple insight: travelers deserve better tools to explore the world. Our founding team spent years working in the travel and tech industries, seeing firsthand the gaps in existing solutions. We decided to build the platform we wished existed—one that combines artificial intelligence with human expertise to create unforgettable travel experiences.
      </p>

      <h2>Our Team</h2>
      <p>
        Our diverse team includes travel experts, software engineers, designers, and travel enthusiasts from around the world. We're passionate about making travel planning effortless and discoveries memorable. Every team member brings unique perspectives shaped by their own travel experiences and professional backgrounds.
      </p>

      <h2>Our Values</h2>
      <ul>
        <li><strong>Integrity:</strong> We're transparent in everything we do and hold ourselves to the highest standards.</li>
        <li><strong>Innovation:</strong> We continuously evolve our platform to serve travelers better.</li>
        <li><strong>Community:</strong> We believe in the power of shared experiences and community feedback.</li>
        <li><strong>Sustainability:</strong> We're committed to promoting responsible travel practices.</li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        Have questions about Voyager? Want to partner with us? We'd love to hear from you. Visit our <a href="/contact">contact page</a> to reach out to our team.
      </p>
    </InfoPageTemplate>
  );
}
