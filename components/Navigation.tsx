'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Search, MapPin, Bell, User, LayoutDashboard, LogIn, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function Navigation() {
  const pathname = usePathname();
  const { notifications, user, isAuthenticated } = useApp();
  const { language, setLanguage, t } = useLanguage();

  const unreadCount = notifications.filter(n => !n.read).length;
  const isAdmin = user?.email === 'admin@voyager.com';

  const navItems = [
    { href: '/', icon: Compass, label: t.discover },
    { href: '/search', icon: Search, label: t.search },
    { href: '/community', icon: Sparkles, label: 'Inspiration' },
    { href: '/profile/trips', icon: MapPin, label: t.myTrips },
    { href: '/notifications', icon: Bell, label: t.notifications, badge: unreadCount },
  ];

  if (isAdmin) {
    navItems.push({ href: '/admin', icon: LayoutDashboard, label: t.admin });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-b border-border z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-2xl text-foreground">Voyager</span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));

              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                  className="relative rounded-full"
                >
                  <Link href={item.href}>
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge className="ml-2 px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}

            {isAuthenticated ? (
              <Button
                variant={pathname === '/profile' || (pathname.startsWith('/profile/') && !pathname.startsWith('/profile/trips')) ? 'default' : 'ghost'}
                size="sm"
                asChild
                className="relative rounded-full"
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
