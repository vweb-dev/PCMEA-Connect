"use client";

import { useEffect, useState } from "react";
import { getPersonalizedRecommendations } from "@/ai/flows/personalized-recommendations";
import { newsData, resourceData } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Newspaper, Terminal } from "lucide-react";

type Recommendations = {
  recommendedNews: string[];
  recommendedResources: string[];
};

export function DashboardClient() {
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // In a real app, memberProfile would come from user session
        const memberProfile = "This member is interested in market analysis for European markets and sustainability reports.";
        const newsFeed = JSON.stringify(newsData.map(n => ({ title: n.title, category: n.category })));
        const resourceLibrary = JSON.stringify(resourceData.map(r => ({ name: r.name, categories: r.categories })));
        
        const result = await getPersonalizedRecommendations({ memberProfile, newsFeed, resourceLibrary });
        setRecommendations(result);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch personalized recommendations.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, []);

  const renderSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );

  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">For You</CardTitle>
        <CardDescription>Personalized news and resources based on your interests.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && renderSkeleton()}
        {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {!loading && recommendations && (
          <div className="grid gap-8">
            <div>
              <h3 className="text-xl font-semibold font-headline flex items-center gap-2 mb-4"><Newspaper className="text-primary" /> Recommended News</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.recommendedNews.map((item, index) => (
                  <div key={`news-${index}`} className="flex items-start gap-3 rounded-md border p-3 hover:bg-secondary/50 transition-colors">
                     <div className="bg-primary/10 p-2 rounded-md">
                        <Newspaper className="h-5 w-5 text-primary" />
                     </div>
                     <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
             <div>
              <h3 className="text-xl font-semibold font-headline flex items-center gap-2 mb-4"><FileText className="text-primary"/> Recommended Resources</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.recommendedResources.map((item, index) => (
                    <div key={`res-${index}`} className="flex items-start gap-3 rounded-md border p-3 hover:bg-secondary/50 transition-colors">
                        <div className="bg-primary/10 p-2 rounded-md">
                           <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm">{item}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
