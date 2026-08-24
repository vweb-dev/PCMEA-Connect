
"use client";

import Image from "next/image";
import { useState } from "react";
import { newsData } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { NewsArticle } from "@/lib/types";

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">News & Announcements</h1>
        <p className="text-muted-foreground mt-2">The latest updates from PCMEA and the carpet industry.</p>
      </div>
      <Dialog open={!!selectedArticle} onOpenChange={(isOpen) => !isOpen && setSelectedArticle(null)}>
        <div className="grid grid-cols-1 gap-8">
          {newsData.map((article) => (
            <Card key={article.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 md:grid md:grid-cols-3">
              <div className="relative h-56 w-full md:col-span-1 md:h-full">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  data-ai-hint="carpet industry"
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
                    <CardDescription>{article.source} - {new Date(article.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Badge variant="secondary">{article.category}</Badge>
                    <Button variant="outline" onClick={() => setSelectedArticle(article)}>View Details</Button>
                  </CardFooter>
              </div>
            </Card>
          ))}
        </div>
        {selectedArticle && (
           <DialogContent className="max-w-3xl">
              <DialogHeader>
                  <div className="relative h-64 w-full rounded-md overflow-hidden mb-4">
                     <Image src={selectedArticle.imageUrl} alt={selectedArticle.title} fill className="object-cover" data-ai-hint="carpet industry" />
                  </div>
                  <DialogTitle className="font-headline text-3xl">{selectedArticle.title}</DialogTitle>
                  <DialogDescription>
                      {selectedArticle.source} - {new Date(selectedArticle.date).toLocaleDateString()}
                      <Badge variant="secondary" className="ml-2">{selectedArticle.category}</Badge>
                  </DialogDescription>
              </DialogHeader>
              <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto pr-4">
                 <p>{selectedArticle.content}</p>
              </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
