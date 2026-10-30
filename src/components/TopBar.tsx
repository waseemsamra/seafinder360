"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function TopBar() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role_id')
          .eq('id', session.user.id)
          .maybeSingle();
        if (profile?.role_id === 1) setIsAdmin(true);
      }
    };
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role_id')
          .eq('id', session.user.id)
          .maybeSingle();
        if (profile?.role_id === 1) setIsAdmin(true);
        else setIsAdmin(false);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', click);
    return () => { subscription.unsubscribe(); document.removeEventListener('click', click); };
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut({ scope: 'global' });
    } catch {}
    try { localStorage.clear(); sessionStorage.clear(); } catch {}
    try {
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
    } catch {}
    window.location.href = "/login";
  };

  return (
    <div className="top-bar" style={{ width: '100%', padding: '0' }}>
      <div style={{ maxWidth: '1404px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box' }}>
        <div className="top-bar-left">
          <div className="top-bar-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +971542197999
          </div>
          <div className="top-bar-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            DUBAI MARINA WALK | DUBAI, UAE
          </div>
        </div>
        <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="social-icons"><span>f</span><span>ig</span><span>tt</span></div>
          {user ? (
            <div ref={ref} style={{ position: 'relative' }}>
              <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Account
              </button>
              {open && (
                <div style={{ position: 'absolute', right: 0, top: '120%', background: '#fff', color: '#000', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', minWidth: '140px', zIndex: 1000 }}>
                  {isAdmin && <Link href="/admin" style={{ display: 'block', padding: '10px 14px', textDecoration: 'none', color: '#000', fontSize: '13px' }}>Admin Dashboard</Link>}
                  <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
