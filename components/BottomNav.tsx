'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Search, Plus, User, Globe } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useApp();

  const items = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/trip/create', icon: Plus, label: 'New Trip', isCTA: true },
    { href: '/community', icon: Globe, label: 'Community' },
    { href: isAuthenticated ? '/profile' : '/auth', icon: User, label: isAuthenticated ? 'Profile' : 'Sign In' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          if (item.isCTA) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
