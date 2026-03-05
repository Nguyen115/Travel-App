'use client';

import Link from 'next/link';
import { ArrowLeft, Users, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockUsers = [
  { id: 'USR001', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'active', joinDate: '2024-01-15' },
  { id: 'USR002', name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'active', joinDate: '2024-02-01' },
  { id: 'USR003', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'suspended', joinDate: '2024-01-20' },
  { id: 'USR004', name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'active', joinDate: '2024-03-10' },
  { id: 'USR005', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', joinDate: '2024-02-28' },
  { id: 'USR006', name: 'Diana Lee', email: 'diana@example.com', role: 'Moderator', status: 'suspended', joinDate: '2024-01-05' },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" asChild className="mb-4 rounded-xl">
          <Link href="/admin"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Link>
        </Button>
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="font-serif text-4xl text-foreground">User Management</h1>
        </div>
      </div>

      <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">User</th>
                <th className="text-left p-4 font-semibold text-foreground">Email</th>
                <th className="text-left p-4 font-semibold text-foreground">Role</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Joined</th>
                <th className="text-left p-4 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{user.email}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      className="capitalize"
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{user.joinDate}</span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-lg">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Reactivate User</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
