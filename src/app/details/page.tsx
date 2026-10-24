import Link from "next/link";

export default function DetailsPage() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
          SeaFinder360
        </div>
        <div className="stepper">
          <div className="step completed"><div className="step-circle">1</div> Booking</div>
          <div className="step-line" />
          <div className="step completed"><div className="step-circle">2</div> Upgrades</div>
          <div className="step-line" />
          <div className="step active"><div className="step-circle">3</div> Details</div>
          <div className="step-line" />
          <div className="step"><div className="step-circle">4</div> Payment</div>
        </div>
        <div className="header-actions">
          <div className="lang-select">AED ⌄</div>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> Help</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> Sign in</span>
        </div>
      </header>
      <div className="container">
        <div className="left-col">
          <h1 className="form-title">Tell us about the lead guest</h1>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First name <span className="req">*</span></label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Last name <span className="req">*</span></label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Email address <span className="req">*</span></label>
              <input type="email" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone number <span className="req">*</span></label>
              <div className="phone-group">
                <div className="phone-prefix">+971</div>
                <input type="tel" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nationality <span className="req">*</span></label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred pickup time <span className="req">*</span></label>
              <div className="select-wrapper">
                <select className="form-select"><option>06:00 – 08:00</option><option>07:00 – 09:00</option><option>08:00 – 10:00</option><option>09:00 – 11:00</option></select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Hotel or pickup location <span className="req">*</span></label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Room number (optional)</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group half-width">
              <label className="form-label">Pickup area</label>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Dietary requirements</label>
            <div className="pill-group">
              <button type="button" className="pill-btn active">None</button>
              <button type="button" className="pill-btn">Vegetarian</button>
              <button type="button" className="pill-btn">Vegan</button>
              <button type="button" className="pill-btn">Halal</button>
              <button type="button" className="pill-btn">Allergies</button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Is this a special occasion?</label>
            <div className="pill-group">
              <button type="button" className="pill-btn active">Just a trip</button>
              <button type="button" className="pill-btn">Birthday</button>
              <button type="button" className="pill-btn">Anniversary</button>
              <button type="button" className="pill-btn">Honeymoon</button>
              <button type="button" className="pill-btn">Proposal</button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Anything else we should know?</label>
            <textarea className="form-textarea" placeholder="Celebrations, accessibility needs, or notes for the crew." />
          </div>
        </div>
        <div className="right-col">
          <div className="summary-card">
            <h2 className="summary-title">Your tickets overview</h2>
            <div className="summary-yacht">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200&auto=format&fit=crop" alt="Yacht" />
              <div>
                <h4>Italian Yacht 66FT</h4>
                <div className="date-row-text"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> Sun, 25 Oct 2026</div>
                <div className="cancel-text"><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Free cancellation until 24h</div>
              </div>
            </div>
            <div className="price-breakdown">
              <div className="price-row"><span>1 × Charter</span><span>AED 900.00</span></div>
              <div className="price-row muted"><span>Service fee</span><span>AED 25.00</span></div>
              <div className="price-row muted"><span>VAT (5%)</span><span>AED 46.25</span></div>
            </div>
            <div className="total-row"><span className="label">Total</span><span className="amount">AED 971.25</span></div>
            <Link href="/payment" className="btn-action btn-primary">Continue <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg></Link>
            <Link href="/enhance" className="btn-action btn-secondary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg> Back</Link>
          </div>
        </div>
      </div>
    </>
  );
}