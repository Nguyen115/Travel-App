'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, CircleCheck as CheckCircle2, Circle as XCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockPlaces = [
  {
    id: 'POI001',
    name: 'Hidden Cafe Saigon',
    submitter: 'John Doe',
    submitterEmail: 'john@example.com',
    documents: 2,
    submittedDate: '2024-03-10',
    category: 'Food & Beverage',
  },
  {
    id: 'POI002',
    name: 'Ancient Temple',
    submitter: 'Jane Smith',
    submitterEmail: 'jane@example.com',
    documents: 3,
    submittedDate: '2024-03-09',
    category: 'Cultural',
  },
  {
    id: 'POI003',
    name: 'Mountain Vista',
    submitter: 'Bob Johnson',
    submitterEmail: 'bob@example.com',
    documents: 1,
    submittedDate: '2024-03-08',
    category: 'Nature',
  },
  {
    id: 'POI004',
    name: 'Local Market',
    submitter: 'Alice Brown',
    submitterEmail: 'alice@example.com',
    documents: 4,
    submittedDate: '2024-03-07',
    category: 'Shopping',
  },
];

export default function PlacesPage() {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const handleVerify = (id: string) => {
    setVerifyingId(id);
    setTimeout(() => setVerifyingId(null), 1000);
  };

  const handleReject = (id: string) => {
    setVerifyingId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" asChild className="mb-4 rounded-xl">
          <Link href="/admin"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Link>
        </Button>
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-primary" />
          <h1 className="font-serif text-4xl text-foreground">Place Verification</h1>
        </div>
      </div>

      <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">POI Name</th>
                <th className="text-left p-4 font-semibold text-foreground">Submitter</th>
                <th className="text-left p-4 font-semibold text-foreground">Category</th>
                <th className="text-left p-4 font-semibold text-foreground">Documents</th>
                <th className="text-left p-4 font-semibold text-foreground">Submitted</th>
                <th className="text-left p-4 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPlaces.map((place) => (
                <tr key={place.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{place.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{place.id}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{place.submitter}</div>
                      <div className="text-xs text-muted-foreground">{place.submitterEmail}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{place.category}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>{place.documents} attached</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{place.submittedDate}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleVerify(place.id)}
                        className="rounded-lg gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(place.id)}
                        className="rounded-lg gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
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
