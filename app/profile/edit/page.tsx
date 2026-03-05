'use client';

import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EditProfilePage() {
  const { user } = useApp();
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Button variant="ghost" asChild className="mb-8 rounded-xl">
            <Link href="/profile"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <Card className="rounded-2xl p-10 border-0 shadow-lg">
            <h1 className="font-serif text-3xl text-foreground mb-8">{t.editProfile}</h1>
            <form className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-border">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <Button type="button" variant="outline" className="rounded-xl">
                    {t.editProfilePic}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t.editProfilePicHint}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t.fullName}</Label>
                <Input id="name" defaultValue={user.name} className="h-12 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t.bio}</Label>
                <Textarea id="bio" defaultValue={user.bio} className="min-h-24 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t.location}</Label>
                <Input id="location" defaultValue={user.location} className="h-12 rounded-2xl" />
              </div>
              <Button className="w-full h-12 rounded-2xl bg-[#4E7360] hover:bg-[#3f5d4f]">{t.saveChanges}</Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
