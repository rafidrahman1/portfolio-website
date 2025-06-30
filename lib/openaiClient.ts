import OpenAI from "openai";

export const openai: OpenAI = new OpenAI({
    baseURL: process.env.OPENAI_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

