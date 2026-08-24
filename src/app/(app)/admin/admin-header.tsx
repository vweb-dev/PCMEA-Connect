
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLinks } from './admin-nav';

export function AdminHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.startsWith('/admin/news/new')) return 'Add New Article';
    if (pathname.startsWith('/admin/news/edit')) return 'Edit Article';
    if (pathname.startsWith('/admin/events/new')) return 'Add New Event';
    if (pathname.startsWith('/admin/events/edit')) return 'Edit Event';
    if (pathname.startsWith('/admin/members/new')) return 'Add New Member';
    if (pathname.startsWith('/admin/members/edit')) return 'Edit Member';
    if (pathname.startsWith('/admin/resources/new')) return 'Upload New Resource';
    if (pathname.startsWith('/admin/encyclopedia/new')) return 'Add New Entry';
    if (pathname.startsWith('/admin/encyclopedia/edit')) return 'Edit Entry';
    if (pathname.startsWith('/admin/board-of-directors/new')) return 'Add New Board Member';
    if (pathname.startsWith('/admin/board-of-directors/edit')) return 'Edit Board Member';

    const currentLink = adminLinks.find(link => pathname.startsWith(link.href) && link.href !== '/admin');
    return currentLink ? currentLink.label : 'Dashboard';
  };
  
  const pageTitle = getPageTitle();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="md:hidden">
            <Link href="/admin" className="flex items-center gap-2">
                <Logo className="size-7" />
                <span className="sr-only">PCMEA Admin</span>
            </Link>
        </div>
        <h1 className="hidden text-2xl font-semibold md:block font-headline">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
