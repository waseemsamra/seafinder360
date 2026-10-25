export default function Showcase() {
  return (
    <section className="showcase">
      <div className="showcase-text">
        <h2>Unmatched Luxury</h2>
        <p>Every SeaFinder360 yacht is hand-picked for its exceptional service, pristine condition, and world-class amenities. From the moment you step aboard, our dedicated crew ensures your experience is nothing short of extraordinary.</p>
        <button className="btn-hero" style={{ padding: "14px 30px", fontSize: "13px" }} onClick={() => window.location.href='/search'}>Discover the Fleet</button>
      </div>
      <div className="showcase-image">
        <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop" alt="Luxury Yacht" />
      </div>
    </section>
  );
}
