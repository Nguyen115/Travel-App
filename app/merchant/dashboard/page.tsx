'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, Star, TrendingUp, Plus, Settings, ChartBar as BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface MerchantPlace {
  id: string;
  name: string;
  category: string;
  views: number;
  reviews: number;
  rating: number;
  status: 'active' | 'pending';
}

const mockPlaces: MerchantPlace[] = [
  {
    id: '1',
    name: 'Cafe Saigon',
    category: 'Cafe',
    views: 1250,
    reviews: 45,
    rating: 4.8,
    status: 'active',
  },
  {
    id: '2',
    name: 'The Pho House',
    category: 'Restaurant',
    views: 850,
    reviews: 32,
    rating: 4.6,
    status: 'active',
  },
  {
    id: '3',
    name: 'Riverside Park',
    category: 'Attraction',
    views: 2100,
    reviews: 67,
    rating: 4.9,
    status: 'pending',
  },
];

export default function MerchantDashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const totalViews = mockPlaces.reduce((sum, p) => sum + p.views, 0);
  const totalReviews = mockPlaces.reduce((sum, p) => sum + p.reviews, 0);
  const avgRating = (mockPlaces.reduce((sum, p) => sum + p.rating, 0) / mockPlaces.length).toFixed(1);

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl text-foreground">Merchant Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage your places and campaigns</p>
            </div>
            <Button asChild className="rounded-xl h-12 gap-2">
              <Link href="/merchant/campaigns">
                <Zap className="w-4 h-4" />
                Create Campaign
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Views</p>
                  <p className="font-serif text-3xl text-foreground">{totalViews.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">+12% from last month</p>
            </Card>

            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Reviews</p>
                  <p className="font-serif text-3xl text-foreground">{totalReviews}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">+8 from last week</p>
            </Card>

            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
                  <p className="font-serif text-3xl text-foreground">{avgRating}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Out of 5.0</p>
            </Card>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-foreground">Your Places</h2>
              <Button variant="outline" size="sm" asChild className="rounded-xl gap-2">
                <Link href="#">
                  <Plus className="w-4 h-4" />
                  Add Place
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {mockPlaces.map((place) => (
                <Card key={place.id} className="rounded-2xl p-6 border border-border/50 hover:shadow-md transition-shadow">
                  <div className="grid md:grid-cols-[1fr_200px_200px] gap-6 items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-lg text-foreground">{place.name}</h3>
                        <Badge
                          variant={place.status === 'active' ? 'default' : 'secondary'}
                          className="rounded-full text-xs"
                        >
                          {place.status === 'active' ? 'Active' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{place.category}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{place.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="font-medium">{place.rating} rating</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg flex-1">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
