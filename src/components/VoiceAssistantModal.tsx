import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, X, Sparkles, Send, PhoneCall, Info, PhoneOff, AlertTriangle, Type } from 'lucide-react';
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

// Directly controls whether we're subscribed to the assistant's remote audio
// track via the underlying Daily.co call object. This is more reliable than
// Vapi's 'mute-assistant' control message (which has known cases of silently
// not taking effect) — this works at the WebRTC subscription level directly,
// so it can't be missed or ignored.
function setAssistantSubscribed(vapi: Vapi, audible: boolean) {
  const dailyCall = vapi.getDailyCallObject();
  if (!dailyCall) return;
  const participants = dailyCall.participants();
  Object.values(participants).forEach((p: any) => {
    if (!p.local) {
      dailyCall.updateParticipant(p.session_id, {
        setSubscribedTracks: { audio: audible }
      });
    }
  });
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
  // Guards against overlapping start attempts (e.g. double-clicks, or a
  // typed message arriving while a previous start is still connecting).
  const startPromiseRef = useRef<Promise<void> | null>(null);
  // Whether the assistant's reply for the CURRENT turn should be audible.
  // 'voice' turns (the user spoke) play audio as normal; 'text' turns (the
  // user typed) suppress audio so only a text reply appears — matching
  // input modality to output modality.
  const pendingModalityRef = useRef<'voice' | 'text'>('voice');
  const assistantAudibleRef = useRef<boolean>(true);
  // Accumulates transcript fragments for whichever speaker currently "has
  // the floor", out of view — nothing is shown in the chat log until the
  // turn is finished. While a turn is in progress, pendingSender drives a
  // chat-app-style "typing/listening" indicator bubble instead of growing
  // text word by word.
  const pendingTextRef = useRef<{ sender: 'user' | 'assistant'; text: string } | null>(null);
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pendingSender, setPendingSender] = useState<'user' | 'assistant' | null>(null);
  const USER_PAUSE_WINDOW_MS = 1500;
  const ASSISTANT_SAFETY_NET_MS = 8000;

  // Commits whatever's been accumulated as one finished chat bubble. Called
  // when a turn definitively ends (assistant's 'speech-end'), when the user
  // pauses long enough to assume they're done, or as a safety net so a call
  // dropping mid-turn never silently loses what was said.
  const flushPending = useCallback(() => {
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
    const pending = pendingTextRef.current;
    if (!pending) return;
    const modality: 'voice' | 'text' = pending.sender === 'user' ? 'voice' : pendingModalityRef.current;
    setMessages((prev) => [
      ...prev,
      {
        id: `${pending.sender}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sender: pending.sender,
        text: pending.text,
        timestamp: 'Just now',
        modality
      }
    ]);
    pendingTextRef.current = null;
    setPendingSender(null);
  }, []);

  // Keep a ref in sync so event callbacks always see the latest call status
  // without needing to be re-bound on every render.
  useEffect(() => {
    callStatusRef.current = callStatus;
  }, [callStatus]);

  // Vapi's underlying call engine doesn't reliably support being started a
  // second time on the same client instance once a prior call has ended —
  // in practice this shows up as "Meeting has ended" / stuck "Connecting..."
  // / "KrispSDK is duplicated" errors on retry. So instead of one Vapi
  // instance for the whole page visit, we build a brand-new one for every
  // call attempt and discard the old one.
  const createVapiClient = useCallback((): Vapi => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY as string);

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
      // Don't lose whatever was said right before a drop — commit it.
      flushPending();
      assistantAudibleRef.current = true;
    });

    vapi.on('speech-start', () => {
      setIsAssistantSpeaking(true);
      setStatusText('Speaking...');
    });

    vapi.on('speech-end', () => {
      setIsAssistantSpeaking(false);
      setStatusText(callStatusRef.current === 'active' ? 'Listening...' : 'Ready to help');
      // The assistant's turn is definitively over — commit its full reply
      // as one finished bubble now.
      if (pendingTextRef.current?.sender === 'assistant') {
        flushPending();
      }
    });

    vapi.on('volume-level', (level: number) => {
      setVolumeLevel(level);
    });

    // Re-applies the current desired mute state whenever Daily's participant
    // list changes — covers the case where the assistant's audio track
    // joins slightly after call-start, which would otherwise miss an
    // already-requested mute for a text-triggered turn.
    vapi.on('daily-participant-updated', () => {
      setAssistantSubscribed(vapi, assistantAudibleRef.current);
    });

    // Vapi streams both the user's live transcript and the assistant's
    // response as 'transcript' messages, but the underlying speech engine
    // emits multiple 'final' chunks per turn (e.g. per short phrase) rather
    // than one per full utterance. Fragments accumulate in a hidden buffer
    // — nothing appears in the chat log, just a "listening/typing"
    // indicator — until the turn is finished, then the whole thing is
    // committed as one bubble.
    vapi.on('message', (message: any) => {
      if (message?.type === 'transcript' && message.transcriptType === 'final' && message.transcript?.trim()) {
        const sender: 'user' | 'assistant' = message.role === 'assistant' ? 'assistant' : 'user';
        const fragment: string = message.transcript.trim();

        // Any live transcript with sender 'user' can only come from actually
        // speaking (typed messages are added directly, not through this
        // event) — so this is unambiguous proof of voice input. Make sure
        // the assistant is audible for the reply, undoing any earlier
        // text-triggered mute.
        if (sender === 'user') {
          pendingModalityRef.current = 'voice';
          if (!assistantAudibleRef.current) {
            assistantAudibleRef.current = true;
            setAssistantSubscribed(vapi, true);
          }
        }

        if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current);

        if (pendingTextRef.current && pendingTextRef.current.sender === sender) {
          pendingTextRef.current.text += ` ${fragment}`;
        } else {
          // Speaker changed mid-flight (rare) — commit whatever the
          // previous speaker had before starting the new buffer.
          if (pendingTextRef.current) flushPending();
          pendingTextRef.current = { sender, text: fragment };
        }
        setPendingSender(sender);

        // The user has no explicit "finished talking" event, so a pause is
        // our signal they're done. The assistant is normally closed by
        // 'speech-end' above; this longer timeout is just a safety net in
        // case that event doesn't fire for some reason.
        pendingTimeoutRef.current = setTimeout(
          flushPending,
          sender === 'user' ? USER_PAUSE_WINDOW_MS : ASSISTANT_SAFETY_NET_MS
        );
      }
    });

    vapi.on('error', (err: any) => {
      console.error('Vapi error:', err);
      setErrorText(toErrorMessage(err, 'The voice assistant hit a connection glitch. Try Start Voice again.'));
      setCallStatus('idle');
    });

    return vapi;
  }, [flushPending]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, statusText, pendingSender]);

  // Stop any live call when the component unmounts (e.g. the modal's parent
  // is torn down), so a session never keeps running invisibly.
  useEffect(() => {
    return () => {
      vapiRef.current?.stop();
      vapiRef.current = null;
    };
  }, []);

  const isCallActive = callStatus === 'active' || callStatus === 'connecting';

  // Starts a fresh call. Resolves once the call is actually live (or
  // rejects on failure/timeout) — callers can safely act right after it
  // resolves instead of guessing when the connection is ready. If a call is
  // already active, it resolves immediately without starting a new one.
  const startCall = useCallback((): Promise<void> => {
    if (callStatusRef.current === 'active') return Promise.resolve();
    if (startPromiseRef.current) return startPromiseRef.current;
    if (!VAPI_CONFIGURED) return Promise.reject(new Error('Vapi is not configured'));

    const promise = new Promise<void>((resolve, reject) => {
      // Tear down any previous instance before creating a fresh one.
      vapiRef.current?.stop();

      const vapi = createVapiClient();
      vapiRef.current = vapi;

      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Connection timed out. Please try again.'));
      }, 15000);

      const cleanup = () => {
        clearTimeout(timeout);
        vapi.off('call-start', onStart);
        vapi.off('error', onError);
      };
      const onStart = () => {
        cleanup();
        resolve();
      };
      const onError = (err: any) => {
        cleanup();
        reject(err instanceof Error ? err : new Error(toErrorMessage(err, 'Could not start the voice call.')));
      };

      vapi.on('call-start', onStart);
      vapi.on('error', onError);

      setErrorText(null);
      setCallStatus('connecting');
      setStatusText('Connecting...');

      // Pass these directly rather than relying solely on the assistant's
      // dashboard settings — Vapi has a known issue where dashboard-saved
      // silenceTimeoutSeconds/maxDurationSeconds don't always take effect,
      // silently falling back to short defaults (as little as ~10-30s of
      // silence, or a 10-minute cap). Overriding them here at call-start
      // time is authoritative regardless of what's saved on the dashboard.
      vapi
        .start(VAPI_ASSISTANT_ID as string, {
          silenceTimeoutSeconds: 120,
          maxDurationSeconds: 1800
        })
        .catch(onError);
    });

    startPromiseRef.current = promise.finally(() => {
      startPromiseRef.current = null;
    });

    return startPromiseRef.current;
  }, [createVapiClient]);

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
      startCall().catch((err) => {
        setErrorText(toErrorMessage(err, 'Could not start the voice call. Check mic permissions and try again.'));
        setCallStatus('idle');
        setStatusText('Ready to help');
      });
    }
  };

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const query = (textToSend ?? inputText).trim();
      if (!query) return;

      setInputText('');

      // Show the typed message immediately in the transcript. Flush any
      // in-progress spoken bubble first so it never gets mixed up with
      // this typed exchange.
      flushPending();
      pendingModalityRef.current = 'text';

      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: query,
          timestamp: 'Just now',
          modality: 'text'
        }
      ]);

      if (!VAPI_CONFIGURED) return;

      try {
        // A live call is required for the assistant to respond. Waits until
        // the connection is actually established before sending.
        await startCall();

        // Typed input should get a text-only reply — suppress the
        // assistant's audio for this turn so it doesn't also speak aloud.
        assistantAudibleRef.current = false;
        if (vapiRef.current) setAssistantSubscribed(vapiRef.current, false);

        vapiRef.current?.send({
          type: 'add-message',
          message: { role: 'user', content: query }
        });
      } catch (err) {
        setErrorText(toErrorMessage(err, 'Could not reach the voice assistant. Please try again.'));
        setCallStatus('idle');
        setStatusText('Ready to help');
      }
    },
    [inputText, startCall, flushPending]
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

              <span className="text-[10px] text-stone-500 mt-1 px-1 flex items-center gap-1">
                {msg.timestamp}
                {msg.modality && (
                  <span className="inline-flex items-center gap-0.5 text-stone-500">
                    &middot;
                    {msg.modality === 'voice' ? (
                      <Mic className="w-2.5 h-2.5" />
                    ) : (
                      <Type className="w-2.5 h-2.5" />
                    )}
                    {msg.modality === 'voice' ? 'Voice' : 'Text'}
                  </span>
                )}
              </span>

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

          {/* Listening/typing indicator — shown while a turn is in progress
              instead of growing partial text, chat-app style. */}
          {pendingSender && (
            <div className={`flex flex-col ${pendingSender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-3 rounded-2xl flex items-center gap-1 ${
                  pendingSender === 'user'
                    ? 'bg-[#B45309]/60 rounded-br-none'
                    : 'bg-stone-900 border border-amber-900/30 rounded-bl-none'
                }`}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-amber-300/80 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></span>
                ))}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 px-1">
                {pendingSender === 'user' ? 'Listening...' : 'Responding...'}
              </span>
            </div>
          )}

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
