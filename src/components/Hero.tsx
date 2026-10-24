export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/yacht-demo.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-subtitle">Expert Care. Reliable Results.</div>
        <h1>Manage, maintain &<br/>upgrade your yacht</h1>
        <p>Our technical knowledge and hands-on experience ensure your yacht is managed, maintained, and optimized to the highest standards.</p>
        <a href="/search" className="btn-primary">View our fleet</a>
      </div>
    </section>
  );
}
