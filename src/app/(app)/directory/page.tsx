"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { memberData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Mail, Phone, ArrowRight } from 'lucide-react';
import { Member } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    let members = memberData;

    if (selectedLetter !== 'All') {
      members = members.filter(member => 
        (member.company || '').toUpperCase().startsWith(selectedLetter)
      );
    }
    
    if (searchTerm) {
        members = members.filter(member => {
            const companyName = member.company || '';
            const memberName = member.name || '';
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return companyName.toLowerCase().includes(lowerCaseSearchTerm) || memberName.toLowerCase().includes(lowerCaseSearchTerm);
        });
    }

    return members;
  }, [searchTerm, selectedLetter]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Member Directory</h1>
        <p className="text-muted-foreground mt-2">Find and connect with fellow PCMEA members.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
           <Button
              variant={selectedLetter === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedLetter('All')}
              className="text-xs h-8"
            >
              All
            </Button>
          {alphabet.map(letter => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? 'default' : 'outline'}
              onClick={() => setSelectedLetter(letter)}
              className="text-xs h-8 w-8"
            >
              {letter}
            </Button>
          ))}
        </div>
         <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by member or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full max-w-sm"
          />
        </div>
      </div>

      <Dialog>
        <div className="grid gap-8 md:grid-cols-2">
          {filteredMembers.map((member: Member) => (
             <Card key={member.id} className="shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col">
              <CardContent className="p-6 flex-grow">
                <div className="grid grid-cols-3 gap-6 items-start">
                  <div className="col-span-1 flex flex-col items-center gap-4">
                     <div className="relative h-24 w-24 rounded-md overflow-hidden bg-secondary/30 p-2">
                        <Image
                          src={member.companyLogoUrl}
                          alt={`${member.company} logo`}
                          fill
                          className="object-contain"
                          data-ai-hint="company logo"
                        />
                      </div>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full text-primary hover:text-primary/90 text-sm" onClick={() => setSelectedMember(member)}>
                           View Details
                        </Button>
                      </DialogTrigger>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">{member.company}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <Avatar className="h-6 w-6 border-2 border-background group-hover:border-primary transition-colors duration-300">
                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="professional portrait" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{member.name}</span>
                    </div>
                    <Separator className="my-4" />
                     <div className="space-y-3 text-sm">
                       <a href={`mailto:${member.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <Mail className="h-4 w-4 text-accent" />
                          <span>{member.email}</span>
                        </a>
                        <a href={`tel:${member.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <Phone className="h-4 w-4 text-accent" />
                          <span>{member.phone}</span>
                        </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredMembers.length === 0 && (
            <p className="text-muted-foreground text-center py-8 md:col-span-2">
              No members found.
            </p>
          )}
        </div>
        {selectedMember && (
            <DialogContent className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                    <div className="md:col-span-1 flex flex-col items-center text-center gap-4">
                        <div className="relative aspect-square w-full rounded-md overflow-hidden bg-secondary/30">
                            <Image src={selectedMember.companyLogoUrl} alt={`${selectedMember.company} logo`} fill className="object-contain p-2" data-ai-hint="company logo" />
                        </div>
                        <Avatar className="h-32 w-32 border-4 border-primary">
                            <AvatarImage src={selectedMember.avatarUrl} alt={selectedMember.name} data-ai-hint="professional portrait" />
                            <AvatarFallback className="text-4xl">{selectedMember.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-headline text-2xl font-bold">{selectedMember.name}</h3>
                            <h2 className="text-muted-foreground">{selectedMember.company}</h2>
                        </div>
                        <div className="space-y-2 text-sm">
                             <a href={`mailto:${selectedMember.email}`} className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                                <Mail className="h-4 w-4 text-accent" />
                                <span>{selectedMember.email}</span>
                            </a>
                            <a href={`tel:${selectedMember.phone}`} className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                                <Phone className="h-4 w-4 text-accent" />
                                <span>{selectedMember.phone}</span>
                            </a>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h4 className="font-headline text-xl font-semibold mb-2">About {selectedMember.company}</h4>
                            <p className="text-sm text-muted-foreground">{selectedMember.bio}</p>
                        </div>
                        <div>
                            <h4 className="font-headline text-xl font-semibold mb-2">Specialties</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedMember.specialties.map(spec => (
                                    <Badge key={spec} variant="secondary">{spec}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
