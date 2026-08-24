"use client";

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { handleDocumentUpload } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileText, Loader2, Terminal, Tag, BookText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const initialState = {
  message: '',
  result: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      Categorize Document
    </Button>
  );
}

export function UploadForm() {
  const [state, formAction] = useFormState(handleDocumentUpload, initialState);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <Card className="shadow-lg sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline">Categorize New Document</CardTitle>
        <CardDescription>Upload a document and our AI will automatically categorize it.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document">Document File</Label>
            <Input id="document" name="document" type="file" required onChange={handleFileChange} />
            {fileName && <p className="text-sm text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" />{fileName}</p>}
          </div>
          <SubmitButton />
        </form>

        {state?.error && (
            <Alert variant="destructive" className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state?.result && (
          <div className="mt-6 space-y-4">
            <Separator />
            <h4 className="font-semibold font-headline">AI Analysis Complete</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-semibold flex items-center gap-2 mb-2"><BookText className="h-4 w-4 text-primary" /> Summary</h5>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">{state.result.summary}</p>
              </div>
              <div>
                <h5 className="text-sm font-semibold flex items-center gap-2 mb-2"><Tag className="h-4 w-4 text-primary" /> Categories</h5>
                <div className="flex flex-wrap gap-2">
                  {state.result.categories.map((cat) => <Badge key={cat}>{cat}</Badge>)}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold flex items-center gap-2 mb-2"><Tag className="h-4 w-4 text-primary" /> Keywords</h5>
                 <div className="flex flex-wrap gap-2">
                  {state.result.keywords.map((kw) => <Badge key={kw} variant="outline">{kw}</Badge>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
