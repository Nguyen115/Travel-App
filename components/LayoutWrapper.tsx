'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { BottomNav } from '@/components/BottomNav';
import { Footer } from '@/components/Footer';

const EXCLUDED_PATHS = ['/splash', '/start', '/auth'];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isExcluded = EXCLUDED_PATHS.includes(pathname);

  if (isAdmin || isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <BottomNav />
    </>
  );
}
