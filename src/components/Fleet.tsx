'use client';
import { useState } from "react";

const base = [
  { name: "Majestic 120", type: "Motor Yacht", guests: 12, length: "120 ft", price: "AED 8,500", badge: "Best Seller", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop" },
  { name: "Ocean Pearl", type: "Sailing Yacht", guests: 8, length: "85 ft", price: "AED 4,200", badge: null, img: "https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=800&auto=format&fit=crop" },
  { name: "Sea Breeze", type: "Catamaran", guests: 10, length: "60 ft", price: "AED 6,000", badge: "New Arrival", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop" },
];
const yachts = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, ...base[i % base.length] }));


export default function Fleet() {
  const [visible, setVisible] = useState(3);
  return (
    <section className="fleet" id="fleet" style={{ padding: "80px 5%", background: "white", textAlign: "center" }}>
      <h2 className="section-title">Featured Yachts</h2>
      <p className="section-subtitle">Explore our hand-picked selection of premium yachts.</p>
      <div className="fleet-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {yachts.slice(0, visible).map((y) => (
          <div key={y.id} className="yacht-card" onClick={() => window.location.href='/yacht-detail'}>
            <div className="yacht-image-wrapper">
              <img src={y.img} alt={y.name + " Yacht"} />
              {y.badge && <div className="yacht-badge">{y.badge}</div>}
            </div>
            <div className="yacht-card-info">
              <div className="card-location">Dubai Harbour</div>
              <div className="card-name">{y.name}</div>
              <div className="card-specs">{y.type} · {y.length} · {y.guests} guests</div>
              <div className="card-price">{y.price} / day</div>
              <button className="btn-view-card" onClick={(e) => {e.stopPropagation(); window.location.href='/yacht-detail'}}>View Yacht</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button className="btn-view" onClick={() => window.location.href='/search'}>View All Yachts</button>
      </div>
    </section>
  );
}
