"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TimeRangePicker from "./time-picker";

export default function CheckoutPage() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [hours, setHours] = useState(1);
  const [selectedDate, setSelectedDate] = useState("Sun, 25 Oct 2026");
  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60;
    const h = Math.max(1, Math.round(diff / 60 * 10) / 10);
    if (h >= 1) setHours(h);
  }, [startTime, endTime]);
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
            <div className="date-row" style={{ overflowX: "auto", display: "flex", flexWrap: "nowrap", gap: "10px", paddingBottom: "5px" }}>
              {[
                {label:"Fri 23", date:"Fri, 23 Oct 2026"},
                {label:"Sat 24", date:"Sat, 24 Oct 2026"},
                {label:"Sun 25", date:"Sun, 25 Oct 2026"},
                {label:"Mon 26", date:"Mon, 26 Oct 2026"},
                {label:"Tue 27", date:"Tue, 27 Oct 2026"},
                {label:"Wed 28", date:"Wed, 28 Oct 2026"},
                {label:"Thu 29", date:"Thu, 29 Oct 2026"},
                {label:"Fri 30", date:"Fri, 30 Oct 2026"},
                {label:"Sat 31", date:"Sat, 31 Oct 2026"},
                {label:"Sun 1 Nov", date:"Sun, 1 Nov 2026"},
              ].map((d, i) => (
                <div key={d.label} className={`date-btn${selectedDate === d.date ? " active" : ""}`} onClick={() => setSelectedDate(d.date)} style={{ cursor: "pointer", flexShrink: 0 }}>
                  <div className="day">{d.label.split(" ")[0]}</div>
                  <div className="num">{d.label.split(" ").slice(1).join(" ")}</div>
                  <div className="price">900</div>
                </div>
              ))}
              <div className="date-btn-more" onClick={(e) => { e.preventDefault(); setShowCalendar(true); }} style={{ cursor: "pointer", flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                More dates
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">Select your tickets</h2>
            <div className="ticket-card" style={{ alignItems: "flex-start" }}>
              <div className="ticket-info">
                <h4>Charter Hours</h4>
                <p>{hours % 1 === 0 ? hours : hours.toFixed(1)} hour{hours === 1 ? '' : 's'}</p>
                <div className="price">AED {(900 * hours).toFixed(2)}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <button className="counter-btn" onClick={() => setHours(hours + 1)}>+</button>
                <span className="counter-num">{hours % 1 === 0 ? hours : hours.toFixed(1)}</span>
                <button className="counter-btn" onClick={() => setHours(Math.max(1, hours - 1))} disabled={hours <= 1}>-</button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">Choose departure time</h2>
            <TimeRangePicker startValue={startTime} endValue={endTime} onStartChange={(t) => { setStartTime(t); const [sh,sm]=t.split(':').map(Number); setEndTime(`${String(Math.min(23, sh+hours)).padStart(2,'0')}:${String(sm).padStart(2,'0')}`); }} onEndChange={setEndTime} />
            <div style={{ marginTop: "10px", textAlign: "center", color: "#666", fontSize: "13px" }}>Departure: {startTime} | Duration: {hours % 1 === 0 ? hours : hours.toFixed(1)} hr{hours === 1 ? '' : 's'}</div>
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
                <div className="date-row-text"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> {selectedDate}</div>
                <div className="cancel-text"><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Free cancellation until 24h</div>
              </div>
            </div>
            <div className="price-breakdown">
              <div className="price-row"><span>{hours} × Charter Hour{hours !== 1 ? 's' : ''}</span><span>AED {(900 * hours).toFixed(2)}</span></div>
              <div className="price-row muted"><span>Service fee</span><span>AED {(25 * hours).toFixed(2)}</span></div>
              <div className="price-row muted"><span>VAT (5%)</span><span>AED {((900 * hours + 25 * hours) * 0.05).toFixed(2)}</span></div>
            </div>
            <div className="total-row"><span className="label">Total</span><span className="amount">AED {((900 * hours + 25 * hours) * 1.05).toFixed(2)}</span></div>
            <div className="points-banner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> You'll earn {Math.round((900 * hours + 25 * hours) * 1.05)} points on this booking</div>
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

      {showCalendar && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 }} onClick={() => setShowCalendar(false)}>
          <div style={{ background: "white", padding: "25px", borderRadius: "16px", maxWidth: "420px", width: "90%", position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowCalendar(false)} style={{ position: "absolute", right: "10px", top: "10px", background: "none", border: "none", fontSize: "28px", cursor: "pointer", lineHeight: 1 }}>×</button>
            <h3 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: 600 }}>Select Date & Time</h3>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#666", marginBottom: "8px" }}>Date</label>
              <input type="date" onChange={(e) => {
                if (e.target.value) {
                  const dt = new Date(e.target.value + 'T00:00:00');
                  setSelectedDate(dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(/,/g, ''));
                }
              }} style={{ width: "100%", padding: "10px", fontSize: "15px", borderRadius: "8px", border: "1px solid #ddd" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#666", marginBottom: "8px" }}>Departure Time</label>
              <TimeRangePicker startValue={startTime} onStartChange={(t) => { setStartTime(t); }} />
            </div>
            <button onClick={() => setShowCalendar(false)} style={{ width: "100%", padding: "12px", background: "#C4A87C", color: "#1A222C", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>Confirm</button>
          </div>
        </div>
      )}
    </>
  );
}
