"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const amenitiesData = [
  { category: "Leisure & Comfort", items: ["Fly Bridge", "Sun Deck", "Jacuzzi"] },
  { category: "Onboard Tech", items: ["Music System", "Free Wifi", "Bluetooth Audio"] },
  { category: "Refreshments", items: ["Soft Drinks", "Sparkling Water", "Juices"] },
  { category: "Comfort & Essentials", items: ["Towels", "Kitchen", "Oven & Microwave"] },
  { category: "Dining & Tableware", items: ["Disposable plates and cups", "Fine Dining Setup"] },
  { category: "Entertainment", items: ["Basic speakers", "TV", "Karaoke"] },
  { category: "Alcoholic Drinks", items: ["Premium Bar Package", "Wine Selection"] },
];

type YachtForm = {
  id?: number | string;
  name: string;
  type: string;
  location: string;
  marina: string;
  description: string;
  model: string;
  length_ft: string;
  year_built: string;
  guests: string;
  cabins: string;
  bathrooms: string;
  guests_overnight: string;
  bedrooms: string;
  price: string;
  amenities: string[];
  gallery: string[];
  img: string;
};

export default function YachtsPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [yachts, setYachts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<YachtForm>({
    name: "", type: "Motor Yacht", location: "", marina: "", description: "",
    model: "", length_ft: "", year_built: "", guests: "", cabins: "", bathrooms: "",
    guests_overnight: "", bedrooms: "", price: "", amenities: [], gallery: [], img: "",
  });

  useEffect(() => { fetchYachts(); }, []);

  const fetchYachts = async () => {
    console.log('FETCH_CALLED');
    try {
      const supabase = createClient();
      const { data } = await supabase.from('yachts').select('*').order('id', { ascending: true });
      if (data) {
        const mapped = data.map((y: any) => ({
          id: y.id,
          name: y.name,
          type: y.type || 'Motor Yacht',
          location: y.location || y.marina || 'Dubai',
          specs: `${y.length_ft || y.length || ''} ft / ${y.guests || y.guests_capacity || ''} / ${y.cabins || ''}`,
          price: `AED ${Number(y.price || y.price_per_hour || 2500).toLocaleString()}`,
          status: y.status || 'Active',
          img: y.img || y.cover_image || (Array.isArray(y.gallery)&&y.gallery[0]) || (Array.isArray(y.images)&&y.images[0]) || "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=200&auto=format&fit=crop",
          raw: y,
        }));
        setYachts(mapped);
      }
    } catch(e) { console.error(e); }
    finally { console.log('LOADING_FALSE'); setLoading(false); }
    setTimeout(()=>setLoading(false), 100);
  };

  const loadYachtForEdit = async (yachtName: string) => {
    try {
      const supabase = createClient();
      let data: any = null;
      if (editingId) {
        const res = await supabase.from('yachts').select('*').eq('id', editingId).maybeSingle();
        data = res.data;
      }
      if (!data) {
        const res = await supabase.from('yachts').select('*').eq('name', yachtName).maybeSingle();
        data = res.data;
      }
      if (data) {
        const gallery = Array.isArray(data.amenities?.gallery) ? data.amenities.gallery : Array.isArray(data.amenities?.images) ? data.amenities.images : (data.img ? [data.img] : []);
        const amenities = Array.isArray(data.amenities) ? data.amenities : [];
        setForm({
          id: data.id,
          name: data.name || "",
          type: data.type || "Motor Yacht",
          location: data.location || data.marina || "",
          marina: data.marina || data.location || "",
          description: "",
          model: "",
          length_ft: data.length_ft ?? data.length ?? "",
          year_built: "",
          guests: data.guests ?? "",
          cabins: data.cabins ?? "",
          bathrooms: "",
          guests_overnight: "",
          bedrooms: "",
          price: data.price ?? "",
          amenities: amenities,
          gallery: gallery,
          img: data.img || gallery[0] || "",
        });
        setEditingId(data.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showForm = (name?: string) => {
    setEditing(name || null);
    setView("form");
    if (name) loadYachtForEdit(name);
    else {
      setEditingId(null);
      setForm({ name: "", type: "Motor Yacht", location: "", marina: "", description: "", model: "", length_ft: "", year_built: "", guests: "", cabins: "", bathrooms: "", guests_overnight: "", bedrooms: "", price: "", amenities: [], gallery: [], img: "" });
    }
  };
  const showList = () => { setView("list"); setEditing(null); setEditingId(null); };

  const toggleAmenity = (item: string) => {
    setForm(prev => ({ ...prev, amenities: prev.amenities.includes(item) ? prev.amenities.filter(a=>a!==item) : [...prev.amenities, item] }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (let i=0; i<files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('fileName', file.name);
        const res = await fetch('/api/upload/imagekit', { method:'POST', body: fd });
        const data = await res.json();
        if (data.url) uploaded.push(data.url);
      }
      setForm(prev => ({ ...prev, gallery: [...prev.gallery, ...uploaded], img: prev.img || uploaded[0] || prev.gallery[0] }));
    } catch(err) { console.error(err); alert('Upload failed'); }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value=''; }
  };

  const removeImage = (idx: number) => {
    setForm(prev => { const gallery = prev.gallery.filter((_,i)=>i!==idx); return { ...prev, gallery, img: gallery[0] || "" }; });
  };
  const setCover = (url: string) => setForm(prev => ({ ...prev, img: url }));

  const saveYacht = async () => {
    if (!form.name.trim()) { alert('Name required'); return; }
    setSaving(true);
    try {
      const supabase = createClient();
      const payload: any = {
        name: form.name, type: form.type, location: form.location || form.marina, marina: form.marina || form.location,
        length_ft: form.length_ft ? Number(form.length_ft) : null,
        length: form.length_ft ? Number(form.length_ft) : null,
        guests: form.guests ? Number(form.guests) : null,
        cabins: form.cabins ? Number(form.cabins) : null,
        price: form.price ? Number(form.price) : null,
        img: form.img || (Array.isArray(form.gallery)?form.gallery[0]:null) || null,
      };
      if (Array.isArray(form.gallery)) payload.amenities = { gallery: form.gallery, images: form.gallery };
      if (editingId) {
        const { error } = await supabase.from('yachts').update(payload).eq('id', editingId);
        if (error) throw error;
        alert('Yacht updated');
      } else {
        const { error } = await supabase.from('yachts').insert([payload]);
        if (error) throw error;
        alert('Yacht created');
      }
      await fetchYachts();
      showList();
    } catch(e:any) { console.error(e); alert(e.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const filtered = yachts.filter(y => !searchTerm || y.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout user={{ username: "Admin User" }} activePage="yachts">
      <header className="header">
        <div className="header-title">
          <h1>{view === "list" ? "Yacht Fleet" : editing ? "Edit Yacht" : "Add New Yacht"}</h1>
          <p>{view === "list" ? `Manage your yachts, locations, and availability (${yachts.length} yachts)` : "Enter the yacht's specifications, amenities, and details"}</p>
        </div>
        {view === "list" ? (
          <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
            <input type="text" placeholder="Search yachts by name..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} style={{padding:'10px 16px',border:'1px solid #E5E7EB',borderRadius:'8px',fontSize:'14px',minWidth:'280px',color:'#1A222C',background:'#FFFFFF'}}/>
            <button className="btn-primary" onClick={()=>showForm()}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Add Yacht</button>
          </div>
        ) : (
          <div className="header-actions"><button className="btn-secondary" onClick={showList}>Cancel</button><button className="btn-primary" onClick={saveYacht} disabled={saving}>{saving?'Saving...':editing?'Update Yacht':'Save Yacht'}</button></div>
        )}
      </header>

      {view === "list" && (
        <div className="table-container">
          <table>
            <thead><tr><th>Yacht</th><th>Location / Marina</th><th>Specs (L / G / C)</th><th>Base Price</th><th>Status</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
            <tbody>
              {false ? (<tr><td colSpan={6} style={{textAlign:'center',padding:'40px',color:'#6B7280'}}>Loading...</td></tr>) :
               filtered.length === 0 ? (<tr><td colSpan={6} style={{textAlign:'center',padding:'40px',color:'#6B7280'}}>No yachts found</td></tr>) :
               filtered.map((y,i)=>(
                <tr key={i}>
                  <td><div className="yacht-cell"><img src={y.img} className="yacht-thumb" alt={y.name}/><div className="yacht-details"><span className="yacht-name">{y.name}</span><span className="yacht-type">{y.type}</span></div><button className="btn-icon" onClick={async()=>{if(confirm("Delete")){const supabase=require("@/lib/supabase/client").createClient();await supabase.from("yachts").delete().eq("id",y.id);fetchYachts();}}} title="Delete">X</button></div></td>
                  <td><div className="location-cell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>{y.location}</div></td>
                  <td className="text-muted">{y.specs}</td>
                  <td className="font-medium">{y.price} <span style={{fontSize:'11px',color:'#999',fontWeight:400}}>/ hr</span></td>
                  <td><span className={`badge ${y.status==='Active'?'badge-active':'badge-maintenance'}`}>{y.status}</span></td>
                  <td><div className="actions"><button className="btn-icon" onClick={()=>{setEditingId(y.id); window.location.href = `/admin/yachts/${y.id}`;}} title="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button><button className="btn-icon delete" onClick={async ()=>{if(!confirm('Delete this yacht?'))return; try{await fetch(`/api/admin/yachts/${y.id}`, {method:'DELETE'}); setYachts(prev => prev.filter(item => item.id !== y.id));}catch(e){alert('Failed');}}} title="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></td>
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
              <div className="form-group full-width"><label>Yacht Name</label><input type="text" className="form-control" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label>Yacht Type</label><select className="form-control" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}><option>Motor Yacht</option><option>Sailing Yacht</option><option>Catamaran</option><option>Superyacht</option></select></div>
              <div className="form-group"><label>Location / Marina</label><input type="text" className="form-control" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value,marina:e.target.value})}/></div>
              <div className="form-group full-width"><label>Description</label><textarea className="form-control" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>Specifications</h2>
            <div className="form-grid-3">
              <div className="form-group"><label>Model Name</label><input type="text" className="form-control" value={form.model} onChange={(e)=>setForm({...form,model:e.target.value})}/></div>
              <div className="form-group"><label>Yacht Length (ft)</label><input type="number" className="form-control" value={form.length_ft} onChange={(e)=>setForm({...form,length_ft:e.target.value})}/></div>
              <div className="form-group"><label>Year Built</label><input type="number" className="form-control" value={form.year_built} onChange={(e)=>setForm({...form,year_built:e.target.value})}/></div>
              <div className="form-group"><label>Guest Capacity (Pax)</label><input type="number" className="form-control" value={form.guests} onChange={(e)=>setForm({...form,guests:e.target.value})}/></div>
              <div className="form-group"><label>Cabins</label><input type="number" className="form-control" value={form.cabins} onChange={(e)=>setForm({...form,cabins:e.target.value})}/></div>
              <div className="form-group"><label>Bathrooms</label><input type="number" className="form-control" value={form.bathrooms} onChange={(e)=>setForm({...form,bathrooms:e.target.value})}/></div>
              <div className="form-group"><label>Guests Overnight</label><input type="number" className="form-control" value={form.guests_overnight} onChange={(e)=>setForm({...form,guests_overnight:e.target.value})}/></div>
              <div className="form-group"><label>Bedrooms</label><input type="number" className="form-control" value={form.bedrooms} onChange={(e)=>setForm({...form,bedrooms:e.target.value})}/></div>
              <div className="form-group"><label>Base Price (AED/hr)</label><input type="number" className="form-control" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})}/></div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>Amenities & Facilities</h2>
            <div className="amenities-wrapper">
              {amenitiesData.map(cat=>(
                <div className="amenity-category" key={cat.category}>
                  <h4>{cat.category}</h4>
                  <div className="amenity-list">
                    {cat.items.map(item=>(
                      <label className="amenity-check" key={item}><input type="checkbox" checked={form.amenities.includes(item)} onChange={()=>toggleAmenity(item)}/> {item}</label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>Gallery</h2>
            {form.gallery.length > 0 && (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'16px',marginBottom:'16px'}}>
                {form.gallery.map((url,idx)=>(
                  <div key={idx} style={{position:'relative',border: form.img===url?'2px solid #C4A87C':'1px solid #E5E7EB',borderRadius:'8px',overflow:'hidden'}}>
                    <img src={url} alt="" style={{width:'100%',height:'140px',objectFit:'cover'}}/>
                    <div style={{position:'absolute',top:'8px',right:'8px',display:'flex',gap:'6px'}}>
                      <button type="button" onClick={(e)=>{e.preventDefault();e.stopPropagation();setForm(prev=>({...prev, img:url}));}} style={{background:'rgba(0,0,0,0.6)',color:'white',border:'none',borderRadius:'4px',padding:'4px 8px',fontSize:'11px',cursor:'pointer'}}>Cover</button>
                      <button type="button" onClick={()=>removeImage(idx)} style={{background:'rgba(220,38,38,0.9)',color:'white',border:'none',borderRadius:'4px',padding:'4px 8px',fontSize:'11px'}}>Delete</button>
                    </div>
                    {form.img===url && <div style={{position:'absolute',bottom:'8px',left:'8px',background:'#C4A87C',color:'white',padding:'2px 6px',borderRadius:'4px',fontSize:'10px'}}>COVER</div>}
                  </div>
                ))}
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display:'none'}}/>
            <div className="upload-box" onClick={()=>fileInputRef.current?.click()} style={{cursor:'pointer'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <p>{uploading?'Uploading...':'Click to upload images'}</p>
              <span>or drag and drop JPG, PNG (Max 5MB each)</span>
            </div>
          </div>

          <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
            <button className="btn-secondary" onClick={showList}>Cancel</button>
            <button className="btn-primary" onClick={saveYacht} disabled={saving}>{saving?'Saving...':editing?'Update Yacht':'Save Yacht'}</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;}
        .header-title h1{font-family:'Playfair Display',serif;font-size:32px;color:#1A222C;margin-bottom:8px;}
        .header-title p{font-size:14px;color:#6B7280;}
        .btn-primary{background:#1A222C;color:white;border:none;padding:12px 24px;border-radius:4px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .btn-secondary{background:white;border:1px solid #E5E7EB;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;color:#1F2937;}
        .header-actions{display:flex;gap:12px;}
        .table-container{background:white;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;}
        table{width:100%;border-collapse:collapse;}
        th{background:#F9FAFB;padding:16px 24px;font-size:11px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #E5E7EB;text-align:left;}
        td{padding:16px 24px;font-size:14px;border-bottom:1px solid #E5E7EB;}
        tr:last-child td{border-bottom:none;}
        .yacht-cell{display:flex;align-items:center;gap:16px;}
        .yacht-thumb{width:60px;height:40px;border-radius:4px;object-fit:cover;}
        .yacht-details{display:flex;flex-direction:column;}
        .yacht-name{font-weight:600;color:#1A222C;}
        .yacht-type{font-size:12px;color:#6B7280;}
        .location-cell{display:flex;align-items:center;gap:6px;color:#6B7280;font-size:13px;}
        .location-cell svg{width:14px;height:14px;stroke:#C4A87C;}
        .badge{display:inline-block;padding:4px 10px;border-radius:100px;font-size:11px;font-weight:600;}
        .badge-active{background:#D1FAE5;color:#065F46;}
        .badge-maintenance{background:#FEF3C7;color:#92400E;}
        .actions{display:flex;gap:8px;justify-content:flex-end;}
        .btn-icon{background:none;border:1px solid #E5E7EB;width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6B7280;}
        .form-container{display:flex;flex-direction:column;gap:24px;max-width:1000px;}
        .form-section{background:white;border:1px solid #E5E7EB;border-radius:12px;padding:32px;}
        .section-title{font-family:'Playfair Display',serif;font-size:20px;color:#1A222C;margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;gap:10px;}
        .section-title svg{width:20px;height:20px;stroke:#C4A87C;}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
        .form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;}
        .full-width{grid-column:1/-1;}
        .form-group{display:flex;flex-direction:column;gap:8px;}
        .form-group label{font-size:13px;font-weight:600;color:#1A222C;}
        .form-control{padding:12px 16px;border:1px solid #E5E7EB;border-radius:6px;font-size:14px;color:#1A222C;background:#FFFFFF;}
        textarea.form-control{resize:vertical;min-height:100px;}
        .amenities-wrapper{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:28px;}
        .amenity-category h4{font-size:14px;font-weight:700;color:#1A222C;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px;}
        .amenity-list{display:flex;flex-direction:column;gap:12px;}
        .amenity-check{display:flex;align-items:center;gap:10px;font-size:14px;color:#1F2937;cursor:pointer;}
        .upload-box{border:2px dashed #E5E7EB;border-radius:8px;padding:40px;text-align:center;cursor:pointer;background:#F8F9FA;}
        .upload-box svg{width:40px;height:40px;stroke:#C4A87C;margin-bottom:12px;}
        .upload-box p{font-size:14px;font-weight:600;color:#1A222C;}
        .upload-box span{font-size:12px;color:#6B7280;}
      `}</style>
    </AdminLayout>
  );
}
