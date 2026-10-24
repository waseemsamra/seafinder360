import Link from "next/link";
import Header from "@/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
          SeaFinder360
        </div>
        <div className="stepper">
          <div className="step active"><div className="step-circle">1</div> Booking</div>
          <div className="step-line" />
          <div className="step"><div className="step-circle">2</div> Upgrades</div>
          <div className="step-line" />
          <div className="step"><div className="step-circle">3</div> Details</div>
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
          <div className="yacht-header-card">
            <div className="yacht-info">
              <h2>Italian Yacht 66FT</h2>
              <p>Show more info <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg></p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200&auto=format&fit=crop" className="yacht-thumb" alt="Yacht" />
          </div>
          <div>
            <h2 className="section-title">When will you visit?</h2>
            <div className="date-header"><span>23/10/2026</span><span>29/10/2026</span></div>
            <div className="date-row">
              {["Fri 23", "Sat 24", "Sun 25", "Mon 26", "Tue 27", "Wed 28", "Thu 29"].map((d, i) => (
                <div key={d} className={`date-btn${i === 2 ? " active" : ""}`}>
                  <div className="day">{d.split(" ")[0]}</div>
                  <div className="num">{d.split(" ")[1]}</div>
                  <div className="price">900</div>
                </div>
              ))}
              <div className="date-btn-more">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                More dates
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">Select your tickets</h2>
            <div className="ticket-card">
              <div className="ticket-info">
                <h4>Guest</h4>
                <p>Age 8+</p>
                <div className="price">AED 900.00</div>
              </div>
              <div className="counter-pill">
                <button className="counter-btn">−</button>
                <div className="counter-val">1</div>
                <button className="counter-btn">+</button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">Choose a departure time</h2>
            <div className="time-grid">
              {["06:00 – 08:00", "07:00 – 09:00", "08:00 – 10:00", "09:00 – 11:00", "10:00 – 12:00", "11:00 – 13:00", "12:00 – 14:00", "13:00 – 15:00", "14:00 – 16:00", "15:00 – 17:00", "16:00 – 18:00", "17:00 – 19:00", "18:00 – 20:00", "19:00 – 21:00", "20:00 – 22:00"].map((t, i) => (
                <button key={t} className={`time-btn${i === 0 ? " active" : ""}`}>{t}</button>
              ))}
            </div>
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
            <div className="points-banner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> You'll earn 971 points on this booking</div>
            <Link href="/enhance" className="btn-continue">Continue <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg></Link>
            <div className="trust-badges">
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> Secure booking</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> Trustpilot 4.9</span>
            </div>
          </div>
        </div>
      </div>
      <div className="float-wa">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </div>
    </>
  );
}
