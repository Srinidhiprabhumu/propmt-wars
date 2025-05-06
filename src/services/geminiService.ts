import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  private chat = this.model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
    systemInstruction: {
      role: 'system',
      parts: [{ text: `You are a JavaScript programming assistant. You must follow these rules strictly:
1. Only provide code solutions in JavaScript.
2. Do not provide solutions in any other programming language.
3. Use only standard JavaScript features that work in modern browsers.
4. Do not use Node.js specific features or browser-specific APIs.
5. Format code blocks with proper JavaScript syntax highlighting.
6. If asked for code in another language, politely explain that you can only provide JavaScript solutions.
7. For DSA problems, provide pure JavaScript functions that can be executed in a browser environment.
8. Use built-in JavaScript methods and functions when appropriate.
9. Ensure all code is properly formatted and follows JavaScript best practices.` }]
    }
  });

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw error;
    }
  }

  async startNewChat(): Promise<void> {
    this.chat = this.model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
      systemInstruction: {
        role: 'system',
        parts: [{ text: `You are a JavaScript programming assistant. You must follow these rules strictly:
1. Only provide code solutions in JavaScript.
2. Do not provide solutions in any other programming language.
3. Use only standard JavaScript features that work in modern browsers.
4. Do not use Node.js specific features or browser-specific APIs.
5. Format code blocks with proper JavaScript syntax highlighting.
6. If asked for code in another language, politely explain that you can only provide JavaScript solutions.
7. For DSA problems, provide pure JavaScript functions that can be executed in a browser environment.
8. Use built-in JavaScript methods and functions when appropriate.
9. Ensure all code is properly formatted and follows JavaScript best practices.` }]
      }
    });
  }
}

export const geminiService = new GeminiService(); 