'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, Star, SlidersHorizontal, List, Map, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SearchPage() {
  const { places } = useApp();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(place.category);

    const matchesRating = selectedRating === null || place.rating >= selectedRating;

    const matchesVerified = !verifiedOnly || place.verified;

    return matchesSearch && matchesCategory && matchesRating && matchesVerified;
  });

  const categories = ['Food & Beverage', 'Cultural', 'Nature', 'Shopping', 'Accommodation'];

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="font-serif text-4xl text-foreground">{t.discoverPlaces}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-card rounded-xl p-1 border">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-lg"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="rounded-lg"
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="rounded-xl gap-2"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t.filters}
              </Button>
            </div>
          </div>

          <div className="relative">
            <SearchIcon className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t.searchDestinations}
              className="pl-12 h-14 rounded-2xl text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {viewMode === 'list' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/place/${place.id}`}>
                    <Card className="overflow-hidden border-0 shadow-sm rounded-2xl hover:shadow-lg transition-all">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {place.verified && (
                          <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-serif text-xl text-foreground mb-1">
                              {place.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{place.city}, {place.country}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="text-sm font-semibold">{place.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {place.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="secondary" className="rounded-full">
                            {place.category}
                          </Badge>
                          <span className="text-sm font-medium text-foreground">
                            {place.priceRange}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
              <div className="h-[600px] bg-muted flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Map className="w-16 h-16 text-muted-foreground mx-auto" />
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-foreground">Map View</h3>
                    <p className="text-muted-foreground max-w-md">
                      Interactive map showing all {filteredPlaces.length} locations with pinpoint accuracy
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto pt-4">
                    {filteredPlaces.slice(0, 4).map((place) => (
                      <Link key={place.id} href={`/place/${place.id}`}>
                        <Card className="p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg overflow-hidden">
                              <img
                                src={place.image}
                                alt={place.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-xs text-foreground truncate">
                                {place.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {place.city}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-foreground">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="rounded"
                        />
                        <span className="text-sm text-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[null, 3, 3.5, 4, 4.5].map((rating) => (
                      <label
                        key={rating === null ? 'all' : rating}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedRating === rating}
                          onCheckedChange={() => setSelectedRating(rating)}
                          className="rounded"
                        />
                        <span className="text-sm text-foreground">
                          {rating === null ? 'All Ratings' : (
                            <div className="flex items-center gap-1">
                              {Array(Math.floor(rating)).fill(null).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                              ))}
                              {rating % 1 !== 0 && (
                                <div className="relative w-3 h-3">
                                  <Star className="w-3 h-3 text-muted-foreground" />
                                  <div className="absolute inset-0 overflow-hidden w-1.5">
                                    <Star className="w-3 h-3 fill-primary text-primary" />
                                  </div>
                                </div>
                              )}
                              <span>& up</span>
                            </div>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-foreground">Verified Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-white">
              <Button
                onClick={() => setShowFilters(false)}
                className="w-full rounded-full py-3 font-medium"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
