'use client';

import { useState } from 'react';
import { FileText, Calendar, Download, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toastManager } from '@/services/toastManager';

interface TripExportDropdownProps {
  tripTitle: string;
}

export function TripExportDropdown({ tripTitle }: TripExportDropdownProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<'pdf' | 'calendar' | null>(null);

  const handleExport = async (type: 'pdf' | 'calendar') => {
    setLoading(type);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (type === 'pdf') {
        toastManager.success('PDF downloading...');
      } else {
        toastManager.success('Opening calendar sync...');
      }
      setIsOpen(false);
    } catch (error) {
      toastManager.error('Export failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        variant="outline"
        className="rounded-full border-slate-200 text-foreground hover:bg-slate-50 h-11 px-6"
      >
        <Download className="w-4 h-4 mr-2" />
        <span>{t.exportTrip}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-slate-100 p-2 z-50">
          <div className="space-y-1">
            <button
              onClick={() => handleExport('pdf')}
              disabled={loading !== null}
              className="w-full flex items-start gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                {loading === 'pdf' ? (
                  <Loader className="w-5 h-5 text-red-600 animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{t.exportPdf}</h3>
                <p className="text-xs text-muted-foreground">Save your itinerary offline</p>
              </div>
            </button>

            <button
              onClick={() => handleExport('calendar')}
              disabled={loading !== null}
              className="w-full flex items-start gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                {loading === 'calendar' ? (
                  <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <Calendar className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{t.exportCalendar}</h3>
                <p className="text-xs text-muted-foreground">Add events to your calendar</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
