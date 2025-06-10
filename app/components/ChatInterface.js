"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { getAIResponse } from "../lib/langchain";

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Xnerds. How can I help you today?",
      sender: "bot",
      isTyping: false,
      isWelcomeMessage: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (message) => {
    const newMessage = { ...message, isTyping: true };
    setMessages((prev) => [...prev, newMessage]);

    try {
      setIsLoading(true);
      const messageHistory = messages
        .filter((msg) => !msg.isWelcomeMessage)
        .filter((msg) => msg.text && msg.text.trim() !== "")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

      if (input.trim()) {
        messageHistory.push({
          role: "user",
          content: input.trim(),
        });
      }

      const aiResponse = await getAIResponse(messageHistory);

      setMessages((prev) =>
        prev.map((msg) =>
          msg === newMessage
            ? { ...msg, isTyping: false, text: aiResponse }
            : msg
        )
      );
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg === newMessage
            ? {
                ...msg,
                isTyping: false,
                text: "I apologize, but I encountered an error. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: "user", isTyping: false };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const botResponse = {
        text: "",
        sender: "bot",
        isTyping: true,
      };
      await simulateTyping(botResponse);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] w-full max-w-6xl mx-auto">
      <Card className="flex flex-col h-full bg-slate-900/80 backdrop-blur-xl border-slate-700/50 shadow-2xl">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-4 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-10 h-10 border-2 border-slate-600/50">
                    <AvatarFallback
                      className={`${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                          : "bg-gradient-to-br from-cyan-500 to-purple-600"
                      } text-white`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex flex-col gap-2 ${
                      message.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {message.sender === "user" ? "You" : "Nerd Bot"}
                      {message.sender === "bot" && (
                        <Sparkles className="w-3 h-3" />
                      )}
                    </div>

                    <div
                      className={`relative p-4 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-slate-800/80 text-slate-100 border border-slate-700/50 shadow-lg"
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-400 ml-2">
                            Thinking...
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                      )}

                      {/* Message tail */}
                      <div
                        className={`absolute top-4 ${
                          message.sender === "user"
                            ? "right-0 translate-x-1/2"
                            : "left-0 -translate-x-1/2"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rotate-45 ${
                            message.sender === "user"
                              ? "bg-gradient-to-br from-blue-600 to-purple-600"
                              : "bg-slate-800/80 border-l border-t border-slate-700/50"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-slate-700/50 bg-slate-800/50">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="bg-slate-800/80 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/20 pr-12 h-12 rounded-xl"
                disabled={isLoading}
              />
              {input.trim() && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white h-12 px-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center mt-4 text-xs text-slate-500">
            <span>Powered by Xnerds Solutions • Secure & Private</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
