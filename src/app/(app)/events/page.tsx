
"use client";

import { useState } from 'react';
import { eventsData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = eventsData
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Events Calendar</h1>
        <p className="text-muted-foreground mt-2">Upcoming industry events, trade shows, and PCMEA meetings.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-2 md:p-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md w-full"
                        classNames={{
                          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          day_today: "bg-accent/80 text-accent-foreground",
                        }}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {upcomingEvents.length > 0 ? (
                           upcomingEvents.map(event => (
                            <div key={event.id} className="flex flex-col p-3 border rounded-lg hover:bg-secondary/50">
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="w-3 h-3"/> {event.location}
                                </p>
                            </div>
                           ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No upcoming events.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
