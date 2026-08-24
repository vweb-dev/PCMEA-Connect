"use server";

import { categorizeDocument, CategorizeDocumentOutput } from "@/ai/flows/categorize-new-documents";

interface FormState {
  message: string;
  result: CategorizeDocumentOutput | null;
  error: string | null;
}

export async function handleDocumentUpload(prevState: FormState, formData: FormData): Promise<FormState> {
  const file = formData.get('document') as File;

  if (!file || file.size === 0) {
    return { message: 'No file uploaded', result: null, error: 'Please select a file to upload.' };
  }
  
  try {
    // In a real application, you would handle file storage (e.g., to a cloud bucket)
    // and read the content properly. For this demo, we'll read it as text.
    const documentContent = await file.text();
    const documentName = file.name;

    const result = await categorizeDocument({ documentContent, documentName });

    // Here, you would typically save the file and its metadata (the AI result) to your database.
    // For now, we'll just return the result to the client.

    return { message: 'Document categorized successfully', result, error: null };

  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: 'Failed to categorize document', result: null, error: `AI categorization failed: ${errorMessage}` };
  }
}
