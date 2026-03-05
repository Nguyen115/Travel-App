'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InteractiveMap } from '@/components/InteractiveMap';
import { mockCommunityGuides, CommunityGuide, GuidePlace } from '@/lib/mockData';
import { toast } from 'sonner';

export default function GuidePage() {
  const params = useParams();
  const [guide, setGuide] = useState<CommunityGuide | null>(null);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);

  useEffect(() => {
    const foundGuide = mockCommunityGuides.find(g => g.id === params.id);
    setGuide(foundGuide || null);
  }, [params.id]);

  const handleClone = () => {
    toast.success('Guide cloned to your trips!');
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Guide not found</p>
          <Button asChild>
            <Link href="/community">Back to Inspiration</Link>
          </Button>
        </div>
      </div>
    );
  }

  const mapActivities = guide.places.map(place => ({
    id: place.id,
    placeName: place.name,
    category: place.category,
    day: place.day,
    time: place.time,
    coordinates: undefined
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      <div className="w-1/2 overflow-y-auto pb-24">
        <div className="relative h-80">
          <img
            src={guide.coverImage}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Button
            variant="ghost"
            asChild
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl"
          >
            <Link href="/community">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="px-8 py-8">
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-foreground mb-4">
              {guide.title}
            </h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              <img
                src={guide.authorAvatar}
                alt={guide.authorName}
                className="w-14 h-14 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{guide.authorName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{guide.destination}</span>
                </div>
              </div>

              <Button
                onClick={handleClone}
                className="rounded-full bg-primary hover:bg-primary/90 px-6"
              >
                <Download className="w-4 h-4 mr-2" />
                Clone to My Trips
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {guide.description}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Saves</p>
                <p className="font-semibold text-foreground text-lg">{guide.saves}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Clones</p>
                <p className="font-semibold text-foreground text-lg">{guide.clones}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Places</p>
                <p className="font-semibold text-foreground text-lg">{guide.placeCount}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="font-serif text-2xl text-foreground">Places</h2>
            {guide.places.map((place, index) => (
              <div
                key={place.id}
                className="flex gap-4 border-b border-slate-100 pb-8 last:border-0 cursor-pointer group"
                onMouseEnter={() => setHoveredPlaceId(place.id)}
                onMouseLeave={() => setHoveredPlaceId(null)}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                        {place.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="capitalize rounded-full text-xs">
                          {place.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Day {place.day} • {place.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {place.description}
                  </p>

                  <div className="border-l-2 border-primary pl-4 py-2">
                    <p className="text-xs font-medium text-primary mb-1">Author's Tip:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {place.authorTip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 sticky top-0 h-screen hidden lg:block">
        <InteractiveMap
          activities={mapActivities}
          hoveredPlaceId={hoveredPlaceId}
        />
      </div>
    </div>
  );
}
