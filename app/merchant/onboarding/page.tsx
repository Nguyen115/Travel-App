'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, CircleCheck as CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toastManager } from '@/services/toastManager';

type Step = 1 | 2 | 3 | 4;

export default function MerchantOnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    businessName: '',
    taxCode: '',
    phone: '',
    files: [] as File[],
  });
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.businessName.trim()) {
      toastManager.error('Please enter your business name');
      return;
    }
    if (step === 2 && !formData.taxCode.trim()) {
      toastManager.error('Please enter your tax code');
      return;
    }
    if (step === 3 && !formData.phone.trim()) {
      toastManager.error('Please enter your phone number');
      return;
    }
    if (step === 4 && formData.files.length === 0) {
      toastManager.error('Please upload at least one document');
      return;
    }

    if (step < 4) {
      setStep((step + 1) as Step);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toastManager.success('Merchant account created successfully!');
      router.push('/merchant/dashboard');
    } catch (error) {
      toastManager.error('Failed to create merchant account');
    } finally {
      setUploading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Business Name', title: 'What\'s your business name?' },
    { number: 2, label: 'Tax Code', title: 'Enter your tax identification code' },
    { number: 3, label: 'Contact', title: 'Provide your phone number' },
    { number: 4, label: 'Documents', title: 'Upload your business license' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>

          <div className="mb-12">
            <h1 className="font-serif text-4xl text-foreground mb-4">Partner with Us</h1>
            <p className="text-muted-foreground text-lg">Complete your merchant profile to get started</p>
          </div>

          <div className="mb-8 flex gap-2">
            {steps.map((s) => (
              <div key={s.number} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{s.label}</div>
                </div>
                {s.number < 4 && (
                  <div
                    className={`w-1 h-1 rounded-full ${
                      step > s.number ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="rounded-2xl p-10 border-0 shadow-lg">
            <div className="min-h-96">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-foreground mb-2">Business Name</h2>
                    <p className="text-muted-foreground">What is your business called?</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl text-base"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-foreground mb-2">Tax Code</h2>
                    <p className="text-muted-foreground">Your business tax identification number</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxCode">Tax Code</Label>
                    <Input
                      id="taxCode"
                      name="taxCode"
                      placeholder="e.g., 0123456789"
                      value={formData.taxCode}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl text-base"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-foreground mb-2">Contact Phone</h2>
                    <p className="text-muted-foreground">We'll use this to reach you</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+84 ..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl text-base"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-foreground mb-2">Business License</h2>
                    <p className="text-muted-foreground">Upload proof of business registration</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block">
                      <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                        <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground">Drag files here</div>
                        <div className="text-sm text-muted-foreground">or click to browse</div>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {formData.files.length > 0 && (
                      <div className="space-y-2">
                        {formData.files.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm text-foreground truncate">{file.name}</span>
                            <button
                              onClick={() => handleRemoveFile(idx)}
                              className="text-destructive hover:text-destructive/80 text-xs font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setStep((Math.max(step - 1, 1) as Step))}
                disabled={step === 1}
                className="rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={uploading}
                className="flex-1 rounded-xl h-12"
              >
                {uploading ? 'Processing...' : step === 4 ? 'Complete Setup' : 'Next'}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
