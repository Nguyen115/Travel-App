'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoPageTemplate from '@/components/InfoPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Your message has been sent. We\'ll get back to you soon!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InfoPageTemplate title={t.contact}>
      <div className="my-12 p-8 bg-slate-50 rounded-lg border border-slate-200">
        <h2 className="font-serif text-2xl text-foreground mb-6">Send us a Message</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              disabled={isSubmitting}
              className="mt-2 bg-white"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              disabled={isSubmitting}
              className="mt-2 bg-white"
            />
          </div>

          <div>
            <Label htmlFor="subject" className="text-foreground font-medium">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What is this about?"
              disabled={isSubmitting}
              className="mt-2 bg-white"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your inquiry..."
              disabled={isSubmitting}
              className="mt-2 bg-white min-h-48"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C17C5B] hover:bg-[#B56D4A] text-white font-medium py-2"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>

      <h2>Contact Information</h2>
      <p>
        We're here to help! Reach out to us using any of the following methods:
      </p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:hello@voyager.com">hello@voyager.com</a></li>
        <li><strong>Support:</strong> <a href="mailto:support@voyager.com">support@voyager.com</a></li>
        <li><strong>Safety & Trust:</strong> <a href="mailto:safety@voyager.com">safety@voyager.com</a></li>
        <li><strong>Partnerships:</strong> <a href="mailto:partners@voyager.com">partners@voyager.com</a></li>
      </ul>

      <h2>Response Time</h2>
      <p>
        We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please clearly mark your subject as "URGENT" and we'll prioritize your message.
      </p>

      <h2>Frequently Asked Questions</h2>
      <p>
        Before reaching out, check if your question is answered on our main website. Most common questions about bookings, account management, and trip planning are addressed in our help center.
      </p>
    </InfoPageTemplate>
  );
}
