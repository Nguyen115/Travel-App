'use client';

import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead } = useApp();
  const { t } = useLanguage();
  const unreadCount = notifications.filter(n => !n.read).length;

  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <Badge className="absolute top-0 right-0 px-1.5 min-w-[20px] h-5 flex items-center justify-center text-[10px]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{t.notifications}</h3>
              {unreadCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  {unreadCount} {unreadCount === 1 ? 'new' : 'new'}
                </span>
              )}
            </div>

            {recentNotifications.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border ${
                      notif.read
                        ? 'bg-card border-border'
                        : 'bg-primary/5 border-primary/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <button
                          onClick={() => markNotificationRead(notif.id)}
                          className="p-1 hover:bg-slate-200/50 rounded transition-colors shrink-0"
                          title={t.markRead}
                        >
                          <Check className="w-4 h-4 text-primary" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">{t.notificationEmpty}</p>
              </div>
            )}

            <Button
              variant="ghost"
              className="w-full rounded-lg text-primary hover:bg-primary/5"
              asChild
            >
              <a href="/notifications">{t.viewAll}</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
