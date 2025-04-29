import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// Initialize the Anthropic chat model
const model = new ChatAnthropic({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  modelName: "claude-3-sonnet-20240229", // You can change this to other Claude models
  temperature: 0.7,
  maxTokens: 1000,
});

export async function getAIResponse(messages) {
  try {
    // Format messages for the model
    const formattedMessages = messages.map(msg => {
      if (msg.sender === "user") {
        return new HumanMessage(msg.text);
      } else if (msg.sender === "bot") {
        return new AIMessage(msg.text);
      }
    }).filter(Boolean);

    // Get response from Claude
    const response = await model.invoke(formattedMessages);
    return response.content;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "I apologize, but I'm having trouble processing your request right now.";
  }
} 