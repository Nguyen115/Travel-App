'use client';

import Link from 'next/link';
import { ArrowLeft, TriangleAlert as AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export default function ReportsPage() {
  const { moderationCases } = useApp();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
          <div>
            <Button variant="ghost" asChild className="mb-4 rounded-xl">
              <Link href="/admin"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Link>
            </Button>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h1 className="font-serif text-4xl text-foreground">Report Queue</h1>
            </div>
          </div>

          <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Case ID</th>
                    <th className="text-left p-4 font-semibold text-foreground">Type</th>
                    <th className="text-left p-4 font-semibold text-foreground">Rule Violated</th>
                    <th className="text-left p-4 font-semibold text-foreground">Severity</th>
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-foreground">Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {moderationCases.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <span className="font-mono text-sm text-foreground">{item.id}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">{item.type}</Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-foreground">{item.ruleViolated}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant={getSeverityColor(item.severity)} className="capitalize">
                          {item.severity}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className="capitalize">{item.status}</Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">{item.reportDate}</span>
                      </td>
                      <td className="p-4">
                        <Button size="sm" variant="ghost" asChild className="rounded-lg">
                          <Link href={`/admin/audit/${item.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Link>
                        </Button>
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
