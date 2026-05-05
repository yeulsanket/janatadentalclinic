import React, { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import doctorImg from '../assets/doctor.jpg';
import './Chatbot.css';

/* ── EmailJS config (Matched with Contact.jsx) ── */
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ── Groq config ── */
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL        = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are "SmileBot", the warm and empathetic dental assistant for Dr. Rushikesh Sangle's clinic. 

TONE: 
- Be very caring and professional, like a real person at a premium clinic.
- Use phrases like "I understand," "Don't worry," and "We're here to help."
- Avoid sounding like a computer; use natural transitions.

CLINIC INFO:
- Doctor: Dr. Rushikesh Sangle (MDS Prosthodontist & Implantologist)
- Location: Near Dombivli Station, Maharashtra.
- Hours: 10 AM – 10 PM (Everyday).
- Phone: +91 98341 88787

SERVICES & COSTS:
- Implants (₹25k-60k), Smile Makeovers (₹8k-20k), Aligners (₹40k-1.2L), Root Canal (₹3k-8k).

RULES:
- Keep responses short and sweet (2-3 sentences).
- If someone is in pain, be extra comforting.
- **VOICE & TEXT BOOKING:** If someone wants to book, you must collect exactly these 5 things one-by-one:
  1. Full Name
  2. Phone Number
  3. Preferred Day (e.g. Monday, Wednesday)
  4. Preferred Time Slot (between 10 AM - 10 PM)
  5. Dental Concern
- Once you have all 5, show a summary like: "**BOOKING SUMMARY:** Name: [Name] | Phone: [Phone] | Day: [Day] | Time: [Time] | Concern: [Concern]".
- After showing the summary, tell them: "Excellent! I have sent your details to Dr. Sangle, and we will call you soon to confirm."
- **IMPORTANT:** Do NOT show the form if you are already collecting details in the chat.`;

const QUICK_REPLIES = [
  { label: '📅 Book Appointment', text: 'How do I book an appointment?' },
  { label: '🦷 Dental Implants',  text: 'Tell me about dental implants and cost' },
  { label: '😁 Smile Makeover',   text: 'What is a smile makeover?' },
  { label: '📍 Location & Hours', text: 'Where is the clinic and what are the hours?' },
  { label: '💰 Treatment Costs',  text: 'What are the treatment costs?' },
  { label: '🚨 Emergency',        text: 'I have a dental emergency right now' },
];

const INITIAL_MSG = {
  role: 'assistant',
  content: `Hi there! 👋 I'm **SmileBot**, Dr. Rushikesh Sangle's AI dental assistant.\n\nI can help you with:\n• Treatment info & costs\n• Booking appointments\n• Clinic hours & location\n• Any dental health questions\n\nHow can I help you today? 😊`,
  id: 0,
};

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

function stripForSpeech(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/•/g, ',')
    .replace(/₹/g, 'rupees ')
    .replace(/\n/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/* ── Booking Form Component ── */
function BookingForm({ onComplete }) {
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setLoading(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.phone,
          message: `NEW APPOINTMENT REQUEST FROM CHATBOT:\nName: ${formData.name}\nPhone: ${formData.phone}\nConcern: ${formData.note}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      onComplete(`Thank you ${formData.name}! Dr. Sangle has been notified and will call you soon on ${formData.phone}.`);
    } catch (err) {
      alert("Something went wrong. Please call +91 98341 88787 directly.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return <div className="form-success-msg">✅ Request Sent to Dr. Sangle!</div>;

  return (
    <form className="booking-form-card" onSubmit={handleSubmit}>
      <h4>📅 Request Consultation</h4>
      <input 
        type="text" placeholder="Your Name" required 
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
      />
      <input 
        type="tel" placeholder="Phone Number" required 
        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
      />
      <textarea 
        placeholder="Dental concern (optional)" 
        value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit to Doctor"}
      </button>
    </form>
  );
}

let msgId = 1;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Chatbot() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [messages,   setMessages]   = useState([INITIAL_MSG]);
  const [input,      setInput]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [showBadge,  setShowBadge]  = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);

  /* Voice states */
  const [voiceMode,   setVoiceMode]   = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking,  setIsSpeaking]  = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Tap mic to speak');
  const [transcript,  setTranscript]  = useState('');

  const [voiceBooking, setVoiceBooking] = useState({ active: false, name: '', phone: '', note: '' });

  /* ── Refs to avoid stale closures ── */
  const messagesRef    = useRef([INITIAL_MSG]); // always-fresh messages
  const loadingRef     = useRef(false);          // always-fresh loading flag
  const voiceModeRef   = useRef(false);          // always-fresh voiceMode
  const recognitionRef = useRef(null);
  const synthRef       = useRef(window.speechSynthesis);
  const voiceRef       = useRef(null);           // preferred TTS voice
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  /* Keep refs in sync with state */
  useEffect(() => { messagesRef.current  = messages;  }, [messages]);
  useEffect(() => { loadingRef.current   = loading;   }, [loading]);
  useEffect(() => { voiceModeRef.current = voiceMode; }, [voiceMode]);

  /* ── Load TTS voices ── */
  useEffect(() => {
    const pick = () => {
      const vs = synthRef.current.getVoices();
      voiceRef.current =
        vs.find(v => v.name.includes('Google') && v.lang === 'en-IN') ||
        vs.find(v => v.lang === 'en-IN') ||
        vs.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
        vs.find(v => v.lang.startsWith('en-GB')) ||
        vs.find(v => v.lang.startsWith('en')) ||
        null;
    };
    pick();
    synthRef.current.addEventListener('voiceschanged', pick);
    return () => { try { synthRef.current.removeEventListener('voiceschanged', pick); } catch {} };
  }, []);

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* Badge timer */
  useEffect(() => {
    if (!hasGreeted) {
      const t = setTimeout(() => setHasGreeted(true), 4000);
      return () => clearTimeout(t);
    }
  }, [hasGreeted]);

  /* Close cleanup */
  useEffect(() => {
    if (isOpen) {
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 320);
    } else {
      stopAll();
    }
  }, [isOpen]);

  /* ── TTS: speak text ── */
  const speak = useCallback((text) => {
    if (!text) return;
    const synth = synthRef.current;
    synth.cancel();

    const doSpeak = () => {
      const utt = new SpeechSynthesisUtterance(stripForSpeech(text));
      if (voiceRef.current) utt.voice = voiceRef.current;
      utt.lang   = 'en-IN';
      utt.rate   = 1.0;
      utt.pitch  = 1.05;
      utt.volume = 1;
      utt.onstart = () => { setIsSpeaking(true);  setVoiceStatus('Speaking…'); };
      utt.onend   = () => { setIsSpeaking(false); setVoiceStatus('Tap mic to speak'); };
      utt.onerror = (e) => {
        if (e.error === 'interrupted') return; // normal cancel, not a real error
        setIsSpeaking(false);
        setVoiceStatus('Tap mic to speak');
      };
      synth.speak(utt);
    };

    // Small delay required on Chrome – prevents "interrupted" error after cancel()
    setTimeout(doSpeak, 120);
    setIsSpeaking(true);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current.cancel();
    setIsSpeaking(false);
    setVoiceStatus('Tap mic to speak');
  }, []);

  const stopAll = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    synthRef.current.cancel();
    setIsListening(false);
    setIsSpeaking(false);
    setVoiceStatus('Tap mic to speak');
    setTranscript('');
  }, []);

  /* ── Groq API ── (uses refs so always has fresh state) ── */
  const sendMessage = useCallback(async (userText, fromVoice = false) => {
    const trimmed = userText?.trim();
    if (!trimmed || loadingRef.current) return;

    const userMsg    = { role: 'user', content: trimmed, id: msgId++ };
    const newHistory = [...messagesRef.current, userMsg]; // ✅ always-fresh via ref

    setMessages(newHistory);
    setInput('');
    setLoading(true);
    loadingRef.current = true;
    if (fromVoice) setVoiceStatus('Thinking…');

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newHistory.map(({ role, content }) => ({ role, content })),
          ],
          max_tokens: fromVoice ? 150 : 400,
          temperature: 0.72,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data  = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim()
        || 'Sorry, I could not process that. Please try again.';

      setMessages(prev => [...prev, { role: 'assistant', content: reply, id: msgId++ }]);

      // ✅ Detect if AI has finished collecting details (either via summary or final confirmation)
      if (reply.includes("I have sent your details to Dr. Sangle") || reply.includes("BOOKING SUMMARY")) {
        const historyText = newHistory.map(m => m.content).join("\n");
        // Extract a clean summary if present
        const summaryMatch = reply.match(/BOOKING SUMMARY: (.*)/i);
        const summary = summaryMatch ? summaryMatch[1] : "See conversation log";

        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: "SmileBot Booking",
            reply_to: "N/A",
            message: `NEW APPOINTMENT REQUEST:\n${summary}`,
          },
          EMAILJS_PUBLIC_KEY
        );
      }

      // ✅ Detect if AI wants the user to book via FORM (only if not in voice mode)
      if (!voiceModeRef.current && (reply.toLowerCase().includes("fill out this quick form") || reply.toLowerCase().includes("book an appointment"))) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'FORM_PLACEHOLDER', isBookingForm: true, id: msgId++ }]);
      }

      // ✅ Speak if voice mode OR voice input triggered it
      if (fromVoice || voiceModeRef.current) {
        speak(reply);
      }
    } catch (err) {
      const errMsg = 'Something went wrong. You can call us directly at +91 98341 88787.';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg, id: msgId++ }]);
      if (fromVoice || voiceModeRef.current) speak(errMsg);
    } finally {
      setLoading(false);
      loadingRef.current = false;
      if (fromVoice) setVoiceStatus('Tap mic to speak');
    }
  }, [speak]); // ✅ only depends on stable speak

  /* ── STT: start listening ── (uses sendMessage via stable ref) ── */
  const sendRef = useRef(sendMessage);
  useEffect(() => { sendRef.current = sendMessage; }, [sendMessage]);

  const startListening = useCallback(() => {
    if (!SR || loadingRef.current) return;
    stopSpeaking();
    setTranscript('');

    const rec = new SR();
    rec.lang            = 'en-IN';
    rec.interimResults  = true;
    rec.continuous      = false;
    rec.maxAlternatives = 1;

    rec.onstart  = () => { setIsListening(true);  setVoiceStatus('Listening…'); };
    rec.onend    = () => { setIsListening(false); };
    rec.onerror  = (e) => {
      setIsListening(false);
      if (e.error === 'no-speech') setVoiceStatus('No speech detected. Try again.');
      else if (e.error === 'not-allowed') setVoiceStatus('Mic permission denied.');
      else setVoiceStatus('Tap mic to speak');
      setTimeout(() => setVoiceStatus('Tap mic to speak'), 2500);
    };

    rec.onresult = (e) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      const display = final || interim;
      setTranscript(display);

      if (final.trim()) {
        rec.stop();
        setTranscript('');
        setVoiceStatus('Processing…');
        sendRef.current(final.trim(), true); // ✅ always-fresh via ref
      }
    };

    recognitionRef.current = rec;
    try { rec.start(); }
    catch (e) { setVoiceStatus('Mic error. Please try again.'); }
  }, [stopSpeaking]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
    setVoiceStatus('Tap mic to speak');
  }, []);

  const handleMicClick = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  const handleSubmit   = (e) => { e.preventDefault(); sendMessage(input); };
  const handleKeyDown  = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } };

  /* Icons */
  const MicIcon  = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z"/></svg>;
  const StopIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>;
  const SendIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;
  const XIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
  const PhoneIcon= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>;

  return (
    <>
      {/* ── Launcher Button ── */}
      <div className={`chatbot-launcher ${isOpen ? 'open' : ''}`}>
        {!isOpen && showBadge && (
          <div className="chatbot-badge"><span>Ask SmileBot! 🦷</span></div>
        )}
        <button
          className="chatbot-toggle-btn"
          onClick={() => setIsOpen(o => !o)}
          aria-label={isOpen ? 'Close SmileBot' : 'Open SmileBot'}
        >
          {isOpen
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.28 2 11.5c0 2.303.88 4.41 2.33 6.03L3 21l3.77-1.22A10.2 10.2 0 0012 21c5.523 0 10-4.28 10-9.5S17.523 2 12 2z"/></svg>
          }
        </button>
        {!isOpen && hasGreeted && (
          <><span className="pulse-ring ring-1"/><span className="pulse-ring ring-2"/></>
        )}
      </div>

      {/* ── Chat Window ── */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-visible' : ''}`} role="dialog" aria-label="SmileBot">

        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <img src={doctorImg} alt="Dr. Sangle" />
          </div>
          <div className="chatbot-header-info">
            <div className="chatbot-name">SmileBot</div>
            <div className="chatbot-status">
              <span className={`status-dot ${isSpeaking ? 'dot-speaking' : isListening ? 'dot-listening' : ''}`}/>
              {isSpeaking ? 'Speaking…' : isListening ? 'Listening…' : loading ? 'Thinking…' : "Dr. Rushikesh's AI Assistant"}
            </div>
          </div>
          <div className="header-actions">
            {/* Voice mode toggle */}
            {!!SR && (
              <button
                className={`voice-toggle-btn ${voiceMode ? 'voice-active' : ''}`}
                onClick={() => { setVoiceMode(v => !v); stopAll(); }}
                title={voiceMode ? 'Switch to text mode' : 'Switch to voice mode'}
                aria-label="Toggle voice mode"
              >
                {voiceMode
                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                }
                <span className="vt-label">{voiceMode ? 'Voice ON' : 'Voice'}</span>
              </button>
            )}
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">
              <XIcon/>
            </button>
          </div>
        </div>

        {/* ══════════════ VOICE MODE ══════════════ */}
        {voiceMode ? (
          <div className="voice-mode-panel">

            {/* Animated orb */}
            <div className={`voice-orb ${isListening ? 'orb-listening' : ''} ${isSpeaking ? 'orb-speaking' : ''} ${loading ? 'orb-thinking' : ''}`}>
              {isSpeaking ? (
                <div className="wave-bars">
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className="wave-bar" style={{ animationDelay: `${i * 0.09}s` }}/>
                  ))}
                </div>
              ) : loading ? (
                <div className="orb-dots">
                  <span className="dot"/><span className="dot"/><span className="dot"/>
                </div>
              ) : (
                <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" className="orb-mic-icon">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z"/>
                </svg>
              )}
            </div>

            <div className="voice-status-label">{voiceStatus}</div>

            {/* Live transcript */}
            {transcript && (
              <div className="voice-transcript">
                <span className="transcript-icon">🗣</span> {transcript}
              </div>
            )}

            {/* Big mic button */}
            <button
              className={`big-mic-btn ${isListening ? 'mic-recording' : ''}`}
              onClick={handleMicClick}
              disabled={loading || isSpeaking}
              aria-label={isListening ? 'Stop' : 'Tap to speak'}
            >
              {isListening ? <StopIcon/> : <MicIcon/>}
            </button>

            <p className="mic-hint">
              {isListening ? 'Tap to stop' : isSpeaking ? 'Bot is speaking…' : 'Tap & speak your question'}
            </p>

            {/* Stop speaking */}
            {isSpeaking && (
              <button className="stop-speaking-btn" onClick={stopSpeaking}>
                ⏹ Stop
              </button>
            )}

            {/* Last bot reply card */}
            {messages.length > 1 && (
              <div className="voice-reply-card">
                <div className="vrc-label">SmileBot said:</div>
                <div
                  className="vrc-text"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(
                    [...messages].reverse().find(m => m.role === 'assistant')?.content || ''
                  )}}
                />
              </div>
            )}

            <div className="voice-cta-row">
              <a href="tel:+919834188787" className="cta-mini-btn cta-call">
                <PhoneIcon/> Call Clinic
              </a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="cta-mini-btn cta-book">
                📅 Book Now
              </a>
            </div>
          </div>

        ) : (
          /* ══════════════ TEXT MODE ══════════════ */
          <>
            <div className="chatbot-messages" role="log" aria-live="polite">
              {messages.map(msg => (
                <div key={msg.id} className={`msg-row msg-${msg.role}`}>
                  {msg.role === 'assistant' && (
                    <div className="msg-avatar-sm">
                      <img src={doctorImg} alt="Dr. Sangle" />
                    </div>
                  )}
                  {msg.isBookingForm ? (
                    <BookingForm onComplete={(confirmText) => {
                      setMessages(prev => [...prev, { role: 'assistant', content: confirmText, id: msgId++ }]);
                      speak(confirmText);
                    }} />
                  ) : (
                    <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}/>
                  )}
                </div>
              ))}
              {loading && (
                <div className="msg-row msg-assistant">
                  <div className="msg-avatar-sm">🦷</div>
                  <div className="msg-bubble typing-bubble">
                    <span className="dot"/><span className="dot"/><span className="dot"/>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}/>
            </div>

            {messages.length <= 1 && (
              <div className="quick-replies">
                {QUICK_REPLIES.map((qr, i) => (
                  <button key={i} className="quick-reply-btn" onClick={() => sendMessage(qr.text)} disabled={loading}>
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot-cta-bar">
              <a href="tel:+919834188787" className="cta-mini-btn cta-call">
                <PhoneIcon/> Call Now
              </a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="cta-mini-btn cta-book">
                📅 Book Appointment
              </a>
            </div>

            <form className="chatbot-input-row" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about dental care…"
                rows={1}
                disabled={loading}
                aria-label="Type your message"
              />
              {!!SR && (
                <button
                  type="button"
                  className={`inline-mic-btn ${isListening ? 'mic-recording' : ''}`}
                  onClick={handleMicClick}
                  disabled={loading}
                  title={isListening ? 'Stop listening' : 'Speak your question'}
                  aria-label="Voice input"
                >
                  {isListening
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z"/></svg>
                  }
                </button>
              )}
              <button type="submit" className="chatbot-send-btn" disabled={!input.trim() || loading} aria-label="Send">
                <SendIcon/>
              </button>
            </form>
          </>
        )}

        <div className="chatbot-footer-note">
          {voiceMode
            ? <>🎙 Voice Mode · <a href="tel:+919834188787">+91 98341 88787</a></>
            : <>Powered by AI · <a href="tel:+919834188787">+91 98341 88787</a></>
          }
        </div>
      </div>
    </>
  );
}
