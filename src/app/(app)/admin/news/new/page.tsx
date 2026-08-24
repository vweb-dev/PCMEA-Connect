
"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  excerpt: z.string().min(10, {
      message: "Excerpt must be at least 10 characters."
  }).max(160, {
      message: "Excerpt must not be longer than 160 characters."
  }),
  content: z.string().min(20, {
      message: "Content must be at least 20 characters."
  }),
  source: z.string().min(2, {
      message: "Source must be at least 2 characters."
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  image: z.instanceof(File).optional(),
})

export default function NewArticlePage() {
    const { toast } = useToast();
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>("https://picsum.photos/600/400");
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            source: "",
        },
    });

    const { isSubmitting } = form.formState;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // In a real app, you'd send this data to your API.
        // We'll simulate an API call with a delay.
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(values);
        toast({
            title: "Article Created!",
            description: "The new news article has been successfully created.",
        });
        router.push("/admin/news");
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <Link href="/admin/news" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to News Management
                </Link>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Add New Article</h1>
                <p className="text-muted-foreground mt-2">Fill out the form below to create a new news article.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter article title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter a short summary of the article" {...field} />
                                </FormControl>
                                 <FormDescription>A short summary shown in the news feed list (max 160 characters).</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea rows={8} placeholder="Enter the full content of the article" {...field} />
                                </FormControl>
                                <FormDescription>The main body of the news article.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., PCMEA Official" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="PCMEA Announcements">PCMEA Announcements</SelectItem>
                                            <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                                            <SelectItem value="Industry Trends">Industry Trends</SelectItem>
                                            <SelectItem value="Training Materials">Training Materials</SelectItem>
                                            <SelectItem value="Member News">Member News</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormItem>
                        <FormLabel>Article Image</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-4">
                                <Input id="image-upload" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Button type="button" variant="outline" asChild>
                                        <span><Upload className="mr-2" /> Upload Image</span>
                                    </Button>
                                </label>
                                {preview && (
                                     <div className="relative h-24 w-40 rounded-md overflow-hidden border">
                                        <Image src={preview} alt="Image preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormDescription>
                            Recommended aspect ratio 3:2. Max file size 2MB.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Article
                    </Button>
                </form>
            </Form>
        </div>
    );
}
