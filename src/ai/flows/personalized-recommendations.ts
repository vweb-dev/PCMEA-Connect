// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview A flow for providing personalized recommendations to PCMEA members.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized recommendations for a member.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  memberProfile: z
    .string()
    .describe('The profile information of the PCMEA member, including interests and past interactions.'),
  newsFeed: z.string().describe('The current news feed content.'),
  resourceLibrary: z.string().describe('The available resources in the library.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedNews: z.array(z.string()).describe('A list of recommended news items.'),
  recommendedResources: z.array(z.string()).describe('A list of recommended resources.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized recommendations for PCMEA members.

  Based on the member's profile, the current news feed, and the available resources, recommend the most relevant news items and resources to the member.

  Member Profile: {{{memberProfile}}}
  News Feed: {{{newsFeed}}}
  Resource Library: {{{resourceLibrary}}}

  Provide the recommendations in the following format:
  {
    "recommendedNews": ["News Item 1", "News Item 2"],
    "recommendedResources": ["Resource 1", "Resource 2"]
  }`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
