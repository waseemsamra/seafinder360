"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AIConciergeSummary from "./AIConciergeSummary";

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  yacht?: any;
}

export default function AIConciergeModal({ isOpen, onClose, yacht }: AIConciergeModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user', content: string, options?: any[] }>>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Array<{ step: number; question: string; answer: string; answerText?: string }>>([]);
  const [showSummary, setShowSummary] = useState(false);
  
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const yachtName = yacht?.name || "Majestic 120";
  const images = yacht?.images && Array.isArray(yacht.images) && yacht.images.length > 0 
    ? yacht.images 
    : [yacht?.img || "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=1200&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"];

  useEffect(() => {
    if (isOpen) {
      initFlow();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setMessages([]);
      setAnswers([]);
      setSessionId(null);
      setShowSummary(false);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const initFlow = async () => {
    const supabase = createClient();
    
    const { data: sessionData } = await supabase
      .from('ai_concierge_sessions')
      .insert({
        yacht_id: yacht?.id || null,
        yacht_name: yachtName,
        status: 'in_progress',
        answers: []
      })
      .select()
      .single();
    
    if (sessionData) setSessionId(sessionData.id);
    
    setMessages([]);
    setAnswers([]);
    startAutoPlay();
    
    setTimeout(() => {
      addAIMessage("Hi there! 👋 I'm your AI Concierge. I see you're interested in the stunning <strong>" + yachtName + "</strong>. Let's build your perfect charter.");
    }, 500);
    
    setTimeout(() => {
      askDuration();
    }, 2000);
  };

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const manualImageChange = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentImageIndex(index);
    startAutoPlay();
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  const addAIMessage = (html: string, options: any[] = []) => {
    setMessages(prev => [...prev, { type: 'ai', content: html, options }]);
    setTimeout(scrollToBottom, 100);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setTimeout(scrollToBottom, 100);
  };

  const saveAnswer = async (step: number, question: string, answer: string, answerText: string) => {
    const newAnswer = { step, question, answer, answerText };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    
    const supabase = createClient();
    if (sessionId) {
      try {
        await supabase.from('ai_concierge_responses').insert({
          session_id: sessionId,
          step,
          question,
          selected_option: answerText
        });
        
        await supabase.from('ai_concierge_sessions')
          .update({ answers: updatedAnswers, updated_at: new Date().toISOString() })
          .eq('id', sessionId);
      } catch (e) {
        // ignore
      }
    }
    return updatedAnswers;
  };

  const askDuration = () => {
    addAIMessage("01. How long are you out?", [
      { text: "2 hours", sub: "Marina and skyline", action: "guests", value: "2_hours" },
      { text: "3 hours", sub: "Marina and the skyline", action: "guests", value: "3_hours" },
      { text: "4 hours", sub: "Marina, Burj Al Arab", action: "guests", value: "4_hours" },
      { text: "6 hours", sub: "Two stops on the water", tag: "Special Deal", tagColor: "gold", action: "guests", value: "6_hours" },
      { text: "8 hours", sub: "Full day · 1 hour free", tag: "Best value", tagColor: "", action: "guests", value: "8_hours" },
      { text: "Full day (24h) or more", sub: "Two days, a week, a month", action: "guests", value: "full_day_or_more" }
    ]);
  };

  const handleOption = async (opt: any, step: number, question: string) => {
    addUserMessage(opt.text);
    const updated = await saveAnswer(step, question, opt.value || opt.text, opt.text);
    
    setTimeout(() => {
      if (opt.action === "guests") {
        addAIMessage("02. How many guests?", [
          { text: "1-6 Guests", sub: "Intimate gatherings", action: "catering", value: "1-6" },
          { text: "7-12 Guests", sub: "Medium groups", action: "catering", value: "7-12" },
          { text: "12+ Guests", sub: "Large events", action: "catering", value: "12_plus" }
        ]);
      } else if (opt.action === "catering") {
        addAIMessage("03. Catering on board", [
          { text: "No, thanks", sub: "Just drinks", action: "drinks", value: "none" },
          { text: "BBQ on board", sub: "Grilled and served on deck", action: "drinks", value: "bbq" },
          { text: "Japanese, sushi", sub: "Sushi rolls, served chilled", action: "drinks", value: "sushi" },
          { text: "Seafood", sub: "Grilled and served chilled", action: "drinks", value: "seafood" },
          { text: "Signature menu by the chef", sub: "The chef's favourite menu", action: "drinks", value: "chef_signature" },
          { text: "More options +2", sub: "See more", action: "drinks", value: "more_catering" },
          { text: "Custom order", sub: "Something special in mind? We'll arrange it", action: "drinks", value: "custom_catering" }
        ]);
      } else if (opt.action === "drinks") {
        addAIMessage("04. Drinks", [
          { text: "Open bar", sub: "Unlimited drinks from the bar list", action: "decoration", value: "open_bar" },
          { text: "Bottle menu", sub: "Bottles, priced as extra", action: "decoration", value: "bottle_menu" },
          { text: "Soft drinks", sub: "Unlimited soft drinks - included", tag: "Included", tagColor: "", action: "decoration", value: "soft_drinks_included" },
          { text: "Custom order", sub: "Something special in mind? We'll arrange it", action: "decoration", value: "custom_drinks" },
          { text: "No, thanks", sub: "You bring your own", action: "decoration", value: "none" }
        ]);
      } else if (opt.action === "decoration") {
        addAIMessage("05. Decoration", [
          { text: "Birthday setup", sub: "Balloons, banner, table setting", action: "entertainment", value: "birthday" },
          { text: "Romantic setup", sub: "Petals, candles, a set table", action: "entertainment", value: "romantic" },
          { text: "Corporate or branded setup", sub: "Your brand, front and centre", action: "entertainment", value: "corporate" },
          { text: "Flowers and balloons", sub: "Petals, flowers, balloons", action: "entertainment", value: "flowers_balloons" },
          { text: "Custom order", sub: "Something special in mind? We'll arrange it", action: "entertainment", value: "custom_decoration" },
          { text: "No, thanks", sub: "Standard setup", action: "entertainment", value: "none" }
        ]);
      } else if (opt.action === "entertainment") {
        addAIMessage("06. Entertainment", [
          { text: "DJ and speakers", sub: "Pro sound and a DJ on board", action: "details", value: "dj" },
          { text: "Live music", sub: "A musician playing live on deck", action: "details", value: "live_music" },
          { text: "Dancers, show programme", sub: "A show to remember", action: "details", value: "dancers" },
          { text: "Photographer or videographer", sub: "The day shot and edited for you", action: "details", value: "media" },
          { text: "Water sports", sub: "Jet ski, e-foil and more", action: "details", value: "watersports" },
          { text: "Custom order", sub: "Something special in mind? We'll arrange it", action: "details", value: "custom_entertainment" },
          { text: "No, thanks", sub: "Standard entertainment", action: "details", value: "none" }
        ]);
      } else if (opt.action === "details") {
        addAIMessage("07. Your details. We reply on WhatsApp. It is the fastest way.", [
          { text: "Proceed to summary", sub: "Review your selections & get quote", action: "finish", value: "proceed" }
        ]);
      } else if (opt.action === "finish") {
        const supabase = createClient();
        if (sessionId) {
          try {
            await supabase.from('ai_concierge_sessions')
              .update({ status: 'completed', answers: updated, summary: { yacht: yachtName, completed_at: new Date().toISOString() }, updated_at: new Date().toISOString() })
              .eq('id', sessionId);
          } catch (e) {}
        }
        setTimeout(() => {
          setShowSummary(true);
        }, 500);
      }
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10000, background: 'white' }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        <style jsx>{`
          .concierge-modal { background: white; width: 100vw; height: 100vh; display: grid; grid-template-columns: 1.2fr 1fr; overflow: hidden; }
          .ai-left { display: flex; flex-direction: column; background: #000; position: relative; height: 100%; }
          .main-image-container { flex: 1; position: relative; overflow: hidden; }
          .main-image-container img { width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; opacity: 0; transition: opacity 0.5s ease; }
          .main-image-container img.active { opacity: 1; }
          .gallery-overlay { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); padding: 30px 40px 30px; color: white; pointer-events: none; z-index: 2; }
          .gallery-overlay h3 { font-family: 'Playfair Display', serif; font-size: 40px; margin-bottom: 5px; }
          .thumbnail-strip { display: flex; gap: 15px; padding: 20px 40px; background: #111; overflow-x: auto; z-index: 3; flex-shrink: 0; }
          .thumb { width: 100px; height: 70px; border-radius: 6px; overflow: hidden; cursor: pointer; opacity: 0.4; border: 2px solid transparent; flex-shrink: 0; transition: all 0.2s; }
          .thumb img { width: 100%; height: 100%; object-fit: cover; }
          .thumb.active { opacity: 1; border-color: #C4A87C; }
          .ai-right { display: flex; flex-direction: column; background: #F9F9FA; border-left: 1px solid #E5E7EB; height: 100%; overflow: hidden; }
          .ai-header { padding: 25px 30px; background: white; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; gap: 15px; flex-shrink: 0; }
          .ai-avatar { width: 45px; height: 45px; background: #1A222C; color: #C4A87C; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 18px; }
          .ai-header-info h4 { font-size: 18px; color: #1A222C; font-family: 'Inter', sans-serif; }
          .ai-header-info p { font-size: 13px; color: #10B981; display: flex; align-items: center; gap: 6px; margin-top: 2px; font-family: 'Inter', sans-serif; }
          .chat-area { flex: 1; padding: 30px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; }
          .message { max-width: 95%; padding: 15px 20px; border-radius: 12px; font-size: 14px; line-height: 1.6; animation: fadeIn 0.3s ease; flex-shrink: 0; font-family: 'Inter', sans-serif; }
          .msg-ai { background: white; color: #1F2937; border: 1px solid #E5E7EB; align-self: flex-start; border-bottom-left-radius: 2px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
          .msg-user { background: #1A222C; color: white; align-self: flex-end; border-bottom-right-radius: 2px; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
          .chat-options { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
          .chat-btn { background: white; border: 1px solid #E5E7EB; color: #1A222C; padding: 12px 15px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; justify-content: space-between; align-items: center; }
          .chat-btn:hover { border-color: #C4A87C; background: #FDFCFB; }
          .chat-btn-text { display: flex; flex-direction: column; gap: 4px; }
          .chat-btn-sub { font-size: 11px; color: #6B7280; font-weight: 400; }
          .chat-btn-tag { background: #D1FAE5; color: #065F46; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
          .chat-btn-tag.gold { background: #C4A87C; color: #1A222C; }
          .chat-input-area { padding: 20px 30px; background: white; border-top: 1px solid #E5E7EB; display: flex; gap: 15px; flex-shrink: 0; }
          .chat-input { flex: 1; padding: 15px 20px; border: 1px solid #E5E7EB; border-radius: 30px; outline: none; font-size: 15px; background: #F3F4F6; cursor: not-allowed; }
          .send-btn { background: #1A222C; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; opacity: 0.5; }
          .close-btn { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.6); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; z-index: 10; font-size: 24px; display: flex; align-items: center; justify-content: center; }
          @media (max-width: 968px) { .concierge-modal { grid-template-columns: 1fr; } .ai-left { display: none; } }
        `}</style>
        
        <div className="concierge-modal">
          <button className="close-btn" onClick={onClose}>×</button>
          
          <div className="ai-left">
            <div className="main-image-container">
              {images.map((img: string, idx: number) => (
                <img key={idx} className={currentImageIndex === idx ? 'auto-img active' : 'auto-img'} src={img} alt={`Yacht ${idx + 1}`} />
              ))}
              <div className="gallery-overlay">
                <h3>{yachtName}</h3>
                <p>AI Guided Charter Experience</p>
              </div>
            </div>
            <div className="thumbnail-strip">
              {images.slice(0, 3).map((img: string, idx: number) => (
                <div key={idx} className={currentImageIndex === idx ? 'thumb active' : 'thumb'} onClick={() => manualImageChange(idx)}>
                  <img src={img} alt={`Thumb ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="ai-right">
            <div className="ai-header">
              <div className="ai-avatar">AI</div>
              <div className="ai-header-info">
                <h4>SeaFinder Concierge</h4>
                <p><span style={{width:'8px', height:'8px', background:'#10B981', borderRadius:'50%', display:'inline-block'}}></span> Online</p>
              </div>
            </div>

            <div className="chat-area" ref={chatAreaRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={msg.type === 'ai' ? 'message msg-ai' : 'message msg-user'}>
                  <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                  {msg.type === 'ai' && msg.options && msg.options.length > 0 && (
                    <div className="chat-options">
                      {msg.options.map((opt: any, oIdx: number) => (
                        <button key={oIdx} className="chat-btn" onClick={() => {
                          // determine step
                          if (msg.content.includes("01.")) handleOption(opt, 1, "01. How long are you out?");
                          else if (msg.content.includes("02.")) handleOption(opt, 2, "02. How many guests?");
                          else if (msg.content.includes("03.")) handleOption(opt, 3, "03. Catering on board");
                          else if (msg.content.includes("04.")) handleOption(opt, 4, "04. Drinks");
                          else if (msg.content.includes("05.")) handleOption(opt, 5, "05. Decoration");
                          else if (msg.content.includes("06.")) handleOption(opt, 6, "06. Entertainment");
                          else if (msg.content.includes("07.")) handleOption(opt, 7, "07. Your details. We reply on WhatsApp. It is the fastest way.");
                          else handleOption(opt, answers.length + 1, msg.content);
                        }}>
                          <div className="chat-btn-text">
                            <span>{opt.text}</span>
                            {opt.sub && <span className="chat-btn-sub">{opt.sub}</span>}
                          </div>
                          {opt.tag && <span className={`chat-btn-tag ${opt.tagColor || ''}`}>{opt.tag}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <input type="text" className="chat-input" placeholder="Select an option above..." disabled />
              <button className="send-btn" disabled>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AIConciergeSummary 
        isOpen={showSummary} 
        onClose={() => { setShowSummary(false); onClose(); }} 
        answers={answers} 
        yachtName={yachtName}
        sessionId={sessionId || ''}
      />
    </>
  );
}
