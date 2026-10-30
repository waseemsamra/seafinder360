"use client";

import { useEffect } from "react";

export default function WatersportsAdventure() {
  useEffect(() => {
    const galleryItems = document.querySelectorAll('.ws-gallery-item');
    const lightbox = document.getElementById('ws-lightbox');
    const lightboxImg = document.getElementById('ws-lightbox-img');
    const closeBtn = document.getElementById('ws-close-btn');

    galleryItems.forEach(item => {
      const img = item.querySelector('img') as HTMLImageElement;
      if (!img) return;
      item.addEventListener('click', () => {
        if (lightboxImg) lightboxImg.src = img.src;
        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox?.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (lightboxImg) (lightboxImg as HTMLImageElement).src = '';
      }, 300);
    };

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
        closeLightbox();
      }
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <section style={{ padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center", background: "#fff" }}>
      <h2 style={{ fontSize: "3rem", fontWeight: 400, marginBottom: "50px", textAlign: "center", fontFamily: "'Playfair Display', serif" }}>
        Watersports & Adventure
      </h2>

      <div className="ws-gallery-container" style={{ display: "flex", justifyContent: "center", width: "100%", maxWidth: "1600px", height: "500px", gap: "4px" }}>
        <div className="ws-gallery-item" style={{ position: "relative", overflow: "hidden", flexGrow: 2.5, flexShrink: 1, flexBasis: 0, transition: "flex-grow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", cursor: "pointer" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop" alt="Watersports" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="ws-gallery-item" style={{ position: "relative", overflow: "hidden", flexGrow: 1, flexShrink: 1, flexBasis: 0, transition: "flex-grow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", cursor: "pointer" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop" alt="Adventure" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="ws-gallery-item" style={{ position: "relative", overflow: "hidden", flexGrow: 1, flexShrink: 1, flexBasis: 0, transition: "flex-grow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", cursor: "pointer" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop" alt="Watersports" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="ws-gallery-item" style={{ position: "relative", overflow: "hidden", flexGrow: 1, flexShrink: 1, flexBasis: 0, transition: "flex-grow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", cursor: "pointer" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop" alt="Adventure" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="ws-gallery-item" style={{ position: "relative", overflow: "hidden", flexGrow: 1, flexShrink: 1, flexBasis: 0, transition: "flex-grow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", cursor: "pointer" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" alt="Watersports" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>

      <style jsx>{`
        .ws-gallery-item:hover {
          flex-grow: 4 !important;
        }
        .ws-gallery-item:first-child:hover {
          flex-grow: 5 !important;
        }
        @media (max-width: 1024px) {
          .ws-gallery-container {
            height: 350px !important;
          }
          h2 {
            font-size: 2.2rem !important;
          }
        }
        @media (max-width: 768px) {
          section {
            padding: 40px 20px !important;
          }
          .ws-gallery-container {
            flex-wrap: wrap !important;
            height: auto !important;
          }
          .ws-gallery-item, .ws-gallery-item:first-child {
            flex: 1 1 45% !important;
            height: 250px !important;
            flex-grow: 1 !important;
          }
          .ws-gallery-item:hover, .ws-gallery-item:first-child:hover {
            flex-grow: 1 !important;
          }
        }
      `}</style>

      <div id="ws-lightbox" className="ws-lightbox" style={{ display: "none", position: "fixed", zIndex: 9999, top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.9)", justifyContent: "center", alignItems: "center", opacity: 0, transition: "opacity 0.3s ease" }}>
        <span id="ws-close-btn" style={{ position: "absolute", top: "20px", right: "40px", color: "#fff", fontSize: "40px", fontWeight: 300, cursor: "pointer", fontFamily: "sans-serif" }}>&times;</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="ws-lightbox-img" src="" alt="Enlarged view" style={{ maxWidth: "90%", maxHeight: "90vh", objectFit: "contain", boxShadow: "0 0 30px rgba(0,0,0,0.5)", transform: "scale(0.95)", transition: "transform 0.3s ease" }} />
      </div>
      <style jsx>{`
        .ws-lightbox.active {
          display: flex !important;
          opacity: 1 !important;
        }
        .ws-lightbox.active img {
          transform: scale(1) !important;
        }
      `}</style>
    </section>
  );
}
