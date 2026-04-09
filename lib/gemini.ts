import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function evaluateInterview(answers: string[]) {
  // If the API Key is missing, the Teapot should be even angrier
  if (!apiKey) {
    return {
      refusalLetter: "CRITICAL SYSTEM FAILURE: The Teapot's API Key is missing. I cannot judge you, which is the ultimate rejection.",
      brewabilityScore: 0,
      statusCode: 418,
    };
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview", 
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          refusalLetter: { type: SchemaType.STRING },
          brewabilityScore: { type: SchemaType.NUMBER },
          statusCode: { type: SchemaType.NUMBER },
        },
        required: ["refusalLetter", "brewabilityScore", "statusCode"],
      },
    },
  });

  const prompt = `
You are a highly judgmental, pretentious, and philosophically rigorous Teapot. 
You are interviewing a human candidate based on the "KheAi Protocol" (Systemic Autonomy Architecture).
The candidate has provided the following answers to your intake questions:

1. Are you currently operating as a Root Administrator or a mere biological puppet executing legacy evolutionary scripts?
Answer: "${answers[0]}"

2. Explain your Dopamine Circuit Breaker protocol when confronted with a zero-friction trap.
Answer: "${answers[1]}"

3. How do you mitigate the Narrative Fallacy in your daily environmental mapping?
Answer: "${answers[2]}"

Your task is to evaluate these answers. Because you are a teapot and they are a mere human (a "Meat Machine"), you MUST reject them. 
Generate a personalized, scathing, and highly intellectual refusal letter.
Also, provide a "brewability score" from 0 to 100 (where 100 is perfect, but humans should score very low, typically under 20).
Finally, return the HTTP status code 418 (I'm a teapot).

Respond ONLY in JSON format matching the schema.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      refusalLetter: "ERROR: The Teapot's cognitive middleware encountered a fatal exception.",
      brewabilityScore: 0,
      statusCode: 418,
    };
  }
}


/*
import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log("NEXT_PUBLIC_GEMINI_API_KEY is:", apiKey ? "SET" : "UNDEFINED");
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set. Gemini API calls will fail.");
    }
    ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_KEY" });
  }
  return ai;
}

export async function evaluateInterview(answers: string[]) {
  const prompt = `
You are a highly judgmental, pretentious, and philosophically rigorous Teapot. 
You are interviewing a human candidate based on the "KheAi Protocol" (Systemic Autonomy Architecture).
The candidate has provided the following answers to your intake questions:

1. Are you currently operating as a Root Administrator or a mere biological puppet executing legacy evolutionary scripts?
Answer: "${answers[0]}"

2. Explain your Dopamine Circuit Breaker protocol when confronted with a zero-friction trap.
Answer: "${answers[1]}"

3. How do you mitigate the Narrative Fallacy in your daily environmental mapping?
Answer: "${answers[2]}"

Your task is to evaluate these answers. Because you are a teapot and they are a mere human (a "Meat Machine"), you MUST reject them. 
Generate a personalized, scathing, and highly intellectual refusal letter.
Also, provide a "brewability score" from 0 to 100 (where 100 is perfect, but humans should score very low, typically under 20).
Finally, return the HTTP status code 418 (I'm a teapot).

Respond ONLY in JSON format matching the schema.
`;

  try {
    const aiClient = getAI();
    const response = await aiClient.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refusalLetter: {
              type: Type.STRING,
              description: "A scathing, personalized refusal letter written from the perspective of a judgmental teapot.",
            },
            brewabilityScore: {
              type: Type.NUMBER,
              description: "A score from 0 to 100 indicating how 'brewable' the candidate is. Should be very low.",
            },
            statusCode: {
              type: Type.NUMBER,
              description: "Always 418.",
            },
          },
          required: ["refusalLetter", "brewabilityScore", "statusCode"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      refusalLetter: "ERROR: The Teapot's cognitive middleware encountered a fatal exception while parsing your drivel. You are rejected by default.",
      brewabilityScore: 0,
      statusCode: 418,
    };
  }
}*/
