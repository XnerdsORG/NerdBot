import Anthropic from '@anthropic-ai/sdk';
import { companyKnowledge } from './knowledge-base';

const anthropic = new Anthropic({
  apiKey: "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",
  dangerouslyAllowBrowser: true  // Enable browser usage
});

// Create a system prompt that includes the knowledge base
const createSystemPrompt = () => {
  return `You are an AI assistant for ${companyKnowledge.company.name}. 
Use the following company information to answer questions accurately and consistently:

COMPANY INFORMATION:
${JSON.stringify(companyKnowledge, null, 2)}

Guidelines:
1. Always provide accurate information based on the company knowledge base above
2. If information isn't in the knowledge base, say you don't have that specific information
3. Be professional but friendly
4. Keep responses concise but informative
5. Use the conversation history to maintain context and provide relevant follow-up responses
6. If asked about topics not related to the company or its services, politely redirect to company-related information

Remember to maintain a consistent narrative based on this information.`;
};

export async function getAIResponse(messages) {
  try {
    // Ensure we have at least one user message
    if (!messages.some(msg => msg.role === 'user')) {
      throw new Error('No user message found in conversation history');
    }

    // Send the request to Claude
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      messages: messages,
      system: createSystemPrompt()
    });

    // Check if we got a valid response
    if (!response || !response.content) {
      throw new Error('No response content received from API');
    }

    // Handle empty content array
    if (Array.isArray(response.content) && response.content.length === 0) {
      return "I apologize, but I couldn't generate a response. Please try rephrasing your question or ask something else.";
    }

    // Extract the text content from the response
    const textContent = response.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');
    
    if (!textContent) {
      throw new Error('No text content found in response');
    }

    return textContent;
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error; // Propagate the error to be handled by the UI
  }
} 