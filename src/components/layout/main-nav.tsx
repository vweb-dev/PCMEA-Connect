'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Newspaper,
  Users,
  BookOpen,
  Landmark,
  Shield,
  Info,
  Home,
  HelpCircle,
  LifeBuoy,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';

export const publicLinks = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/news', label: 'News Feed', icon: Newspaper },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/directory', label: 'Member Directory', icon: Users },
  { href: '/encyclopedia', label: 'Rug Encyclopedia', icon: BookOpen },
  { href: '/board-of-directors', label: 'Board of Directors', icon: Landmark },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact Us', icon: LifeBuoy },
];

export const appLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/news', label: 'News Feed', icon: Newspaper },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/directory', label: 'Member Directory', icon: Users },
  { href: '/resources', label: 'Resource Library', icon: FolderKanban },
  { href: '/encyclopedia', label: 'Rug Encyclopedia', icon: BookOpen },
  { href: '/board-of-directors', label: 'Board of Directors', icon: Landmark },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact Us', icon: LifeBuoy },
];

export function MainNav() {
  const pathname = usePathname();
  
  const isPublicView = ['/home', '/about', '/encyclopedia', '/directory', '/news', '/events', '/board-of-directors', '/contact'].some(path => pathname.startsWith(path) && path !== '/directory/[memberId]');
  const visibleLinks = isPublicView ? publicLinks : appLinks;
  
  return (
    <>
      <SidebarHeader className="p-4">
        <Link href={isPublicView ? '/home' : '/dashboard'} className="flex items-center gap-2">
          <Logo className="size-8 shrink-0" />
          <div className="flex flex-col">
            <h2 className="font-headline text-xl font-semibold tracking-tight text-sidebar-foreground">
              PCMEA Connect
            </h2>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {visibleLinks.map((link) => {
            const uniqueKey = `${link.href}-${isPublicView ? 'public' : 'app'}`;
            
            let isActive = false;
            if (['/home', '/dashboard', '/admin', '/about', '/encyclopedia', '/board-of-directors', '/contact'].includes(link.href)) {
                isActive = pathname === link.href;
            } else {
                isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            }

            return (
                <SidebarMenuItem key={uniqueKey}>
                <Link href={link.href}>
                    <SidebarMenuButton
                    isActive={isActive}
                    tooltip={link.label}
                    className="font-sans"
                    >
                    <link.icon />
                    <span>{link.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator className="mb-2" />
        <SidebarMenu>
             <SidebarMenuItem>
                 <Link href="/home">
                    <SidebarMenuButton tooltip="Home" className="font-sans" isActive={pathname === '/home'}>
                      <Home />
                      <span>Home</span>
                    </SidebarMenuButton>
                 </Link>
             </SidebarMenuItem>
             <SidebarMenuItem>
                 <Link href="/dashboard">
                    <SidebarMenuButton tooltip="Member Area" className="font-sans" isActive={pathname.startsWith('/dashboard')}>
                      <LayoutDashboard />
                      <span>Member Area</span>
                    </SidebarMenuButton>
                 </Link>
             </SidebarMenuItem>
             <SidebarMenuItem>
                 <Link href="/admin">
                    <SidebarMenuButton tooltip="Admin Panel" className="font-sans" isActive={pathname.startsWith('/admin')}>
                      <Shield />
                      <span>Admin Panel</span>
                    </SidebarMenuButton>
                 </Link>
             </SidebarMenuItem>
             <SidebarMenuItem>
                 <Link href="/contact">
                    <SidebarMenuButton tooltip="Need Help?" className="font-sans" isActive={pathname.startsWith('/contact')}>
                      <HelpCircle />
                      <span>Need Help?</span>
                    </SidebarMenuButton>
                 </Link>
             </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
