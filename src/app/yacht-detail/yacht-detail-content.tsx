'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const amenityList = [
  { icon: "ac", label: "Air conditioning" },
  { icon: "deck", label: "Sun deck" },
  { icon: "wifi", label: "Free Wi-Fi" },
  { icon: "music", label: "Bluetooth audio" },
  { icon: "grill", label: "Outdoor grill" },
  { icon: "toys", label: "Water toys" },
  { icon: "jacuzzi", label: "Jacuzzi" },
  { icon: "kitchen", label: "Kitchen" },
  { icon: "tv", label: "TV" },
  { icon: "bar", label: "Bar" },
];

const Icon = ({ type }: { type: string }) => {
  if (type === "ac") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20m-8-8h16"></path></svg>;
  if (type === "deck") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg>;
  if (type === "wifi") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>;
  if (type === "music") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
  if (type === "grill") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>;
  if (type === "toys") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path></svg>;
  if (type === "jacuzzi") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg>;
  if (type === "kitchen") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;
  if (type === "tv") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>;
  if (type === "bar") return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20m-8-8h16"></path></svg>;
};

export default function YachtDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [yacht, setYacht] = useState<any>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchYacht = async () => {
      const supabase = createClient();
      let query = supabase.from("yachts").select("*").limit(1);
      if (id) query = supabase.from("yachts").select("*").eq("id", id);
      const { data } = await query;
      if (data && data[0]) {
        setYacht(data[0]);
      } else {
        setYacht({
          name: "Majestic 120",
          type: "Motor Yacht",
          guests: 12,
          length: 120,
          cabins: 5,
          year_built: 2024,
          price: 8500,
          location: "Dubai Marina",
          description: "Set sail in absolute style aboard this 120-foot luxury superyacht. Contemporary design meets refined Arabian hospitality, with an air-conditioned main salon, an expansive sun deck and a professional crew of 5 led by your captain. Every charter departs from Dubai Marina and can be tailored to your itinerary — from swimming stops at Jumeirah Beach to private island escapes.",
          img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop",
          ],
        });
      }
    };
    fetchYacht();
  }, [id]);

  if (!yacht) return null;

  const images = yacht.images && Array.isArray(yacht.images) && yacht.images.length > 0 ? yacht.images : [yacht.img].filter(Boolean);
  const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop"];

  return (
    <>
      <TopBar />
      <Header />
      <main style={{ paddingTop: "0px", background: "#fff" }}>
        <nav style={{ padding: "15px 5%", background: "white", borderBottom: "1px solid #E5E7EB", fontSize: "12px", color: "#6B7280", display: "flex", gap: "10px", maxWidth: "1200px", margin: "0 auto" }}>
          <Link href="/" style={{ color: "#6B7280" }}>Home</Link> <span>/</span>
          <Link href="/search" style={{ color: "#6B7280" }}>Hourly Charters</Link> <span>/</span>
          <span style={{ color: "#1A222C", fontWeight: 600 }}>{yacht.name}</span>
        </nav>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", height: "450px" }}>
              <img src={displayImages[activeImg]} alt={yacht.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: "25px", left: "-30px", background: "#C4A87C", color: "#1A222C", padding: "6px 40px", fontWeight: 700, fontSize: "13px", letterSpacing: "1px", transform: "rotate(-45deg)", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                {yacht.length || yacht.length_ft ? `${yacht.length || yacht.length_ft} FT` : ""}
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "5px" }}>
              {displayImages.map((img: string, idx: number) => (
                <div key={idx} onClick={() => setActiveImg(idx)} style={{ width: "110px", height: "75px", borderRadius: "8px", overflow: "hidden", cursor: "pointer", border: activeImg === idx ? "2px solid #C4A87C" : "2px solid transparent", flexShrink: 0 }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", color: "#1A222C", marginBottom: "12px" }}>{yacht.name}</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", fontSize: "13px", color: "#6B7280" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A222C"><path d="M12 2L2 22h20L12 2z"/></svg> {yacht.length || yacht.length_ft} Feet
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A222C"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/></svg> Up to {yacht.guests} Guests
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A222C"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> {yacht.location || yacht.marina || "Dubai"}
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
              <div style={{ background: "#F9F9FA", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px 15px", textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#1A222C" }}>{yacht.length || yacht.length_ft} FT</div>
                <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6B7280", fontWeight: 600 }}>Length</div>
              </div>
              <div style={{ background: "#F9F9FA", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px 15px", textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#1A222C" }}>{yacht.guests}</div>
                <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6B7280", fontWeight: 600 }}>Max Guests</div>
              </div>
              <div style={{ background: "#F9F9FA", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px 15px", textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#1A222C" }}>{yacht.cabins || 4}</div>
                <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6B7280", fontWeight: 600 }}>Cabins</div>
              </div>
              <div style={{ background: "#F9F9FA", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px 15px", textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#1A222C" }}>{yacht.year_built || 2024}</div>
                <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6B7280", fontWeight: 600 }}>Year Built</div>
              </div>
            </div>

            <div style={{ background: "#F9F9FA", borderRadius: "12px", padding: "30px", border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: "20px", fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: "20px", color: "#1A222C" }}>About this yacht</h3>
              <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7 }}>{yacht.description}</p>
            </div>

            <div style={{ background: "#F9F9FA", borderRadius: "12px", padding: "30px", border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: "20px", fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: "20px", color: "#1A222C" }}>Onboard amenities</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                {amenityList.slice(0, 10).map((a, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#1A222C", fontWeight: 500 }}>
                    <span style={{ color: "#C4A87C" }}><Icon type={a.icon} /></span> {a.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "20px", fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: "20px", color: "#1A222C" }}>Why Book With SeaFinder360</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {[
                  { title: "Verified & Insured", desc: "All yachts are fully licensed and insured for your safety." },
                  { title: "Professional Crew", desc: "Experienced captain and hospitality team included." },
                  { title: "Instant Confirmation", desc: "Book by the hour with real-time availability." },
                  { title: "24/7 Support", desc: "Our concierge team is always available via WhatsApp." },
                ].map((t, idx) => (
                  <div key={idx} style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ width: "40px", height: "40px", background: "#F9F9FA", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A222C" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1A222C", marginBottom: "2px" }}>{t.title}</h4>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: "#1A222C", color: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#ccc", textTransform: "uppercase" }}>Starting from</div>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#C4A87C", lineHeight: 1.1, marginTop: "5px" }}>AED {yacht.price?.toLocaleString()} <span style={{ fontSize: "14px", fontWeight: 400, color: "#ccc" }}>/ hour</span></div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#ccc", marginBottom: "8px", display: "block" }}>Select Date</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "12px 15px", background: "rgba(255,255,255,0.05)" }}>
                  <input type="date" defaultValue="2026-10-25" style={{ border: "none", outline: "none", width: "100%", fontFamily: "inherit", fontSize: "14px", fontWeight: 500, color: "white", background: "transparent" }} />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#ccc", marginBottom: "8px", display: "block" }}>Guests</label>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "12px 15px", background: "rgba(255,255,255,0.05)" }}>
                  <select style={{ border: "none", outline: "none", width: "100%", fontSize: "14px", fontWeight: 500, color: "white", background: "transparent" }}>
                    <option style={{ color: "#1A222C" }}>1 - 6 Guests</option>
                    <option style={{ color: "#1A222C" }}>7 - {yacht.guests} Guests (Max)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#ccc", marginBottom: "8px", display: "block" }}>Duration (Hours)</label>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "12px 15px", background: "rgba(255,255,255,0.05)" }}>
                  <select style={{ border: "none", outline: "none", width: "100%", fontSize: "14px", fontWeight: 500, color: "white", background: "transparent" }}>
                    <option style={{ color: "#1A222C" }}>3 Hours (Min)</option>
                    <option style={{ color: "#1A222C" }}>4 Hours</option>
                    <option style={{ color: "#1A222C" }}>6 Hours</option>
                    <option style={{ color: "#1A222C" }}>8 Hours</option>
                  </select>
                </div>
              </div>

              <button onClick={() => (window.location.href = "/checkout")} style={{ width: "100%", padding: "16px", background: "#C4A87C", color: "#1A222C", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 700, textTransform: "uppercase", cursor: "pointer", marginTop: "10px" }}>Book Now</button>

              <div style={{ marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#888", display: "flex", justifyContent: "center", gap: "15px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>Secure Booking</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>Free Cancellation</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
      <style jsx>{`
        @media (max-width: 992px) {
          main > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
