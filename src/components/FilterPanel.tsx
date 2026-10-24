"use client";
import { useState } from "react";

type Filters = { search: string; sort: string; maxPrice: number; guestMin: number; guestLabel: string; minLength: number; minCabins: string; marina: string; minBooking: string };

export default function FilterPanel({ onChange }: { onChange?: (f: Filters) => void }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured first");
  const [maxPrice, setMaxPrice] = useState(21500);
  const [guestLabel, setGuestLabel] = useState("Any");
  const [guestOpen, setGuestOpen] = useState(false);
  const [minLength, setMinLength] = useState(54);
  const [cabinLabel, setCabinLabel] = useState("Any");
  const [cabinOpen, setCabinOpen] = useState(false);
  const [marina, setMarina] = useState("All marinas");
  const [minBooking, setMinBooking] = useState("Any");
  const [gp, setGp] = useState(false);

  const emit = (patch: Partial<Filters>) => {
    if (onChange) onChange({ search, sort, maxPrice, guestMin: 0, guestLabel, minLength, minCabins: cabinLabel, marina, minBooking, ...patch });
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-top-row">
          <div className="search-sort-group">
            <span className="search-label">SEARCH</span>
            <input type="text" className="search-input" placeholder="Yacht name or builder" value={search} onChange={(e) => { setSearch(e.target.value); emit({ search: e.target.value }); }} />
          </div>
          <div className="search-sort-group">
            <span className="search-label">SORT</span>
            <div className="sort-select-wrapper">
              <select className="sort-select" value={sort} onChange={(e) => { setSort(e.target.value); emit({ sort: e.target.value }); }}>
                <option>Featured first</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Length: Longest</option>
              </select>
            </div>
            <div className="yacht-count">37 yachts</div>
          </div>
        </div>
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">PRICE PER HOUR, UP TO AED <br /><span className="filter-value">{maxPrice.toLocaleString()}</span></label>
            <div className="range-container">
              <input type="range" min={1000} max={25000} step={500} value={maxPrice} onChange={(e) => { const v = +e.target.value; setMaxPrice(v); emit({ maxPrice: v }); }} />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">GUESTS, AT LEAST</label>
            <div className={`filter-select${guestOpen ? " open" : ""}`} onClick={() => setGuestOpen((v) => !v)}>{guestLabel}</div>
            {guestOpen && (
              <div className="custom-dropdown-menu show">
                {["Any", "10+", "20+", "30+", "50+"].map((g) => (
                  <div key={g} className={`dropdown-item${guestLabel === g ? " active" : ""}`} onClick={() => { setGuestLabel(g); setGuestOpen(false); emit({ guestLabel: g }); }}>
                    <span className="check">✔</span> {g}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="filter-group">
            <label className="filter-label">LENGTH, AT LEAST {minLength} FT</label>
            <div className="range-container">
              <input type="range" min={40} max={200} step={5} value={minLength} onChange={(e) => { const v = +e.target.value; setMinLength(v); emit({ minLength: v }); }} />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">CABINS</label>
            <div className={`filter-select${cabinOpen ? " open" : ""}`} onClick={() => setCabinOpen((v) => !v)}>{cabinLabel}</div>
            {cabinOpen && (
              <div className="custom-dropdown-menu show">
                {["Any", "2+", "4+", "6+"].map((g) => (
                  <div key={g} className={`dropdown-item${cabinLabel === g ? " active" : ""}`} onClick={() => { setCabinLabel(g); setCabinOpen(false); emit({ minCabins: g }); }}>
                    <span className="check">✔</span> {g}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="filter-group">
            <label className="filter-label">MARINA</label>
            <select className="filter-select" style={{ appearance: "auto", paddingRight: 15 }} value={marina} onChange={(e) => { setMarina(e.target.value); emit({ marina: e.target.value }); }}>
              <option>All marinas</option><option>Dubai Harbour</option><option>Dubai Marina</option><option>Marsa Al Arab</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">MINIMUM BOOKING</label>
            <select className="filter-select" style={{ appearance: "auto", paddingRight: 15 }} value={minBooking} onChange={(e) => { setMinBooking(e.target.value); emit({ minBooking: e.target.value }); }}>
              <option>Any</option><option>3 Hours</option><option>4 Hours</option><option>Full Day</option>
            </select>
          </div>
        </div>
        <div className="filter-bottom-row">
          <label className="checkbox-group">
            <input type="checkbox" checked={gp} onChange={(e) => setGp(e.target.checked)} />
            Available for the Grand Prix weekend (15)
          </label>
          <button className="reset-btn" onClick={() => { setSearch(""); setMaxPrice(21500); setGuestLabel("Any"); setMinLength(54); setCabinLabel("Any"); setMarina("All marinas"); setMinBooking("Any"); setGp(false); }}>Reset all</button>
        </div>
      </div>
    </section>
  );
}
