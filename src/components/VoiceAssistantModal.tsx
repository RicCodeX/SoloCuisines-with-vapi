import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, X, Sparkles, Send, PhoneCall, Info, PhoneOff, AlertTriangle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cateringData';
import { AssistantMessage } from '../types';

// Vapi credentials come from environment variables (see .env.example).
// The public key is safe to expose client-side by design (per Vapi's docs) —
// it can only start calls on assistants you own, not read your account data.
const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY as string | undefined;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID as string | undefined;
const VAPI_CONFIGURED = Boolean(VAPI_PUBLIC_KEY && VAPI_ASSISTANT_ID);

// Vapi's underlying call engine (Daily.co) doesn't always hand back a plain
// string error — sometimes it's { type, msg, details } or nested under
// .error. This normalizes any shape into a safe, renderable string so a
// weird error object can never crash the UI by being rendered directly.
function toErrorMessage(err: unknown, fallback: string): string {
  if (!err) return fallback;
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message || fallback;
  if (typeof err === 'object') {
    const anyErr = err as Record<string, any>;
    const candidate = anyErr.message || anyErr.msg || anyErr.error?.message || anyErr.error?.msg;
    if (typeof candidate === 'string') return candidate;
    if (typeof anyErr.type === 'string') return `${anyErr.type}: ${fallback}`;
  }
  return fallback;
}

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteForm: () => void;
}

type CallStatus = 'idle' | 'connecting' | 'active' | 'ended';

const INITIAL_MESSAGES: AssistantMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: `Hello! I am SoloCuisines AI Assistant. I can answer questions about Solomon's catering menus, guest capacities, packages, and event bookings. How can I help you today?`,
    timestamp: 'Just now',
    suggestedQuestions: [
      'What packages do you offer for weddings?',
      'How many guests can SoloCuisines serve?',
      'Do you provide waiters and buffet setups?',
      'What is your signature Nigerian dish?'
    ]
  }
];

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose, onOpenQuoteForm }) => {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [statusText, setStatusText] = useState('Ready to help');
  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const callStatusRef = useRef<CallStatus>('idle');

  // Keep a ref in sync so event callbacks (registered once) always see the
  // latest call status without needing to be re-bound on every render.
  useEffect(() => {
    callStatusRef.current = callStatus;
  }, [callStatus]);

  // Initialize the Vapi client once on mount.
  useEffect(() => {
    if (!VAPI_CONFIGURED) return;

    const vapi = new Vapi(VAPI_PUBLIC_KEY as string);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setCallStatus('active');
      setStatusText('Listening...');
      setErrorText(null);
    });

    vapi.on('call-end', () => {
      setCallStatus('ended');
      setIsAssistantSpeaking(false);
      setVolumeLevel(0);
      setStatusText('Ready to help');
    });

    vapi.on('speech-start', () => {
      setIsAssistantSpeaking(true);
      setStatusText('Speaking...');
    });

    vapi.on('speech-end', () => {
      setIsAssistantSpeaking(false);
      setStatusText(callStatusRef.current === 'active' ? 'Listening...' : 'Ready to help');
    });

    vapi.on('volume-level', (level: number) => {
      setVolumeLevel(level);
    });

    // Vapi streams both the user's live transcript and the assistant's
    // response as 'transcript' messages. We only commit the *final* chunks
    // to the chat log so it doesn't fill up with partial fragments.
    vapi.on('message', (message: any) => {
      if (message?.type === 'transcript' && message.transcriptType === 'final' && message.transcript?.trim()) {
        const sender: 'user' | 'assistant' = message.role === 'assistant' ? 'assistant' : 'user';
        setMessages((prev) => [
          ...prev,
          {
            id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            sender,
            text: message.transcript,
            timestamp: 'Just now'
          }
        ]);
      }
    });

    vapi.on('error', (err: any) => {
      console.error('Vapi error:', err);
      setErrorText(toErrorMessage(err, 'The voice assistant hit a connection glitch. Try Start Voice again.'));
      setCallStatus('idle');
    });

    return () => {
      vapi.stop();
      vapiRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, statusText]);

  const isCallActive = callStatus === 'active' || callStatus === 'connecting';

  const startCall = async () => {
    if (!vapiRef.current || !VAPI_CONFIGURED) return;
    try {
      setErrorText(null);
      setCallStatus('connecting');
      setStatusText('Connecting...');
      await vapiRef.current.start(VAPI_ASSISTANT_ID as string);
    } catch (err: any) {
      console.error('Failed to start Vapi call:', err);
      setErrorText(toErrorMessage(err, 'Could not start the voice call. Check mic permissions and try again.'));
      setCallStatus('idle');
      setStatusText('Ready to help');
    }
  };

  const endCall = () => {
    vapiRef.current?.stop();
    setCallStatus('idle');
    setStatusText('Ready to help');
    setIsAssistantSpeaking(false);
    setVolumeLevel(0);
  };

  const toggleCall = () => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  };

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const query = (textToSend ?? inputText).trim();
      if (!query) return;

      setInputText('');

      // Show the typed message immediately in the transcript.
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: query,
          timestamp: 'Just now'
        }
      ]);

      if (!VAPI_CONFIGURED || !vapiRef.current) return;

      // A live call is required for the assistant to respond. If one isn't
      // active yet, start it first, then forward the typed message in.
      if (callStatusRef.current !== 'active') {
        await startCall();
      }

      vapiRef.current.send({
        type: 'add-message',
        message: { role: 'user', content: query }
      });
    },
    [inputText]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#1C1411] text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-800/40 flex flex-col h-[85vh] sm:h-[680px] relative">

        {/* Header */}
        <div className="bg-[#2A1D18] p-4 sm:p-5 border-b border-amber-900/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B45309] to-[#78350F] flex items-center justify-center text-amber-300 shadow-md">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-amber-50">SoloCuisines AI</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    VAPI_CONFIGURED
                      ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50'
                      : 'bg-amber-900/60 text-amber-300 border-amber-700/50'
                  }`}
                >
                  {VAPI_CONFIGURED ? 'Vapi Connected' : 'Vapi Not Configured'}
                </span>
              </div>
              <p className="text-stone-400 text-xs">Interactive Voice & Event Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Config warning */}
        {!VAPI_CONFIGURED && (
          <div className="bg-amber-950/60 border-b border-amber-800/50 px-4 py-2.5 flex items-start gap-2 text-amber-300 text-xs shrink-0">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Voice mode isn't set up yet — add <code className="bg-black/30 px-1 rounded">VITE_VAPI_PUBLIC_KEY</code> and{' '}
              <code className="bg-black/30 px-1 rounded">VITE_VAPI_ASSISTANT_ID</code> to your environment variables.
            </span>
          </div>
        )}
        {errorText && (
          <div className="bg-red-950/60 border-b border-red-800/50 px-4 py-2.5 flex items-start gap-2 text-red-300 text-xs shrink-0">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorText}</span>
          </div>
        )}

        {/* Audio Visualizer & Status Indicator Header */}
        <div className="bg-stone-950 p-4 border-b border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isAssistantSpeaking
                  ? 'bg-amber-500 animate-ping'
                  : isCallActive
                  ? 'bg-red-500 animate-pulse'
                  : 'bg-emerald-500'
              }`}
            ></span>
            <span className="text-xs font-semibold text-amber-200">{statusText}</span>
          </div>

          {/* Animated Waveform — reacts to Vapi's live volume-level while active */}
          <div className="flex items-center gap-1 h-6">
            {[40, 70, 30, 90, 50, 80, 40, 60].map((h, i) => {
              const active = isAssistantSpeaking || isCallActive;
              const amplitude = active ? Math.max(h * (0.4 + volumeLevel), 15) : 20;
              return (
                <div
                  key={i}
                  className={`w-1 bg-amber-500 rounded-full transition-all duration-150 ${
                    active ? '' : 'opacity-30'
                  }`}
                  style={{
                    height: `${Math.min(amplitude, 100)}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              );
            })}
          </div>

          <button
            onClick={toggleCall}
            disabled={!VAPI_CONFIGURED || callStatus === 'connecting'}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
              isCallActive
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-stone-800 text-amber-300 hover:bg-stone-700'
            }`}
          >
            {isCallActive ? <PhoneOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>
              {callStatus === 'connecting' ? 'Connecting...' : isCallActive ? 'End Call' : 'Start Voice'}
            </span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#B45309] text-white rounded-br-none'
                    : 'bg-stone-900 border border-amber-900/30 text-stone-200 rounded-bl-none shadow-md'
                }`}
              >
                <p>{msg.text}</p>
              </div>

              <span className="text-[10px] text-stone-500 mt-1 px-1">{msg.timestamp}</span>

              {/* Preset Suggestions */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="bg-stone-900/90 hover:bg-amber-950 text-amber-300 border border-amber-800/50 hover:border-amber-600 px-3 py-1.5 rounded-full text-xs transition-all text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Footer note */}
        <div className="px-4 py-2 bg-stone-950/80 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between gap-2 shrink-0">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Info className="w-3.5 h-3.5" />
            <span>{isCallActive ? 'Live voice call in progress' : 'Tap Start Voice to talk, or type below'}</span>
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenQuoteForm();
            }}
            className="text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Book Directly</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#2A1D18] border-t border-amber-900/40 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your event question here..."
            className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
          />

          <button
            onClick={() => handleSendMessage()}
            className="bg-[#B45309] hover:bg-amber-600 text-white p-2.5 rounded-xl transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
