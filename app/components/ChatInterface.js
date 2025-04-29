"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAIResponse } from "../lib/langchain";

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Xnerds. How can I help you today?",
      sender: "bot",
      isTyping: false
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (message) => {
    const newMessage = { ...message, isTyping: true };
    setMessages(prev => [...prev, newMessage]);
    
    // Get AI response
    const aiResponse = await getAIResponse([...messages, message]);
    
    setMessages(prev => prev.map(msg => 
      msg === newMessage ? { ...msg, isTyping: false, text: aiResponse } : msg
    ));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: "user", isTyping: false };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      
      // Get bot response
      const botResponse = {
        text: "", // Will be filled by the AI response
        sender: "bot",
        isTyping: true
      };
      await simulateTyping(botResponse);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] w-full max-w-3xl mx-auto">
      <Card className="flex flex-col h-full bg-black/90 border-blue-500/20">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2.5 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        message.sender === "user"
                          ? "https://github.com/shadcn.png"
                          : "https://github.com/vercel.png"
                      }
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {message.sender === "user" ? "U" : "B"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col gap-1 ${
                      message.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 ${
                        message.sender === "user"
                          ? "bg-blue-900 text-white rounded-l-xl rounded-tr-xl"
                          : "bg-gray-800 text-white rounded-r-xl rounded-tl-xl"
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        <p className="text-sm font-normal font-mono">{message.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-blue-500/20">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white border-blue-500/20 focus:border-blue-500 font-mono"
            />
            <Button 
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-mono"
            >
              Send
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 