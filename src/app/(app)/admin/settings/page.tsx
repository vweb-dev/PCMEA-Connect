"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleSettingsUpdate } from './actions';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, Save, Terminal, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const initialState = {
  message: '',
  error: null,
};

const formSchema = z.object({
  logo: z.any(),
  favicon: z.any(),
  loadingLogo: z.any(),
  lightPrimary: z.string().optional(),
  lightSecondary: z.string().optional(),
  lightAccent: z.string().optional(),
  lightCard: z.string().optional(),
  lightBackground: z.string().optional(),
  darkPrimary: z.string().optional(),
  darkSecondary: z.string().optional(),
  darkAccent: z.string().optional(),
  darkCard: z.string().optional(),
  darkBackground: z.string().optional(),
});


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <Save className="mr-2 h-4 w-4" />
        )}
        {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

const ColorField = ({ control, name, label, description, defaultValue }: { control: any, name: string, label: string, description: string, defaultValue: string }) => {
    const [color, setColor] = useState(defaultValue);
    return (
         <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-4">
                           <Input 
                             type="color" 
                             className="w-16 h-10 p-1 cursor-pointer" 
                             defaultValue={defaultValue}
                             onChange={(e) => {
                                 field.onChange(e);
                                 setColor(e.target.value);
                             }} 
                            />
                           <Input 
                             type="text" 
                             placeholder={defaultValue} 
                             className="max-w-xs font-mono" 
                             value={field.value ?? color}
                             onChange={(e) => {
                                 field.onChange(e);
                                 setColor(e.target.value);
                             }}
                            />
                        </div>
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                </FormItem>
            )}
         />
    )
}


export default function SettingsPage() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(handleSettingsUpdate, initialState);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lightPrimary: "#ea580c",
            lightSecondary: "#f8fafc",
            lightAccent: "#ea580c",
            lightCard: "#fdfdfe",
            lightBackground: "#ffffff",
            darkPrimary: "#ea580c",
            darkSecondary: "#1e1b29",
            darkAccent: "#ea580c",
            darkCard: "#191926",
            darkBackground: "#0f111a",
        }
    });

    const [logoPreview, setLogoPreview] = useState<string | null>("/logo.png");
    const [faviconPreview, setFaviconPreview] = useState<string | null>("/favicon.ico");
    const [loadingLogoPreview, setLoadingLogoPreview] = useState<string | null>("/logo.png");

    useEffect(() => {
        if (state.message && !state.error) {
            toast({
                title: "Settings Saved!",
                description: "Your general settings have been successfully updated.",
            });
            setLogoPreview(`/logo.png?t=${new Date().getTime()}`);
            setFaviconPreview(`/favicon.ico?t=${new Date().getTime()}`);
            setLoadingLogoPreview(`/logo.png?t=${new Date().getTime()}`);
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } else if (state.error) {
             toast({
                title: "Error Saving Settings",
                description: state.error,
                variant: "destructive"
            });
        }
    }, [state, toast]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "logo" | "favicon" | "loadingLogo") => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (fieldName === 'logo') {
                    setLogoPreview(result);
                } else if (fieldName === 'favicon') {
                    setFaviconPreview(result);
                } else {
                    setLoadingLogoPreview(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-4xl font-bold font-headline tracking-tight">General Settings</h1>
                <p className="text-muted-foreground mt-2">Manage site-wide settings like logos, favicon, and theme colors.</p>
            </div>
            
             <Form {...form}>
                <form action={formAction} className="space-y-8">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle>Branding</CardTitle>
                            <CardDescription>Update your application's logo, favicon, and loading screen image.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <FormField
                                control={form.control}
                                name="logo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Site Logo</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <Input id="logo-upload" name="logo" type="file" className="hidden" onChange={(e) => handleFileChange(e, "logo")} accept="image/png, image/svg+xml" />
                                                <label htmlFor="logo-upload" className="cursor-pointer">
                                                    <Button type="button" variant="outline" asChild>
                                                        <span><Upload className="mr-2" /> Upload Logo</span>
                                                    </Button>
                                                </label>
                                                {logoPreview && (
                                                    <div className="relative h-16 w-16 rounded-md overflow-hidden border p-1 bg-secondary">
                                                        <Image src={logoPreview} alt="Logo preview" fill className="object-contain" />
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Main branding logo visible in sidebars and headers. Recommended: PNG or SVG.
                                        </FormDescription>
                                    </FormItem>
                                )}
                             />
                            
                            <FormField
                                control={form.control}
                                name="favicon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Favicon</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <Input id="favicon-upload" name="favicon" type="file" className="hidden" onChange={(e) => handleFileChange(e, "favicon")} accept="image/x-icon, image/png, image/svg+xml" />
                                                <label htmlFor="favicon-upload" className="cursor-pointer">
                                                    <Button type="button" variant="outline" asChild>
                                                        <span><Upload className="mr-2" /> Upload Favicon</span>
                                                    </Button>
                                                </label>
                                                {faviconPreview && (
                                                    <div className="relative h-16 w-16 rounded-md overflow-hidden border p-1">
                                                        <Image src={faviconPreview} alt="Favicon preview" fill className="object-contain" />
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Browser tab icon. Recommended: .ico or 32x32px PNG.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                        <CardHeader className="bg-amber-500/5">
                            <CardTitle className="flex items-center gap-2"><Sun className="text-amber-500" /> Light Theme Colors</CardTitle>
                            <CardDescription>Customize the interface for light mode users.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8 pt-6">
                            <ColorField control={form.control} name="lightPrimary" label="Primary" description="Used for buttons, links, and high-visibility active states." defaultValue="#ea580c" />
                            <ColorField control={form.control} name="lightSecondary" label="Secondary" description="Backgrounds for secondary buttons, badges, and less prominent UI elements." defaultValue="#f8fafc" />
                            <ColorField control={form.control} name="lightAccent" label="Accent" description="Used for focus rings, highlights, and specialized decorative elements." defaultValue="#ea580c" />
                            <ColorField control={form.control} name="lightCard" label="Card" description="The background color for cards, dialogs, and main content containers." defaultValue="#fdfdfe" />
                            <ColorField control={form.control} name="lightBackground" label="Background" description="The main page background color visible behind all content." defaultValue="#ffffff" />
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                        <CardHeader className="bg-indigo-500/5">
                            <CardTitle className="flex items-center gap-2"><Moon className="text-indigo-400"/> Dark Theme Colors</CardTitle>
                            <CardDescription>Customize the interface for dark mode users.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8 pt-6">
                           <ColorField control={form.control} name="darkPrimary" label="Primary" description="High-visibility highlights and main interaction points in dark mode." defaultValue="#ea580c" />
                            <ColorField control={form.control} name="darkSecondary" label="Secondary" description="Subtle background for UI components like input fields and non-active items." defaultValue="#1e1b29" />
                            <ColorField control={form.control} name="darkAccent" label="Accent" description="Used for active states and subtle focus indicators in dark mode." defaultValue="#ea580c" />
                            <ColorField control={form.control} name="darkCard" label="Card" description="Background for content containers and cards in dark mode." defaultValue="#191926" />
                            <ColorField control={form.control} name="darkBackground" label="Background" description="The foundational dark background for the entire application." defaultValue="#0f111a" />
                        </CardContent>
                    </Card>

                    {state.error && (
                        <Alert variant="destructive" className="rounded-xl">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                    
                    <div className="flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </Form>
        </div>
    );
}
