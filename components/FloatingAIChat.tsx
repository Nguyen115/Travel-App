'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function FloatingAIChat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your travel AI. How can I perfect this itinerary?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { icon: '🥗', text: t.aiSuggestion1 },
    { icon: '👶', text: t.aiSuggestion2 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Great suggestion! I\'ve updated your itinerary with more options that match your preferences. Would you like me to adjust anything else?',
      sender: 'ai',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleSuggestion = async (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Perfect! I\'ve updated your trip. This will give you a much better experience. Anything else you\'d like to adjust?',
      sender: 'ai',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40 group"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-spin" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col h-[500px] z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-2xl p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">{t.aiAssistant}</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-orange-600 text-white rounded-br-none'
                  : 'bg-white border border-slate-200 text-foreground rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3">
              <Loader className="w-5 h-5 animate-spin text-orange-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && !loading && (
        <div className="px-4 py-3 border-t border-slate-200 space-y-2 bg-white">
          <p className="text-xs text-muted-foreground font-medium">Quick suggestions:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion.text)}
                className="w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 transition-all text-foreground hover:text-orange-700"
              >
                <span className="mr-2">{suggestion.icon}</span>
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-slate-200 p-4 bg-white rounded-b-2xl shrink-0 flex gap-2">
        <Input
          placeholder={t.aiChatPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading}
          className="rounded-xl h-10 text-sm border-slate-200 placeholder-muted-foreground"
        />
        <Button
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          className="rounded-xl h-10 w-10 p-0 bg-orange-600 hover:bg-orange-700 text-white shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
