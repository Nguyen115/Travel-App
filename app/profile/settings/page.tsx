'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Bell, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';

export default function SettingsPage() {
  const { logout } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/profile"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <h1 className="font-serif text-4xl text-foreground mb-8">Settings</h1>

          <div className="space-y-6">
            <Card className="rounded-2xl p-8 border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl text-foreground">Privacy & Consent</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Location Tracking</Label>
                    <p className="text-sm text-muted-foreground">Allow location-based recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl p-8 border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl text-foreground">Notifications</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Trip Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your trips</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Community Activity</Label>
                    <p className="text-sm text-muted-foreground">Notifications for reviews and comments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl p-8 border-0 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl text-foreground">Security</h2>
              </div>
              <div className="space-y-4">
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link href="/profile/change-password">Change Password</Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl">Two-Factor Authentication</Button>
              </div>
            </Card>

            <Card className="rounded-2xl p-8 border-0 shadow-sm border-destructive/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-1">Sign Out</h2>
                  <p className="text-sm text-muted-foreground">You will be returned to the home page</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="rounded-xl gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
