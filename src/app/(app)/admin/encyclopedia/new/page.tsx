
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
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  origin: z.string().min(2, { message: "Origin must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.instanceof(File).optional(),
  material: z.string().min(2, { message: "Material must be at least 2 characters." }),
  knot: z.string().min(2, { message: "Knot type must be at least 2 characters." }),
  design: z.string().min(2, { message: "Design style must be at least 2 characters." }),
})

export default function NewEncyclopediaEntryPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            origin: "",
            description: "",
            material: "",
            knot: "",
            design: ""
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(values);
        toast({
            title: "Entry Created!",
            description: "The new encyclopedia entry has been successfully added.",
        });
        router.push("/admin/encyclopedia");
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <Link href="/admin/encyclopedia" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Encyclopedia Management
                </Link>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Add New Encyclopedia Entry</h1>
                <p className="text-muted-foreground mt-2">Fill out the form below to add a new rug type to the encyclopedia.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rug Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Mori Bokhara" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="origin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Origin</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Pakistan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={4} placeholder="A short description of the rug type..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-4">
                                <Input id="image-upload" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Button type="button" variant="outline" asChild>
                                        <span><Upload className="mr-2" /> Upload Image</span>
                                    </Button>
                                </label>
                                {preview && (
                                     <div className="relative h-24 w-24 rounded-md overflow-hidden border">
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
                    <div>
                        <h3 className="text-lg font-medium mb-4 font-headline">Characteristics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <FormField
                                control={form.control}
                                name="material"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Material</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Wool on cotton" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="knot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Knot Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Persian (asymmetrical)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="design"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Design Style</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Turkmen guls, soft pile" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Entry
                    </Button>
                </form>
            </Form>
        </div>
    );
}
