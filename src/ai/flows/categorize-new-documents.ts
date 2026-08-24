// src/ai/flows/categorize-new-documents.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing newly uploaded documents in the resource library using AI.
 *
 * categorizeDocument - A function that categorizes a document based on its content.
 * CategorizeDocumentInput - The input type for the categorizeDocument function.
 * CategorizeDocumentOutput - The return type for the categorizeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeDocumentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to be categorized.'),
  documentName: z.string().describe('The name of the document.'),
});
export type CategorizeDocumentInput = z.infer<typeof CategorizeDocumentInputSchema>;

const CategorizeDocumentOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe(
      'An array of categories that best describe the document, such as "trade regulations", "market analysis", or "member news".'
    ),
  keywords: z
    .array(z.string())
    .describe('An array of keywords extracted from the document.'),
  summary: z.string().describe('A short summary of the document content.'),
});
export type CategorizeDocumentOutput = z.infer<typeof CategorizeDocumentOutputSchema>;

export async function categorizeDocument(input: CategorizeDocumentInput): Promise<CategorizeDocumentOutput> {
  return categorizeDocumentFlow(input);
}

const categorizeDocumentPrompt = ai.definePrompt({
  name: 'categorizeDocumentPrompt',
  input: {schema: CategorizeDocumentInputSchema},
  output: {schema: CategorizeDocumentOutputSchema},
  prompt: `You are an AI assistant helping to categorize documents for the PCMEA (Pakistan Carpet Manufacturers and Exporters Association).

  Analyze the following document content and provide the best categories, keywords, and a short summary.

  Document Name: {{{documentName}}}
  Document Content: {{{documentContent}}}

  Categories should be chosen from the following list:
  - Trade Regulations
  - Market Analysis
  - Member News
  - Export Data
  - Industry Trends
  - PCMEA Announcements
  - Training Materials
  - Legal Documents
  - Sustainability Reports

  Return the categories, keywords, and summary in JSON format.
  `,
});

const categorizeDocumentFlow = ai.defineFlow(
  {
    name: 'categorizeDocumentFlow',
    inputSchema: CategorizeDocumentInputSchema,
    outputSchema: CategorizeDocumentOutputSchema,
  },
  async input => {
    const {output} = await categorizeDocumentPrompt(input);
    return output!;
  }
);
