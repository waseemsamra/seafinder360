"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    length: yacht.length ? `${yacht.length} ft` : '',
    price: yacht.price ? `AED ${yacht.price.toLocaleString()}` : "POA",
    badge: idx % 4 === 0 ? "Best Seller" : idx % 4 === 2 ? "New Arrival" : null,
    img: yacht.img || "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop",
  }));

  return (
    <>
      <TopBar />
      <Header />
      <main style={{ paddingTop: '120px', background: '#fff', minHeight: '100vh' }}>
        <section className="section fleet" style={{ paddingTop: '60px' }}>
          <div className="section-header">
            <span className="section-label">Our Fleet</span>
            <h2 className="section-title">Luxury Yachts for Charter</h2>
            <p className="section-subtitle">Browse our complete collection of premium yachts available for charter in Dubai</p>
          </div>
          <div className="fleet-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {formattedYachts.slice(0, visible).map((y) => (
              <div key={y.id} className="yacht-card">
                <div className="yacht-image">
                  <img src={y.img} alt={y.name + " Yacht"} />
                  {y.badge && <div className="yacht-badge">{y.badge}</div>}
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
                    <Link href={`/yacht-detail`} className="btn-view">View Yacht</Link>
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
      </main>
      <Footer />
      <style jsx>{`
        .fleet { background: #fff; }
        .yacht-card { background: #fff; border: 1px solid #e5e7eb; }
        .yacht-info { background: #fff; }
        .yacht-name { color: var(--navy); }
        .yacht-type { color: #666; }
        .yacht-price { color: var(--navy); }
        .yacht-price span { color: #666; }
        .spec { color: #666; }
        @media (max-width: 968px) {
          .fleet-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .fleet-grid { grid-template-columns: 1fr !important; }
          main { padding-top: 100px !important; }
        }
      `}</style>
    </>
  );
}
