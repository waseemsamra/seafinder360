'use client';
import { useState } from "react";
import Link from "next/link";

const base = [
  { name: "Majestic 120", type: "Motor Yacht", guests: 12, length: "120 ft", price: "$8,500", badge: "Best Seller", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop" },
  { name: "Ocean Pearl", type: "Sailing Yacht", guests: 8, length: "85 ft", price: "$4,200", badge: null, img: "https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=800&auto=format&fit=crop" },
  { name: "Sea Breeze", type: "Luxury Catamaran", guests: 10, length: "95 ft", price: "$6,000", badge: "New Arrival", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop" },
];
const yachts = Array.from({ length: 16 }, (_, i) => ({ id: i + 1, ...base[i % base.length] }));


export default function Fleet() {
  const [visible, setVisible] = useState(6);
  return (
    <section className="section fleet" id="fleet">
      <div className="section-header">
        <span className="section-label">Featured Fleet</span>
        <h2 className="section-title">Luxury Yachts for Charter</h2>
        <p className="section-subtitle">Explore our hand-picked selection of premium yachts available for your next voyage.</p>
      </div>
      <div className="fleet-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {yachts.slice(0, visible).map((y) => (
          <div key={y.id} className="yacht-card">
            <div className="yacht-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  <Link href={`/yacht-detail`} className="btn-view">View Yacht</Link>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        {visible < yachts.length ? (
          <button className="btn-view" onClick={() => setVisible((v) => v + 6)}>Load more</button>
        ) : (
          <Link href="/search" className="btn-view">View Fleet</Link>
        )}
      </div>
    </section>
  );
}
