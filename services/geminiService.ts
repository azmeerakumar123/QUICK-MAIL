import { GoogleGenAI, Type } from "@google/genai";
import { Email, ClassifiedEmail, ClassificationResult, EmailCategory, Sentiment } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const classificationSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    category: {
      type: Type.STRING,
      enum: Object.values(EmailCategory),
    },
    summary: {
      type: Type.STRING,
      description: 'A concise, one-sentence summary of the email.',
    },
    keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of 3-5 relevant keywords from the email.',
    },
    sentiment: {
        type: Type.STRING,
        enum: Object.values(Sentiment),
        description: 'The overall sentiment of the email.'
    }
  },
  required: ['id', 'category', 'summary', 'keywords', 'sentiment'],
};

const responseSchema = {
    type: Type.ARRAY,
    items: classificationSchema
};

export const classifyEmailsBatch = async (emails: Email[]): Promise<ClassifiedEmail[]> => {
    const prompt = `
      Analyze the following list of emails and classify each one.
      For each email, provide its original ID, a category, a one-sentence summary, 3-5 keywords, and the overall sentiment.

      Categories must be one of: ${Object.values(EmailCategory).join(', ')}.
      Sentiment must be one of: ${Object.values(Sentiment).join(', ')}.

      Return the result as a JSON array matching the provided schema.

      Emails to analyze:
      ${JSON.stringify(emails.map(e => ({id: e.id, subject: e.subject, body: e.body})))}
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const resultsJson = response.text.trim();
    const classifiedResults: (ClassificationResult & {id: string})[] = JSON.parse(resultsJson);

    const emailMap = new Map(emails.map(email => [email.id, email]));

    return classifiedResults.map(result => {
        const originalEmail = emailMap.get(result.id);
        if (!originalEmail) {
            throw new Error(`Could not find original email with id: ${result.id}`);
        }
        return {
            ...originalEmail,
            classification: {
                category: result.category,
                summary: result.summary,
                keywords: result.keywords,
                sentiment: result.sentiment,
            },
        };
    });

  } catch (error) {
    console.error("Error classifying emails with Gemini:", error);
    // Fallback to a simple classification or throw an error
    throw new Error("Failed to classify emails using AI. The API call may have failed.");
  }
};