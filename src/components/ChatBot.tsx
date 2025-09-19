import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Send, Bot, User, Languages, Loader2, X, Minimize2, Maximize2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const languages = [
  { code: "English", name: "English" },
  { code: "Hindi", name: "हिंदी" },
  { code: "Bengali", name: "বাংলা" },
  { code: "Santali", name: "Santali" },
  { code: "Spanish", name: "Español" },
  { code: "French", name: "Français" },
  { code: "German", name: "Deutsch" },
  { code: "Japanese", name: "日本語" },
  { code: "Chinese", name: "中文" }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! I\'m your Jharkhand tourism assistant. I can help you discover amazing destinations, plan your trip, learn about local culture, and answer any questions about traveling in Jharkhand. How can I assist you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('multilingual-chatbot', {
        body: {
          message: currentMessage,
          language: selectedLanguage,
          chatHistory: messages.slice(-10) // Send last 10 messages for context
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg gradient-cultural hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[32rem]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl">
        <CardHeader className="flex-row items-center justify-between py-3 px-4 gradient-cultural text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-base">Jharkhand Tourism Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {!isMinimized && (
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-24 h-8 bg-white/20 border-white/30 text-white text-xs">
                  <Languages className="h-3 w-3" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-xs">
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-cultural rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-cultural rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Typing...
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask about Jharkhand tourism in ${selectedLanguage}...`}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={isLoading || !currentMessage.trim()}
                    size="icon"
                    variant="default"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI assistant for Jharkhand tourism information
                </p>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;