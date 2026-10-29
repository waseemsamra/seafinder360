"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function YachtEditClient() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<YachtForm>({
    name: "", type: "Motor Yacht", location: "", marina: "", description: "",
    model: "", length_ft: "", year_built: "", guests: "", cabins: "", bathrooms: "",
    guests_overnight: "", bedrooms: "", price: "", amenities: [], gallery: [], img: "",
  });

  useEffect(() => { if (id) load(); const t=setTimeout(()=>setLoading(false),1000); return ()=>clearTimeout(t); }, [id]);

  const load = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.from('yachts').select('*').eq('id', id).maybeSingle();
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
      }
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

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
  const setCover = (url: string) => {
    setForm(prev => ({ ...prev, img: url }));
    setForm(f => ({ ...f }));
  };

  const save = async () => {
    if (!form.name.trim()) { alert('Name required'); return; }
    setSaving(true);
    try {
      const supabase = createClient();
      const payload:any={name:form.name,type:form.type,location:form.location||form.marina,marina:form.marina||form.location}; if(form.length_ft!=='') payload.length_ft=Number(form.length_ft); if(form.guests!=='') payload.guests=Number(form.guests); if(form.cabins!=='') payload.cabins=Number(form.cabins); if(form.price!=='') payload.price=Number(form.price); payload.img=form.img||form.gallery?.[0]||null; if(Array.isArray(form.gallery)) payload.amenities={gallery:form.gallery,images:form.gallery}; const res = await fetch(`/api/admin/yachts/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); if(!res.ok) throw new Error((await res.json()).error||'Failed');
      alert('Yacht updated');
      router.push('/admin/yachts');
    } catch(e:any) { console.error(e); alert(e.message || 'Failed'); }
    finally { setSaving(false); }
  };

  if (loading) return <AdminLayout user={{ username: "Admin User" }} activePage="yachts"><div style={{padding:'40px'}}>Loading...</div></AdminLayout>;

  return (
    <AdminLayout user={{ username: "Admin User" }} activePage="yachts">
      <header className="header">
        <div className="header-title">
          <h1 id="edit-yacht-title">Edit Yacht</h1>
          <p>Update yacht details</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={()=>router.push('/admin/yachts')}>Cancel</button>
          <button className="btn-primary" onClick={save} disabled={saving}>{saving?'Saving...':'Update Yacht'}</button>
        </div>
      </header>

      <div className="form-container">
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-grid">
            <div className="form-group full-width"><label>Yacht Name</label><input type="text" className="form-control" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></div>
            <div className="form-group"><label>Yacht Type</label><select className="form-control" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}><option>Motor Yacht</option><option>Sailing Yacht</option><option>Catamaran</option><option>Superyacht</option></select></div>
            <div className="form-group"><label>Location / Marina</label><input type="text" className="form-control" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value,marina:e.target.value})}/></div>
            <div className="form-group full-width"><label>Description</label><textarea className="form-control" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Specifications</h2>
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
          <h2 className="section-title">Amenities & Facilities</h2>
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
          <h2 className="section-title">Gallery</h2>
          {form.gallery.length > 0 && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'16px',marginBottom:'16px'}}>
              {form.gallery.map((url,idx)=>(
                <div key={idx} style={{position:'relative',border: form.img===url?'2px solid #C4A87C':'1px solid #E5E7EB',borderRadius:'8px',overflow:'hidden'}}>
                  <img src={url} alt="" style={{width:'100%',height:'140px',objectFit:'cover'}}/>
                  <div style={{position:'absolute',top:'8px',right:'8px',display:'flex',gap:'6px'}}>
                    <button type="button" onClick={(e)=>{e.preventDefault();e.stopPropagation();setForm(prev=>{const nf={...prev, img:url}; return nf;});}} style={{background:'rgba(0,0,0,0.6)',color:'white',border:'none',borderRadius:'4px',padding:'4px 8px',fontSize:'11px',cursor:'pointer'}}>Cover</button>
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
      </div>

      <style jsx>{`
        .header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;}
        .header-title h1{font-family:'Playfair Display',serif;font-size:32px;color:#1A222C;margin-bottom:8px;}
        .header-title p{font-size:14px;color:#6B7280;}
        .btn-primary{background:#1A222C;color:white;border:none;padding:12px 24px;border-radius:4px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .btn-secondary{background:white;border:1px solid #E5E7EB;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;color:#1F2937;}
        .header-actions{display:flex;gap:12px;}
        .form-container{display:flex;flex-direction:column;gap:24px;max-width:1000px;}
        .form-section{background:white;border:1px solid #E5E7EB;border-radius:12px;padding:32px;}
        .section-title{font-family:'Playfair Display',serif;font-size:20px;color:#1A222C;margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid #E5E7EB;}
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
