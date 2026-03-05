'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, TriangleAlert as AlertTriangle, Ban, OctagonAlert as AlertOctagon, CircleCheck as CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { StrikeLadder } from '@/components/admin';
import { useApp } from '@/contexts/AppContext';

export default function AuditViewPage() {
  const params = useParams();
  const { moderationCases, updateModerationCase } = useApp();
  const [notes, setNotes] = useState('');

  const moderationCase = moderationCases.find(c => c.id === params.id);

  if (!moderationCase) return null;

  const handleAction = (action: string) => {
    updateModerationCase(moderationCase.id, { status: 'resolved' });
  };

  const strikeLevel = moderationCase.strikeCount || 0;
  const maxStrikes = 3;

  return (
    <div className="space-y-8">
          <Button variant="ghost" asChild className="rounded-xl">
            <Link href="/admin/reports"><ArrowLeft className="w-4 h-4 mr-2" />Back to Reports</Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-2xl p-8 border-0 shadow-lg">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                      <h1 className="font-serif text-3xl text-foreground">Case #{moderationCase.id}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">{moderationCase.type}</Badge>
                      <Badge variant="destructive" className="capitalize">{moderationCase.severity}</Badge>
                      <Badge variant="secondary" className="capitalize">{moderationCase.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Rule Violated</div>
                    <div className="text-foreground">{moderationCase.ruleViolated}</div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="text-sm font-semibold text-foreground mb-3">Target Entity</div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Target User:</span>
                        <span className="text-sm font-semibold text-foreground">@johndoe</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Target ID:</span>
                        <span className="text-sm font-mono text-foreground">{moderationCase.reportedContentId}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Reported Content</div>
                    <div className="p-4 bg-muted rounded-xl text-foreground">{moderationCase.content}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">Report Date</div>
                      <div className="text-sm text-foreground">{moderationCase.reportDate}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">Report Status</div>
                      <Badge variant="secondary" className="capitalize">{moderationCase.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold text-muted-foreground">Moderation Notes</div>
                  <Textarea
                    placeholder="Add notes about your decision..."
                    className="min-h-24 rounded-xl"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </Card>

              <Card className="rounded-2xl p-8 border-0 shadow-sm">
                <h3 className="font-serif text-xl text-foreground mb-4">Moderation Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleAction('dismiss')}
                    className="rounded-xl gap-2 justify-start"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Dismiss Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAction('warn')}
                    className="rounded-xl gap-2 justify-start"
                  >
                    <AlertOctagon className="w-4 h-4" />
                    Issue Warning
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAction('freeze')}
                    className="rounded-xl gap-2 justify-start"
                  >
                    <Ban className="w-4 h-4" />
                    Freeze Badge
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleAction('suspend')}
                    className="rounded-xl gap-2 justify-start"
                  >
                    <Ban className="w-4 h-4" />
                    Suspend Account
                  </Button>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <StrikeLadder strikeLevel={strikeLevel} maxStrikes={maxStrikes} />

              <Card className="rounded-2xl p-6 border-0 shadow-sm">
                <h3 className="font-serif text-lg text-foreground mb-3">Reporter Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID</span>
                    <span className="font-mono text-foreground">{moderationCase.reportedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reports Filed</span>
                    <span className="text-foreground">3</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
    </div>
  );
}
