'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, DollarSign, Users, CreditCard as Edit, Lock, MapPin, Clock, GripVertical, Trash2, Plus, Navigation as NavigationIcon, Map as MapIcon, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InteractiveMap } from '@/components/InteractiveMap';
import { useApp } from '@/contexts/AppContext';

export default function TripItineraryPage() {
  const params = useParams();
  const { user } = useApp();
  const [isLocked, setIsLocked] = useState(false);
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const trip = user?.trips.find(t => t.id === params.id);

  if (!trip) {
    return <div>Trip not found</div>;
  }

  const groupedItinerary = trip.itinerary.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, typeof trip.itinerary>);

  const handleEditActivity = (activityId: string) => {
    console.log('Edit activity:', activityId);
  };

  const handleRemoveActivity = (activityId: string) => {
    console.log('Remove activity:', activityId);
  };

  const handleAddActivity = (day: number) => {
    console.log('Add activity to day:', day);
  };

  const handleNavigate = (activityId: string) => {
    setNavigatingTo(activityId === navigatingTo ? null : activityId);
  };

  const mapActivities = trip.itinerary.map(item => ({
    id: item.id,
    placeName: item.placeName,
    category: 'tourist',
    day: item.day,
    time: item.time,
  }));

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/profile">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>
          </Button>

          <div className="space-y-8">
            <Card className="rounded-2xl p-8 border-0 shadow-lg">
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="font-serif text-4xl text-foreground">{trip.destination}</h1>
                    <Badge variant={trip.status === 'locked' ? 'default' : 'secondary'} className="rounded-full">
                      {trip.status}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {trip.travelStyle}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  {!isLocked ? (
                    <Button onClick={() => setIsLocked(true)} className="rounded-xl gap-2">
                      <Lock className="w-4 h-4" />
                      Lock Itinerary
                    </Button>
                  ) : (
                    <Button asChild className="rounded-xl">
                      <Link href={`/trip/${trip.id}/guide`}>
                        Start Guide Mode
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div className="bg-card border border-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{trip.startDate}</p>
                  <p className="text-sm text-muted-foreground">to {trip.endDate}</p>
                </div>

                <div className="bg-card border border-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Cost</span>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">${trip.budget.toLocaleString()}</p>
                </div>

                <div className="bg-card border border-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Group Size</span>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{trip.participants}</p>
                  <p className="text-sm text-muted-foreground">{trip.participants === 1 ? 'traveler' : 'travelers'}</p>
                </div>

                <div className="bg-card border border-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activities</span>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{trip.itinerary.length}</p>
                  <p className="text-sm text-muted-foreground">planned stops</p>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 lg:hidden">
                <TabsTrigger value="list" className="rounded-xl">
                  <List className="w-4 h-4 mr-2" />
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="map" className="rounded-xl">
                  <MapIcon className="w-4 h-4 mr-2" />
                  Map View
                </TabsTrigger>
              </TabsList>

              <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                <div className="space-y-10">
                  {Object.entries(groupedItinerary).map(([day, items]) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: parseInt(day) * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl shadow-lg">
                      {day}
                    </div>
                    <h2 className="font-serif text-3xl text-foreground">
                      Day {day}
                    </h2>
                  </div>

                  <div className="relative pl-16 space-y-4">
                    <div className="absolute left-7 top-0 bottom-6 w-0.5 bg-border" />

                    {items.map((item, index) => (
                      <Card
                        key={item.id}
                        className="rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-lg transition-all group relative"
                        onMouseEnter={() => setHoveredActivity(item.id)}
                        onMouseLeave={() => setHoveredActivity(null)}
                      >
                        <div className="absolute left-[4px] w-5 h-5 rounded-full bg-primary border-4 border-background shadow-sm" />

                        <div className="flex items-start gap-4">
                          <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm font-semibold text-foreground">
                                    {item.time}
                                  </span>
                                  <Badge variant="outline" className="rounded-full text-xs">
                                    {item.duration}
                                  </Badge>
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-2 leading-tight">
                                  {item.placeName}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">{item.activity}</p>
                              </div>

                              <div className={`flex gap-2 transition-opacity ${hoveredActivity === item.id ? 'opacity-100' : 'opacity-0'}`}>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-xl h-9 w-9"
                                  onClick={() => handleNavigate(item.id)}
                                >
                                  <NavigationIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-xl h-9 w-9"
                                  onClick={() => handleEditActivity(item.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-xl h-9 w-9 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                                  onClick={() => handleRemoveActivity(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {item.notes && (
                              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border/30">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.notes}</p>
                              </div>
                            )}

                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="rounded-xl -ml-2"
                            >
                              <Link href={`/place/${item.placeId}`}>
                                View Place Details →
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Button
                      variant="outline"
                      className="w-full rounded-2xl h-16 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all group"
                      onClick={() => handleAddActivity(parseInt(day))}
                    >
                      <Plus className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium">Add Activity</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
                </div>

                <div className="sticky top-24 h-[calc(100vh-8rem)]">
                  <InteractiveMap
                    activities={mapActivities}
                    selectedActivity={selectedActivity}
                    onActivityClick={setSelectedActivity}
                    showNavigation={navigatingTo}
                  />
                </div>
              </div>

              <TabsContent value="list" className="lg:hidden space-y-10">
                {Object.entries(groupedItinerary).map(([day, items]) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: parseInt(day) * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl shadow-lg">
                        {day}
                      </div>
                      <h2 className="font-serif text-3xl text-foreground">
                        Day {day}
                      </h2>
                    </div>

                    <div className="relative pl-16 space-y-4">
                      <div className="absolute left-7 top-0 bottom-6 w-0.5 bg-border" />

                      {items.map((item) => (
                        <Card
                          key={item.id}
                          className="rounded-2xl p-6 border border-border/50 shadow-sm"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-semibold text-foreground">
                                {item.time}
                              </span>
                              <Badge variant="outline" className="rounded-full text-xs">
                                {item.duration}
                              </Badge>
                            </div>
                            <h3 className="font-serif text-2xl text-foreground leading-tight">
                              {item.placeName}
                            </h3>
                            <p className="text-muted-foreground">{item.activity}</p>

                            {item.notes && (
                              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <p className="text-sm text-muted-foreground">{item.notes}</p>
                              </div>
                            )}

                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl"
                                onClick={() => handleNavigate(item.id)}
                              >
                                <NavigationIcon className="w-4 h-4 mr-1" />
                                Navigate
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="rounded-xl"
                              >
                                <Link href={`/place/${item.placeId}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full rounded-2xl h-16 border-dashed border-2"
                        onClick={() => handleAddActivity(parseInt(day))}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        <span className="font-medium">Add Activity</span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="map" className="lg:hidden h-[600px]">
                <InteractiveMap
                  activities={mapActivities}
                  selectedActivity={selectedActivity}
                  onActivityClick={setSelectedActivity}
                  showNavigation={navigatingTo}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
