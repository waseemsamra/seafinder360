"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function VendorDispatchListPage() {
  const [dispatches, setDispatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDispatches = async () => {
    try {
      const res = await fetch('/api/admin/vendor-dispatch', { cache: 'no-store' });
      const json = await res.json();
      setDispatches(json.data || []);
    } catch (e) {
      setDispatches([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDispatches();
    const supabase = createClient();
    const channel = supabase
      .channel('vendor_dispatch_list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vendor_dispatches' }, () => {
        fetchDispatches();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vendor_dispatch_items' }, () => {
        fetchDispatches();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusBadge = (status: string) => {
    if (status === 'approved') return { bg: '#D1FAE5', color: '#065F46', text: 'Approved' };
    if (status === 'expired') return { bg: '#F3F4F6', color: '#374151', text: 'Expired' };
    if (status === 'rejected') return { bg: '#FEF2F2', color: '#991B1B', text: 'Rejected' };
    return { bg: '#FFFBEB', color: '#92400E', text: 'Pending' };
  };

  const getTimeLeft = (expiresAt: string) => {
    if (!expiresAt) return null;
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="vendor-dispatch">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A222C', fontFamily: "'Playfair Display', serif", marginBottom: '4px' }}>Vendor Dispatch</h1>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>Track client requests sent to vendors and their responses</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Request</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Yacht</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Guests</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time Left</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</td></tr>
              ) : dispatches.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>No vendor dispatches yet</td></tr>
              ) : (
                dispatches.map((d) => {
                  const badge = getStatusBadge(d.status);
                  const timeLeft = getTimeLeft(d.expires_at);
                  return (
                    <tr key={d.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: '600', color: '#1A222C' }}>#{d.id.slice(0, 8).toUpperCase()}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{new Date(d.created_at).toLocaleString()}</div>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#1A222C' }}>{d.client_name || '-'}</td>
                      <td style={{ padding: '16px 24px', color: '#1A222C', fontWeight: '500' }}>{d.yacht_name}</td>
                      <td style={{ padding: '16px 24px', color: '#1A222C' }}>{d.guests || '-'}</td>
                      <td style={{ padding: '16px 24px' }}>
                        {d.status === 'pending' && timeLeft && timeLeft !== 'Expired' ? (
                          <span style={{ color: '#EF4444', fontWeight: '600' }}>{timeLeft}</span>
                        ) : timeLeft === 'Expired' ? (
                          <span style={{ color: '#6B7280' }}>Expired</span>
                        ) : '-'}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: badge.bg, color: badge.color }}>{badge.text}</span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <Link href={`/admin/vendor-dispatch/view?id=${d.id}`} style={{ color: '#C4A87C', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>View Responses →</Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
