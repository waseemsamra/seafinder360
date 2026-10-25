const services = [
  { title: "Yacht Charter", desc: "Experience luxury on the water. Browse our exclusive fleet for daily rentals and private events." },
  { title: "Sales & Brokerage", desc: "Buy or sell with confidence. We connect serious buyers with the world's finest yachts." },
  { title: "Custom Builds", desc: "Design and build your dream yacht from the keel up with our expert marine engineers." },
  { title: "Marina Services", desc: "Full management, berthing, maintenance, and 24/7 concierge services for total peace of mind." },
];

export default function Services() {
  return (
    <section className="services" id="services" style={{ padding: "80px 5%", background: "var(--off-white)", textAlign: "center" }}>
      <h2 className="section-title">The SeaFinder360 Platform</h2>
      <p className="section-subtitle">Everything you need for your yacht, all in one place.</p>
      
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
