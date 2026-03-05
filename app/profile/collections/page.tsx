'use client';

import Link from 'next/link';
import { ArrowLeft, Plus, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export default function CollectionsPage() {
  const { user } = useApp();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="pt-24 pb-20 md:pb-16">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" asChild className="mb-4 rounded-xl">
                <Link href="/profile"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
              </Button>
              <h1 className="font-serif text-4xl text-foreground">My Collections</h1>
            </div>
            <Button className="rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              New Collection
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {user.collections.map((collection) => (
              <Link key={collection.id} href={`/profile/collections/${collection.id}`}>
                <Card className="rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-48">
                    <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-xl text-foreground">{collection.name}</h3>
                      <Badge variant="outline" className="gap-1">
                        {collection.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {collection.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{collection.description}</p>
                    <div className="text-sm text-muted-foreground">{collection.placeIds.length} places</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
