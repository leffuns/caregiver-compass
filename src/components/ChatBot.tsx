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
  /** Provide your LLM integration here. Return the bot's reply text. */
  onSendMessage?: (message: string, history: ChatMessage[]) => Promise<string>;
  initialMessages?: ChatMessage[];
  title?: string;
  subtitle?: string;
}

const defaultGreeting: ChatMessage = {
  id: "greet",
  role: "bot",
  content:
    "Hi, I'm here to help. Ask me anything about today's care updates — I'll keep things simple.",
};

export function ChatBot({
  onSendMessage,
  initialMessages,
  title = "Caregiver Support",
  subtitle = "We're here whenever you need us",
}: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages ?? [defaultGreeting],
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  /**
   * handleSendMessage — integration point.
   * Replace the placeholder reply with your LLM call by passing `onSendMessage`.
   */
  async function handleSendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsTyping(true);

    try {
      const reply = onSendMessage
        ? await onSendMessage(trimmed, next)
        : "Thanks for your message. (Connect an LLM in `handleSendMessage` to enable real replies.)";
      setMessages((m) => [
        ...m,
        { id: `b-${Date.now()}`, role: "bot", content: reply },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]",
          "transition-transform hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
        )}
      >
        {open ? <X className="h-7 w-7" /> : <LifeBuoy className="h-7 w-7" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          role="dialog"
          aria-label="Caregiver support chat"
          className={cn(
            "fixed bottom-28 right-6 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col",
            "h-[min(620px,calc(100vh-10rem))] overflow-hidden rounded-2xl border border-border",
            "bg-card shadow-[var(--shadow-soft)] animate-fade-in-up",
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-[var(--gradient-soft)] px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isTyping && <TypingBubble />}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              aria-label="Type your message"
              className="h-12 text-base"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="h-12 w-12 shrink-0"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex w-full animate-fade-in-up", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-base leading-relaxed",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start animate-fade-in-up">
      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3 animate-typing">
        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
      </div>
    </div>
  );
}

export default ChatBot;