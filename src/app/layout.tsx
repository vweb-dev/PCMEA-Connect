
// This is the root layout that applies to all routes.
import './globals.css';
import { cn } from '@/lib/utils';
import { Inter as FontSans, Lora } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeadline = Lora({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700']
})

const APP_NAME = "PCMEA Connect";
const APP_DESCRIPTION = "A central information and resource hub for members of the Pakistan Carpet Manufacturers and Exporters Association.";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <title>{APP_NAME}</title>
          <meta name="description" content={APP_DESCRIPTION} />
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#F5F5DC" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#161a23" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={cn("font-sans antialiased", fontSans.variable, fontHeadline.variable, "min-h-screen bg-background")}>
          {children}
      </body>
    </html>
  );
}
