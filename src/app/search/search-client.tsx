"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIConciergeModal from "@/components/AIConciergeModal";

export default function SearchClient() {
  const [yachts, setYachts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState("Any");
  const [length, setLength] = useState("Any");
  const [cabins, setCabins] = useState("Any");
  const [marina, setMarina] = useState("All Marinas");
  const [priceLimit, setPriceLimit] = useState(0);
  const [showConcierge, setShowConcierge] = useState(false);
  const [selectedYacht, setSelectedYacht] = useState<any>(null);

  useEffect(() => {
    const fetchYachts = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('yachts').select('*').order('id');
      setYachts(data || []);
      if (data && data.length > 0) {
        const maxP = Math.max(...data.map((y: any) => Number(y.price) || 0));
        if (maxP > 0) setPriceLimit(maxP);
      }
    };
    fetchYachts();
  }, []);

  const maxPriceOverall = yachts.length > 0 ? Math.max(...yachts.map((y: any) => Number(y.price) || 0)) : 25000;

  const handleCardClick = (yacht: any) => {
    window.location.href = `/yacht-detail?id=${yacht.id}`;
  };

  const filteredYachts = yachts.filter((y) => {
    if (search && !y.name?.toLowerCase().includes(search.toLowerCase())) return false;
    if (priceLimit > 0 && y.price && Number(y.price) > priceLimit) return false;
    if (guests !== "Any") {
      const g = parseInt(guests);
      if (guests.includes("+") && y.guests < g) return false;
      else if (!guests.includes("+") && y.guests != g) return false;
    }
    if (length !== "Any") {
      const l = y.length || y.length_ft || 0;
      if (length === "50 - 80 ft" && (l < 50 || l > 80)) return false;
      if (length === "80 - 120 ft" && (l < 80 || l > 120)) return false;
      if (length === "120+ ft" && l < 120) return false;
    }
    if (cabins !== "Any") {
      const c = parseInt(cabins);
      if ((y.cabins || 0) < c) return false;
    }
    if (marina !== "All Marinas") {
      if ((y.marina || y.location || "") !== marina) return false;
    }
    return true;
  });

  const groupedYachts = [
    { title: "Up to 25 guests", yachts: filteredYachts.filter((y) => y.guests && y.guests <= 25) },
    { title: "25 to 50 guests", yachts: filteredYachts.filter((y) => y.guests && y.guests > 25 && y.guests <= 50) },
    { title: "50+ guests", yachts: filteredYachts.filter((y) => y.guests && y.guests > 50) },
  ].filter((g) => g.yachts.length > 0);

  return (
    <>
      <TopBar />
      <Header />
      <main style={{ paddingTop: '120px', background: '#fff', minHeight: '100vh' }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        
        <section className="search-section" style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '30px 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#6B7280', fontWeight: 600 }}>SEARCH</span>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search yacht name..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '300px', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <select style={{ width: '200px', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px', color: '#1F2937', backgroundColor: 'white', cursor: 'pointer', outline: 'none' }}>
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A222C', marginLeft: '10px' }}>{filteredYachts.length} yachts</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', alignItems: 'end', marginBottom: '20px' }} className="filters-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', fontWeight: 600 }}>PRICE PER HOUR, UP TO AED <br/><span style={{ color: '#6B7280' }}>{Number(priceLimit).toLocaleString()}</span></label>
                <input type="range" min={0} max={maxPriceOverall} step={maxPriceOverall > 0 ? Math.max(100, Math.round(maxPriceOverall/50)) : 500} value={priceLimit || maxPriceOverall} onChange={(e) => setPriceLimit(Number(e.target.value))} style={{ width: '100%', marginTop: '10px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', fontWeight: 600 }}>GUESTS, AT LEAST</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} style={{ width: '100%', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px' }}><option>Any</option><option>10+</option><option>20+</option><option>25+</option><option>50+</option></select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', fontWeight: 600 }}>LENGTH (FT)</label>
                <select value={length} onChange={(e) => setLength(e.target.value)} style={{ width: '100%', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px' }}><option>Any</option><option>50 - 80 ft</option><option>80 - 120 ft</option><option>120+ ft</option></select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', fontWeight: 600 }}>CABINS</label>
                <select value={cabins} onChange={(e) => setCabins(e.target.value)} style={{ width: '100%', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px' }}><option>Any</option><option>2+</option><option>3+</option><option>4+</option><option>6+</option></select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', fontWeight: 600 }}>MARINA</label>
                <select value={marina} onChange={(e) => setMarina(e.target.value)} style={{ width: '100%', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px' }}><option>All Marinas</option><option>Dubai Marina</option><option>Dubai Harbour</option><option>Marsa Al Arab</option></select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7280', fontWeight: 600 }}>MINIMUM BOOKING</label>
                <select style={{ width: '100%', padding: '12px 15px', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '14px' }}><option>Any Hours</option><option>2 Hours</option><option>3 Hours</option><option>4 Hours</option></select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#1A222C', cursor: 'pointer' }}><input type="checkbox" style={{ width: '18px', height: '18px' }} /> Available for the Grand Prix weekend</label>
              <button onClick={() => { setSearch(''); setGuests('Any'); setLength('Any'); setCabins('Any'); setMarina('All Marinas'); setPriceLimit(maxPriceOverall); }} style={{ background: 'none', border: 'none', color: '#2C7A7B', textDecoration: 'underline', fontSize: '14px', cursor: 'pointer', fontWeight: 500 }}>Reset all filters</button>
            </div>
          </div>
        </section>

        <section style={{ padding: '50px 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '20px', borderBottom: '1px solid #E5E7EB', marginBottom: '40px' }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', color: '#1A222C', fontStyle: 'italic', fontWeight: 400 }}>Dubai Yacht Charters, By the Hour</h1>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>Showing {filteredYachts.length} of {filteredYachts.length} available</div>
            </div>

            {groupedYachts.length > 0 ? (
              groupedYachts.map((group, gIdx) => (
                <div key={gIdx} style={{ marginBottom: '50px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '25px', paddingBottom: '10px', borderBottom: '1px solid #E5E7EB' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#1A222C', fontWeight: 400 }}>{group.title}</h2>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#6B7280', fontWeight: 600 }}>{group.yachts.length} YACHTS</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 280px)', gap: '16px' }} className="yacht-grid">
                    {group.yachts.map((yacht: any, idxCard: number) => (
                      <div
                        key={yacht.id || idxCard}
                        onClick={() => handleCardClick(yacht)}
                        style={{
                          width: '280px',
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ width: '100%', height: '240px', overflow: 'hidden', backgroundColor: '#EAEAEA' }}>
                          <img src={yacht.img || "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop"} alt={yacht.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                        <div style={{ padding: '16px 0 8px 0', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.8px', color: '#2C7A7B', fontWeight: 500, marginBottom: '8px' }}>{yacht.location || yacht.marina || 'Dubai'}</div>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontWeight: 600, color: '#1A222C', margin: '0 0 4px 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{yacht.name}</h3>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B7280', fontWeight: 300, marginBottom: '10px' }}>
                            {yacht.type || 'Yacht'} · {yacht.length || yacht.length_ft || ''} ft · {yacht.guests || ''} guests
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#374151', fontWeight: 600 }}>
                              {yacht.price ? `AED ${Number(yacht.price).toLocaleString()} / hour` : 'Price on Application'}{yacht.price ? <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 400 }}> (min 3h)</span> : ''}
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedYacht(yacht); setShowConcierge(true); }} style={{ fontSize: '9px', padding: '4px 8px', background: '#C4A87C', color: '#1A222C', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ask Expert</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
                No yachts found matching your search.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <AIConciergeModal isOpen={showConcierge} onClose={() => setShowConcierge(false)} yacht={selectedYacht} />
      <style jsx>{`
        .filters-row { grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 1200px) {
          .filters-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 968px) {
          .filters-row { grid-template-columns: repeat(2, 1fr) !important; }
          .yacht-grid { grid-template-columns: 1fr !important; justify-content: center; }
        }
        @media (max-width: 640px) {
          .filters-row { grid-template-columns: 1fr !important; }
          main { padding-top: 100px !important; }
          .yacht-grid { grid-template-columns: 1fr !important; }
        }
        input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%; background: #C4A87C; cursor: pointer; margin-top: -6px; }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: #D1D5DB; border-radius: 2px; }
      `}</style>
    </>
  );
}
