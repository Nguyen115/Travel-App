'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, TrendingUp, TrendingDown, CircleAlert as AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockEntities = [
  {
    id: 'USR001',
    name: 'John Doe',
    type: 'User',
    trustScore: 92,
    previousScore: 95,
    recentEvent: 'Positive review submitted',
    eventDate: '2024-03-10',
    trend: 'down',
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    type: 'Merchant',
    trustScore: 88,
    previousScore: 88,
    recentEvent: 'No recent violations',
    eventDate: '2024-03-05',
    trend: 'stable',
  },
  {
    id: 'USR003',
    name: 'Bob Johnson',
    type: 'User',
    trustScore: 75,
    previousScore: 85,
    recentEvent: 'Strike received for violating guidelines',
    eventDate: '2024-03-08',
    trend: 'down',
  },
  {
    id: 'USR004',
    name: 'Alice Brown',
    type: 'Merchant',
    trustScore: 96,
    previousScore: 93,
    recentEvent: 'Verified documentation submitted',
    eventDate: '2024-03-09',
    trend: 'up',
  },
  {
    id: 'USR005',
    name: 'Charlie Wilson',
    type: 'User',
    trustScore: 82,
    previousScore: 82,
    recentEvent: 'Account activity normal',
    eventDate: '2024-02-28',
    trend: 'stable',
  },
  {
    id: 'USR006',
    name: 'Diana Lee',
    type: 'Merchant',
    trustScore: 65,
    previousScore: 70,
    recentEvent: 'Multiple reports filed',
    eventDate: '2024-03-06',
    trend: 'down',
  },
];

const getTrustColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-blue-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

const getTrustBgColor = (score: number) => {
  if (score >= 90) return 'bg-green-50';
  if (score >= 75) return 'bg-blue-50';
  if (score >= 60) return 'bg-yellow-50';
  return 'bg-red-50';
};

export default function TrustPage() {
  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" asChild className="mb-4 rounded-xl">
          <Link href="/admin"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Link>
        </Button>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-serif text-4xl text-foreground">Trust Score System</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-2xl p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">Average Trust Score</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-foreground">83.2</div>
          <div className="text-xs text-muted-foreground mt-2">Across all entities</div>
        </Card>

        <Card className="rounded-2xl p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">At Risk Entities</span>
            <AlertCircle className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-3xl font-bold text-foreground">2</div>
          <div className="text-xs text-muted-foreground mt-2">Score below 70</div>
        </Card>

        <Card className="rounded-2xl p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">Verified Entities</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-foreground">4</div>
          <div className="text-xs text-muted-foreground mt-2">Score 90+</div>
        </Card>
      </div>

      <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Entity</th>
                <th className="text-left p-4 font-semibold text-foreground">Type</th>
                <th className="text-left p-4 font-semibold text-foreground">Trust Score</th>
                <th className="text-left p-4 font-semibold text-foreground">Recent Event</th>
                <th className="text-left p-4 font-semibold text-foreground">Date</th>
                <th className="text-left p-4 font-semibold text-foreground">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockEntities.map((entity) => (
                <tr key={entity.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{entity.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{entity.id}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{entity.type}</Badge>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${getTrustBgColor(entity.trustScore)}`}>
                      <span className={getTrustColor(entity.trustScore)}>{entity.trustScore}</span>
                      <span className="text-muted-foreground">/100</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{entity.recentEvent}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{entity.eventDate}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {entity.trend === 'up' && (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">+{entity.trustScore - entity.previousScore}</span>
                        </>
                      )}
                      {entity.trend === 'down' && (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-600 font-medium">{entity.trustScore - entity.previousScore}</span>
                        </>
                      )}
                      {entity.trend === 'stable' && (
                        <span className="text-sm text-muted-foreground font-medium">Stable</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
