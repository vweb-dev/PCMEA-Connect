
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
import { useRouter, useParams, notFound } from "next/navigation";
import { memberData } from "@/lib/data";
import { useEffect, useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  specialties: z.string().min(2, { message: "Please enter at least one specialty." }),
  avatar: z.instanceof(File).optional(),
  avatarUrl: z.string().url().optional(),
  companyLogo: z.instanceof(File).optional(),
  companyLogoUrl: z.string().url().optional(),
})

export default function EditMemberPage() {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const memberId = params.id as string;
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const member = memberData.find(m => m.id === memberId);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            company: "",
            email: "",
            phone: "",
            bio: "",
            specialties: "",
        },
    });

    useEffect(() => {
        if (member) {
            form.reset({
                ...member,
                specialties: member.specialties.join(', ')
            });
            setAvatarPreview(member.avatarUrl);
            setLogoPreview(member.companyLogoUrl);
        }
    }, [member, form]);


    if (!member) {
        return notFound();
    }

    const { isSubmitting } = form.formState;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("avatar", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("companyLogo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const finalValues = {
            ...values,
            specialties: values.specialties.split(',').map(s => s.trim()),
            id: memberId
        };
        console.log(finalValues);
        toast({
            title: "Member Updated!",
            description: "The member has been successfully updated.",
        });
        router.push("/admin/members");
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <Link href="/admin/members" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Member Management
                </Link>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Edit Member</h1>
                <p className="text-muted-foreground mt-2">Update the details of the member in the directory.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Member Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Ahmed Khan" {...field} />
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
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Khan Carpets International" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="member@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+92 300 1234567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea rows={4} placeholder="A short bio about the member and their company..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="specialties"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Specialties</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Modern Design, Silk Rugs, EU Market" {...field} />
                                </FormControl>
                                <FormDescription>Enter a comma-separated list of specialties.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <FormItem>
                            <FormLabel>Avatar Image</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                                    <label htmlFor="avatar-upload" className="cursor-pointer">
                                        <Button type="button" variant="outline" asChild>
                                            <span><Upload className="mr-2" /> Change Avatar</span>
                                        </Button>
                                    </label>
                                    {avatarPreview && (
                                        <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                                            <Image src={avatarPreview} alt="Avatar preview" fill className="object-cover" />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                Recommended aspect ratio 1:1. Max file size 2MB.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                         <FormItem>
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input id="logo-upload" type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                                    <label htmlFor="logo-upload" className="cursor-pointer">
                                        <Button type="button" variant="outline" asChild>
                                            <span><Upload className="mr-2" /> Change Logo</span>
                                        </Button>
                                    </label>
                                    {logoPreview && (
                                        <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                                            <Image src={logoPreview} alt="Logo preview" fill className="object-contain p-2" />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                             <FormDescription>
                                Recommended aspect ratio 1:1. Max file size 2MB.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Member
                    </Button>
                </form>
            </Form>
        </div>
    );
}
