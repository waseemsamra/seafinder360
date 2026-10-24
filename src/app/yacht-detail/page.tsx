import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function YachtDetail() {
  const yacht = {
    name: "Majestic 120",
    type: "Motor Yacht",
    guests: 12,
    length: "120 ft",
    cabins: 5,
    speed: "25 kts",
    price: "AED 8,500",
    location: "Dubai Marina",
    description: "A masterpiece of luxury and performance, the Majestic 120 offers unparalleled comfort for up to 12 guests.",
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop",
    ],
    amenities: ["Fly Bridge", "Sun Deck", "Jacuzzi", "Music System", "Free Wifi", "Kitchen", "Towels", "Water Toys"],
  };

  return (
    <>
      <TopBar />
      <Header />
      <main style={{ paddingTop: '120px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 5%' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--navy)', marginBottom: '0.5rem' }}>{yacht.name}</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>{yacht.type} • {yacht.location}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
            <img src={yacht.images[0]} alt={yacht.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {yacht.images.slice(1).map((img, i) => (<img key={i} src={img} alt="" style={{ width: '100%', height: '126px', objectFit: 'cover', borderRadius: '8px' }} />))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--navy)', marginBottom: '1rem' }}>About</h2>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>{yacht.description}</p>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--navy)', marginBottom: '1rem' }}>Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
                {yacht.amenities.map((a, i) => (<div key={i} style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', color: '#666', border: '1px solid #e5e7eb' }}>✓ {a}</div>))}
              </div>
            </div>
            <div style={{ background: '#fff', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', height: 'fit-content', position: 'sticky', top: '140px' }}>
              <div style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>{yacht.price} <span style={{ fontSize: '1rem', color: '#666' }}>/ day</span></div>
              <Link href="/checkout" style={{ display: 'block', background: 'var(--gold)', color: '#fff', textAlign: 'center', padding: '14px', textDecoration: 'none', marginBottom: '1rem', textTransform: 'uppercase' }}>Book Now</Link>
              <a href="https://wa.me/9711234567" style={{ display: 'block', border: '1px solid #25D366', color: '#25D366', textAlign: 'center', padding: '14px', textDecoration: 'none' }}>Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
