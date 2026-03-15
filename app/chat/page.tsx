'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function HabitsChatPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your LongevAI assistant. I'd love to get to know your lifestyle a bit better to map out your longevity. How have you been sleeping lately?",
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Magic word logic
  useEffect(() => {
    const asyncFunc = async () => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant' && lastMessage.content.includes('CALCULATING_RESULTS')) {
        try {
          const user_id = localStorage.getItem("user_id") ?? "8a714bcc-2337-4513-9050-d2cd344aa9f6";
          const demographic = localStorage.getItem("demographic");
          const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id, messages: messages, demographic: demographic})
          });
          const data = await res.json();
          localStorage.setItem("gemini_health", JSON.stringify(data));
        } catch (err) {
          console.error("Analyze failed:", err);
        }

        setTimeout(() => {
          router.push('/results');
        }, 2500);
      }
    }
    asyncFunc();
  }, [messages, router]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Add user message to UI
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // 2. Send to our new Gemini backend
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      // 3. Add AI response to UI
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: data.text }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = messages.map(msg => ({
    ...msg,
    content: msg.content.replace('CALCULATING_RESULTS', 'Perfect, I have everything I need. Calculating your longevity scores now...')
  }));

  return (
    <div className="relative max-h-[92vh] min-h-[92vh] bg-black flex-1 flex-col items-center overflow-y-auto overflow-x-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[92vh] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-organ-liver)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="w-full max-w-3xl flex justify-center py-6 z-10 sticky top-0 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h1 className="text-xl font-light tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white/60 via-white to-white/60">
          ASSESSMENT
        </h1>
      </header>

      <main className="flex-1 w-full max-w-3xl p-4 sm:p-6 overflow-y-auto space-y-6 z-10 pb-32" style={{ scrollbarWidth: 'none', msOverflowStyle: 'auto' }}>
        {displayMessages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl text-[15px] leading-relaxed tracking-wide shadow-lg ${msg.role === 'user'
              ? 'bg-white text-black rounded-br-sm'
              : 'bg-white/10 backdrop-blur-md border border-white/10 text-white/90 rounded-bl-sm shadow-[0_4px_30px_rgba(255,255,255,0.05)]'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="p-4 rounded-2xl text-[15px] bg-white/10 backdrop-blur-md border border-white/10 text-white/50 rounded-bl-sm">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="fixed bottom-0 w-full max-w-3xl p-6 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
        <form onSubmit={handleSend} className="relative flex items-center w-full bg-white/5 border border-white/20 backdrop-blur-2xl rounded-full focus-within:border-white/50 focus-within:bg-white/10 transition-all duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "AI is thinking..." : "Type your response..."}
            className="w-full bg-transparent text-white placeholder-white/30 px-6 py-4 outline-none rounded-full disabled:opacity-50"
            autoFocus
          />
          <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 p-2 px-4 rounded-full bg-white text-black font-medium disabled:opacity-50 hover:scale-105 transition-all duration-200">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}