'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Calendar, DollarSign, Users, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CreateTripPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    participants: '1',
    travelStyle: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/trip/t1');
  };

  const isValid = formData.destination && formData.startDate && formData.endDate && formData.budget && formData.travelStyle;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backHome}
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t.aiPlannerBadge}</span>
              </div>
              <h1 className="font-serif text-5xl text-foreground">
                {t.aiPlannerTitle}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.aiPlannerSubtitle}
              </p>
            </div>

            <Card className="rounded-2xl p-10 border-0 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-base flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    {t.destination}
                  </Label>
                  <Input
                    id="destination"
                    placeholder={t.destinationPlaceholder}
                    className="h-14 rounded-2xl text-base"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t.startDate}
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      className="h-14 rounded-2xl text-base"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-base">
                      {t.endDate}
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      className="h-14 rounded-2xl text-base"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Budget (USD)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="3000"
                    className="h-14 rounded-2xl text-base"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants" className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Number of Participants
                  </Label>
                  <Select
                    value={formData.participants}
                    onValueChange={(value) => setFormData({ ...formData, participants: value })}
                  >
                    <SelectTrigger className="h-14 rounded-2xl text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo</SelectItem>
                      <SelectItem value="2">Couple</SelectItem>
                      <SelectItem value="3-5">Small Group (3-5)</SelectItem>
                      <SelectItem value="6+">Large Group (6+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelStyle" className="text-base">
                    Travel Style / Preferences
                  </Label>
                  <Select
                    value={formData.travelStyle}
                    onValueChange={(value) => setFormData({ ...formData, travelStyle: value })}
                  >
                    <SelectTrigger className="h-14 rounded-2xl text-base">
                      <SelectValue placeholder="Select your style..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">Cultural Immersion</SelectItem>
                      <SelectItem value="food">Food & Wine</SelectItem>
                      <SelectItem value="adventure">Adventure & Outdoors</SelectItem>
                      <SelectItem value="luxury">Luxury & Relaxation</SelectItem>
                      <SelectItem value="slow">Slow Travel</SelectItem>
                      <SelectItem value="wellness">Wellness Retreat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!isValid}
                  className="w-full h-14 rounded-2xl text-base gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate My Itinerary
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
