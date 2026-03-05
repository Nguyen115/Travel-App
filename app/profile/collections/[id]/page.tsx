'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';

export default function CollectionDetailPage() {
  const params = useParams();
  const { user, places } = useApp();

  const collection = user?.collections.find(c => c.id === params.id);
  const collectionPlaces = places.filter(p => collection?.placeIds.includes(p.id));

  if (!collection) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <Button variant="ghost" asChild className="rounded-xl">
            <Link href="/profile/collections"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <div>
            <h1 className="font-serif text-4xl text-foreground mb-2">{collection.name}</h1>
            <p className="text-muted-foreground">{collection.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {collectionPlaces.map((place) => (
              <Link key={place.id} href={`/place/${place.id}`}>
                <Card className="rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-md transition-all">
                  <div className="h-48"><img src={place.image} alt={place.name} className="w-full h-full object-cover" /></div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-serif text-lg text-foreground">{place.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{place.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{place.rating}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
