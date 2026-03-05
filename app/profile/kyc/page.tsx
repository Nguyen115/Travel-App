'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, CircleCheck as CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { toastManager } from '@/services/toastManager';

type VerificationStatus = 'not-started' | 'pending' | 'verified' | 'rejected';

interface UploadedFile {
  name: string;
  url: string;
}

export default function KYCVerificationPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<VerificationStatus>('not-started');
  const [frontFile, setFrontFile] = useState<UploadedFile | null>(null);
  const [backFile, setBackFile] = useState<UploadedFile | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (side === 'front') {
          setFrontFile({ name: file.name, url: reader.result as string });
        } else {
          setBackFile({ name: file.name, url: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!frontFile || !backFile) {
      toastManager.error('Please upload both front and back of your ID');
      return;
    }

    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('pending');
      toastManager.success('ID verification submitted! We\'ll review it within 24 hours.');
    } catch (error) {
      toastManager.error('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const getBenefits = () => {
    if (status === 'verified') {
      return [
        { icon: '✓', text: 'Trust Level 2 Badge on profile', active: true },
        { icon: '✓', text: 'Higher booking limits', active: true },
        { icon: '✓', text: 'Featured on community', active: true },
        { icon: '✓', text: 'Access to merchant tools', active: true },
      ];
    }
    return [
      { icon: '○', text: 'Trust Level 2 Badge on profile', active: false },
      { icon: '○', text: 'Higher booking limits', active: false },
      { icon: '○', text: 'Featured on community', active: false },
      { icon: '○', text: 'Access to merchant tools', active: false },
    ];
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/profile">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="font-serif text-4xl text-foreground mb-2">Identity Verification</h1>
            <p className="text-muted-foreground">Upgrade to Trust Level 2</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="rounded-2xl p-8 border-0 shadow-lg">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      status === 'verified'
                        ? 'bg-green-100 text-green-600'
                        : status === 'pending'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {status === 'verified' ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : status === 'pending' ? (
                      <Clock className="w-8 h-8" />
                    ) : (
                      <span>?</span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">
                      {status === 'verified'
                        ? 'Verified'
                        : status === 'pending'
                          ? 'Under Review'
                          : 'Not Verified'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {status === 'verified'
                        ? 'Your identity has been verified'
                        : status === 'pending'
                          ? 'Your documents are being reviewed'
                          : 'Complete verification to unlock features'}
                    </p>
                  </div>
                </div>

                {status === 'not-started' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Upload ID Documents</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Provide clear photos of both sides of your ID. Accepted formats: JPG, PNG. Max 10MB each.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-3">
                            <div className="relative">
                              <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                {frontFile ? (
                                  <div className="space-y-2">
                                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                                    <div className="text-sm font-medium text-foreground">Front Side Uploaded</div>
                                    <div className="text-xs text-muted-foreground">{frontFile.name}</div>
                                  </div>
                                ) : (
                                  <div>
                                    <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary mx-auto mb-2" />
                                    <div className="text-sm font-medium text-foreground">Front Side</div>
                                    <div className="text-xs text-muted-foreground">Click to upload</div>
                                  </div>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'front')}
                                className="hidden"
                              />
                            </div>
                          </label>
                        </div>

                        <div>
                          <label className="block mb-3">
                            <div className="relative">
                              <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                {backFile ? (
                                  <div className="space-y-2">
                                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                                    <div className="text-sm font-medium text-foreground">Back Side Uploaded</div>
                                    <div className="text-xs text-muted-foreground">{backFile.name}</div>
                                  </div>
                                ) : (
                                  <div>
                                    <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary mx-auto mb-2" />
                                    <div className="text-sm font-medium text-foreground">Back Side</div>
                                    <div className="text-xs text-muted-foreground">Click to upload</div>
                                  </div>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'back')}
                                className="hidden"
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={!frontFile || !backFile || uploading}
                      className="w-full h-12 rounded-xl mt-6"
                    >
                      {uploading ? 'Uploading...' : 'Submit for Verification'}
                    </Button>
                  </div>
                )}

                {status === 'pending' && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      Your verification is in progress. We typically review submissions within 24 hours.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                      <Clock className="w-4 h-4" />
                      Expected response by tomorrow
                    </div>
                  </div>
                )}

                {status === 'verified' && (
                  <div className="text-center py-6">
                    <p className="text-green-600 font-medium mb-2">Your identity has been verified!</p>
                    <p className="text-muted-foreground text-sm">You now have access to all Trust Level 2 features.</p>
                  </div>
                )}
              </Card>
            </div>

            <div>
              <Card className="rounded-2xl p-6 border-0 shadow-sm sticky top-32">
                <h3 className="font-semibold text-foreground mb-4">Benefits</h3>
                <div className="space-y-3">
                  {getBenefits().map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span
                        className={`text-lg shrink-0 ${
                          benefit.active ? 'text-green-600' : 'text-muted-foreground'
                        }`}
                      >
                        {benefit.icon}
                      </span>
                      <span className={benefit.active ? 'text-foreground' : 'text-muted-foreground text-sm'}>
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
