'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Star, Users, Share2, MoveVertical as MoreVertical, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { toastManager } from '@/services/toastManager';

interface PublicUser {
  id: string;
  name: string;
  avatar: string;
  trustLevel: 1 | 2;
  totalReviews: number;
  tripsShared: number;
  bio: string;
  location: string;
}

const mockUser: PublicUser = {
  id: '1',
  name: 'Sarah Chen',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  trustLevel: 2,
  totalReviews: 28,
  tripsShared: 5,
  bio: 'Travel enthusiast and food explorer. Love discovering hidden gems and sharing my experiences.',
  location: 'Ho Chi Minh City, Vietnam',
};

const mockTrips = [
  {
    id: '1',
    title: 'Hanoi City Guide',
    days: 3,
    saved: 124,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Mekong Delta Adventure',
    days: 2,
    saved: 89,
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Coastal Escape: Nha Trang',
    days: 4,
    saved: 156,
    rating: 4.9,
  },
];

const mockReviews = [
  {
    id: '1',
    place: 'Cafe Saigon',
    rating: 5,
    text: 'Amazing coffee and atmosphere! Highly recommend for a morning visit.',
    date: '1 week ago',
  },
  {
    id: '2',
    place: 'The Pho House',
    rating: 4.5,
    text: 'Traditional Vietnamese pho with authentic flavors. Great value for money.',
    date: '2 weeks ago',
  },
  {
    id: '3',
    place: 'Riverside Park',
    rating: 5,
    text: 'Perfect spot for sunset watching. Peaceful and beautiful.',
    date: '1 month ago',
  },
];

export default function PublicProfilePage() {
  const params = useParams();
  const { t } = useLanguage();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toastManager.success(isFollowing ? 'Unfollowed' : 'Following!');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>

          <Card className="rounded-2xl p-8 md:p-12 border-0 shadow-lg mb-8">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 mb-8">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground">{mockUser.name}</h1>
                    {mockUser.trustLevel === 2 && (
                      <Badge className="rounded-full h-8 px-3 gap-1 bg-green-100 text-green-700">
                        <Shield className="w-3 h-3" />
                        Level {mockUser.trustLevel}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{mockUser.location}</span>
                  </div>
                  <p className="text-foreground/80 max-w-xl">{mockUser.bio}</p>
                </div>

                <Button
                  onClick={handleFollow}
                  className={`w-full md:w-auto rounded-xl h-11 ${
                    isFollowing
                      ? 'bg-muted text-foreground hover:bg-muted/80'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow User'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">{mockUser.totalReviews}</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">{mockUser.tripsShared}</p>
                <p className="text-sm text-muted-foreground">Trips Shared</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </Card>

          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-6">Public Trip Guides</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {mockTrips.map(trip => (
                  <Card key={trip.id} className="rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5" />
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{trip.title}</h3>
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span className="text-muted-foreground">{trip.days} days</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="font-medium">{trip.rating}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full rounded-lg text-xs">
                        View Guide
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-6">Recent Reviews</h2>
              <div className="space-y-4">
                {mockReviews.map(review => (
                  <Card key={review.id} className="rounded-2xl p-6 border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{review.place}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(review.rating)
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-foreground/80 text-sm">{review.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
