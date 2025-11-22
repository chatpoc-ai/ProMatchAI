import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SportType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Gemini 2.5 Flash is excellent for video understanding due to its speed and large context window.
const MODEL_FAST = 'gemini-2.5-flash';

// Helper to convert File to Base64 string for inlineData
const fileToGenericPart = async (file: File): Promise<{ inlineData: { mimeType: string; data: string } }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove the Data URL prefix (e.g., "data:video/mp4;base64,")
            const base64Data = base64String.split(',')[1];
            resolve({
                inlineData: {
                    mimeType: file.type,
                    data: base64Data,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const generateMatchAnalysis = async (
    sport: SportType,
    opponent: string,
    matchNotes: string,
    videoFile: File | null = null
): Promise<string> => {
    if (!apiKey) throw new Error("API Key missing");

    const promptText = `
    Role: Professional Sports Analyst for ${sport}.
    Task: Generate a detailed post-match analysis report.
    Context: The player just played against ${opponent}.
    User Notes on Match: "${matchNotes}"
    ${videoFile ? "Video Context: A video clip of the match is attached. Analyze the visible techniques, movements, and plays in this clip to provide specific feedback." : ""}
    
    Output Requirements:
    Produce a structured JSON string (do not include markdown code blocks) with the following keys:
    {
        "summary": "A concise executive summary of performance (max 50 words).",
        "technicalAnalysis": ["Point 1", "Point 2", "Point 3"],
        "tacticalAnalysis": ["Point 1", "Point 2", "Point 3"],
        "keyMoments": [
            {"time": "00:15", "description": "Observed event from video/notes", "sentiment": "positive" or "negative"}
        ]
    }
    Ensure the tone is professional, data-driven, and constructive.
    `;

    try {
        const parts: any[] = [];
        
        // Add video part if present
        if (videoFile) {
            const videoPart = await fileToGenericPart(videoFile);
            parts.push(videoPart);
        }

        // Add text prompt
        parts.push({ text: promptText });

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: MODEL_FAST,
            contents: { parts },
            config: {
                responseMimeType: "application/json"
            }
        });
        return response.text || "{}";
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw error;
    }
};

export const getCoachAdvice = async (
    sport: SportType,
    history: { role: string; text: string }[],
    currentMessage: string
): Promise<string> => {
    if (!apiKey) return "Error: API Key not configured.";

    const systemInstruction = `You are an elite, world-class AI Sports Coach specializing in ${sport}. 
    Your coaching style is direct, analytical, and encouraging. 
    You have access to the player's "Digital Twin" model (simulated) which suggests they are aggressive but sometimes impatient.
    Focus on strategy, mental toughness, and specific technical corrections.
    Keep responses concise (under 100 words) unless asked for a deep dive.`;

    try {
        const chat = ai.chats.create({
            model: MODEL_FAST,
            config: { systemInstruction }
        });
        
        const result = await chat.sendMessage({ message: currentMessage });
        return result.text || "I'm analyzing the play...";
    } catch (error) {
        console.error("Coach Error:", error);
        return "Coach is offline momentarily. (API Error)";
    }
};