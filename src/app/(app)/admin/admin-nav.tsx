'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Users,
  FolderKanban,
  Home,
  BookOpen,
  Settings,
  Landmark,
  Info,
  Shield,
  HelpCircle,
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

export const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/news', label: 'News Management', icon: Newspaper },
  { href: '/admin/events', label: 'Event Management', icon: CalendarDays },
  { href: '/admin/members', label: 'Member Management', icon: Users },
  { href: '/admin/resources', label: 'Resource Management', icon: FolderKanban },
  { href: '/admin/encyclopedia', label: 'Encyclopedia', icon: BookOpen },
  { href: '/admin/board-of-directors', label: 'Board of Directors', icon: Landmark },
  { href: '/admin/about', label: 'About Page', icon: Info },
  { href: '/admin/settings', label: 'General Settings', icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Logo className="size-8 shrink-0" />
          <div className="flex flex-col">
            <h2 className="font-headline text-xl font-semibold tracking-tight text-sidebar-foreground">
              Admin Panel
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin')}
                  tooltip={link.label}
                  className="font-sans"
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
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
