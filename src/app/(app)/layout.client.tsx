
"use client";

import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { useState, useEffect } from 'react';

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={cn('transition-opacity duration-500', loading ? 'opacity-0' : 'opacity-100')}>
        <SidebarProvider>
          <Sidebar collapsible="icon" className="group-data-[variant=floating]:border-0">
            <MainNav />
            <SidebarRail />
          </Sidebar>
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </div>
    </>
  );
}
