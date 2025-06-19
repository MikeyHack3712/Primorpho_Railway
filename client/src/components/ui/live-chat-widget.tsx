import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the Primorpho AI assistant. How can I help you with your website project today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("price") || msg.includes("cost")) {
      return "Our packages start at $2,500 for LaunchPad, $5,500 for Pro Presence, and $12,000 for Smart Business. Would you like details on any specific package?";
    }
    
    if (msg.includes("time") || msg.includes("long")) {
      return "LaunchPad takes 1-2 weeks, Pro Presence 2-3 weeks, and Smart Business 3-4 weeks. All projects include regular updates and communication.";
    }
    
    if (msg.includes("audit") || msg.includes("analyze")) {
      return "I can perform a free website audit for you! Just provide your website URL and I'll analyze performance, SEO, security, and mobile optimization.";
    }
    
    if (msg.includes("portfolio") || msg.includes("examples")) {
      return "Check out our portfolio section to see our work! We've helped restaurants increase online orders by 300%, healthcare platforms boost bookings by 150%, and e-commerce sites grow revenue by 400%.";
    }
    
    return "That's a great question! For detailed information, I recommend booking a free consultation where we can discuss your specific needs. Would you like me to schedule that for you?";
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 cyber-button-hover bg-primary/20 border border-primary text-white hover:bg-primary/30 rounded-full w-14 h-14"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-20 md:bottom-6 right-6 z-40 w-80 h-96 glass-card border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-cyber text-primary">NEURAL ASSISTANT</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-primary w-6 h-6"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-full pb-0">
        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg text-xs ${
                  msg.isBot
                    ? "bg-primary/20 text-white border border-primary/30"
                    : "bg-yellow-400/20 text-white border border-yellow-400/30"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-3 border-t border-primary/30">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-primary/30 text-white text-xs"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="cyber-button-hover bg-primary/20 border border-primary text-white hover:bg-primary/30 w-8 h-8"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
