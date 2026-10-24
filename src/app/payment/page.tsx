'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PaymentPage() {
  const [paid, setPaid] = useState(false);
  const [ref, setRef] = useState("");
  useEffect(() => { setRef("SF360-" + Math.random().toString(36).slice(2,10).toUpperCase()); }, []);
  if (paid) {
    return (
      <div className="container" style={{ gridTemplateColumns: "1fr", textAlign: "center" }}>
        <div className="left-col" style={{ alignItems: "center" }}>
          <h1 className="form-title">Payment Confirmed</h1>
          <p>Reference: {ref}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ref}`} alt="QR" />
          <Link href="/" className="btn-action btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <header className="header">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
          SeaFinder360
        </div>

        <div className="stepper">
          <div className="step completed">
            <div className="step-circle">1</div> Booking
          </div>
          <div className="step-line"></div>
          <div className="step completed">
            <div className="step-circle">2</div> Upgrades
          </div>
          <div className="step-line"></div>
          <div className="step completed">
            <div className="step-circle">3</div> Details
          </div>
          <div className="step-line"></div>
          <div className="step active">
            <div className="step-circle">4</div> Payment
          </div>
        </div>

        <div className="header-actions">
          <div className="lang-select">AED ⌄</div>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Help</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Sign in</span>
        </div>
      </header>

      <div className="container">
        <div className="left-col">
          <div>
            <h1 className="page-title">How would you like to pay?</h1>
            <p className="page-desc">We have secured your tickets. To receive them, please complete your payment as soon as possible via one of our secure payment methods.</p>
            <div className="countdown-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Time left: 29 minutes
            </div>
          </div>

          <div className="section-label">Select a payment method</div>

          <div className="payment-card active">
            <div className="radio-circle"></div>
            <div className="payment-info">
              <h4>Apple Pay</h4>
              <p>Fast & Secure biometric checkout</p>
            </div>
            <div className="payment-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.78 3.6-.71 1.51.12 2.65.7 3.37 1.79-2.94 1.66-2.52 5.52.22 6.65-.61 1.54-1.42 3.02-2.27 4.44zm-3.6-14.5c.62-.79 1.11-1.83.97-2.87-1.14.05-2.27.72-2.94 1.5-.61.69-1.12 1.75-.93 2.75 1.22.09 2.28-.59 2.9-1.38z"/></svg>
            </div>
          </div>

          <div className="payment-card">
            <div className="radio-circle"></div>
            <div className="payment-info">
              <h4>Debit and Credit Card</h4>
              <p>Visa, Mastercard, Amex, PayPal</p>
            </div>
            <div className="payment-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
          </div>

          <div className="payment-card">
            <div className="radio-circle"></div>
            <div className="payment-info">
              <h4>Tabby — Pay in 4</h4>
              <p>0% interest. Split into 4 payments.</p>
            </div>
            <div className="badge-tabby">tabby</div>
          </div>

          <div className="payment-card">
            <div className="radio-circle"></div>
            <div className="payment-info">
              <h4>Tamara — Pay in 3</h4>
              <p>Split into 3 payments. No fees.</p>
            </div>
            <div className="badge-tamara">tamara</div>
          </div>

          <label className="terms-group">
            <input type="checkbox" />
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Cancellation Policy</a>.
          </label>

          <div className="trust-row">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              256-bit SSL Encrypted
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Free cancellation 24h
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              24/7 UAE Support
            </div>
          </div>

          <button className="btn-whatsapp-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book via WhatsApp Concierge
          </button>
        </div>

        <div className="right-col">
          <div className="summary-card">
            <h2 className="summary-title">Your tickets overview</h2>
            <div className="summary-yacht">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200&auto=format&fit=crop" alt="Yacht" />
              <div>
                <h4>Italian Yacht 66FT</h4>
                <div className="date-row-text">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Sun, 25 Oct 2026
                </div>
                <div className="cancel-text">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Free cancellation until 24h
                </div>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row"><span>1 × Charter</span><span>AED 900.00</span></div>
              <div className="price-row muted"><span>Service fee</span><span>AED 25.00</span></div>
              <div className="price-row muted"><span>VAT (5%)</span><span>AED 46.25</span></div>
            </div>

            <div className="total-row">
              <span className="label">Total</span>
              <span className="amount">AED 971.25</span>
            </div>

            <div className="points-banner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              You&apos;ll earn 971 points on this booking
            </div>

            <Link href="/confirmation" className="btn-action btn-primary">
              Pay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </Link>

            <Link href="/details" className="btn-action btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back
            </Link>

            <div className="trust-badges">
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Secure booking</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Trustpilot 4.9</span>
            </div>
          </div>
        </div>
      </div>

      <div className="float-wa">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>

      <div className="float-chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>
    </>
  );
}
