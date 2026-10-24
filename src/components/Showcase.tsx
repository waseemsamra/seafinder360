export default function Showcase() {
  return (
    <section className="showcase">
      <div className="showcase-text">
        <span className="section-label" style={{ color: "var(--gold)" }}>Virtual Experience</span>
        <h2 className="section-title" style={{ color: "var(--white)" }}>Explore in 360°</h2>
        <p>Step aboard before you step foot. Our immersive 360-degree virtual tours let you explore every deck, cabin, and detail of your future yacht from anywhere in the world.</p>
        <ul className="showcase-features">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Full interior & exterior walkthrough</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Interactive hotspots with details</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Works on mobile, tablet & desktop</li>
        </ul>
        <a href="#" className="btn-primary" style={{ animation: "none" }}>Start Virtual Tour</a>
      </div>
      <div className="showcase-image">
        <button className="play-btn" aria-label="Play 360 Tour">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
      </div>
    </section>
  );
}
