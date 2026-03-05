'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Navigation as Nav, CircleAlert as AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function GuideModePage() {
  const params = useParams();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <Button variant="ghost" asChild className="rounded-xl">
            <Link href={`/trip/${params.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Guide Mode
            </Link>
          </Button>

          <Card className="rounded-2xl p-8 border-0 shadow-lg text-center space-y-6">
            <Nav className="w-16 h-16 text-primary mx-auto" />
            <div className="space-y-2">
              <h1 className="font-serif text-3xl text-foreground">Active Navigation</h1>
              <p className="text-muted-foreground">
                Real-time guidance for your journey
              </p>
            </div>

            <Button onClick={() => setShowAlert(true)} variant="outline" className="rounded-xl">
              Simulate Disruption Alert
            </Button>
          </Card>

          <Dialog open={showAlert} onOpenChange={setShowAlert}>
            <DialogContent className="sm:max-w-lg rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  Re-plan Alert
                </DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Alert>
                  <AlertDescription>
                    Your planned restaurant is unexpectedly closed. Would you like AI to suggest alternatives?
                  </AlertDescription>
                </Alert>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowAlert(false)} className="flex-1 rounded-xl">
                    Dismiss
                  </Button>
                  <Button className="flex-1 rounded-xl">
                    Find Alternatives
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
