import Link from "next/link";

export default function ConfirmationPage() {
  const ref = "SF-360-8921";
  return (
    <div className="container" style={{ maxWidth: 900, flexDirection: "column", gap: 30, display: "flex" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 36, color: "var(--navy)" }}>Booking Confirmed!</h1>
        <p style={{ color: "var(--text-muted)" }}>Thank you for choosing SeaFinder360. Your luxury charter is locked in.</p>
      </div>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ background: "var(--navy)", color: "white", padding: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: 2, marginBottom: 8 }}>BOOKING REFERENCE</div>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 15 }}>{ref}</div>
            <p style={{ fontSize: 13, color: "#ccc", maxWidth: 300 }}>Please present this reference or the QR code to the marina crew upon arrival.</p>
          </div>
          <div style={{ background: "white", padding: 15, borderRadius: 12, textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ref}`} alt="QR" width={120} height={120} />
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--navy)", marginTop: 10 }}>SCAN AT MARINA</div>
          </div>
        </div>
        <div style={{ padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          {[
            ["Yacht", "Italian Yacht 66FT"],
            ["Location", "Dubai Marina (GMCO)"],
            ["Date", "Sunday, 25 Oct 2026"],
            ["Time", "06:00 – 08:00"],
            ["Lead Guest", "John Doe"],
            ["Total Paid", "AED 971.25"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: k === "Total Paid" ? "var(--gold)" : "var(--navy)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 15 }}>
        <button className="btn-action btn-secondary" style={{ flex: 1 }}>Download Ticket PDF</button>
        <Link href="/" className="btn-action btn-primary" style={{ flex: 1, textAlign: "center" }}>Back to Homepage</Link>
      </div>
    </div>
  );
}
