'use client';
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AIConciergeModal from "./AIConciergeModal";

const sectionConfig = [
  { id: "charter", title: "Luxury Yacht Charters", subtitle: "Experience the finest fleet in Dubai with private chefs and premium crews." },
  { id: "party", title: "Party & Event Yachts", subtitle: "Celebrate birthdays, corporate events, and special occasions on the water." },
  { id: "corporate", title: "Corporate Yacht Charters", subtitle: "Impress clients and reward your team with an unforgettable experience." },
  { id: "family", title: "Family & Budget Friendly", subtitle: "Perfect for family days out, sightseeing, and smaller groups." },
  { id: "watersports", title: "Watersports & Adventure", subtitle: "Jet skis, flyboards, and thrilling rides included on select yachts." },
];

export default function YachtCarousels() {
  const [yachts, setYachts] = useState<any[]>([]);
  const [showConcierge, setShowConcierge] = useState(false);
  const [selectedYacht, setSelectedYacht] = useState<any>(null);

  useEffect(() => {
    const fetchYachts = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("yachts").select("*").order("id");
      setYachts(data || []);
    };
    fetchYachts();
  }, []);

  const handleCardClick = (yacht: any) => {
    window.location.href = `/yacht-detail?id=${yacht.id}`;
  };

  const handleViewAll = () => {
    window.location.href = "/search";
  };

  const getYachtsForSection = (idx: number) => {
    const perSection = 10;
    const start = idx * perSection;
    const end = start + perSection;
    const sectionYachts = yachts.slice(start, end);
    if (sectionYachts.length === 0 && yachts.length > 0) {
      return yachts.slice(0, perSection).map((y: any) => ({
        id: y.id,
        name: y.name,
        loc: y.location || y.marina || "Dubai",
        specs: `${y.type || "Yacht"} · ${y.length || y.length_ft || ""} ft · ${y.guests || ""} guests`,
        price: y.price ? `AED ${Number(y.price).toLocaleString()} / hour` : "POA",
        img: y.img || "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop",
      }));
    }
    return sectionYachts.map((y: any) => ({
      id: y.id,
      name: y.name,
      loc: y.location || y.marina || "Dubai",
      specs: `${y.type || "Yacht"} · ${y.length || y.length_ft || ""} ft · ${y.guests || ""} guests`,
      price: y.price ? `AED ${Number(y.price).toLocaleString()} / hour` : "POA",
      img: y.img || "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop",
    }));
  };

  if (yachts.length === 0) return null;

  return (
    <div style={{ background: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <AIConciergeModal isOpen={showConcierge} onClose={() => setShowConcierge(false)} yacht={selectedYacht} />
      {sectionConfig.map((section, idx) => {
        const sectionYachts = getYachtsForSection(idx);
        if (sectionYachts.length === 0) return null;
        return (
          <section key={section.id} id={section.id} style={{ padding: "40px 5%", background: "#FFFFFF", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", maxWidth: "1400px", marginLeft: "auto", marginRight: "auto", gap: "12px", flexWrap: "nowrap" }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#1A222C", fontWeight: 700, marginBottom: "0", lineHeight: 1.2 }}>{section.title}</h2>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, display: "none" }} className="carousel-subtitle">{section.subtitle}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <button onClick={handleViewAll} style={{ fontSize: "11px", fontWeight: 700, color: "#1A222C", background: "transparent", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
                  View All
                </button>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => { const el = document.getElementById(`carousel-${section.id}`); if (el) el.scrollBy({ left: -340, behavior: 'smooth' }); }} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #E5E7EB", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A222C" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button onClick={() => { const el = document.getElementById(`carousel-${section.id}`); if (el) el.scrollBy({ left: 340, behavior: 'smooth' }); }} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #E5E7EB", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A222C" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `@media (min-width: 768px) { .carousel-subtitle { display: block !important; } }`}} />
            <div id={`carousel-${section.id}`} style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "12px", paddingRight: "20px", maxWidth: "1400px", margin: "0 auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }} className="sf-carousel-scroll">
              <style dangerouslySetInnerHTML={{__html: `.sf-carousel-scroll::-webkit-scrollbar { display: none; }`}} />
              {sectionYachts.map((yacht: any, idxCard: number) => (
                <div
                  key={idxCard}
                  onClick={() => handleCardClick(yacht)}
                  style={{
                  minWidth: "260px",
                  maxWidth: "85%",
                    scrollSnapAlign: "start",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width: "100%", height: "240px", overflow: "hidden", backgroundColor: "#EAEAEA" }}>
                    <img src={yacht.img} alt={yacht.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: "16px 0 8px 0", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.8px", color: "#2C7A7B", fontWeight: 500, marginBottom: "8px" }}>{yacht.loc}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 600, color: "#1A222C", margin: "0 0 4px 0", letterSpacing: "0.5px", textTransform: "uppercase" }}>{yacht.name.toUpperCase()}</h3>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B7280", fontWeight: 300, marginBottom: "10px" }}>{yacht.specs}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#374151", fontWeight: 600 }}>{yacht.price}</div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedYacht(yacht); setShowConcierge(true); }} style={{ fontSize: "9px", padding: "4px 8px", background: "#C4A87C", color: "#1A222C", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.5px" }}>Ask Expert</button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
