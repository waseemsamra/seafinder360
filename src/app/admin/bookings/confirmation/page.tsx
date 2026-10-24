"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

export default function BookingConfirmationPage() {
  const bookingRef = "SF-2026-10482";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(bookingRef)}`;

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="bookings">
      <header className="header">
        <div className="header-title">
          <h1>Booking Confirmed</h1>
          <p>Final ticket generated successfully</p>
        </div>
        <div style={{display:'flex', gap:'12px'}}>
          <button className="btn-outline" onClick={() => window.print()}>Print Ticket</button>
          <Link href="/admin/bookings" className="btn-back">Back to Bookings</Link>
        </div>
      </header>

      <div className="ticket-container">
        <div className="ticket">
          <div className="ticket-header">
            <div>
              <div className="logo">SeaFinder360</div>
              <div className="subtitle">Luxury Yacht Charter</div>
            </div>
            <div className="ref-box">
              <div className="ref-label">Booking Reference</div>
              <div className="ref-code">{bookingRef}</div>
            </div>
          </div>

          <div className="ticket-body">
            <div className="section">
              <div className="section-title">Guest Details</div>
              <div className="grid">
                <div><span className="label">Guest Name</span><div className="value">Sarah Jenkins</div></div>
                <div><span className="label">Phone</span><div className="value">+971 50 123 4567</div></div>
                <div><span className="label">Email</span><div className="value">sarah@example.com</div></div>
                <div><span className="label">Guests</span><div className="value">2 Adults</div></div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">Charter Details</div>
              <div className="grid">
                <div><span className="label">Yacht</span><div className="value">Majestic 120 (Motor Yacht)</div></div>
                <div><span className="label">Date</span><div className="value">Oct 25, 2026</div></div>
                <div><span className="label">Start Time</span><div className="value">10:00 AM</div></div>
                <div><span className="label">Duration</span><div className="value">4 Hours</div></div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">Amenities & Extras</div>
              <div className="amenities">Private Chef (Catering), Airport Transfer</div>
            </div>

            <div className="payment-section">
              <div className="payment-row"><span>Base Rate (4h)</span><span>AED 8,500</span></div>
              <div className="payment-row"><span>Extras</span><span>AED 1,750</span></div>
              <div className="payment-row"><span>Service Fee</span><span>AED 250</span></div>
              <div className="payment-row"><span>VAT (5%)</span><span>AED 512</span></div>
              <div className="payment-total"><span>Total Paid</span><span>AED 10,762</span></div>
            </div>
          </div>

          <div className="ticket-footer">
            <div className="qr-section">
              <img src={qrUrl} alt="QR Code" className="qr" />
              <div className="qr-text">
                <div className="qr-title">Scan for Verification</div>
                <div className="qr-sub">Present this ticket at boarding</div>
              </div>
            </div>
            <div className="footer-note">Thank you for choosing SeaFinder360 • www.seafinder360.com</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; }
        .header-title h1 { font-family:'Playfair Display',serif; font-size:32px; color:#1A222C; margin-bottom:8px; }
        .header-title p { font-size:14px; color:#6B7280; }
        .btn-back { background:white; border:1px solid #E5E7EB; padding:10px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; color:#1F2937; text-decoration:none; }
        .btn-outline { background:white; border:1px solid #E5E7EB; padding:10px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; }
        .ticket-container { display:flex; justify-content:center; }
        .ticket { width:800px; background:white; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.08); overflow:hidden; border:1px solid #E5E7EB; }
        .ticket-header { background:#1A222C; color:white; padding:32px 40px; display:flex; justify-content:space-between; align-items:center; }
        .logo { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
        .subtitle { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#C4A87C; margin-top:4px; }
        .ref-box { text-align:right; }
        .ref-label { font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#9CA3AF; }
        .ref-code { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#C4A87C; margin-top:4px; letter-spacing:2px; }
        .ticket-body { padding:40px; }
        .section { margin-bottom:32px; padding-bottom:32px; border-bottom:1px solid #F3F4F6; }
        .section-title { font-size:16px; font-weight:700; color:#1A222C; margin-bottom:16px; text-transform:uppercase; letter-spacing:1px; }
        .grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .label { font-size:11px; text-transform:uppercase; color:#6B7280; letter-spacing:0.5px; }
        .value { font-size:15px; font-weight:600; color:#1A222C; margin-top:6px; }
        .amenities { font-size:14px; color:#1A222C; }
        .payment-section { background:#F9F6F0; padding:24px; border-radius:8px; }
        .payment-row { display:flex; justify-content:space-between; padding:8px 0; font-size:14px; color:#4B5563; }
        .payment-total { display:flex; justify-content:space-between; padding-top:16px; margin-top:12px; border-top:1px solid #E5E7EB; font-size:18px; font-weight:700; color:#1A222C; }
        .payment-total span:last-child { font-family:'Playfair Display',serif; font-size:28px; color:#C4A87C; }
        .ticket-footer { background:#F8F9FA; padding:32px 40px; border-top:1px solid #E5E7EB; }
        .qr-section { display:flex; align-items:center; gap:20px; margin-bottom:16px; }
        .qr { width:100px; height:100px; border:2px solid #E5E7EB; border-radius:8px; }
        .qr-title { font-size:14px; font-weight:700; color:#1A222C; }
        .qr-sub { font-size:13px; color:#6B7280; margin-top:4px; }
        .footer-note { text-align:center; font-size:12px; color:#9CA3AF; }
        @media print {
          body { background:white; }
          .header, aside { display:none !important; }
          .main-content { padding:0; }
          .ticket { box-shadow:none; border:none; }
        }
      `}</style>
    </AdminLayout>
  );
}
