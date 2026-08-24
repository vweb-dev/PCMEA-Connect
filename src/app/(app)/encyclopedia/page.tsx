// src/app/encyclopedia/page.tsx
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { encyclopediaData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const getRegions = () => {
  const allOrigins = encyclopediaData.flatMap(entry => entry.origin.split(' / '));
  return ['All', ...Array.from(new Set(allOrigins))];
};

export default function EncyclopediaPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const regions = useMemo(() => getRegions(), []);

  const filteredEntries = useMemo(() => {
    if (selectedRegion === 'All') {
      return encyclopediaData;
    }
    return encyclopediaData.filter(entry => entry.origin.includes(selectedRegion));
  }, [selectedRegion]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Rug Encyclopedia</h1>
        <p className="text-muted-foreground mt-2">An informational guide to the rich variety of Pakistani and regional carpet types.</p>
      </div>

      <Card className="shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold mr-4">Filter by Region:</p>
          {regions.map(region => (
            <Button
              key={region}
              variant={selectedRegion === region ? 'default' : 'outline'}
              onClick={() => setSelectedRegion(region)}
            >
              {region.replace(/ \(.+\)/, '')}
            </Button>
          ))}
        </div>
      </Card>

      <div className="grid gap-8">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden md:grid md:grid-cols-3 md:gap-0">
              <div className="md:col-span-1 relative h-64 md:h-full min-h-[250px]">
                <Image
                  src={entry.imageUrl}
                  alt={entry.name}
                  fill
                  className="object-cover"
                  data-ai-hint="rug encyclopedia"
                />
              </div>
              <div className="md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-3xl">{entry.name}</CardTitle>
                      <CardDescription>Origin: {entry.origin}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{entry.description}</p>
                  <Separator />
                  <div>
                      <h4 className="font-semibold mb-2">Key Characteristics</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex flex-col gap-1">
                              <span className="font-medium text-muted-foreground">Material</span>
                              <span className="font-semibold">{entry.characteristics.material}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                              <span className="font-medium text-muted-foreground">Knot Type</span>
                               <span className="font-semibold">{entry.characteristics.knot}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                               <span className="font-medium text-muted-foreground">Design Style</span>
                               <span className="font-semibold">{entry.characteristics.design}</span>
                          </div>
                      </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center p-8 shadow-sm">
            <p className="text-muted-foreground">No entries found for the selected region.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
