"use client";

import YachtCard from "./yacht-card";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function SearchClient() {
  const [yachts, setYachts] = useState<any[]>([]);

  useEffect(() => {
    const fetchYachts = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('yachts').select('*').order('id');
      setYachts(data || []);
    };
    fetchYachts();
  }, []);

  const formattedYachts = yachts.map((yacht: any) => ({
    id: yacht.id,
    name: yacht.name,
    location: yacht.location,
    specs: `${yacht.type} · ${yacht.length} ft · ${yacht.guests} guests · ${yacht.cabins} cabins`,
    price: yacht.price ? `AED ${yacht.price.toLocaleString()} / hour · min ${yacht.min_hours || 3} h` : "",
    poa: !yacht.price,
    image: yacht.img,
    alt: yacht.name,
  }));

  const groups = [
    {
      title: "Up to 25 guests",
      items: formattedYachts.filter((y: any) => {
        const m = y.specs.match(/(\d+)\s+guests/);
        return m && parseInt(m[1]) <= 25;
      }).slice(0, 4),
    },
    {
      title: "More than 25 guests",
      items: formattedYachts.filter((y: any) => {
        const m = y.specs.match(/(\d+)\s+guests/);
        return m && parseInt(m[1]) > 25;
      }).slice(0, 4),
    },
    {
      title: "All yachts",
      items: formattedYachts,
    },
  ];

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="container">
          <a className="logo" href="/">SeaFinder360</a>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/search">Fleet</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </header>

      <main className="search-main">
        <div className="container">
          <div className="search-hero">
            <h1>The Dubai Fleet</h1>
            <p>Discover luxury yachts available for charter by the hour</p>
          </div>

          {groups.map((group, index) => (
            <section className="yacht-section" key={index}>
              <h2 className="section-title">{group.title}</h2>
              <div className="yacht-grid">
                {group.items.length > 0 ? (
                  group.items.map((yacht: any) => (
                    <YachtCard key={yacht.id} yacht={yacht} />
                  ))
                ) : (
                  <p className="no-results">No yachts found in this category.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="search-footer">
        <div className="container">
          <p>&copy; 2025 SeaFinder360. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .search-page { min-height:100vh; background:#0a0a0a; color:#fff; }
        .container { max-width:1200px; margin:0 auto; padding:0 2rem; }
        .search-header { border-bottom:1px solid #1a1a1a; padding:1.5rem 0; }
        .search-header .container { display:flex; align-items:center; justify-content:space-between; }
        .logo { font-size:1.5rem; font-weight:700; color:#fff; text-decoration:none; }
        .nav { display:flex; gap:2rem; }
        .nav a { color:#a1a1aa; text-decoration:none; font-size:0.95rem; }
        .nav a:hover { color:#fff; }
        .search-main { padding:3rem 0 4rem; }
        .search-hero { text-align:center; margin-bottom:3rem; }
        .search-hero h1 { font-size:2.5rem; font-weight:700; margin-bottom:0.75rem; }
        .search-hero p { color:#a1a1aa; font-size:1.1rem; }
        .yacht-section { margin-bottom:3rem; }
        .section-title { font-size:1.75rem; font-weight:600; margin-bottom:1.5rem; }
        .yacht-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px,1fr)); gap:1.5rem; }
        .no-results { color:#71717a; }
        .search-footer { border-top:1px solid #1a1a1a; padding:2rem 0; text-align:center; color:#71717a; font-size:0.9rem; }
      `}</style>
    </div>
  );
}
