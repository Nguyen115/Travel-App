'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, Plus, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockCommunityGuides } from '@/lib/mockData';
import { CommunityGuide } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CommunityPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGuides, setFilteredGuides] = useState<CommunityGuide[]>(mockCommunityGuides);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockCommunityGuides.filter(
        guide =>
          guide.title.toLowerCase().includes(query.toLowerCase()) ||
          guide.destination.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGuides(filtered);
    } else {
      setFilteredGuides(mockCommunityGuides);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-serif text-5xl text-foreground mb-4">{t.inspireTitle}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t.inspireSubtitle}
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t.searchGuides}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 rounded-full h-12 bg-white border-slate-200 shadow-sm"
              />
            </div>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGuides.map((guide) => (
                <Link key={guide.id} href={`/community/guide/${guide.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative rounded-2xl overflow-hidden h-72 mb-3 bg-slate-100">
                      <img
                        src={guide.coverImage}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <div className="bg-black/50 text-white backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                          {guide.placeCount} {t.places}
                        </div>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex items-end gap-3">
                        <img
                          src={guide.authorAvatar}
                          alt={guide.authorName}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/80">{t.by}</p>
                          <p className="font-medium text-sm truncate">{guide.authorName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{guide.destination}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">No guides found</p>
              <p className="text-muted-foreground">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
