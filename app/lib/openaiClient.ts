import OpenAI from "openai";

let instance: OpenAI | undefined;

/** Created on first use so the app builds and runs without OpenAI credentials. */
export function getClient(): OpenAI {
  instance ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_URL,
  });
  return instance;
}
