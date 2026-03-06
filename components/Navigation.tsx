'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Search, Sparkles, User, LayoutDashboard, LogIn, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreateTripDropdown } from '@/components/CreateTripDropdown';
import { NotificationPopover } from '@/components/NotificationPopover';

export function Navigation() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useApp();
  const { language, setLanguage, t } = useLanguage();

  const isAdmin = user?.email === 'admin@voyager.com';

  const leftItems = [
    { href: '/', icon: Compass, label: t.discover },
    { href: '/community', icon: Sparkles, label: 'Inspiration' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-b border-border z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-2xl text-foreground">Voyager</span>
          </Link>

          <div className="flex items-center gap-3">
            {leftItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));

              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <Link href={item.href}>
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}

            {isAdmin && (
              <Button
                variant={pathname === '/admin' ? 'default' : 'ghost'}
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link href="/admin">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span>{t.admin}</span>
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <CreateTripDropdown />

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <Button
                variant={pathname === '/search' ? 'default' : 'ghost'}
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link href="/search">
                  <Search className="w-4 h-4 mr-2" />
                  <span>{t.search}</span>
                </Link>
              </Button>

              {isAuthenticated ? (
                <Button
                  variant={pathname === '/profile' || (pathname.startsWith('/profile/') && !pathname.startsWith('/profile/trips')) ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <Link href="/profile">
                    <User className="w-4 h-4 mr-2" />
                    <span>{t.profile}</span>
                  </Link>
                </Button>
              ) : (
                <Button
                  size="sm"
                  asChild
                  className="rounded-full gap-2"
                >
                  <Link href="/auth">
                    <LogIn className="w-4 h-4" />
                    <span>{t.signIn}</span>
                  </Link>
                </Button>
              )}
            </div>

            <NotificationPopover />

            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
                  language === 'en'
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground/50 text-xs">|</span>
              <button
                onClick={() => setLanguage('vi')}
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
                  language === 'vi'
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                VI
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
