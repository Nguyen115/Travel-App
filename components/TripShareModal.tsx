'use client';

import { useState } from 'react';
import { X, Mail, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { toastManager } from '@/services/toastManager';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: 'editor' | 'viewer';
}

interface TripShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripTitle: string;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69dad0?w=100&h=100&fit=crop',
    role: 'editor',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'editor',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'viewer',
  },
];

export function TripShareModal({ open, onOpenChange, tripTitle }: TripShareModalProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState(mockMembers);

  const handleInvite = () => {
    if (!email.trim()) {
      toastManager.error('Please enter an email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toastManager.error('Please enter a valid email address');
      return;
    }

    toastManager.success(`Invitation sent to ${email}!`);
    setEmail('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white rounded-3xl p-8 shadow-2xl border-0">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">{t.inviteFriends}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Email</label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t.inviteEmailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleInvite()}
                className="rounded-xl h-11 bg-secondary border-none text-foreground placeholder-muted-foreground"
              />
              <Button
                onClick={handleInvite}
                className="rounded-xl h-11 bg-orange-600 hover:bg-orange-700 text-white px-6 font-medium"
              >
                {t.sendInvite}
              </Button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t.tripMembers}
            </h3>

            <div className="space-y-2">
              {members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full text-xs shrink-0 bg-orange-100 text-orange-700 border-0"
                  >
                    {member.role === 'editor' ? 'Editor' : 'Viewer'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl h-11 bg-orange-600 hover:bg-orange-700 text-white font-medium"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
