
// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { promises as fs } from 'fs';
import path from 'path';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Landmark, HeartHandshake, Award, Scale, Globe } from "lucide-react";

export const metadata = {
  title: 'About Us',
};

// In a real app, this data would come from a database or a CMS.
const getPageData = async () => {
    // This is placeholder data. The form in admin panel will save to the console.
    return {
        title: "About The Pakistan Carpet Manufacturers and Exporters Association",
        subtitle: "Weaving a legacy of craftsmanship, quality, and global excellence.",
        history: "Founded in 1960, the Pakistan Carpet Manufacturers and Exporters Association (PCMEA) has been the premier representative body for the Pakistani carpet industry for over six decades. From our humble beginnings, we have grown into a dynamic organization dedicated to promoting the artistry of our members on a global stage. Throughout our history, we have been instrumental in setting quality standards, advocating for fair trade practices, and fostering innovation in design and production. Our journey is one of passion, dedication, and a relentless pursuit of excellence, ensuring the rich legacy of Pakistani carpet weaving continues to thrive for generations to come.",
        mission: "To empower our members by providing a unified platform for advocacy, promoting ethical practices, and creating global opportunities to showcase the unparalleled craftsmanship of the Pakistani carpet industry.",
        vision: "To be the global leader in promoting and sustaining the heritage of Pakistani carpets, recognized for quality, innovation, and social responsibility.",
        imageUrl: "/about-hero.jpg"
    }
}

const coreValues = [
    { title: "Integrity", icon: Scale, description: "Upholding the highest standards of honesty and fairness in all our dealings." },
    { title: "Quality", icon: Award, description: "Committing to excellence and superior craftsmanship in every carpet produced." },
    { title: "Collaboration", icon: HeartHandshake, description: "Fostering a strong, supportive community among our members and partners." },
    { title: "Innovation", icon: Eye, description: "Encouraging creativity and embracing new techniques to meet evolving market demands." },
    { title: "Global Reach", icon: Globe, description: "Promoting Pakistani carpets on the world stage and expanding market access for our members." },
    { title: "Heritage", icon: Landmark, description: "Preserving and celebrating the rich cultural traditions of Pakistani carpet weaving." },
]


export default async function AboutPage() {
    const data = await getPageData();
    
    const imagePath = path.join(process.cwd(), 'public', data.imageUrl);
    const imageExists = await fs.access(imagePath).then(() => true).catch(() => false);

    return (
        <div className="flex flex-col gap-12">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg bg-secondary">
                {imageExists ? (
                     <Image
                        src={data.imageUrl}
                        alt="PCMEA Team"
                        fill
                        className="object-cover"
                        data-ai-hint="organization headquarters"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                )}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-white">{data.title}</h1>
                    <p className="text-lg md:text-xl text-primary-foreground/90 mt-4 max-w-3xl">{data.subtitle}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Our History</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                    <p>{data.history}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-md">
                            <Target className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{data.mission}</p>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-md">
                            <Eye className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{data.vision}</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight">Our Core Values</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">The principles that guide our association and its members in building a thriving and ethical industry.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreValues.map((value) => (
                    <Card key={value.title} className="text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="mx-auto w-fit p-4 bg-primary/10 rounded-full mb-4">
                                <value.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-headline text-xl font-semibold">{value.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="shadow-lg bg-secondary/50">
                 <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="font-headline text-2xl font-bold">Meet Our Leadership</h3>
                        <p className="text-muted-foreground mt-1">Get to know the dedicated individuals guiding our association.</p>
                    </div>
                     <Link href="/board-of-directors">
                        <Button size="lg" className="shrink-0">
                            View Board of Directors <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
