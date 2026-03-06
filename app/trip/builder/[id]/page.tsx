'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Clock, MapPin as MapPinIcon, GripVertical, Trash2, CreditCard as Edit, Navigation as NavigationIcon, Map as MapIcon, List, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InteractiveMap } from '@/components/InteractiveMap';
import { AddPlaceDrawer } from '@/components/AddPlaceDrawer';
import { TripShareModal } from '@/components/TripShareModal';
import { TripExportDropdown } from '@/components/TripExportDropdown';
import { FloatingAIChat } from '@/components/FloatingAIChat';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface Activity {
  id: string;
  placeName: string;
  time: string;
  category: string;
  duration: string;
  day: number;
}

interface Trip {
  id: string;
  destination: string;
  days: number;
  activities: Activity[];
  status: string;
  mode: string;
}

export default function TripBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [addPlaceOpen, setAddPlaceOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const savedTrip = localStorage.getItem(`trip-${params.id}`);
    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }
  }, [params.id]);

  const saveTrip = (updatedTrip: Trip) => {
    localStorage.setItem(`trip-${params.id}`, JSON.stringify(updatedTrip));
    setTrip(updatedTrip);
  };

  const handleAddPlace = (place: Omit<Activity, 'id' | 'day'>) => {
    if (!trip) return;

    const newActivity: Activity = {
      ...place,
      id: `activity-${Date.now()}`,
      day: selectedDay,
    };

    const updatedTrip = {
      ...trip,
      activities: [...trip.activities, newActivity],
    };

    saveTrip(updatedTrip);
  };

  const handleRemoveActivity = (activityId: string) => {
    if (!trip) return;

    const updatedTrip = {
      ...trip,
      activities: trip.activities.filter(a => a.id !== activityId),
    };

    saveTrip(updatedTrip);
  };

  const handleNavigate = (activityId: string) => {
    setNavigatingTo(activityId === navigatingTo ? null : activityId);
  };

  const handleSaveAndExit = () => {
    router.push('/profile/trips');
  };

  const handlePublish = () => {
    toast.success('Trip published to community feed successfully!');
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Loading trip...</p>
          <Button asChild>
            <Link href="/profile/trips">Back to My Trips</Link>
          </Button>
        </div>
      </div>
    );
  }

  const groupedActivities = trip.activities.reduce((acc, activity) => {
    if (!acc[activity.day]) acc[activity.day] = [];
    acc[activity.day].push(activity);
    return acc;
  }, {} as Record<number, Activity[]>);

  const daysArray = Array.from({ length: trip.days }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="rounded-xl">
                <Link href="/profile/trips">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-serif text-4xl text-foreground">{trip.destination}</h1>
                <p className="text-muted-foreground">{trip.days} {trip.days === 1 ? 'day' : 'days'} trip</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShareModalOpen(true)}
                variant="outline"
                className="rounded-full border-slate-200 text-foreground hover:bg-slate-50 h-11 px-6"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t.shareTrip}
              </Button>
              <TripExportDropdown tripTitle={trip.destination} />
              <Button
                variant="outline"
                onClick={handlePublish}
                className="rounded-full border border-primary text-primary hover:bg-primary/5"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Publish
              </Button>
              <Button onClick={handleSaveAndExit} className="rounded-xl">
                Save & Exit
              </Button>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="rounded-2xl p-6 border-0 shadow-sm">
                <h2 className="font-serif text-2xl text-foreground mb-4">{t.itineraryTitle}</h2>
                <p className="text-muted-foreground">
                  {t.itinerarySubtitle}
                </p>
              </Card>

              <div className="space-y-8">
                {daysArray.map((day) => {
                  const dayActivities = groupedActivities[day] || [];

                  return (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: day * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-lg">
                          {day}
                        </div>
                        <h3 className="font-serif text-2xl text-foreground">{t.day} {day}</h3>
                      </div>

                      <div className="relative pl-14 space-y-4">
                        {dayActivities.length > 0 && (
                          <div className="absolute left-6 top-0 bottom-6 w-0.5 bg-border" />
                        )}

                        {dayActivities.map((activity) => (
                          <Card
                            key={activity.id}
                            className="rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg transition-all group relative"
                            onMouseEnter={() => setHoveredActivity(activity.id)}
                            onMouseLeave={() => setHoveredActivity(null)}
                          >
                            <div className="absolute left-[4px] w-5 h-5 rounded-full bg-primary border-4 border-stone-50 shadow-sm" />

                            <div className="flex items-start gap-3">
                              <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors cursor-grab">
                                <GripVertical className="w-5 h-5" />
                              </div>

                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Clock className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm font-semibold text-foreground">
                                        {activity.time}
                                      </span>
                                      <Badge variant="outline" className="rounded-full text-xs">
                                        {activity.duration}
                                      </Badge>
                                    </div>
                                    <h4 className="font-serif text-xl text-foreground mb-1 leading-tight">
                                      {activity.placeName}
                                    </h4>
                                    <p className="text-sm text-muted-foreground capitalize">
                                      {activity.category}
                                    </p>
                                  </div>

                                  <div className={`flex gap-2 transition-opacity ${hoveredActivity === activity.id ? 'opacity-100' : 'opacity-0'}`}>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="rounded-xl h-8 w-8"
                                      onClick={() => handleNavigate(activity.id)}
                                    >
                                      <NavigationIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="rounded-xl h-8 w-8 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                                      onClick={() => handleRemoveActivity(activity.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}

                        <Button
                          variant="outline"
                          className="w-full rounded-2xl h-14 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all group"
                          onClick={() => {
                            setSelectedDay(day);
                            setAddPlaceOpen(true);
                          }}
                        >
                          <Plus className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="font-medium">{t.addPlace}</span>
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <InteractiveMap
                activities={trip.activities.map(a => ({
                  ...a,
                  coordinates: undefined
                }))}
                selectedActivity={selectedActivity}
                onActivityClick={setSelectedActivity}
                showNavigation={navigatingTo}
                hoveredPlaceId={hoveredActivity}
              />
            </div>
          </div>

          <div className="lg:hidden">
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="list" className="rounded-xl">
                  <List className="w-4 h-4 mr-2" />
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="map" className="rounded-xl">
                  <MapIcon className="w-4 h-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-8">
                {daysArray.map((day) => {
                  const dayActivities = groupedActivities[day] || [];

                  return (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-lg">
                          {day}
                        </div>
                        <h3 className="font-serif text-2xl text-foreground">{t.day} {day}</h3>
                      </div>

                      <div className="space-y-4">
                        {dayActivities.map((activity) => (
                          <Card
                            key={activity.id}
                            className="rounded-2xl p-5 border border-border/50 shadow-sm"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-semibold">{activity.time}</span>
                                <Badge variant="outline" className="rounded-full text-xs">
                                  {activity.duration}
                                </Badge>
                              </div>
                              <h4 className="font-serif text-xl text-foreground">
                                {activity.placeName}
                              </h4>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl"
                                  onClick={() => handleNavigate(activity.id)}
                                >
                                  <NavigationIcon className="w-4 h-4 mr-1" />
                                  Navigate
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl"
                                  onClick={() => handleRemoveActivity(activity.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}

                        <Button
                          variant="outline"
                          className="w-full rounded-2xl h-14 border-dashed border-2"
                          onClick={() => {
                            setSelectedDay(day);
                            setAddPlaceOpen(true);
                          }}
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          {t.addPlace}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </TabsContent>

              <TabsContent value="map" className="h-[600px]">
                <InteractiveMap
                  activities={trip.activities.map(a => ({
                    ...a,
                    coordinates: undefined
                  }))}
                  selectedActivity={selectedActivity}
                  onActivityClick={setSelectedActivity}
                  showNavigation={navigatingTo}
                  hoveredPlaceId={hoveredActivity}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <AddPlaceDrawer
        open={addPlaceOpen}
        onOpenChange={setAddPlaceOpen}
        day={selectedDay}
        onAddPlace={handleAddPlace}
      />

      <TripShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        tripTitle={trip.destination}
      />

      <FloatingAIChat />
    </div>
  );
}
