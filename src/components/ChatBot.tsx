import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export interface ChatBotProps {
  initialMessages?: ChatMessage[];
  title?: string;
  subtitle?: string;
}

const defaultGreeting: ChatMessage = {
  id: "greet",
  role: "bot",
  content: "Hi, I'm Gemini. How can I help you with the dashboard today?",
};

export function ChatBot({
  initialMessages,
  title = "Caregiver Support",
  subtitle = "Direct Gemini Integration",
}: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages ?? [defaultGreeting]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // 1. MAKE SURE YOUR KEY IS CORRECT
      const API_KEY = "AIzaSyAV6l5K917lKTaOJKzCBPQl_QbaYdPmFLU"; 

      // 2. UPDATED TO GEMINI 2.0 FLASH (1.5 is likely retired)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: trimmed }] }],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `Google API Error: ${response.status}`);
      }

      const replyText = data.candidates[0].content.parts[0].text;
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: "bot", content: replyText }]);
    } catch (err: any) {
      console.error("Gemini Error:", err);
      setMessages((m) => [
        ...m,
        { 
          id: `b-${Date.now()}`, 
          role: "bot", 
          content: `SYSTEM ERROR: ${err.message}` 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-7 w-7" /> : <LifeBuoy className="h-7 w-7" />}
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b p-4 bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold">{title}</h2>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[80%] rounded-2xl px-4 py-2", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-muted-foreground animate-pulse">Gemini is thinking...</div>}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
            className="flex gap-2 border-t p-3 bg-background"
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Gemini..." className="flex-1" />
            <Button type="submit" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;