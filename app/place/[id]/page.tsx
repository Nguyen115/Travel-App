'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Shield, FileText, Heart, Share2, Camera, Flag, CircleCheck as CheckCircle2, BadgeCheck, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PlaceDetailPage() {
  const params = useParams();
  const { places } = useApp();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [checkInVerified, setCheckInVerified] = useState(false);

  const place = places.find(p => p.id === params.id);

  if (!place) {
    return <div>Place not found</div>;
  }

  const handleCheckIn = () => {
    setCheckInVerified(true);
  };

  const handleCompare = () => {
    toast({
      title: "Added to comparison",
      description: (
        <div className="flex items-center gap-2">
          <span>Place added to your comparison list.</span>
          <Link href="/compare" className="underline font-semibold">
            View Compare
          </Link>
        </div>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-20">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-8 left-6">
            <Button variant="secondary" size="sm" asChild className="rounded-xl backdrop-blur-sm">
              <Link href="/search">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {place.verified && (
                      <Badge className="bg-primary/90 backdrop-blur-sm">
                        <BadgeCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge variant="secondary" className="backdrop-blur-sm">
                      {place.category}
                    </Badge>
                  </div>
                  <h1 className="font-serif text-5xl text-white">{place.name}</h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{place.location}, {place.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-white" />
                      <span className="text-lg font-semibold">{place.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="icon" className="rounded-xl backdrop-blur-sm">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-xl backdrop-blur-sm"
                    onClick={handleCompare}
                  >
                    <Scale className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-xl backdrop-blur-sm">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-2xl p-8 border-0 shadow-sm">
                <h2 className="font-serif text-2xl text-foreground mb-4">{t.about}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {place.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {place.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="rounded-2xl p-8 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-foreground">{t.reviews}</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-xl">{t.writeReview}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">Write a Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Textarea
                          placeholder="Share your experience..."
                          className="min-h-32 rounded-xl"
                        />
                        <Button className="w-full rounded-xl">Submit Review</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {place.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {place.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-semibold text-foreground">{review.userName}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span className="font-semibold">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to share your experience!
                  </p>
                )}
              </Card>

              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 rounded-xl gap-2">
                      <Camera className="w-4 h-4" />
                      Upload Media
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Upload Photos</DialogTitle>
                    </DialogHeader>
                    <div className="py-8 text-center text-muted-foreground">
                      Upload interface would go here
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 rounded-xl gap-2">
                      <Flag className="w-4 h-4" />
                      Report Issue
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Report an Issue</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea
                        placeholder="Describe the issue..."
                        className="min-h-32 rounded-xl"
                      />
                      <Button className="w-full rounded-xl">Submit Report</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl p-6 border-0 shadow-lg sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl text-foreground">{t.trustSignals}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BadgeCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{t.trustBadge}</div>
                        <div className="text-sm text-muted-foreground">{t.verifiedEst}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{t.trustScore}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${place.trustScore}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground">{place.trustScore}%</span>
                    </div>
                  </div>

                  {place.verifiedBills.length > 0 && (
                    <div className="p-4 bg-muted rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{t.verifiedBills}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {place.verifiedBills.length} {place.verifiedBills.length !== 1 ? `${t.verifiedTransaction}s` : t.verifiedTransaction}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  {!checkInVerified ? (
                    <Button onClick={handleCheckIn} className="w-full rounded-xl gap-2">
                      <MapPin className="w-4 h-4" />
                      {t.verifyCheckin}
                    </Button>
                  ) : (
                    <div className="text-center py-4 space-y-2">
                      <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                      <div className="font-semibold text-foreground">Check-in Verified!</div>
                      <p className="text-sm text-muted-foreground">
                        Thank you for contributing to our trust network
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border text-center">
                  <Button variant="outline" asChild className="w-full rounded-xl">
                    <Link href="/profile/collections">Save to Collection</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
