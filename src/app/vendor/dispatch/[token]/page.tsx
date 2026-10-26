"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

export default function VendorDispatchResponsePage() {
  const params = useParams();
  const token = params.token as string;
  const [item, setItem] = useState<any>(null);
  const [dispatch, setDispatch] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    const supabase = createClient();
    const { data: it } = await supabase.from('vendor_dispatch_items').select('*').eq('token', token).single();
    setItem(it);
    if (it) {
      const { data: d } = await supabase.from('vendor_dispatches').select('*').eq('id', it.dispatch_id).single();
      setDispatch(d);
      const { data: v } = await supabase.from('vendors').select('*').eq('id', it.vendor_id).single();
      setVendor(v);
      if (it.status !== 'pending') setSubmitted(true);
    }
    setLoading(false);
  };

  const handleAccept = async () => {
    if (!price) return alert('Please enter price');
    const supabase = createClient();
    await supabase.from('vendor_dispatch_items').update({
      status: 'accepted',
      quote_price: parseFloat(price),
      quote_notes: notes,
      responded_at: new Date().toISOString()
    }).eq('id', item.id);
    setSubmitted(true);
  };

  const handleDecline = async () => {
    const supabase = createClient();
    await supabase.from('vendor_dispatch_items').update({
      status: 'declined',
      responded_at: new Date().toISOString()
    }).eq('id', item.id);
    setSubmitted(true);
  };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>Loading...</div>;
  if (!item || !dispatch) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>Invalid link</div>;

  return (
    <div style={{ background: '#F9F9FA', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#1A222C', marginBottom: '8px' }}>SeaFinder360</h1>
          <p style={{ color: '#6B7280' }}>Yacht Charter Booking Request</p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#1A222C', padding: '25px 30px', color: 'white' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Booking Request</h2>
            <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '4px' }}>Vendor: {vendor?.business_name || vendor?.name}</p>
          </div>

          <div style={{ padding: '30px', borderBottom: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Yacht</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.yacht_name}</strong></div>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Guests</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.guests || '-'}</strong></div>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Duration</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.duration || '-'}</strong></div>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Client</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.client_name || '-'}</strong></div>
          </div>

          {submitted ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.status === 'accepted' ? '✓' : '✗'}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1A222C', marginBottom: '8px' }}>{item.status === 'accepted' ? 'Response Submitted' : 'Marked as Unavailable'}</h3>
              <p style={{ color: '#6B7280' }}>Thank you for your response. The admin will be notified.</p>
            </div>
          ) : (
            <>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A222C', marginBottom: '8px' }}>Quote Price (AED) *</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter your price" style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A222C', marginBottom: '8px' }}>Notes (Optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional details..." rows={3} style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif', resize: 'vertical' }} />
                </div>
              </div>
              <div style={{ padding: '25px 30px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '12px' }}>
                <button onClick={handleDecline} style={{ flex: 1, padding: '14px 24px', background: 'white', color: '#EF4444', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Decline</button>
                <button onClick={handleAccept} style={{ flex: 1, padding: '14px 24px', background: '#10B981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Accept with Price</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
