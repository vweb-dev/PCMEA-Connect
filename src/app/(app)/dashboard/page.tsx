import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, Newspaper, Users, Calendar, Library, ArrowRight, ShieldCheck, Download } from "lucide-react";
import { memberData, eventsData, resourceData, newsData } from "@/lib/data";
import { DashboardClient } from "@/app/dashboard-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const upcomingEvents = eventsData.filter(event => event.date >= new Date()).slice(0, 4);
  const recentResources = resourceData.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Welcome, Member</h1>
            <p className="text-muted-foreground mt-2">Access your exclusive PCMEA tools and insights.</p>
        </div>
        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Premium Member Status</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
            { title: "Network", value: memberData.length, label: "Total Members", icon: Users },
            { title: "Events", value: eventsData.filter(event => event.date >= new Date()).length, label: "Scheduled", icon: Calendar },
            { title: "Library", value: resourceData.length, label: "Documents", icon: Library },
            { title: "Updates", value: newsData.length, label: "News Items", icon: Newspaper },
        ].map((stat) => (
            <Card key={stat.title} className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <DashboardClient />
        </div>
        <div className="space-y-8">
            <Card className="border-none shadow-lg bg-secondary/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                        Recent Resources
                        <Link href="/resources">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-primary">View All</Button>
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentResources.map(res => (
                        <div key={res.id} className="p-3 bg-background rounded-xl border border-border/50 group hover:border-primary/30 transition-all cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="text-sm font-bold truncate">{res.name}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{res.uploadDate}</p>
                                </div>
                                <Download className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-primary text-white overflow-hidden rounded-[2rem]">
                <div className="relative p-6">
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <h3 className="text-lg font-bold font-headline">Need Assistance?</h3>
                    <p className="text-white/80 text-sm mt-2">Our member support team is available 24/7 for export facilitation.</p>
                    <Link href="/contact" className="block mt-4">
                        <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl font-bold shadow-lg">
                            Get Support <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
