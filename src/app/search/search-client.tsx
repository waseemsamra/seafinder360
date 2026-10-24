"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SearchClient() {
  const [yachts, setYachts] = useState<any[]>([]);
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    const fetchYachts = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('yachts').select('*').order('id');
      setYachts(data || []);
    };
    fetchYachts();
  }, []);

  const formattedYachts = yachts.map((yacht: any, idx: number) => ({
    id: yacht.id || idx + 1,
    name: yacht.name,
    type: yacht.type,
    guests: yacht.guests,
    length: yacht.length ? `${yacht.length} ft` : yacht.specs?.split('·')[1]?.trim() || '',
    price: yacht.price ? `AED ${yacht.price.toLocaleString()}` : "POA",
    badge: idx % 4 === 0 ? "Best Seller" : idx % 4 === 2 ? "New Arrival" : null,
    img: yacht.img || "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop",
  }));

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="container">
          <Link className="logo" href="/">SeaFinder360</Link>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/search">Fleet</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="search-main">
        <div className="container">
          <div className="search-hero">
            <h1>The Dubai Fleet</h1>
            <p>Discover luxury yachts available for charter by the hour</p>
          </div>

          <section className="fleet" id="fleet">
            <div className="fleet-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {formattedYachts.slice(0, visible).map((y) => (
                <div key={y.id} className="yacht-card">
                  <div className="yacht-image">
                    <img src={y.img} alt={y.name + " Yacht"} />
                    {y.badge && <div className="yacht-badge">{y.badge}</div>}
                    <div className="tour-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> 360° Tour</div>
                  </div>
                  <div className="yacht-info">
                    <h3 className="yacht-name">{y.name}</h3>
                    <div className="yacht-type">{y.type}</div>
                    <div className="yacht-specs">
                      <div className="spec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> {y.guests} Guests</div>
                      <div className="spec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20"/><path d="M12 2v20"/></svg> {y.length}</div>
                    </div>
                    <div className="yacht-footer">
                      <div className="yacht-price">{y.price} <span>/ day</span></div>
                      <Link href={`/yachts/${y.id}`} className="btn-view">View Yacht</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {visible < formattedYachts.length && (
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button className="btn-view" onClick={() => setVisible((v) => v + 6)}>Load more</button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="search-footer">
        <div className="container">
          <p>&copy; 2025 SeaFinder360. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .search-page { min-height:100vh; background:#0a0a0a; color:#fff; }
        .container { max-width:1200px; margin:0 auto; padding:0 2rem; }
        .search-header { border-bottom:1px solid #1a1a1a; padding:1.5rem 0; }
        .search-header .container { display:flex; align-items:center; justify-content:space-between; }
        .logo { font-size:1.5rem; font-weight:700; color:#fff; text-decoration:none; font-family: var(--font-serif); }
        .nav { display:flex; gap:2rem; }
        .nav a { color:#a1a1aa; text-decoration:none; font-size:0.95rem; }
        .nav a:hover { color:#fff; }
        .search-main { padding:3rem 0 4rem; }
        .search-hero { text-align:center; margin-bottom:3rem; }
        .search-hero h1 { font-size:2.5rem; font-weight:700; margin-bottom:0.75rem; font-family: var(--font-serif); }
        .search-hero p { color:#a1a1aa; font-size:1.1rem; }
        .fleet { background: transparent; padding: 0; }
        .fleet-grid { display:grid; gap:2rem; }
        .yacht-card { background:#111; border-radius:8px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5); transition: transform 0.3s ease; }
        .yacht-card:hover { transform: translateY(-5px); }
        .yacht-image { position:relative; height:250px; overflow:hidden; }
        .yacht-image img { width:100%; height:100%; object-fit:cover; }
        .yacht-badge { position:absolute; top:15px; left:15px; background:var(--gold); color:#fff; padding:6px 12px; font-size:11px; text-transform:uppercase; letter-spacing:1px; }
        .tour-badge { position:absolute; bottom:15px; left:15px; background:rgba(0,0,0,0.7); color:#fff; padding:6px 10px; font-size:11px; display:flex; align-items:center; gap:6px; border-radius:4px; }
        .yacht-info { padding:24px; }
        .yacht-name { font-size:1.4rem; font-weight:600; margin-bottom:6px; font-family: var(--font-serif); color:#fff; }
        .yacht-type { color:#a1a1aa; font-size:0.9rem; margin-bottom:16px; }
        .yacht-specs { display:flex; gap:20px; margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid #222; }
        .spec { display:flex; align-items:center; gap:8px; color:#a1a1aa; font-size:0.85rem; }
        .spec svg { width:16px; height:16px; stroke:var(--gold); }
        .yacht-footer { display:flex; justify-content:space-between; align-items:center; }
        .yacht-price { font-size:1.3rem; font-weight:600; color:#fff; }
        .yacht-price span { font-size:0.85rem; color:#a1a1aa; font-weight:400; }
        .btn-view { background:transparent; border:1px solid var(--gold); color:var(--gold); padding:10px 20px; text-decoration:none; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; transition: all 0.3s ease; cursor:pointer; display:inline-block; }
        .btn-view:hover { background:var(--gold); color:#fff; }
        .search-footer { border-top:1px solid #1a1a1a; padding:2rem 0; text-align:center; color:#71717a; font-size:0.9rem; }
        @media (max-width: 968px) {
          .fleet-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .fleet-grid { grid-template-columns: 1fr !important; }
          .nav { display:none; }
        }
      `}</style>
    </div>
  );
}
