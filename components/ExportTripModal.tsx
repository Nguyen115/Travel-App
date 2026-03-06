'use client';

import { FileText, Map, Download, Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toastManager } from '@/services/toastManager';

interface ExportTripModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripTitle: string;
}

export function ExportTripModal({ open, onOpenChange, tripTitle }: ExportTripModalProps) {
  const [loading, setLoading] = useState<'pdf' | 'maps' | null>(null);

  const handleExport = async (format: 'pdf' | 'maps') => {
    setLoading(format);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (format === 'pdf') {
        toastManager.success('PDF downloaded! Check your downloads folder.');
      } else {
        toastManager.success('Redirecting to Google Maps...');
        window.open('https://maps.google.com', '_blank');
      }

      onOpenChange(false);
    } catch (error) {
      toastManager.error('Export failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export "{tripTitle}"</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-6">
          <p className="text-sm text-muted-foreground">Choose how you'd like to save your itinerary:</p>

          <Button
            onClick={() => handleExport('pdf')}
            disabled={loading !== null}
            variant="outline"
            className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            {loading === 'pdf' ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-xs">Generating PDF...</span>
              </>
            ) : (
              <>
                <FileText className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                <div>
                  <div className="font-medium text-sm">Download as PDF</div>
                  <div className="text-xs text-muted-foreground">For offline viewing</div>
                </div>
              </>
            )}
          </Button>

          <Button
            onClick={() => handleExport('maps')}
            disabled={loading !== null}
            variant="outline"
            className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            {loading === 'maps' ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-xs">Syncing...</span>
              </>
            ) : (
              <>
                <Map className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                <div>
                  <div className="font-medium text-sm">Sync to Google Maps</div>
                  <div className="text-xs text-muted-foreground">For navigation</div>
                </div>
              </>
            )}
          </Button>

          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            className="w-full rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
