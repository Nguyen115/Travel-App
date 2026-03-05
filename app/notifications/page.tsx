'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, MapPin, MessageSquare, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

const iconMap = {
  trip: MapPin,
  community: MessageSquare,
  report: Shield,
  system: Bell,
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useApp();

  const handleMarkRead = (id: string) => {
    markNotificationRead(id);
  };

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationRead(n.id);
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl text-foreground mb-2">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllRead}
                className="rounded-xl"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <Card className="rounded-2xl p-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2">
                  No notifications yet
                </h3>
                <p className="text-muted-foreground">
                  We'll notify you about important updates and activities
                </p>
              </Card>
            ) : (
              notifications.map((notification, index) => {
                const Icon = iconMap[notification.type];
                const isUnread = !notification.read;

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`rounded-2xl p-6 transition-all ${
                        isUnread
                          ? 'bg-primary/5 border-primary/20 shadow-sm'
                          : 'bg-card hover:shadow-sm'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isUnread ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isUnread ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">
                                  {notification.title}
                                </h3>
                                {isUnread && (
                                  <Badge variant="default" className="h-5 px-2">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm">
                                {notification.message}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(notification.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            {notification.actionUrl && (
                              <Button
                                variant={isUnread ? 'default' : 'outline'}
                                size="sm"
                                asChild
                                className="rounded-xl"
                                onClick={() => handleMarkRead(notification.id)}
                              >
                                <Link href={notification.actionUrl}>
                                  View Details
                                </Link>
                              </Button>
                            )}

                            {isUnread && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkRead(notification.id)}
                                className="rounded-xl"
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
