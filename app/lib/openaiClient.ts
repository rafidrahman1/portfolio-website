import OpenAI from "openai";

export const client: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_URL,
});

