// src/app/directory/[memberId]/page.tsx

import { memberData } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ArrowLeft } from 'lucide-react';

// This page is now effectively unused, as details are shown in a dialog.
// However, it's good practice to keep it for deep linking or if the dialog
// approach is reverted. It can be removed if a full SPA-like experience on this
// page is not desired.

export default function MemberProfilePage({ params }: { params: { memberId: string } }) {
  const member = memberData.find(m => m.id === params.memberId);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/directory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
        </Link>
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-48 rounded-md overflow-hidden bg-secondary/30">
            <Image src={member.companyLogoUrl} alt={`${member.company} logo`} fill className="object-contain p-2" data-ai-hint="company logo" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">{member.company}</h1>
            <p className="text-xl text-muted-foreground">{member.name}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4 border-4 border-primary">
                <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="professional portrait" />
                <AvatarFallback className="text-4xl">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-headline text-xl font-bold">{member.name}</h3>
              <div className="mt-4 space-y-3">
                <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>{member.email}</span>
                </a>
                <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>{member.phone}</span>
                </a>
              </div>
            </CardContent>
          </Card>
           <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Specialties</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {member.specialties.map(spec => (
                        <Badge key={spec} variant="secondary">{spec}</Badge>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">About {member.company}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
