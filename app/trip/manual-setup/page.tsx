'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ManualSetupPage() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);

  const handleStartBuilding = () => {
    if (!destination.trim()) return;

    const tripId = `manual-${Date.now()}`;

    const newTrip = {
      id: tripId,
      destination: destination.trim(),
      days: days,
      activities: [],
      status: 'draft',
      mode: 'manual',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`trip-${tripId}`, JSON.stringify(newTrip));

    router.push(`/trip/builder/${tripId}`);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/profile/trips">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Trips
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl text-foreground mb-4">
              Create Your Trip
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Build your custom itinerary from scratch with complete control over every detail
            </p>
          </div>

          <Card className="rounded-2xl p-10 border-0 shadow-lg bg-white">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="destination" className="text-base font-semibold">
                  Where are you going?
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="destination"
                    type="text"
                    placeholder="E.g., Vung Tau, Da Lat, Hanoi"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-12 h-14 text-lg rounded-xl border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="days" className="text-base font-semibold">
                  How many days?
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    max="30"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                    className="pl-12 h-14 text-lg rounded-xl border-border/50 focus:border-primary"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  You can always adjust this later
                </p>
              </div>

              <Button
                onClick={handleStartBuilding}
                disabled={!destination.trim()}
                className="w-full h-14 text-lg rounded-xl"
              >
                Start Building Itinerary
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
