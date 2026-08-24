
// src/app/contact/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Building } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Contact Us',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground mt-2">We're here to help. Reach out to us with any questions or inquiries.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-3">
                    <Building className="text-primary" />
                    Our Headquarters
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">PCMEA Head Office</p>
                        <p className="text-sm text-muted-foreground">Carpet Training Institute Building, 27-Race Course Road, Lahore, Pakistan</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">(+92-42) 36312763-64</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">info@pcmea.pk</p>
                </div>
            </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                <CardDescription>For the quickest response, please send us an email.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Whether you have a question about membership, events, resources, or anything else, our team is ready to answer all your questions.
                </p>
                <Link href="mailto:info@pcmea.pk">
                    <Button size="lg" className="w-full">
                        <Mail className="mr-2"/> Send an Email
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

