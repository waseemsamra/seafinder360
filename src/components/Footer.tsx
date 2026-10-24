"use client";
export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">Sea<br/>Finder<br/>360</div>
            <p className="brand-desc">The ultimate all-in-one platform for luxury yacht charters, sales, custom builds, and premium marina services in Dubai and beyond.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><a href="#">Yacht Charter</a></li><li><a href="#">Yacht Brokerage</a></li><li><a href="#">Custom Yacht Builds</a></li><li><a href="#">Marina Services</a></li><li><a href="#">360° Virtual Tours</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal & Support</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li><li><a href="#">Terms & Conditions</a></li><li><a href="#">Refund & Cancellation</a></li><li><a href="#">Cookie Policy</a></li><li><a href="#">FAQ & Help Center</a></li>
            </ul>
          </div>
          <div className="footer-col contact-col">
            <h4>Stay Updated</h4>
            <p style={{ fontSize: 13, marginBottom: 15, color: "var(--text-light)" }}>Subscribe for exclusive yacht offers, new listings, and marina news.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your Email Address" required />
              <button type="submit">Subscribe</button>
            </form>
            <div className="contact-info">
              <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Dubai Marina Walk, UAE</p>
              <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Bookings@seafinder360.com</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-trust">
            <span className="trust-badge">🔒 256-Bit SSL Secure</span>
            <span className="trust-badge">🏆 Dubai Maritime Authority</span>
            <span className="trust-badge">💳 Visa / Mastercard</span>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 SeaFinder360.com - All Rights Reserved.</p>
            <p>Designed for luxury. Built for speed.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
