
// src/components/layout/header.tsx
'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { ThemeToggle } from './theme-toggle';
import { publicLinks, appLinks } from './main-nav'; 
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';

export function Header() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const isAdminSection = pathname.startsWith('/admin');
    const linksToShow = isAdminSection ? [] : (pathname.startsWith('/home') || ['/about', '/encyclopedia', '/directory', '/news', '/events', '/board-of-directors', '/contact'].some(path => pathname.startsWith(path)) ? publicLinks : appLinks);

    // Handle dynamic routes first
    if (pathname.startsWith('/directory/')) return 'Member Profile';
    if (pathname.startsWith('/news/')) return 'News Article';
    if (pathname.startsWith('/admin/news/edit')) return 'Edit Article';
    if (pathname.startsWith('/admin/news/new')) return 'Add New Article';
    if (pathname.startsWith('/admin/events/edit')) return 'Edit Event';
    if (pathname.startsWith('/admin/events/new')) return 'Add New Event';
    if (pathname.startsWith('/admin/members/edit')) return 'Edit Member';
    if (pathname.startsWith('/admin/members/new')) return 'Add New Member';
    if (pathname.startsWith('/admin/resources/new')) return 'Upload New Resource';
    if (pathname.startsWith('/admin/encyclopedia/edit')) return 'Edit Entry';
    if (pathname.startsWith('/admin/encyclopedia/new')) return 'Add New Entry';
    if (pathname.startsWith('/admin/board-of-directors/edit')) return 'Edit Board Member';
    if (pathname.startsWith('/admin/board-of-directors/new')) return 'Add New Board Member';
    if (pathname === '/admin') return 'Admin Dashboard';
    if (pathname === '/admin/settings') return 'General Settings';
     if (pathname === '/admin/about') return 'About Page Settings';


    const currentLink = linksToShow.find(link => {
      if (link.href === '/home') return pathname === '/home';
      return pathname.startsWith(link.href) && link.href !== '/';
    });

    return currentLink ? currentLink.label : 'PCMEA Connect';
  };
  
  const pageTitle = getPageTitle();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="md:hidden">
            <Link href="/home" className="flex items-center gap-2">
                <Logo className="size-7" />
                <span className="sr-only">PCMEA Connect</span>
            </Link>
        </div>
        {pageTitle && <h1 className="hidden text-2xl font-semibold md:block font-headline">{pageTitle}</h1>}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
