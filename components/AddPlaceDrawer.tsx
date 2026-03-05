'use client';

import { useState } from 'react';
import { Coffee, Camera, UtensilsCrossed, Hotel, ShoppingBag, MapPin, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface AddPlaceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: number;
  onAddPlace: (place: {
    placeName: string;
    time: string;
    category: string;
    duration: string;
  }) => void;
}

const categories = [
  { id: 'food', label: 'Food', icon: UtensilsCrossed, color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
  { id: 'cafe', label: 'Cafe', icon: Coffee, color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
  { id: 'tourist', label: 'Tourist Spot', icon: Camera, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { id: 'hotel', label: 'Check-in', icon: Hotel, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
];

const mockPlaces = [
  { name: 'Cafe Apartment', category: 'cafe', location: 'District 1' },
  { name: 'Ben Thanh Market', category: 'tourist', location: 'District 1' },
  { name: 'Pho 24', category: 'food', location: 'District 3' },
  { name: 'War Remnants Museum', category: 'tourist', location: 'District 3' },
  { name: 'Saigon Skydeck', category: 'tourist', location: 'Bitexco Tower' },
  { name: 'The Workshop Coffee', category: 'cafe', location: 'District 2' },
  { name: 'Banh Mi Huynh Hoa', category: 'food', location: 'District 1' },
];

export function AddPlaceDrawer({ open, onOpenChange, day, onAddPlace }: AddPlaceDrawerProps) {
  const [placeName, setPlaceName] = useState('');
  const [time, setTime] = useState('09:00');
  const [category, setCategory] = useState('tourist');
  const [duration, setDuration] = useState('2 hours');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = mockPlaces.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPlace = (place: typeof mockPlaces[0]) => {
    setPlaceName(place.name);
    setCategory(place.category);
    setSearchQuery('');
  };

  const handleSave = () => {
    if (!placeName.trim()) return;

    onAddPlace({
      placeName: placeName.trim(),
      time,
      category,
      duration,
    });

    setPlaceName('');
    setTime('09:00');
    setCategory('tourist');
    setDuration('2 hours');
    setSearchQuery('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-serif text-3xl">Add Place</SheetTitle>
          <SheetDescription>
            Add a new activity to Day {day} of your itinerary
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="time" className="text-base font-semibold">
              Arrival Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-11 h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Category</Label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`
                      p-4 rounded-xl border-2 transition-all
                      ${category === cat.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-medium text-center">{cat.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="search" className="text-base font-semibold">
              Search Place
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Search for restaurants, cafes, tourist spots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 rounded-xl"
              />
            </div>

            {searchQuery && filteredPlaces.length > 0 && (
              <div className="border border-border rounded-xl overflow-hidden bg-white shadow-sm max-h-60 overflow-y-auto">
                {filteredPlaces.map((place, index) => {
                  const categoryData = categories.find(c => c.id === place.category);
                  const Icon = categoryData?.icon || MapPin;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectPlace(place)}
                      className="w-full p-4 hover:bg-muted transition-colors flex items-center gap-3 border-b border-border last:border-0"
                    >
                      <div className={`w-10 h-10 rounded-lg ${categoryData?.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-foreground">{place.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {place.location}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="placeName" className="text-base font-semibold">
              Place Name
            </Label>
            <Input
              id="placeName"
              type="text"
              placeholder="E.g., Ben Thanh Market"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="duration" className="text-base font-semibold">
              Duration
            </Label>
            <Input
              id="duration"
              type="text"
              placeholder="E.g., 2 hours"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!placeName.trim()}
            className="w-full h-12 rounded-xl"
          >
            Add to Day {day}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
