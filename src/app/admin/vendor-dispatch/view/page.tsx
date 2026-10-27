"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { createClient } from "@/lib/supabase/client";

function VendorDispatchViewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [dispatch, setDispatch] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);

  const [allVendors, setAllVendors] = useState<any[]>([]);

  useEffect(() => {
    if (id) fetchData();
    fetchAllVendors();
  }, [id]);

  const fetchAllVendors = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.from('vendors').select('*').limit(20);
      setAllVendors(data || []);
    } catch (e) {}
  };

  useEffect(() => {
    if (!dispatch?.expires_at || dispatch.status !== 'pending') return;
    const interval = setInterval(() => {
      const diff = new Date(dispatch.expires_at).getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
      if (diff <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const fetchData = async () => {
    if (!id) { setLoading(false); return; }
    try {
      const res = await fetch(`/api/admin/vendor-dispatch/${id}`, { cache: 'no-store' });
      const json = await res.json();
      setDispatch(json.dispatch);
      setItems(json.items || []);
      setVendors(json.vendors || {});
    } catch (e) {
      setDispatch(null);
    }
    setLoading(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleApprove = async () => {
    if (!id || !dispatch) return;
    const supabase = createClient();
    await supabase.from('vendor_dispatches').update({ status: 'approved', approved_at: new Date().toISOString() }).eq('id', id);
    const summaryText = (dispatch.answers || [])
      .filter((a: any) => a.step >=1 && a.step <=6)
      .map((a: any, i: number) => `${i+1}. ${a.question?.replace(/^\d+\.\s*/, '')}: ${a.answerText || a.answer}`)
      .join('\n');
    const message = encodeURIComponent(`Hi ${dispatch.client_name || ''}! Your yacht charter request for ${dispatch.yacht_name} has been approved by our team.\n\nYour Preferences:\n${summaryText}\n\nOur specialist will share final confirmation shortly.\nREF: SF-${id.slice(0,8).toUpperCase()}`);
    if (dispatch.client_phone) {
      window.open(`https://wa.me/${dispatch.client_phone.replace(/[^0-9]/g,'')}?text=${message}`, '_blank');
    }
    await supabase.from('vendor_dispatches').update({ whatsapp_sent_to_client: true }).eq('id', id);
    fetchData();
  };

  const handleReject = async () => {
    if (!id) return;
    const supabase = createClient();
    await supabase.from('vendor_dispatches').update({ status: 'rejected', rejected_at: new Date().toISOString() }).eq('id', id);
    fetchData();
  };

  if (loading) return <AdminLayout><div style={{padding:'40px'}}>Loading...</div></AdminLayout>;
  if (!dispatch) return <AdminLayout><div style={{padding:'40px'}}>Dispatch not found</div></AdminLayout>;

  return (
    <AdminLayout>
      <div style={{padding:'30px'}}>
        <h1 style={{marginBottom:'20px'}}>Vendor Dispatch #{dispatch.id?.slice(0,8)}</h1>
        <div style={{display:'flex',gap:'20px',marginBottom:'30px'}}>
          <div style={{padding:'15px 25px',background:'#f5f5f5',borderRadius:'8px'}}>Status: {dispatch.status}</div>
          {dispatch.status === 'pending' && <div style={{padding:'15px 25px',background:'#fff3cd',borderRadius:'8px'}}>Expires in: {formatTime(timeLeft)}</div>}
        </div>
        <div style={{display:'flex',gap:'10px',marginBottom:'30px'}}>
          <button onClick={handleApprove} style={{padding:'10px 20px',background:'#28a745',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>Approve & Send WhatsApp</button>
          <button onClick={handleReject} style={{padding:'10px 20px',background:'#dc3545',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>Reject</button>
        </div>
        <div style={{background:'white',padding:'30px',borderRadius:'8px',marginBottom:'20px'}}>
          <h2 style={{marginBottom:'15px'}}>Client Info</h2>
          <p><strong>Name:</strong> {dispatch.client_name}</p>
          <p><strong>Phone:</strong> {dispatch.client_phone}</p>
          <p><strong>Email:</strong> {dispatch.client_email}</p>
          <p><strong>Yacht:</strong> {dispatch.yacht_name}</p>
        </div>
        <div style={{background:'white',padding:'30px',borderRadius:'8px'}}>
          <h2 style={{marginBottom:'15px'}}>Preferences</h2>
          {(dispatch.answers || []).map((a:any, i:number) => (
            <div key={i} style={{padding:'10px 0',borderBottom:'1px solid #eee'}}>
              <strong>{a.question}</strong>: {a.answerText || a.answer}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function VendorDispatchViewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VendorDispatchViewContent />
    </Suspense>
  );
}
