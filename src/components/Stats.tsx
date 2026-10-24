export default function Stats() {
  const stats = [{ n: "500+", l: "Yachts Listed" }, { n: "10K+", l: "Happy Clients" }, { n: "15+", l: "Years Experience" }, { n: "24/7", l: "Concierge Support" }];
  return (
    <section className="stats">
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.l} className="stat-item">
            <div className="stat-number">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
