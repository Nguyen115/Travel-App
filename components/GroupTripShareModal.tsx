'use client';

import { useState } from 'react';
import { Copy, Users, Mail, MessageCircle, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toastManager } from '@/services/toastManager';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: 'organizer' | 'member';
}

interface GroupTripShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripTitle: string;
  members?: Member[];
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69dad0?w=100&h=100&fit=crop',
    role: 'organizer',
  },
  {
    id: '2',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'member',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'member',
  },
];

export function GroupTripShareModal({
  open,
  onOpenChange,
  tripTitle,
  members = mockMembers,
}: GroupTripShareModalProps) {
  const [shareLink, setShareLink] = useState('https://voyager.app/trip/share/abc123xyz');
  const [inviteCode, setInviteCode] = useState('TRIP2024');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [copied, setCopied] = useState<'link' | 'code' | null>(null);

  const handleCopy = (text: string, type: 'link' | 'code') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toastManager.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInvite = () => {
    if (!newMemberEmail) {
      toastManager.error('Please enter an email address');
      return;
    }
    toastManager.success(`Invitation sent to ${newMemberEmail}`);
    setNewMemberEmail('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{tripTitle} - Share & Invite</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Shareable Link</h3>
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="text-sm rounded-lg h-10"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(shareLink, 'link')}
                className="shrink-0 rounded-lg"
              >
                {copied === 'link' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Anyone with this link can view the itinerary</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Invite Code</h3>
            <div className="flex gap-2">
              <Input
                value={inviteCode}
                readOnly
                className="text-sm rounded-lg h-10 font-mono font-bold text-center"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(inviteCode, 'code')}
                className="shrink-0 rounded-lg"
              >
                {copied === 'code' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Share this code to add members</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Invite Members</h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="email@example.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="text-sm rounded-lg h-10"
              />
              <Button
                size="sm"
                onClick={handleInvite}
                className="shrink-0 rounded-lg gap-1"
              >
                <Mail className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Members ({members.length})
              </h3>
            </div>

            <div className="space-y-2">
              {members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                      {member.role === 'organizer' && (
                        <p className="text-xs text-muted-foreground">Organizer</p>
                      )}
                    </div>
                  </div>
                  {member.role === 'organizer' && (
                    <Badge variant="secondary" className="rounded-full text-xs shrink-0">
                      Organizer
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button onClick={() => onOpenChange(false)} className="w-full rounded-lg">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
