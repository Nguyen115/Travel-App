'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Clock, Navigation as Nav, CloudLightning, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { InteractiveMap } from '@/components/InteractiveMap';

export default function GuideModePage() {
  const params = useParams();
  const { t } = useLanguage();
  const [showAlert, setShowAlert] = useState(false);

  const mockActivities = [
    { id: '1', placeName: 'Ben Thanh Market', category: 'tourist', day: 1, time: '09:00' },
    { id: '2', placeName: 'Coffee Shop', category: 'cafe', day: 1, time: '11:00' },
    { id: '3', placeName: 'Restaurant', category: 'food', day: 1, time: '19:00' },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-slate-100">
      <InteractiveMap activities={mockActivities} />

      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-40 flex justify-between items-start pointer-events-none">
        <Button
          asChild
          className="pointer-events-auto bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-sm font-medium hover:bg-white hover:shadow-md transition-all"
          variant="ghost"
        >
          <Link href={`/trip/${params.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.exit_guide}
          </Link>
        </Button>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#C17C5B] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 z-40 w-11/12 max-w-md pointer-events-none">
        <ArrowRight className="w-5 h-5 flex-shrink-0" />
        <div className="text-left">
          <p className="text-sm font-medium opacity-90">Next:</p>
          <p className="font-serif text-lg">{t.turn_right}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 md:p-8 z-40 pointer-events-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">{t.next_stop}</p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">Ben Thanh Market</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-3 rounded-xl">
                <Clock className="w-5 h-5 text-[#C17C5B]" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{t.eta}</p>
                <p className="font-medium text-foreground">15 min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-[#C17C5B]" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{t.distance}</p>
                <p className="font-medium text-foreground">1.2 km</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAlert(true)}
            className="text-xs text-slate-300 underline mt-4 hover:text-slate-400 transition-colors"
          >
            {t.simulate_incident}
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-in">
          <div className="bg-white w-full sm:w-[480px] rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 animate-in slide-in-from-bottom-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <CloudLightning className="w-6 h-6 text-red-500" />
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif text-2xl text-red-600 mb-3">{t.alert_title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{t.alert_desc}</p>

            <div className="mt-6 p-4 border border-[#C17C5B]/20 bg-[#FAF5F0] rounded-2xl flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-lg text-[#C17C5B] mb-1">{t.alternative_place}</h4>
                <p className="text-sm text-slate-500">{t.alternative_desc}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => setShowAlert(false)}
                className="bg-[#C17C5B] text-white w-full py-4 rounded-full font-medium hover:bg-[#B56D4A] transition-colors shadow-md"
              >
                {t.accept_replan}
              </button>
              <button
                onClick={() => setShowAlert(false)}
                className="bg-transparent text-slate-500 w-full py-3 font-medium hover:bg-slate-50 rounded-full transition-colors"
              >
                {t.keep_original}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
