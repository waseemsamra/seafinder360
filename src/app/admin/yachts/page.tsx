"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

const amenitiesData = [
  { category: "Leisure & Comfort", items: ["Fly Bridge", "Sun Deck", "Jacuzzi"] },
  { category: "Onboard Tech", items: ["Music System", "Free Wifi", "Bluetooth Audio"] },
  { category: "Refreshments", items: ["Soft Drinks", "Sparkling Water", "Juices"] },
  { category: "Comfort & Essentials", items: ["Towels", "Kitchen", "Oven & Microwave"] },
  { category: "Dining & Tableware", items: ["Disposable plates and cups", "Fine Dining Setup"] },
  { category: "Entertainment", items: ["Basic speakers", "TV", "Karaoke"] },
  { category: "Alcoholic Drinks", items: ["Premium Bar Package", "Wine Selection"] },
];

export default function YachtsPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<string | null>(null);

  const yachts = [
    { name: "Majestic 120", type: "Motor Yacht", location: "Dubai Marina (GMCO)", specs: "120 ft / 12 / 5", price: "AED 8,500", status: "Active", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=200&auto=format&fit=crop" },
    { name: "Ocean Pearl", type: "Sailing Yacht", location: "Dubai Harbour", specs: "85 ft / 8 / 4", price: "AED 4,200", status: "Active", img: "https://images.unsplash.com/photo-1543160915-158a41397584?q=80&w=200&auto=format&fit=crop" },
    { name: "Sea Breeze", type: "Catamaran", location: "Marsa Al Arab", specs: "60 ft / 10 / 4", price: "AED 6,000", status: "Maintenance", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200&auto=format&fit=crop" },
  ];

  const showForm = (name?: string) => { setEditing(name || null); setView("form"); };
  const showList = () => { setView("list"); setEditing(null); };

  return (
    <AdminLayout user={{ username: "Admin User" }} activePage="yachts">
      <header className="header">
        <div className="header-title">
          <h1>{view === "list" ? "Yacht Fleet" : editing ? "Edit Yacht" : "Add New Yacht"}</h1>
          <p>{view === "list" ? "Manage your yachts, locations, and availability" : "Enter the yacht's specifications, amenities, and details"}</p>
        </div>
        {view === "list" ? (
          <button className="btn-primary" onClick={() => showForm()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Yacht
          </button>
        ) : (
          <div className="header-actions">
            <button className="btn-secondary" onClick={showList}>Cancel</button>
            <button className="btn-primary" onClick={showList}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              Save Yacht
            </button>
          </div>
        )}
      </header>

      {view === "list" && (
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Yacht</th><th>Location / Marina</th><th>Specs (L / G / C)</th><th>Base Price</th><th>Status</th><th style={{textAlign:'right'}}>Actions</th></tr>
            </thead>
            <tbody>
              {yachts.map((y, i) => (
                <tr key={i}>
                  <td>
                    <div className="yacht-cell">
                      <img src={y.img} className="yacht-thumb" alt={y.name} />
                      <div className="yacht-details"><span className="yacht-name">{y.name}</span><span className="yacht-type">{y.type}</span></div>
                    </div>
                  </td>
                  <td><div className="location-cell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>{y.location}</div></td>
                  <td className="text-muted">{y.specs}</td>
                  <td className="font-medium">{y.price} <span style={{fontSize:'11px', color:'#999', fontWeight:400}}>/ hr</span></td>
                  <td><span className={`badge ${y.status === 'Active' ? 'badge-active' : 'badge-maintenance'}`}>{y.status}</span></td>
                  <td>
                    <div className="actions">
                      <button className="btn-icon" onClick={() => showForm(y.name)} title="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                      <button className="btn-icon delete" title="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "form" && (
        <div className="form-container">
          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20"></path><path d="M12 2v20"></path></svg>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group full-width"><label>Yacht Name</label><input type="text" className="form-control" defaultValue={editing || ""} /></div>
              <div className="form-group"><label>Yacht Type</label><select className="form-control"><option>Motor Yacht</option><option>Sailing Yacht</option><option>Catamaran</option><option>Superyacht</option></select></div>
              <div className="form-group"><label>Location / Marina</label><input type="text" className="form-control" /></div>
              <div className="form-group full-width"><label>Description</label><textarea className="form-control" /></div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>Specifications</h2>
            <div className="form-grid-3">
              <div className="form-group"><label>Model Name</label><input type="text" className="form-control" /></div>
              <div className="form-group"><label>Yacht Length (ft)</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Year Built</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Guest Capacity (Pax)</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Cabins</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Bathrooms</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Guests Overnight</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Bedrooms</label><input type="number" className="form-control" /></div>
              <div className="form-group"><label>Base Price (AED/hr)</label><input type="number" className="form-control" /></div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>Amenities & Facilities</h2>
            <div className="amenities-wrapper">
              {amenitiesData.map((cat) => (
                <div className="amenity-category" key={cat.category}>
                  <h4>{cat.category}</h4>
                  <div className="amenity-list">
                    {cat.items.map((item) => (
                      <label className="amenity-check" key={item}><input type="checkbox" /> {item}</label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>Gallery</h2>
            <div className="upload-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg><p>Click to upload images</p><span>or drag and drop JPG, PNG (Max 5MB each)</span></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; }
        .header-title h1 { font-family:'Playfair Display',serif; font-size:32px; color:#1A222C; margin-bottom:8px; }
        .header-title p { font-size:14px; color:#6B7280; }
        .btn-primary { background:#1A222C; color:white; border:none; padding:12px 24px; border-radius:4px; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:8px; text-decoration:none; }
        .btn-secondary { background:white; border:1px solid #E5E7EB; padding:12px 24px; border-radius:6px; font-size:14px; font-weight:600; cursor:pointer; color:#1F2937; }
        .header-actions { display:flex; gap:12px; }
        .table-container { background:white; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
        table { width:100%; border-collapse:collapse; }
        th { background:#F9FAFB; padding:16px 24px; font-size:11px; font-weight:600; color:#6B7280; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #E5E7EB; text-align:left; }
        td { padding:16px 24px; font-size:14px; border-bottom:1px solid #E5E7EB; }
        tr:last-child td { border-bottom:none; }
        .yacht-cell { display:flex; align-items:center; gap:16px; }
        .yacht-thumb { width:60px; height:40px; border-radius:4px; object-fit:cover; }
        .yacht-details { display:flex; flex-direction:column; }
        .yacht-name { font-weight:600; color:#1A222C; }
        .yacht-type { font-size:12px; color:#6B7280; }
        .location-cell { display:flex; align-items:center; gap:6px; color:#6B7280; font-size:13px; }
        .location-cell svg { width:14px; height:14px; stroke:#C4A87C; }
        .badge { display:inline-block; padding:4px 10px; border-radius:100px; font-size:11px; font-weight:600; }
        .badge-active { background:#D1FAE5; color:#065F46; }
        .badge-maintenance { background:#FEF3C7; color:#92400E; }
        .actions { display:flex; gap:8px; justify-content:flex-end; }
        .btn-icon { background:none; border:1px solid #E5E7EB; width:32px; height:32px; border-radius:6px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#6B7280; }
        .form-container { display:flex; flex-direction:column; gap:24px; max-width:1000px; }
        .form-section { background:white; border:1px solid #E5E7EB; border-radius:12px; padding:32px; }
        .section-title { font-family:'Playfair Display',serif; font-size:20px; color:#1A222C; margin-bottom:24px; padding-bottom:12px; border-bottom:1px solid #E5E7EB; display:flex; align-items:center; gap:10px; }
        .section-title svg { width:20px; height:20px; stroke:#C4A87C; }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .form-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; }
        .full-width { grid-column:1 / -1; }
        .form-group { display:flex; flex-direction:column; gap:8px; }
        .form-group label { font-size:13px; font-weight:600; color:#1A222C; }
        .form-control { padding:12px 16px; border:1px solid #E5E7EB; border-radius:6px; font-size:14px; }
        textarea.form-control { resize:vertical; min-height:100px; }
        .amenities-wrapper { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:28px; }
        .amenity-category h4 { font-size:14px; font-weight:700; color:#1A222C; margin-bottom:16px; text-transform:uppercase; letter-spacing:0.5px; }
        .amenity-list { display:flex; flex-direction:column; gap:12px; }
        .amenity-check { display:flex; align-items:center; gap:10px; font-size:14px; color:#1F2937; cursor:pointer; }
        .upload-box { border:2px dashed #E5E7EB; border-radius:8px; padding:40px; text-align:center; cursor:pointer; background:#F8F9FA; }
        .upload-box svg { width:40px; height:40px; stroke:#C4A87C; margin-bottom:12px; }
        .upload-box p { font-size:14px; font-weight:600; color:#1A222C; }
        .upload-box span { font-size:12px; color:#6B7280; }
      `}</style>
    </AdminLayout>
  );
}
