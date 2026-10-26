"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { createClient } from "@/lib/supabase/client";

function VendorDispatchDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const [dispatch, setDispatch] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (!dispatch?.expires_at || dispatch.status !== 'pending') return;
    const interval = setInterval(() => {
      const diff = new Date(dispatch.expires_at).getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const fetchData = async () => {
    const supabase = createClient();
    const { data: d } = await supabase.from('vendor_dispatches').select('*').eq('id', id).maybeSingle();
    setDispatch(d);
    
    const { data: its } = await supabase.from('vendor_dispatch_items').select('*').eq('dispatch_id', id);
    setItems(its || []);
    
    if (its && its.length > 0) {
      const vendorIds = its.map((i: any) => i.vendor_id);
      const { data: vs } = await supabase.from("vendors").select("*").in("id", vendorIds);
      const map: any = {};
      (vs || []).forEach((v: any) => { map[v.id] = v; });
      setVendors(map);
    }
    setLoading(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleApprove = async () => {
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

  if (loading) return <AdminLayout user={{ username: 'Admin User' }} activePage="vendor-dispatch"><div style={{ padding: '40px' }}>Loading...</div></AdminLayout>;
  if (!dispatch) return <AdminLayout user={{ username: 'Admin User' }} activePage="vendor-dispatch"><div style={{ padding: '40px' }}>Not found</div></AdminLayout>;

  const acceptedCount = items.filter((i: any) => i.status === 'accepted').length;
  const pendingCount = items.filter((i: any) => i.status === 'pending').length;
  const declinedCount = items.filter((i: any) => i.status === 'declined').length;

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="vendor-dispatch">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <a href="/admin/vendor-dispatch" style={{ color: '#C4A87C', textDecoration: 'none', fontSize: '14px' }}>← Back to Vendor Dispatch</a>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A222C', fontFamily: "'Playfair Display', serif", marginTop: '12px', marginBottom: '4px' }}>Vendor Response</h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Request #{dispatch.id.slice(0, 8).toUpperCase()}</p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <div style={{ background: '#1A222C', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>New Booking Request</h2>
            {dispatch.status === 'pending' && timeLeft > 0 ? (
              <div style={{ background: '#EF4444', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '14px' }}>{formatTime(timeLeft)}</div>
            ) : dispatch.status === 'pending' && timeLeft <= 0 ? (
              <div style={{ background: '#6B7280', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '14px' }}>EXPIRED</div>
            ) : (
              <div style={{ background: '#10B981', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '14px' }}>{dispatch.status.toUpperCase()}</div>
            )}
          </div>

          <div style={{ padding: '30px', borderBottom: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Yacht Requested</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.yacht_name}</strong></div>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Guests</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.guests || '-'}</strong></div>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Duration</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.duration || '-'}</strong></div>
            <div><span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '1px', marginBottom: '6px', fontWeight: '600' }}>Client</span><strong style={{ fontSize: '16px', color: '#1A222C' }}>{dispatch.client_name || '-'} {dispatch.client_phone ? `• ${dispatch.client_phone}` : ''}</strong></div>
          </div>

          <div style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '13px', color: '#6B7280', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Vendors Notified ({items.length}) • Accepted: {acceptedCount} • Pending: {pendingCount} • Declined: {declinedCount}</h3>
            
            {items.map((item: any) => {
              const v = vendors[item.vendor_id];
              const status = item.status;
              if (status === 'accepted') {
                return <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', borderRadius: '8px', border: '1px solid #34D399', background: '#D1FAE5', marginBottom: '12px' }}>
                  <div><div style={{ fontWeight: '600', color: '#1A222C', fontSize: '15px' }}>{v?.business_name || v?.name || 'Vendor'}</div><div style={{ fontSize: '12px', color: '#065F46', marginTop: '4px' }}>Quote: AED {item.quote_price} {item.quote_notes && `• ${item.quote_notes}`}</div></div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#10B981' }}>✓ Accepted</div>
                </div>
              } else if (status === 'declined') {
                return <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', borderRadius: '8px', border: '1px solid #FECACA', background: '#FEF2F2', marginBottom: '12px', opacity: 0.7 }}>
                  <div style={{ fontWeight: '600', color: '#1A222C', fontSize: '15px' }}>{v?.business_name || v?.name || 'Vendor'}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#EF4444' }}>Unavailable</div>
                </div>
              } else {
                return <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', borderRadius: '8px', border: '1px solid #FDE68A', background: '#FFFBEB', marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600', color: '#1A222C', fontSize: '15px' }}>{v?.business_name || v?.name || 'Vendor'}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#F59E0B' }}>⏱ Waiting...</div>
                </div>
              }
            })}
          </div>

          <div style={{ padding: '25px 30px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB', textAlign: 'right' }}>
            {dispatch.status === 'pending' ? (
              <button onClick={handleApprove} disabled={acceptedCount === 0 && timeLeft > 0} style={{ background: acceptedCount > 0 || timeLeft <= 0 ? '#1A222C' : '#9CA3AF', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: acceptedCount > 0 || timeLeft <= 0 ? 'pointer' : 'not-allowed' }}>
                {acceptedCount > 0 ? 'Approve & Notify Client via WhatsApp' : timeLeft <= 0 ? 'Admin Override: Confirm Booking' : 'Waiting for Vendor Response'}
              </button>
            ) : (
              <button disabled style={{ background: '#10B981', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '6px', fontSize: '14px', fontWeight: '700' }}>Booking Approved</button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function VendorDispatchDetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px' }}>Loading...</div>}>
      <VendorDispatchDetailContent />
    </Suspense>
  );
}
