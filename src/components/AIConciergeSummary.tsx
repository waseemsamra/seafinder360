"use client";

import { useEffect } from "react";

interface SummaryProps {
  isOpen: boolean;
  onClose: () => void;
  answers: Array<{ step: number; question: string; answer: string; answerText?: string }>;
  yachtName?: string;
  sessionId?: string;
}

export default function AIConciergeSummary({ isOpen, onClose, answers, yachtName, sessionId }: SummaryProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10005, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      <style jsx>{`
        .summary-card { width: 100%; max-width: 600px; max-height: 90vh; background: white; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; animation: slideUp 0.3s ease; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .summary-header { padding: 30px 30px 20px; border-bottom: 1px solid #E5E7EB; background: linear-gradient(to right, #1A222C, #2d3748); color: white; }
        .summary-body { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .summary-item { padding: 16px 20px; background: #F9F9FA; border: 1px solid #E5E7EB; border-radius: 12px; }
        .summary-item-q { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6B7280; font-weight: 600; margin-bottom: 8px; }
        .summary-item-a { font-size: 15px; color: #1A222C; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .summary-footer { padding: 20px 30px; border-top: 1px solid #E5E7EB; background: white; display: flex; gap: 12px; }
        .btn { flex: 1; padding: 14px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; font-family: 'Inter', sans-serif; transition: all 0.2s; }
        .btn-primary { background: #25D366; color: white; }
        .btn-primary:hover { background: #22c55e; }
        .btn-secondary { background: white; color: #1A222C; border: 1px solid #E5E7EB; }
        .btn-secondary:hover { background: #F9F9FA; }
      `}</style>
      
      <div className="summary-card">
        <div className="summary-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#C4A87C', color: '#1A222C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✓</div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', margin: 0, fontWeight: 600 }}>Your Charter Request</h2>
              <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '14px' }}>{yachtName || 'Selected Yacht'}</p>
            </div>
          </div>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '13px', lineHeight: 1.6 }}>Here's a summary of your preferences. Our team will review and get back to you with availability & pricing.</p>
        </div>

        <div className="summary-body">
          {answers.filter(a => a.step >=1 && a.step <=6).map((item, idx) => (
            <div key={idx} className="summary-item">
              <div className="summary-item-q">{item.question.replace(/^\d+\.\s*/, '')}</div>
              <div className="summary-item-a">
                <span style={{ color: '#C4A87C' }}>•</span>
                {item.answerText || item.answer}
              </div>
            </div>
          ))}
          
          <div style={{ padding: '16px 20px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px' }}>💡</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', marginBottom: '4px' }}>Next Step</div>
              <div style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.6 }}>Click "Send via WhatsApp" to share this summary directly with our charter specialist for instant response.</div>
            </div>
          </div>
        </div>

        <div className="summary-footer">
          <button className="btn btn-secondary" onClick={() => { onClose(); window.location.reload(); }}>
            Edit Preferences
          </button>
          <button className="btn btn-primary" onClick={() => {
            const summaryText = answers
              .filter(a => a.step >=1 && a.step <=6)
              .map((a, i) => `${i+1}. ${a.question.replace(/^\d+\.\s*/, '')}: ${a.answerText || a.answer}`)
              .join('\n');
            const message = encodeURIComponent(`Hi SeaFinder360! I want to book ${yachtName || 'a yacht'}.\n\nMy Preferences:\n${summaryText}\n\nSession: ${sessionId || 'N/A'}`);
            window.open(`https://wa.me/9711234567?text=${message}`, '_blank');
          }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Send via WhatsApp
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
