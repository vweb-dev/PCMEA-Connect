
"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleAboutPageUpdate } from '@/app/(app)/admin/settings/actions';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, Save, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

const initialState = {
  message: '',
  error: null,
};

const formSchema = z.object({
    title: z.string().min(5),
    subtitle: z.string().min(10),
    content: z.string().min(20),
    heroImage: z.any(),
});


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export default function AboutPageSettings() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(handleAboutPageUpdate, initialState);
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "About The Pakistan Carpet Manufacturers and Exporters Association",
        subtitle: "Weaving a legacy of craftsmanship, quality, and global excellence.",
        content: "Founded in 1960, the Pakistan Carpet Manufacturers and Exporters Association (PCMEA) has been the premier representative body for the Pakistani carpet industry for over six decades. From our humble beginnings, we have grown into a dynamic organization dedicated to promoting the artistry of our members on a global stage. Throughout our history, we have been instrumental in setting quality standards, advocating for fair trade practices, and fostering innovation in design and production. Our journey is one of passion, dedication, and a relentless pursuit of excellence, ensuring the rich legacy of Pakistani carpet weaving continues to thrive for generations to come.",
        heroImage: undefined,
      }
    });

    const [preview, setPreview] = useState<string | null>("/about-hero.jpg");

    useEffect(() => {
        if (state.message && !state.error) {
            toast({
                title: "About Page Saved!",
                description: state.message,
            });
            setPreview(`/about-hero.jpg?t=${new Date().getTime()}`);
        } else if (state.error) {
            toast({
                title: "Error Saving",
                description: state.error,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('heroImage', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Manage About Page</h1>
                <p className="text-muted-foreground mt-2">Update the content and hero image for the "About Us" page.</p>
            </div>
             <Form {...form}>
                 <form action={formAction} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                            <CardDescription>Set the main title, subtitle, and body content for the page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                           <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., About PCMEA" {...field} name="title" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                           <FormField
                              control={form.control}
                              name="subtitle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Subtitle</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Our history, mission, and vision." {...field} name="subtitle" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                           <FormField
                              control={form.control}
                              name="content"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Main Content</FormLabel>
                                  <FormControl>
                                    <Textarea rows={10} placeholder="Tell the story of your organization..." {...field} name="content" />
                                  </FormControl>
                                  <FormDescription>This field supports Markdown for text formatting.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                           <FormField
                              control={form.control}
                              name="heroImage"
                              render={({ field }) => (
                                <FormItem>
                                   <FormLabel>Hero Image</FormLabel>
                                   <FormControl>
                                        <div className="flex items-center gap-4">
                                            <Input id="heroImage" name="heroImage" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                            <label htmlFor="heroImage" className="cursor-pointer">
                                                <Button type="button" variant="outline" asChild>
                                                    <span><Upload className="mr-2" /> Upload Image</span>
                                                </Button>
                                            </label>
                                            {preview && (
                                                <div className="relative h-24 w-40 rounded-md overflow-hidden border">
                                                    <Image src={preview} alt="Hero image preview" fill className="object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Recommended aspect ratio 16:9. Max file size 2MB. Saved as `about-hero.jpg`.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                               )}
                           />
                        </CardContent>
                    </Card>
                    
                     {state?.error && (
                        <Alert variant="destructive" className="mt-4">
                          <Terminal className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                    
                    <SubmitButton />
                </form>
             </Form>
        </div>
    );
}
