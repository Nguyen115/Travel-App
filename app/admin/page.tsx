'use client';

import Link from 'next/link';
import { LayoutDashboard, TriangleAlert as AlertTriangle, Users, MapPin, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export default function AdminDashboardPage() {
  const { moderationCases, places } = useApp();

  const pendingCases = moderationCases.filter(c => c.status === 'pending').length;
  const criticalCases = moderationCases.filter(c => c.severity === 'critical').length;

  return (
    <div className="space-y-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            <h1 className="font-serif text-4xl text-foreground">Admin Dashboard</h1>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <span className="text-3xl font-bold text-foreground">{pendingCases}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Pending Reports</h3>
              <p className="text-sm text-muted-foreground">Awaiting review</p>
            </Card>

            <Card className="rounded-2xl p-6 border-0 shadow-sm bg-destructive/10">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-destructive" />
                <span className="text-3xl font-bold text-foreground">{criticalCases}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Critical Cases</h3>
              <p className="text-sm text-muted-foreground">Require immediate action</p>
            </Card>

            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <MapPin className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold text-foreground">{places.length}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Total Places</h3>
              <p className="text-sm text-muted-foreground">In database</p>
            </Card>

            <Card className="rounded-2xl p-6 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold text-foreground">1.2k</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Active Users</h3>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/admin/reports">
              <Card className="rounded-2xl p-8 border-0 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-foreground">Report Queue</h3>
                      <p className="text-muted-foreground">Review flagged content</p>
                    </div>
                  </div>
                  {pendingCases > 0 && (
                    <Badge variant="destructive" className="text-base px-3 py-1">
                      {pendingCases}
                    </Badge>
                  )}
                </div>
              </Card>
            </Link>

            <Link href="/admin/users">
              <Card className="rounded-2xl p-8 border-0 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">User Management</h3>
                    <p className="text-muted-foreground">Manage user accounts</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/admin/places">
              <Card className="rounded-2xl p-8 border-0 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">Place Verification</h3>
                    <p className="text-muted-foreground">Verify new submissions</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/admin/trust">
              <Card className="rounded-2xl p-8 border-0 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">Trust Score System</h3>
                    <p className="text-muted-foreground">Monitor trust metrics</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <Card className="rounded-2xl p-8 border-0 shadow-sm">
            <h3 className="font-serif text-2xl text-foreground mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {moderationCases.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-4">
                    <Badge variant={item.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {item.severity}
                    </Badge>
                    <div>
                      <div className="font-medium text-foreground">{item.ruleViolated}</div>
                      <div className="text-sm text-muted-foreground">{item.type} report</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.reportDate}</div>
                </div>
              ))}
            </div>
          </Card>
    </div>
  );
}
