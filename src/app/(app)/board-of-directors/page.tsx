// src/app/board-of-directors/page.tsx
import { boardOfDirectorsData } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import type { BoardMember } from '@/lib/types';
import Image from 'next/image';

export const metadata = {
  title: 'Board of Directors',
};

export default function BoardOfDirectorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Board of Directors</h1>
        <p className="text-muted-foreground mt-2">Meet the leadership team guiding PCMEA forward.</p>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {boardOfDirectorsData.map((member: BoardMember) => (
          <Card key={member.id} className="group overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
    </div>
  );
}
