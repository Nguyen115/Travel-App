'use client';

import Link from 'next/link';
import { Compass, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="hidden md:block bg-secondary border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="font-serif text-2xl text-foreground">Voyager</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Discover extraordinary places. Plan journeys that matter. Travel with intention and grace.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
                  language === 'en' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                English
              </button>
              <span className="text-muted-foreground/50 text-xs">|</span>
              <button
                onClick={() => setLanguage('vi')}
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
                  language === 'vi' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm tracking-wide uppercase">Legal</h4>
            <ul className="space-y-3">
              {['Trust & Safety', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Voyager. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Premium Travel Discovery Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
