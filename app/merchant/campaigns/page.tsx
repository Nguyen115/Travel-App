'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CircleAlert as AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { toastManager } from '@/services/toastManager';

const mockPlaces = [
  { id: '1', name: 'Cafe Saigon' },
  { id: '2', name: 'The Pho House' },
  { id: '3', name: 'Riverside Park' },
];

export default function MerchantCampaignsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    place: '',
    objective: 'impressions',
    budget: '',
    bidAmount: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.place || !formData.budget || !formData.bidAmount) {
      toastManager.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toastManager.success('Campaign created successfully!');
      router.push('/merchant/dashboard');
    } catch (error) {
      toastManager.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const depositAmount = Math.min(parseFloat(formData.budget) * 0.2 || 0, 5000);

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/merchant/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="font-serif text-4xl text-foreground mb-2">Create Campaign</h1>
            <p className="text-muted-foreground">Boost visibility for your place</p>
          </div>

          <Card className="rounded-2xl p-10 border-0 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="place">Select Place</Label>
                <Select value={formData.place} onValueChange={(val) => handleSelectChange('place', val)}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Choose a place to promote" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPlaces.map(place => (
                      <SelectItem key={place.id} value={place.id}>{place.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="objective">Campaign Objective</Label>
                  <Select value={formData.objective} onValueChange={(val) => handleSelectChange('objective', val)}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="impressions">Impressions (Reach)</SelectItem>
                      <SelectItem value="clicks">Clicks (Traffic)</SelectItem>
                      <SelectItem value="conversions">Conversions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Max Budget (USD)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    min="100"
                    step="50"
                    placeholder="100"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidAmount">Bid Amount per Action (USD)</Label>
                <Input
                  id="bidAmount"
                  name="bidAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.50"
                  value={formData.bidAmount}
                  onChange={handleInputChange}
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Deposit Required</h3>
                    <p className="text-sm text-blue-800">
                      A security deposit of <span className="font-semibold">${depositAmount.toFixed(2)}</span> (20% of budget) is required to activate this campaign.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="rounded-xl"
                >
                  <Link href="/merchant/dashboard">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl h-12 bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Processing...' : `Pay Deposit & Launch Campaign ($${depositAmount.toFixed(2)})`}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
