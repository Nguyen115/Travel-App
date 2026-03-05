'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Plus, Users, DollarSign, Sparkles, File as FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyTripsPage() {
  const { user } = useApp();
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div>
            <Button variant="ghost" asChild className="mb-4 rounded-xl">
              <Link href="/profile">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToProfile}
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <h1 className="font-serif text-5xl text-foreground">{t.myTrips}</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-2xl gap-2 h-12 px-6">
                    <Plus className="w-5 h-5" />
                    {t.newTrip}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-2xl p-2">
                  <DropdownMenuItem asChild className="rounded-xl p-4 cursor-pointer">
                    <Link href="/trip/create" className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Plan with AI</div>
                        <div className="text-sm text-muted-foreground">
                          Get personalized itinerary suggestions
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl p-4 cursor-pointer">
                    <Link href="/trip/manual-setup" className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <FileEdit className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Create Manually</div>
                        <div className="text-sm text-muted-foreground">
                          Build your trip from scratch
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {user.trips.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/trip/${trip.id}`}>
                    <Card className="rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all bg-white">
                      <div className="space-y-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-serif text-2xl text-foreground leading-tight flex-1">
                            {trip.destination}
                          </h3>
                          <Badge
                            variant={trip.status === 'locked' ? 'default' : 'secondary'}
                            className="rounded-full capitalize shrink-0"
                          >
                            {trip.status}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{trip.startDate} - {trip.endDate}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              <span>${trip.budget.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{trip.participants} {trip.participants === 1 ? 'traveler' : t.travelers}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-border">
                          <Badge variant="outline" className="rounded-full">
                            {trip.travelStyle}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl p-16 text-center border-0 shadow-sm bg-white">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-foreground mb-3">No trips yet</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start planning your next adventure with AI or build your own custom itinerary
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-2xl h-12 px-8">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Trip
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-72 rounded-2xl p-2">
                  <DropdownMenuItem asChild className="rounded-xl p-4 cursor-pointer">
                    <Link href="/trip/create" className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Plan with AI</div>
                        <div className="text-sm text-muted-foreground">
                          Get personalized itinerary suggestions
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl p-4 cursor-pointer">
                    <Link href="/trip/manual-setup" className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <FileEdit className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">Create Manually</div>
                        <div className="text-sm text-muted-foreground">
                          Build your trip from scratch
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
