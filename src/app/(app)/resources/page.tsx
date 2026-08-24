import { resourceData } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { UploadForm } from "@/app/(app)/resources/upload-form";

export const metadata = {
  title: "Resource Library",
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Resource Library</h1>
        <p className="text-muted-foreground mt-2">A central repository for documents, reports, and industry materials.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">All Documents</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Categories</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resourceData.map((resource) => (
                            <TableRow key={resource.id}>
                                <TableCell className="font-medium">{resource.name}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {resource.categories.map(cat => <Badge key={cat} variant="secondary">{cat}</Badge>)}
                                    </div>
                                </TableCell>
                                <TableCell>{resource.uploadDate}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4 text-accent" />
                                        <span className="sr-only">Download</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <UploadForm />
        </div>
      </div>
    </div>
  );
}
