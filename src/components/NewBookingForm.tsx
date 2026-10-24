"use client";

import Link from "next/link";

export interface NewBookingFormProps {
  backHref?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  user?: { username?: string; email?: string };
}

export default function NewBookingForm({
  backHref = "/admin/bookings",
  showHeader = true,
  headerTitle = "Create Booking",
  headerSubtitle = "Manually add a new charter reservation",
}: NewBookingFormProps) {
  return (
    <>
      {showHeader && (
        <header className="header">
          <div className="header-title">
            <h1>{headerTitle}</h1>
            <p>{headerSubtitle}</p>
          </div>
          <Link href={backHref} className="btn-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back
          </Link>
        </header>
      )}

      <div className="booking-layout">
        <div>
          <div className="section-card">
            <h2 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A87C" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Guest Information
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" placeholder="e.g. Sarah Jenkins" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="sarah@example.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" className="form-control" placeholder="+971 50 123 4567" />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input type="number" className="form-control" defaultValue="1" min="1" max="25" />
              </div>
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A87C" strokeWidth="2"><path d="M2 12h20"></path><path d="M12 2v20"></path><path d="M4.93 4.93l14.14 14.14"></path><path d="M19.07 4.93L4.93 19.07"></path></svg>
              Yacht & Schedule
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label>Select Yacht</label>
                <select className="form-control">
                  <option>Majestic 120 (Motor Yacht)</option>
                  <option>Ocean Pearl (Sailing Yacht)</option>
                  <option>Sea Breeze (Catamaran)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" defaultValue="2026-10-25" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Time</label>
                <input type="time" className="form-control" defaultValue="10:00" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select className="form-control">
                  <option>3 Hours</option>
                  <option>4 Hours</option>
                  <option>6 Hours</option>
                  <option>Full Day (8 Hours)</option>
                </select>
              </div>
            </div>
            <div className="specs-grid">
              <div className="spec-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20"></path><path d="M12 2v20"></path></svg><div className="spec-value">120 ft</div><div className="spec-label">Length</div></div>
              <div className="spec-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg><div className="spec-value">12</div><div className="spec-label">Max Guests</div></div>
              <div className="spec-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><div className="spec-value">5</div><div className="spec-label">Cabins</div></div>
              <div className="spec-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><div className="spec-value">25 kts</div><div className="spec-label">Top Speed</div></div>
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A87C" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Select Amenities & Extras
            </h2>
            <div className="amenities-grid">
              <label className="amenity-item"><input type="checkbox" defaultChecked /><span className="amenity-label">Private Chef (Catering)</span></label>
              <label className="amenity-item"><input type="checkbox" /><span className="amenity-label">Photographer</span></label>
              <label className="amenity-item"><input type="checkbox" /><span className="amenity-label">Water Toys (Jet Ski)</span></label>
              <label className="amenity-item"><input type="checkbox" /><span className="amenity-label">Birthday Decoration</span></label>
              <label className="amenity-item"><input type="checkbox" /><span className="amenity-label">Airport Transfer</span></label>
              <label className="amenity-item"><input type="checkbox" /><span className="amenity-label">Premium Beverage Package</span></label>
            </div>
          </div>
        </div>

        <div>
          <div className="summary-card">
            <h2 className="summary-title">Booking Summary</h2>
            <div className="summary-row"><span>Yacht Base Rate (4h)</span><span>AED 8,500</span></div>
            <div className="summary-row"><span>Private Chef</span><span>AED 1,500</span></div>
            <div className="summary-row"><span>Service Fee</span><span>AED 250</span></div>
            <div className="summary-row"><span>VAT (5%)</span><span>AED 512</span></div>
            <div className="summary-total"><span>Total</span><span>AED 10,762</span></div>
            <button className="btn-submit">Confirm Booking</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
        .header-title h1 { font-family:'Playfair Display',serif; font-size:32px; color:#1A222C; margin-bottom:8px; }
        .header-title p { font-size:14px; color:#6B7280; }
        .btn-back { background:white; border:1px solid #E5E7EB; padding:10px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:8px; color:#1F2937; text-decoration:none; }
        .booking-layout { display:grid; grid-template-columns:2fr 1fr; gap:32px; align-items:start; }
        .section-card { background:white; border:1px solid #E5E7EB; border-radius:12px; padding:24px; margin-bottom:24px; }
        .section-title { font-size:16px; font-weight:700; color:#1A222C; margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid #E5E7EB; display:flex; align-items:center; gap:8px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
        .form-group { display:flex; flex-direction:column; gap:8px; }
        .form-group label { font-size:12px; font-weight:600; color:#1A222C; text-transform:uppercase; letter-spacing:0.5px; }
        .form-control { padding:12px 16px; border:1px solid #E5E7EB; border-radius:6px; font-size:14px; }
        .specs-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:16px; }
        .spec-box { background:#F8F9FA; border-radius:8px; padding:16px; text-align:center; }
        .spec-box svg { width:20px; height:20px; stroke:#C4A87C; margin-bottom:8px; }
        .spec-value { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#1A222C; }
        .spec-label { font-size:11px; text-transform:uppercase; color:#6B7280; font-weight:600; margin-top:4px; }
        .amenities-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px; }
        .amenity-item { display:flex; align-items:center; gap:12px; padding:12px; border:1px solid #E5E7EB; border-radius:8px; cursor:pointer; }
        .amenity-item:hover { border-color:#C4A87C; background:#F9F6F0; }
        .summary-card { background:#1A222C; border-radius:12px; padding:32px; color:white; position:sticky; top:40px; }
        .summary-title { font-family:'Playfair Display',serif; font-size:22px; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:16px; }
        .summary-row { display:flex; justify-content:space-between; margin-bottom:16px; font-size:14px; color:#D1D5DB; }
        .summary-row span:last-child { font-weight:600; color:white; }
        .summary-total { display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1); }
        .summary-total span:first-child { color:#D1D5DB; }
        .summary-total span:last-child { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:#C4A87C; }
        .btn-submit { width:100%; margin-top:32px; padding:16px; background:#C4A87C; color:#1A222C; border:none; border-radius:6px; font-size:16px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:1px; }
      `}</style>
    </>
  );
}
