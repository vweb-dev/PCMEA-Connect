
// src/app/(app)/layout.tsx
"use client";

import '../globals.css';
import { AppLayout } from './layout.client';
import { ThemeProvider } from '@/components/theme-provider';

export default function AppRootLayout({
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
      <AppLayout>
        {children}
      </AppLayout>
    </ThemeProvider>
  );
}
