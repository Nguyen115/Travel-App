'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export default function HomePage() {
  const { places, user } = useApp();

  const featuredPlace = places[0];
  const hiddenGems = places.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full pt-24"
        >
          <div className="bg-primary text-primary-foreground rounded-none md:rounded-3xl p-8 md:p-16 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-6 md:px-0">
              <div className="relative max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Trip Planner</span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl leading-tight">
                  Let AI craft your perfect itinerary
                </h1>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                  Tell us your dreams, and we'll create a personalized journey tailored to your preferences, budget, and travel style.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="bg-white/95 text-foreground hover:bg-white rounded-full h-14 px-8 text-base font-medium shadow-sm"
                >
                  <Link href="/trip/create">
                    Start Planning
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-6 space-y-16 py-16">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-3xl text-foreground">Location of the Week</h2>
              </div>
            </div>

            <Link href={`/place/${featuredPlace.id}`}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-auto overflow-hidden">
                      <img
                        src={featuredPlace.image}
                        alt={featuredPlace.name}
                        className="w-full h-full object-cover"
                      />
                      {featuredPlace.verified && (
                        <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="p-10 flex flex-col justify-center space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{featuredPlace.location}, {featuredPlace.city}</span>
                        </div>
                        <h3 className="font-serif text-4xl text-foreground">
                          {featuredPlace.name}
                        </h3>
                        <p className="text-muted-foreground text-lg">
                          {featuredPlace.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 fill-primary text-primary" />
                          <span className="font-semibold text-foreground">{featuredPlace.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Trust Score: {featuredPlace.trustScore}%
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {featuredPlace.priceRange}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {featuredPlace.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button size="lg" className="w-full rounded-2xl group">
                        Explore This Gem
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-3xl text-foreground">Hidden Gems</h2>
              </div>
              <Button variant="ghost" asChild className="rounded-xl">
                <Link href="/search">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {hiddenGems.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/place/${place.id}`}>
                    <Card className="overflow-hidden bg-card border border-slate-100 rounded-2xl hover:shadow-lg transition-shadow">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-xl text-foreground">
                            {place.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="text-sm font-semibold">{place.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{place.city}, {place.country}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {place.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
