
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
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams, notFound } from "next/navigation";
import { boardOfDirectorsData } from "@/lib/data";
import { useEffect, useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  position: z.string().min(2, { message: "Position must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  avatar: z.instanceof(File).optional(),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
})

export default function EditBoardMemberPage() {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const memberId = params.id as string;
    const [preview, setPreview] = useState<string | null>(null);
    
    const member = boardOfDirectorsData.find(e => e.id === memberId);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            position: "",
            company: "",
        },
    });

    useEffect(() => {
        if (member) {
            form.reset(member);
            setPreview(member.avatarUrl);
        }
    }, [member, form]);


    if (!member) {
        return notFound();
    }

    const { isSubmitting } = form.formState;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("avatar", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log({ ...values, id: memberId });
        toast({
            title: "Member Updated!",
            description: "The board member has been successfully updated.",
        });
        router.push("/admin/board-of-directors");
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <Link href="/admin/board-of-directors" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Board of Directors
                </Link>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Edit Board Member</h1>
                <p className="text-muted-foreground mt-2">Update the details of the board member below.</p>
            </div>

            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Mr. Aslam Tariq" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Chairman" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Tariq & Sons Carpets" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormItem>
                        <FormLabel>Portrait Image</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-4">
                                <Input id="image-upload" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Button type="button" variant="outline" asChild>
                                        <span><Upload className="mr-2" /> Change Image</span>
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
                           Recommended aspect ratio 2:3. Max file size 2MB.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Member
                    </Button>
                </form>
            </Form>
        </div>
    );
}
