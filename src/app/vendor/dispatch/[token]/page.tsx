"use client";

import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

function VendorDispatchResponseContent() {
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
    if (token) fetchData();
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
    }).eq('token', token);
    setSubmitted(true);
    alert('Quote submitted successfully!');
  };

  const handleDecline = async () => {
    const supabase = createClient();
    await supabase.from('vendor_dispatch_items').update({
      status: 'declined',
      responded_at: new Date().toISOString()
    }).eq('token', token);
    setSubmitted(true);
    alert('Request declined');
  };

  if (loading) return <div style={{padding:'40px',textAlign:'center'}}>Loading...</div>;
  if (!item) return <div style={{padding:'40px',textAlign:'center'}}>Invalid link</div>;

  return (
    <div style={{minHeight:'100vh',background:'#f5f5f5',padding:'40px 20px'}}>
      <div style={{maxWidth:'600px',margin:'0 auto',background:'white',borderRadius:'8px',padding:'40px'}}>
        <h1 style={{marginBottom:'20px'}}>Yacht Charter Request</h1>
        <p><strong>Yacht:</strong> {dispatch?.yacht_name}</p>
        <p><strong>Client:</strong> {dispatch?.client_name}</p>
        <p><strong>Vendor:</strong> {vendor?.name}</p>
        
        {submitted ? (
          <div style={{marginTop:'30px',padding:'20px',background:'#d4edda',borderRadius:'4px'}}>
            <p style={{color:'#155724'}}>Response submitted. Thank you!</p>
          </div>
        ) : (
          <div style={{marginTop:'30px'}}>
            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block',marginBottom:'5px'}}>Quote Price (AED)</label>
              <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} style={{width:'100%',padding:'10px',border:'1px solid #ddd',borderRadius:'4px'}} />
            </div>
            <div style={{marginBottom:'20px'}}>
              <label style={{display:'block',marginBottom:'5px'}}>Notes</label>
              <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} style={{width:'100%',padding:'10px',border:'1px solid #ddd',borderRadius:'4px',minHeight:'80px'}} />
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={handleAccept} style={{flex:1,padding:'12px',background:'#28a745',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>Accept & Quote</button>
              <button onClick={handleDecline} style={{flex:1,padding:'12px',background:'#dc3545',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>Decline</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VendorDispatchResponsePage() {
  return (
    <Suspense fallback={<div style={{padding:'40px',textAlign:'center'}}>Loading...</div>}>
      <VendorDispatchResponseContent />
    </Suspense>
  );
}
