'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Message = { id: string; role: 'user' | 'assistant'; content: string; };

export default function FollowUpChatPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      // CHANGED: The AI now only asks about the very first goal to kick things off!
      content: "Welcome back! It's been exactly one week since your assessment. Let's see how your action plan went. First up: you aimed to get an extra hour of sleep each night. How did you do with that?",
    }
  ]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.content.includes('CALCULATING_RESULTS')) {
      setTimeout(() => { router.push('/comparison'); }, 2500);
    }
  }, [messages, router]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // CHANGED: We are now talking to the new Follow-Up backend we just built
      const res = await fetch('/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = messages.map(msg => ({
    ...msg,
    content: msg.content.replace('CALCULATING_RESULTS', 'Got it. Analyzing your progress and generating your Week 2 comparison map now...')
  }));

  return (
    <div className="relative min-h-[92vh] max-h-[92vh] bg-black flex flex-col items-center overflow-y-auto overflow-x-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[92vh] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="w-full max-w-3xl flex justify-center py-6 z-10 sticky top-0 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <h1 className="text-xl font-light tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-white to-emerald-400">
          WEEK 2 FOLLOW-UP
        </h1>
      </header>

      <main className="flex-1 w-full max-w-3xl p-4 sm:p-6 overflow-y-auto space-y-6 z-10 pb-32" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {displayMessages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl text-[15px] leading-relaxed tracking-wide shadow-lg ${
                msg.role === 'user' ? 'bg-white text-black rounded-br-sm' : 'bg-white/10 backdrop-blur-md border border-white/10 text-white/90 rounded-bl-sm' 
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start"><div className="p-4 rounded-2xl text-[15px] bg-white/10 backdrop-blur-md border border-white/10 text-white/50 rounded-bl-sm">Typing...</div></div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="fixed bottom-0 w-full max-w-3xl p-6 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
        <form onSubmit={handleSend} className="relative flex items-center w-full bg-white/5 border border-white/20 backdrop-blur-2xl rounded-full focus-within:border-emerald-500/50 transition-all duration-300">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} placeholder={isLoading ? "AI is analyzing..." : "Type your response..."} className="w-full bg-transparent text-white placeholder-white/30 px-6 py-4 outline-none rounded-full disabled:opacity-50" autoFocus />
          <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 p-2 px-4 rounded-full bg-white text-black font-medium disabled:opacity-50 hover:scale-105 transition-all">Send</button>
        </form>
      </div>
    </div>
  );
}