'use client';

import React from 'react';

interface InfoPageTemplateProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function InfoPageTemplate({ title, subtitle, lastUpdated, children }: InfoPageTemplateProps) {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">{title}</h1>
          {subtitle && <p className="text-lg text-slate-500">{subtitle}</p>}
          {lastUpdated && <p className="text-sm text-slate-400 mt-6 tracking-wide uppercase">Last updated: {lastUpdated}</p>}
        </header>

        <div className="text-foreground/80 leading-relaxed space-y-8 font-sans text-lg">
          <div className="[&>h2]:font-serif [&>h2]:text-3xl [&>h2]:text-foreground [&>h2]:mb-4 [&>h2]:mt-12 [&>h3]:font-serif [&>h3]:text-2xl [&>h3]:text-foreground [&>h3]:mb-3 [&>h3]:mt-8 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>a]:text-primary [&>a]:hover:underline [&>p]:mb-4 [&>li]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
