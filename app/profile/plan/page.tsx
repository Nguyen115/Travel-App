'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';

export default function PlanPage() {
  const { user } = useApp();
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/profile"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <h1 className="font-serif text-4xl text-foreground mb-8">Membership Plan</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl p-8 border-0 shadow-sm">
              <h3 className="font-serif text-2xl text-foreground mb-4">Free</h3>
              <div className="text-3xl font-bold text-foreground mb-6">$0<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-6">
                {['Basic search', 'Save places', 'View reviews'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="rounded-2xl p-8 border-2 border-primary shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-amber-600" />
                <h3 className="font-serif text-2xl text-foreground">VIP</h3>
              </div>
              <div className="text-3xl font-bold text-foreground mb-6">$19<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-6">
                {['AI trip planning', 'Priority support', 'Exclusive content', 'Early access'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              {user.plan === 'vip' ? (
                <Button disabled className="w-full rounded-xl">Current Plan</Button>
              ) : (
                <Button onClick={() => setShowUpgrade(true)} className="w-full rounded-xl">Upgrade to VIP</Button>
              )}
            </Card>
          </div>

          <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
            <DialogContent className="sm:max-w-lg rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Upgrade to VIP</DialogTitle>
              </DialogHeader>
              <div className="py-6 text-center space-y-4">
                <Crown className="w-16 h-16 text-amber-600 mx-auto" />
                <p className="text-muted-foreground">Payment integration would go here</p>
                <Button className="w-full rounded-xl">Complete Upgrade</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
