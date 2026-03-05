'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

const EXCLUDED_PATHS = ['/splash', '/start', '/auth'];

export function MobileHeader() {
  const pathname = usePathname();
  const { notifications } = useApp();
  const isAdmin = pathname.startsWith('/admin');
  const isExcluded = EXCLUDED_PATHS.includes(pathname);
  const unreadCount = notifications.filter(n => !n.read).length;

  if (isAdmin || isExcluded) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border md:hidden">
      <div className="flex items-center justify-between px-4 py-4 safe-area-inset-top">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <span className="font-serif text-lg text-foreground">Voyager</span>
        </Link>

        <Link href="/notifications" className="relative">
          <Bell className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-1.5 min-w-[20px] h-5 flex items-center justify-center text-[10px]">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Link>
      </div>
    </header>
  );
}
