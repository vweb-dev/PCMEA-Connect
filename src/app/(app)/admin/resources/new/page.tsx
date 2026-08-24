
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UploadForm } from "@/app/(app)/resources/upload-form";

export default function NewResourcePage() {
    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <div>
                <Link href="/admin/resources" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Resource Management
                </Link>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Upload New Resource</h1>
                <p className="text-muted-foreground mt-2">Select a document file to upload and categorize with AI.</p>
            </div>
            
            <UploadForm />
        </div>
    );
}
