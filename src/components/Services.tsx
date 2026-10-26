'use client';

const services = [
  { title: "Yacht Charter", desc: "Experience luxury on the water. Browse our exclusive fleet for daily rentals and private events." },
  { title: "Sales & Brokerage", desc: "Buy or sell with confidence. We connect serious buyers with the world's finest yachts." },
  { title: "Custom Builds", desc: "Design and build your dream yacht from the keel up with our expert marine engineers." },
  { title: "Marina Services", desc: "Full management, berthing, maintenance, and 24/7 concierge services for total peace of mind." },
];

export default function Services() {
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "60px 5%", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#1A222C", marginBottom: "10px", letterSpacing: "-0.5px" }}>
          The SeaFinder360 Platform
        </h2>
        <p style={{ fontSize: "15px", color: "#6B7280", marginBottom: "40px", fontWeight: 400 }}>
          Everything you need for your yacht, all in one place.
        </p>
        <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "10px", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }} className="services-scroll">
          <style jsx>{`.services-scroll::-webkit-scrollbar { display: none; }`}</style>
          {services.map((s) => (
            <div key={s.title} style={{ minWidth: "280px", maxWidth: "280px", scrollSnapAlign: "start", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "40px 30px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#1A222C", marginBottom: "12px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, maxWidth: "220px" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
