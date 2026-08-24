import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, Calendar, Newspaper, BookOpenCheck, ArrowRight, Building, HandHelping, Globe, Users2, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { memberData, eventsData, newsData, boardOfDirectorsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ClientDate } from "@/components/lib/client-date";

export default function PublicHomePage() {
  const upcomingEvents = eventsData.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
  const latestNews = newsData.slice(0, 2);
  const featuredMembers = memberData.slice(0, 10);
  const topLeadership = boardOfDirectorsData.filter(member => 
    ["Chairman", "Senior Vice Chairman", "Vice Chairperson"].includes(member.position)
  );

  return (
     <div className="flex flex-col gap-16 md:gap-32">

        {/* Hero Section */}
        <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-center p-8 bg-secondary">
            <Image 
              src="https://picsum.photos/seed/pcmea-hero/1600/900"
              alt="Intricate Pakistani handmade carpet detail"
              fill
              priority
              className="object-cover"
              data-ai-hint="pakistani carpets"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 max-w-4xl text-white">
                <Badge className="mb-4 bg-primary hover:bg-primary/90 text-white border-none px-4 py-1">Est. 1960</Badge>
                <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight leading-tight">The Global Standard in Pakistani Carpets</h1>
                <p className="mt-6 text-lg md:text-2xl text-white/80 max-w-3xl mx-auto">
                    Empowering manufacturers and exporters to showcase Pakistan's rich weaving heritage to the world.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-6">
                    <Link href="/directory">
                        <Button size="lg" variant="default" className="shadow-xl px-8 h-14 text-lg">
                            Find a Member <Users className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 px-8 h-14 text-lg">
                            Our Story
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
        
        {/* Why Join Us Section */}
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline tracking-tight">Why Partner with PCMEA?</h2>
                <p className="text-muted-foreground mt-4 text-xl max-w-2xl mx-auto">We provide the platform, resources, and voice required to excel in the global marketplace.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-secondary/50 transition-colors">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                        <ShieldCheck className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Industry Trust</h3>
                    <p className="text-muted-foreground">Gain credibility with our internationally recognized accreditation and quality seals.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-secondary/50 transition-colors">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                        <Zap className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Fast-Track Exports</h3>
                    <p className="text-muted-foreground">Access streamlined documentation assistance and exclusive trade fair opportunities.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-secondary/50 transition-colors">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                        <BarChart3 className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Market Intelligence</h3>
                    <p className="text-muted-foreground">Stay ahead with real-time data, trend reports, and global market analysis.</p>
                </div>
            </div>
        </div>

        {/* Featured Content Tabs-like Grid */}
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { href: "/directory", title: "Member Directory", icon: Users, desc: "Connect with verified manufacturers." },
                    { href: "/events", title: "Events Calendar", icon: Calendar, desc: "Global trade fairs and meetings." },
                    { href: "/news", title: "News & Updates", icon: Newspaper, desc: "Latest industry announcements." },
                    { href: "/encyclopedia", title: "Rug Encyclopedia", icon: BookOpenCheck, desc: "Explore diverse carpet varieties." }
                ].map((item) => (
                    <Link href={item.href} key={item.title} className="group">
                        <Card className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full overflow-hidden">
                            <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                    <item.icon className="text-primary h-6 w-6"/> {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>

        {/* Latest News & Upcoming Events */}
        <div className="container mx-auto">
             <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-bold font-headline tracking-tight">Stay Informed</h2>
                    <p className="text-muted-foreground mt-2 max-w-xl">The latest from PCMEA and the global carpet industry.</p>
                </div>
                <Link href="/news" className="hidden md:block">
                    <Button variant="ghost" className="group text-primary hover:text-primary hover:bg-primary/10">
                        View All News <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                    {latestNews.map((article) => (
                       <Card key={article.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group md:grid md:grid-cols-3">
                          <div className="relative h-56 w-full md:col-span-1 md:h-full">
                            <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" data-ai-hint="carpet industry" />
                          </div>
                          <div className="md:col-span-2 flex flex-col p-6">
                            <Badge variant="secondary" className="w-fit mb-3">{article.category}</Badge>
                            <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors leading-tight">{article.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-2 mb-4 line-clamp-3">{article.excerpt}</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">{article.source} • <ClientDate date={new Date(article.date)} /></span>
                                <Link href="/news">
                                  <Button variant="link" className="p-0 h-auto font-bold text-primary group/btn">
                                    Read More <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                                  </Button>
                                </Link>
                            </div>
                          </div>
                       </Card>
                    ))}
              </div>
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-none h-full bg-secondary/30 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Upcoming Events</CardTitle>
                    </CardHeader>
                  <CardContent className="space-y-4">
                     {upcomingEvents.map((event) => (
                        <Link href="/events" key={event.id} className="block group">
                          <div className="p-4 border border-transparent hover:border-primary/20 bg-background/50 rounded-2xl hover:bg-background transition-all group-hover:shadow-md">
                            <p className="font-bold text-primary group-hover:underline">{event.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 font-medium"><ClientDate date={new Date(event.date)} options={{ month: 'long', day: 'numeric', year: 'numeric' }} /></p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Building className="h-3 w-3" /> {event.location}</p>
                          </div>
                        </Link>
                     ))}
                     <Link href="/events" className="pt-2 block">
                       <Button variant="outline" className="w-full h-12 border-primary/20 hover:border-primary text-primary">Full Calendar</Button>
                     </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>

        {/* Featured Members Section */}
        <div className="bg-secondary/40 py-24">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-headline tracking-tight">Our Esteemed Members</h2>
                    <p className="text-muted-foreground mt-4 text-xl max-w-2xl mx-auto">A global community of the finest manufacturers and exporters.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredMembers.map((member) => (
                        <Link href="/directory" key={member.id}>
                            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden bg-background">
                                <CardContent className="p-6">
                                    <div className="flex gap-6 items-center">
                                        <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-secondary p-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                            <Image
                                                src={member.companyLogoUrl}
                                                alt={`${member.company} logo`}
                                                fill
                                                className="object-contain"
                                                data-ai-hint="company logo"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">{member.company}</h3>
                                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                                <Avatar className="h-6 w-6 border border-primary/20">
                                                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="professional portrait" />
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{member.name}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Link href="/directory">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-2xl shadow-xl">
                            Join the Directory <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

         {/* Leadership - Styled same as board-of-directors page */}
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline tracking-tight">Our Honored Leadership</h2>
                <p className="text-muted-foreground mt-4 text-xl max-w-2xl mx-auto">Dedicated experts guiding the association towards a global future.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
                {topLeadership.map((member) => (
                    <Card key={member.id} className="group overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-none">
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <Image
                                src={member.avatarUrl}
                                alt={`Portrait of ${member.name}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint="professional portrait"
                            />
                        </div>
                        <CardContent className="p-6 text-center">
                          <h3 className="font-headline text-2xl font-bold">{member.name}</h3>
                          <p className="text-primary font-medium mt-1">{member.position}</p>
                          <p className="text-sm text-muted-foreground">{member.company}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-16">
                <Link href="/board-of-directors">
                    <Button variant="outline" className="h-12 px-8 rounded-xl border-primary/20 hover:border-primary text-primary font-bold">
                        View Full Board <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>

         {/* CTA Section */}
         <div className="container mx-auto mb-24">
             <Card className="shadow-2xl border-none bg-primary text-white overflow-hidden rounded-[2.5rem]">
                <div className="relative p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="font-headline text-4xl md:text-5xl font-bold">Become Part of the Legacy</h3>
                        <p className="text-white/80 mt-6 text-xl max-w-2xl">
                            Unlock exclusive global trade opportunities, documentation support, and a network of world-class manufacturers.
                        </p>
                    </div>
                    <Link href="/dashboard" className="relative z-10 shrink-0">
                        <Button size="lg" className="h-16 px-12 bg-white text-primary hover:bg-white/90 font-bold text-xl rounded-2xl shadow-2xl">
                            Join PCMEA Now <Users2 className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
             </Card>
         </div>
      </div>
  );
}
