import { Suspense } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() { return [{ id: "1" }]; }

export default function YachtDetailPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <DetailContent params={props.params} />
    </Suspense>
  );
}

async function DetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <TopBar />
      <Header />
      <nav className="top-nav" style={{ marginTop: 100 }}>
        <a href="#">Home</a><span className="separator">/</span>
        <a href="#">Yacht Charters</a><span className="separator">/</span>
        <a href="#">Dubai Marina (GMCO)</a><span className="separator">/</span>
        <span className="current">Italian Yacht 66FT</span>
      </nav>
      <main className="page-container">
        <div className="left-col">
          <div className="hero-image-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop" alt="Italian Yacht 66FT" />
            <div className="badge-ft-custom">66 FT</div>
          </div>
          <div className="thumbnail-strip">
            <div className="thumb active"><img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200&auto=format&fit=crop" alt="Exterior" /></div>
            <div className="thumb"><img src="https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=200&auto=format&fit=crop" alt="Interior" /></div>
            <div className="thumb"><img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=200&auto=format&fit=crop" alt="Salon" /></div>
            <div className="thumb"><img src="https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=200&auto=format&fit=crop" alt="Deck" /></div>
          </div>
          <div className="yacht-header">
            <h1>Italian Yacht 66FT</h1>
            <div className="meta-tags">
              <span className="meta-tag"><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z" /></svg> 66 Feet</span>
              <span className="meta-tag"><svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg> Up to 25 Guests</span>
              <span className="meta-tag"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> Captain &amp; 2 Crew</span>
              <span className="meta-tag"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg> Dubai Marina (GMCO)</span>
              <span className="meta-tag"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> 0 (0)</span>
            </div>
          </div>
          <div className="specs-grid">
            <div className="spec-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20" /><path d="M12 2v20" /></svg><div className="val">66 FT</div><div className="lbl">Length</div></div>
            <div className="spec-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><div className="val">25</div><div className="lbl">Max Guests</div></div>
            <div className="spec-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg><div className="val">1</div><div className="lbl">Cabins</div></div>
            <div className="spec-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg><div className="val">2022</div><div className="lbl">Year Built</div></div>
          </div>
          <div className="content-section">
            <h3>About this yacht</h3>
            <p>Set sail in absolute style aboard this 66-foot luxury yacht. Contemporary design meets refined Arabian hospitality, with an air-conditioned main salon, an expansive sun deck and a professional crew of 3 led by your captain. Every charter departs from Dubai Marina (GMCO) and can be tailored to your itinerary.</p>
            <p>Charters are fully customisable, from family swim stops to private corporate escapes and sunset dinner cruises.</p>
          </div>
          <div className="content-section">
            <h3>Onboard amenities</h3>
            <div className="amenities-list">
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20m-8-8h16" /></svg> Air conditioning</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z" /></svg> Sun deck</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg> Wi-Fi</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg> Bluetooth audio</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z" /></svg> Onboard kitchen</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> Outdoor grill</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /></svg> Water toys</div>
              <div className="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg> Hot tub</div>
            </div>
          </div>
          <div className="content-section">
            <h3>Important information</h3>
            <div className="info-list">
              <div className="info-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg> No outside food or beverages — catering packages available on request.</div>
              <div className="info-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg> Guests under 12 must be accompanied by an adult at all times.</div>
              <div className="info-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg> Valid Emirates ID or passport required at check-in.</div>
              <div className="info-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg> Boarding begins 15 minutes before the scheduled departure time.</div>
              <div className="info-item highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg> Pickup: Berth B-14, Grand Marina Club &amp; Yacht Club.</div>
            </div>
          </div>
        </div>
        <div className="right-col">
          <div className="booking-widget">
            <div className="price-header">
              <div>
                <div className="price-label">Live price per hour</div>
                <div className="price-value">AED 900 <span>/ hr</span></div>
              </div>
              <div className="price-tag">0-60</div>
            </div>
            <div className="form-group">
              <label className="form-label">Select Date</label>
              <div className="input-wrapper">
                <input type="text" defaultValue="10/25/2026" readOnly />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
            </div>
            <div className="form-group">
              <div className="slider-labels"><span>Charter Time</span><span>10PM</span></div>
              <div className="slider-labels" style={{ fontSize: 10, marginBottom: 5 }}><span>6AM</span></div>
              <div className="time-slider-track">
                <div className="time-slider-active" />
                <div className="time-slider-thumb" style={{ left: "30%" }}><div className="time-tooltip">1PM – 5PM</div></div>
                <div className="time-slider-thumb" style={{ left: "65%" }} />
              </div>
            </div>
            <div className="form-group">
              <div className="slider-labels"><span>Guests (Up to)</span></div>
              <div style={{ position: "relative", marginTop: 15 }}>
                <div className="time-tooltip" style={{ left: "60%", top: "-10px", transform: "translate(-50%, -100%)" }}>13 guests</div>
                <input type="range" min={1} max={25} defaultValue={13} style={{ margin: 0 }} />
              </div>
              <div className="slider-labels" style={{ marginTop: 5 }}><span>1</span><span>25</span></div>
            </div>
            <div className="availability-box">
              <div className="avail-icon">i</div>
              <div className="avail-text"><p>Available · 4h</p><span>Total AED 3,750</span></div>
            </div>
            <button className="btn-widget btn-primary-widget"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> SHOW PRICE</button>
            <Link href="/checkout" className="btn-widget btn-outline-widget"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> BOOK NOW</Link>
            <button className="btn-widget btn-whatsapp"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> Book via WhatsApp</button>
            <div className="cancellation-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <p><strong>Cancellation policy</strong><br />Cancel for free up to 48 hours before your charter and get a full refund.</p>
            </div>
            <div className="widget-footer">
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> Secure payment</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> 4.9 Trustpilot</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> 24/7 Support</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
