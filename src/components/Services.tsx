const services = [
  { title: "Yacht Charter", desc: "Experience luxury on the water. Browse our exclusive fleet for daily rentals and private events." },
  { title: "Sales & Brokerage", desc: "Buy or sell with confidence. We connect serious buyers with the world's finest yachts." },
  { title: "Custom Builds", desc: "Design and build your dream yacht from the keel up with our expert marine engineers." },
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-header">
        <span className="section-label">Our Expertise</span>
        <h2 className="section-title">The SeaFinder360 Platform</h2>
        <p className="section-subtitle">Everything you need for your yacht, all in one place.</p>
      </div>
      <div className="services-scroll">
        {services.map((s) => (
          <div key={s.title} className="yacht-card service-card" style={{ padding: "40px 30px", textAlign: "center" }}>
            <h3 className="yacht-name" style={{ marginBottom: 15 }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
