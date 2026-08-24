
"use client";

import '../../globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { AdminNav } from './admin-nav';
import { AdminHeader } from './admin-header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <SidebarProvider>
            <Sidebar collapsible="icon" className="group-data-[variant=floating]:border-0">
              <AdminNav />
              <SidebarRail />
            </Sidebar>
            <SidebarInset className="flex flex-col">
              <AdminHeader />
              <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
      </ThemeProvider>
  );
}
