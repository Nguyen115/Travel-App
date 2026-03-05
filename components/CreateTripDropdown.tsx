'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Sparkles, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function CreateTripDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Create Trip</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-card rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
          <div className="space-y-2">
            <Link href="/trip/create" onClick={() => setIsOpen(false)}>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-[#FAF5F0] flex items-center justify-center shrink-0 group-hover:bg-[#F5EBE0] transition-colors">
                  <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-sm">{t.planWithAI}</h3>
                  <p className="text-xs text-muted-foreground">{t.planWithAIDesc}</p>
                </div>
              </div>
            </Link>

            <Link href="/trip/manual-setup" onClick={() => setIsOpen(false)}>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-200 transition-colors">
                  <FileText className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-sm">{t.createManually}</h3>
                  <p className="text-xs text-muted-foreground">{t.createManuallyDesc}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
