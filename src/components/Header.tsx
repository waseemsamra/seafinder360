"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest(".lang-btn")) setLangOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`} id="mainHeader" style={{ position: 'fixed', top: scrolled ? 0 : 39, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: scrolled ? '#ffffff' : 'rgba(255,255,255,0.9)' }}>
        <a href="/" className="logo"><img src="/logo-seafinder360.png" alt="SeaFinder360" style={{height:'110px', width:'auto', objectFit:'contain'}} /></a>
        <nav className="nav-menu">
          <a href="#" className="no-arrow">Home</a>
          <a href="#fleet">Yacht Charter</a>
          <a href="#fleet">Yacht Brokerage</a>
          <a href="#services">Marine Services</a>
        </nav>
        <div className="header-actions">
          <div className="lang-dropdown">
            <button className="lang-btn" onClick={() => setLangOpen((v) => !v)}>
              {lang === "العربية" ? "🇦🇪 العربية" : "🇺🇸 English"} ⌄
            </button>
            {langOpen && (
              <div className="lang-menu show">
                <a href="#" onClick={() => { setLang("English"); setLangOpen(false); }}>🇺🇸 English</a>
                <a href="#" onClick={() => { setLang("العربية"); setLangOpen(false); }}><span className="arabic-text">🇦🇪 العربية</span></a>
              </div>
            )}
          </div>
          <div className="call-expert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div><span>CALL EXPERT</span>+9711234567</div>
          </div>
          <a href="#" className="btn-whatsapp">Chat on WhatsApp</a>
          <div className={`hamburger${mobileOpen ? " active" : ""}`} onClick={() => setMobileOpen((v) => !v)}>
            <span/><span/><span/>
          </div>
        </div>
      </header>
      <div className={`menu-overlay${mobileOpen ? " active" : ""}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-menu${mobileOpen ? " active" : ""}`}>
        <a href="/">Home</a><a href="/#charter">Yacht Charter</a><a href="/#party">Party & Events</a><a href="/#corporate">Corporate</a><a href="/#family">Family</a><a href="/#watersports">Watersports</a><a href="/search">Search Yachts</a>
      </div>
    </>
  );
}
