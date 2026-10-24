const tests = [
  { initials: "JD", name: "James Davidson", loc: "London, UK", text: "SeaFinder360 made our Dubai charter experience unforgettable. The 360° tour helped us choose the perfect yacht before we even arrived." },
  { initials: "SA", name: "Sarah Al Mansouri", loc: "Dubai, UAE", text: "As a yacht owner, their marina management service is world-class. Professional team, transparent pricing, and outstanding attention to detail." },
  { initials: "MC", name: "Michael Chen", loc: "Singapore", text: "From the first consultation to the final handshake, the team was exceptional. They found our dream yacht within our budget. Highly recommended." },
];

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="section-header">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Trusted by yacht owners and charterers worldwide.</p>
      </div>
      <div className="test-grid">
        {tests.map((t) => (
          <div key={t.name} className="test-card">
            <div className="test-quote">"</div>
            <p className="test-text">{t.text}</p>
            <div className="test-author">
              <div className="test-avatar">{t.initials}</div>
              <div>
                <div className="test-name">{t.name}</div>
                <div className="test-loc">{t.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
