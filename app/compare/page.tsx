'use client';

import Link from 'next/link';
import { ArrowLeft, Star, MapPin, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export default function ComparePage() {
  const { places } = useApp();
  const placesToCompare = places.slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div>
            <Button variant="ghost" asChild className="mb-4 rounded-xl">
              <Link href="/search"><ArrowLeft className="w-4 h-4 mr-2" />Back to Search</Link>
            </Button>
            <h1 className="font-serif text-4xl text-foreground">Compare Places</h1>
          </div>

          <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-6 font-semibold text-muted-foreground w-48">
                      Feature
                    </th>
                    {placesToCompare.map((place) => (
                      <th key={place.id} className="p-6">
                        <div className="space-y-3">
                          <div className="h-32 w-full rounded-xl overflow-hidden">
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="font-serif text-xl text-foreground mb-1">
                              {place.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {place.city}, {place.country}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-6 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-muted-foreground" />
                        Rating
                      </div>
                    </td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-5 h-5 fill-primary text-primary" />
                          <span className="text-lg font-semibold text-foreground">
                            {place.rating}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-6 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        Trust Score
                      </div>
                    </td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6 text-center">
                        <div className="text-lg font-semibold text-foreground">
                          {place.trustScore}%
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-6 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        Price Range
                      </div>
                    </td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6 text-center">
                        <div className="text-lg font-semibold text-foreground">
                          {place.priceRange}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-6 font-medium text-foreground">Category</td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6">
                        <div className="flex justify-center">
                          <Badge variant="secondary">{place.category}</Badge>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-6 font-medium text-foreground">Verified</td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6 text-center">
                        {place.verified ? (
                          <Badge className="bg-primary/90">Verified</Badge>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-6 font-medium text-foreground">
                      <MapPin className="w-4 h-4 text-muted-foreground inline mr-2" />
                      Location
                    </td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6 text-center text-sm text-muted-foreground">
                        {place.location}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-6 font-medium text-foreground">Action</td>
                    {placesToCompare.map((place) => (
                      <td key={place.id} className="p-6">
                        <Button asChild className="w-full rounded-xl">
                          <Link href={`/place/${place.id}`}>View Details</Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
