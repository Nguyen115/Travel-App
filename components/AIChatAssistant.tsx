'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader, MapPin, Star, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  places?: Place[];
}

interface Place {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
}

interface AIChatAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string;
}

const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Coffee Corner',
    type: 'Cafe',
    distance: '0.3 km away',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Brew House',
    type: 'Cafe',
    distance: '0.5 km away',
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Urban Espresso',
    type: 'Cafe',
    distance: '0.7 km away',
    rating: 4.7,
  },
];

export function AIChatAssistant({ open, onOpenChange, location }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I can help you find great places to visit in ${location}. What are you looking for?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
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

    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `Great! I found some awesome ${input.toLowerCase()} spots near ${location}. Here are my top recommendations:`,
      sender: 'ai',
      timestamp: new Date(),
      places: mockPlaces,
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 md:w-96 md:h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-40">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Trip Assistant</h3>
        <button
          onClick={() => onOpenChange(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs rounded-xl p-3 ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              {msg.places && msg.places.length > 0 && (
                <div className="mt-3 space-y-2 pt-3 border-t border-current border-opacity-20">
                  {msg.places.map(place => (
                    <div
                      key={place.id}
                      className="p-2 rounded-lg bg-black/10 cursor-pointer hover:bg-black/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-medium">{place.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 opacity-75" />
                            <span className="text-xs opacity-75">{place.distance}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-current opacity-75" />
                          <span className="text-xs font-medium">{place.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-xs text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border flex gap-2">
        <Input
          placeholder="Find coffee shops..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="text-sm rounded-xl h-10"
          disabled={loading}
        />
        <Button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          size="sm"
          className="rounded-xl shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
