import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newsData, eventsData, memberData, resourceData, encyclopediaData, boardOfDirectorsData } from "@/lib/data";
import { Newspaper, Calendar, Users, FolderKanban, ArrowRight, BookOpen, Landmark, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AdminCharts } from "./admin-charts";

export default function AdminDashboardPage() {
  const stats = [
    { title: "News Articles", value: newsData.length, icon: Newspaper, href: "/admin/news" },
    { title: "Events", value: eventsData.length, icon: Calendar, href: "/admin/events" },
    { title: "Members", value: memberData.length, icon: Users, href: "/admin/members" },
    { title: "Resources", value: resourceData.length, icon: FolderKanban, href: "/admin/resources" },
    { title: "Encyclopedia Entries", value: encyclopediaData.length, icon: BookOpen, href: "/admin/encyclopedia" },
    { title: "Board Members", value: boardOfDirectorsData.length, icon: Landmark, href: "/admin/board-of-directors" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">A central place to manage your association's content and insights.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-xl transition-all duration-300 border-none bg-secondary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <Link href={stat.href} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 group mt-1">
                Manage
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Membership Growth
            </CardTitle>
            <CardDescription>New member registrations over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminCharts type="growth" />
          </CardContent>
        </Card>
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Resource Engagement
            </CardTitle>
            <CardDescription>Most popular resource categories by downloads.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminCharts type="engagement" />
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Quick Actions</CardTitle>
           <CardDescription>Quick links to common administrative tasks.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link href="/admin/news/new" className="block p-4 border rounded-xl hover:bg-secondary transition-colors">
                <h3 className="font-semibold flex items-center gap-2"><Newspaper className="h-5 w-5 text-primary"/> Add Article</h3>
                <p className="text-xs text-muted-foreground mt-1">Publish news for all members.</p>
            </Link>
             <Link href="/admin/events/new" className="block p-4 border rounded-xl hover:bg-secondary transition-colors">
                <h3 className="font-semibold flex items-center gap-2"><Calendar className="h-5 w-5 text-primary"/> Add Event</h3>
                <p className="text-xs text-muted-foreground mt-1">Schedule a new industry event.</p>
            </Link>
             <Link href="/admin/members/new" className="block p-4 border rounded-xl hover:bg-secondary transition-colors">
                <h3 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-primary"/> Add Member</h3>
                <p className="text-xs text-muted-foreground mt-1">Onboard a new association member.</p>
            </Link>
             <Link href="/admin/resources/new" className="block p-4 border rounded-xl hover:bg-secondary transition-colors">
                <h3 className="font-semibold flex items-center gap-2"><FolderKanban className="h-5 w-5 text-primary"/> Upload Resource</h3>
                <p className="text-xs text-muted-foreground mt-1">Add documents to the library.</p>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
