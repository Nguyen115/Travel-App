'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard as Edit, MapPin, Calendar, Crown, Bookmark, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfilePage() {
  const { user, logout } = useApp();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <Card className="rounded-3xl p-6 md:p-8 border border-border overflow-hidden w-full">
            <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 sm:w-32 h-24 sm:h-32 rounded-2xl object-cover flex-shrink-0"
              />

              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h1 className="font-serif text-3xl sm:text-4xl text-foreground">{user.name}</h1>
                      {user.plan === 'vip' && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 gap-1">
                          <Crown className="w-3 h-3" />
                          VIP
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{user.bio}</p>
                  </div>
                  <Button variant="outline" asChild className="rounded-xl gap-2 whitespace-nowrap">
                    <Link href="/profile/edit">
                      <Edit className="w-4 h-4" />
                      {t.editProfile}
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{t.memberSince} {new Date(user.memberSince).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.travelStyle.map((style) => (
                    <Badge key={style} variant="secondary" className="rounded-full text-xs">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/profile/collections">
              <Card className="rounded-2xl p-6 border-0 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Bookmark className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{user.collections.length}</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">{t.collections}</h3>
                <p className="text-sm text-muted-foreground">{t.savedPlaces}</p>
              </Card>
            </Link>

            <Link href="/profile/trips">
              <Card className="rounded-2xl p-6 border-0 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{user.trips.length}</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">{t.trips}</h3>
                <p className="text-sm text-muted-foreground">{t.plannedJourneys}</p>
              </Card>
            </Link>

            <Link href="/profile/plan">
              <Card className="rounded-2xl p-6 border-0 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-amber-50 to-amber-100">
                <div className="flex items-center justify-between mb-4">
                  <Crown className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">{t.vipMember}</h3>
                <p className="text-sm text-muted-foreground">{t.managePlan}</p>
              </Card>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Button variant="outline" asChild className="rounded-xl gap-2">
              <Link href="/profile/settings">
                <Settings className="w-4 h-4" />
                {t.accountSettings}
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="rounded-xl gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
              {t.logOut}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
