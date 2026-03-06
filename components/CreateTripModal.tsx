'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CreateTripModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTripModal({ open, onOpenChange }: CreateTripModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{t.newTrip}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-6">
          <Button
            asChild
            onClick={() => onOpenChange(false)}
            className="w-full h-32 rounded-2xl flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary hover:border-primary/80 hover:from-primary/20 hover:to-primary/10 transition-all"
          >
            <Link href="/trip/create">
              <Sparkles className="w-8 h-8 text-primary" />
              <div className="text-center">
                <div className="font-semibold text-foreground">{t.aiPlannerBadge}</div>
                <div className="text-xs text-muted-foreground">AI-powered planning</div>
              </div>
            </Link>
          </Button>

          <Button
            asChild
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full h-32 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <Link href="/trip/manual-setup">
              <Calendar className="w-8 h-8 text-foreground/70" />
              <div className="text-center">
                <div className="font-semibold text-foreground">{t.createManualTitle}</div>
                <div className="text-xs text-muted-foreground">Build step by step</div>
              </div>
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
