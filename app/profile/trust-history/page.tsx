'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, CircleCheck as CheckCircle, Circle as XCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrustEvent {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  points: number;
  date: string;
  icon: React.ReactNode;
}

const mockHistory: TrustEvent[] = [
  {
    id: '1',
    type: 'positive',
    title: 'Verified Review',
    description: 'You left a verified review for Cafe Saigon',
    points: 5,
    date: 'Today',
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: '2',
    type: 'positive',
    title: 'Completed Trip',
    description: 'Successfully completed 3-day trip to Hanoi',
    points: 10,
    date: 'Yesterday',
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: '3',
    type: 'negative',
    title: 'Rejected Report',
    description: 'Your reported place listing was not approved',
    points: -2,
    date: '2 days ago',
    icon: <XCircle className="w-5 h-5" />,
  },
  {
    id: '4',
    type: 'positive',
    title: 'KYC Verified',
    description: 'Your identity was successfully verified',
    points: 15,
    date: '3 days ago',
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: '5',
    type: 'positive',
    title: 'Helpful Review',
    description: '12 people found your review helpful',
    points: 3,
    date: '1 week ago',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: '6',
    type: 'neutral',
    title: 'Account Created',
    description: 'Your Voyager account was created',
    points: 0,
    date: '2 weeks ago',
    icon: <Star className="w-5 h-5" />,
  },
];

export default function TrustHistoryPage() {
  const { t } = useLanguage();

  const totalPoints = mockHistory.reduce((sum, e) => sum + e.points, 0);
  const positivePoints = mockHistory.filter(e => e.type === 'positive').reduce((sum, e) => sum + e.points, 0);

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
            <h1 className="font-serif text-4xl text-foreground mb-2">Trust Score History</h1>
            <p className="text-muted-foreground">Track how your trust score changed over time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <p className="text-sm text-muted-foreground mb-2">Current Trust Score</p>
              <div className="flex items-baseline gap-3">
                <p className="font-serif text-4xl text-foreground">{totalPoints}</p>
                <p className="text-sm text-green-600 font-medium">+{positivePoints} total positive</p>
              </div>
            </Card>

            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <p className="text-sm text-muted-foreground mb-2">Trust Level</p>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full h-8 px-3 bg-green-100 text-green-700">Level 2</Badge>
                <p className="text-sm text-muted-foreground">Verified User</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-semibold text-lg text-foreground">Activity Timeline</h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {mockHistory.map((event, idx) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          event.type === 'positive'
                            ? 'bg-green-100 text-green-600'
                            : event.type === 'negative'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {event.icon}
                      </div>
                      {idx < mockHistory.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mt-4 mb-2" />
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <span
                          className={`font-semibold whitespace-nowrap ${
                            event.points > 0
                              ? 'text-green-600'
                              : event.points < 0
                                ? 'text-red-600'
                                : 'text-muted-foreground'
                          }`}
                        >
                          {event.points > 0 ? '+' : ''}{event.points} pts
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <span className="text-xs text-muted-foreground/70">{event.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">How Trust Score Works</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ Verified reviews: +5 points each</li>
              <li>✓ Completed trips: +10 points each</li>
              <li>✓ KYC verification: +15 points</li>
              <li>✗ Rejected reports: -2 points each</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
