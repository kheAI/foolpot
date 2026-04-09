'use server' // CRITICAL: This allows the client to call server code

import { evaluateInterview } from "@/lib/gemini";

export async function handleEvaluationAction(answers: string[]) {
  // This runs on the Cloud Run server, where GEMINI_API_KEY exists
  return await evaluateInterview(answers);
}