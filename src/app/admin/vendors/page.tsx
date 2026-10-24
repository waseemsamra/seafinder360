"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVendor, setEditingVendor] = useState<any>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    status: "Pending"
  });
  const [pasteData, setPasteData] = useState("");

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    const newVendor = { id: vendors.length + 1, ...formData, joined: new Date().toLocaleDateString() };
    setVendors([...vendors, newVendor]);
    setShowAddModal(false);
    setFormData({ companyName: "", contactPerson: "", email: "", phone: "", category: "", location: "", status: "Pending" });
  };

  const handleEditVendor = (vendor: any) => {
    setEditingVendor(vendor);
    setFormData(vendor);
    setShowEditModal(true);
  };

  const handleUpdateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    setVendors(vendors.map(v => v.id === editingVendor.id ? { ...v, ...formData } : v));
    setShowEditModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id));
    }
  };

  const importFromContactList = async () => {
    try {
      const xlsx = await import('xlsx');
      const XLSX: any = (xlsx as any).default || xlsx;
      let response = await fetch('/CONTACTLIST.csv');
      if (!response.ok) response = await fetch('/CONTACT LIST.xlsx');
      const text = await response.text();
      if (response.url.includes('.csv')) {
        const lines = text.split(/\r?\n/).filter(l => l.trim());
        const headers = lines[0].split(',').map((h: string) => h.trim().replace(/"/g, ''));
      const imported = lines.slice(1).filter(l => l.trim()).map((line, idx) => {
        const values = line.split(',').map((v: string) => v.trim().replace(/"/g, ''));
        const getVal = (keys: string[]) => {
          for (let k of keys) {
            const i = headers.findIndex((h: string) => h.toLowerCase().replace(/[^a-z0-9]/g,'').includes(k));
            if (i >= 0 && values[i]) return values[i];
          }
          return '';
        };
        const companyName = getVal(['company']) || values[1] || '';
        const phone = getVal(['contact','number','phone']) || values[2] || '';
        const email = getVal(['email']) || values[3] || '';
        if (!companyName && !email) return null;
        return { id: Date.now() + idx + Math.random(), companyName: companyName || email.split('@')[0], contactPerson:'', email, phone, category:'Vendor', location:'', status:'Active', joined: new Date().toLocaleDateString() };
      }).filter(Boolean);
        setVendors((prev: any[]) => [...prev, ...imported]);
        alert(imported.length + ' imported');
        return;
      }
    } catch(e) { alert('Error'); }
  };

  const handlePasteImport = () => {
    const lines = pasteData.trim().split(/\n/).filter(l => l.trim());
    const imported = lines.map((line, idx) => {
      const parts = line.includes('\t') ? line.split('\t') : line.split(/\s{2,}/);
      const companyName = (parts[0] || '').trim().replace(/[?—]/g,'');
      const phone = (parts[1] || '').trim().replace(/[?]/g,'');
      if (!companyName) return null;
      if (companyName.toLowerCase().includes('name')) return null;
      return { id: Date.now() + idx + Math.random(), companyName, contactPerson:'', email:'', phone: phone === 'Online' || phone === 'Online number' ? '' : phone, category:'Vendor', location:'', status:'Active', joined: new Date().toLocaleDateString() };
    }).filter(Boolean);
    setVendors((prev: any[]) => [...prev, ...imported]);
    setShowPasteModal(false);
    setPasteData('');
    alert(imported.length + ' imported');
  };

  const filtered = vendors.filter((v: any) => 
    (v.companyName||'').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.email||'').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.phone||'').includes(searchTerm)
  );

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="vendors">
      <header className="header">
        <div className="header-title"><h4>Vendor Management</h4><h1>All Vendors</h1><p>Manage vendors</p></div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setVendors([])}>Clear Table</button>
          <button className="btn-secondary" onClick={importFromContactList}>Import CONTACT LIST</button>
          <button className="btn-secondary" onClick={() => setShowPasteModal(true)}>Paste Details</button>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>Add Vendor</button>
        </div>
      </header>
      <div className="search-bar"><input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
      <div className="table-container">
        <table>
          <thead><tr><th>Company</th><th>Contact</th><th>Email</th><th>Phone</th><th>Category</th><th>Status</th><th>Joined</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
          <tbody>
            {filtered.map((v: any) => (
              <tr key={v.id}>
                <td className="font-medium">{v.companyName}</td>
                <td>{v.contactPerson}</td>
                <td className="text-muted">{v.email}</td>
                <td className="text-muted">{v.phone}</td>
                <td>{v.category}</td>
                <td><span className="badge">{v.status}</span></td>
                <td className="text-muted">{v.joined}</td>
                <td><div className="actions"><button className="btn-action btn-edit" onClick={() => handleEditVendor(v)}>Edit</button><button className="btn-action btn-delete" onClick={() => handleDelete(v.id)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>Add Vendor</h2><button className="close-btn" onClick={() => setShowAddModal(false)}>×</button></div>
            <form onSubmit={handleAddVendor}>
              <div className="modal-body">
                <div className="form-group"><label>Company Name</label><input value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} required /></div>
                <div className="form-group"><label>Email</label><input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                <div className="form-group"><label>Phone</label><input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
              </div>
              <div className="modal-footer"><button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button><button type="submit" className="btn-submit">Add</button></div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>Edit Vendor</h2><button className="close-btn" onClick={() => setShowEditModal(false)}>×</button></div>
            <form onSubmit={handleUpdateVendor}>
              <div className="modal-body">
                <div className="form-group"><label>Company Name</label><input value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} required /></div>
                <div className="form-group"><label>Email</label><input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                <div className="form-group"><label>Phone</label><input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
              </div>
              <div className="modal-footer"><button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button><button type="submit" className="btn-submit">Update</button></div>
            </form>
          </div>
        </div>
      )}

      {showPasteModal && (
        <div className="modal-overlay" onClick={() => setShowPasteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>Paste Details</h2><button className="close-btn" onClick={() => setShowPasteModal(false)}>×</button></div>
            <div className="modal-body">
              <textarea rows={10} value={pasteData} onChange={(e) => setPasteData(e.target.value)} placeholder="Name	Number&#10;..." />
            </div>
            <div className="modal-footer"><button className="btn-cancel" onClick={() => setShowPasteModal(false)}>Cancel</button><button className="btn-submit" onClick={handlePasteImport}>Import</button></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px}
        .header-title h4{font-size:12px;text-transform:uppercase;color:#C4A87C;letter-spacing:1.5px;margin-bottom:8px}
        .header-title h1{font-family:'Playfair Display',serif;font-size:32px;color:#1A222C}
        .header-title p{color:#6B7280;font-size:14px}
        .header-actions{display:flex;gap:8px;flex-wrap:wrap}
        .btn-add{background:#1A222C;color:white;border:none;padding:10px 16px;border-radius:4px;cursor:pointer}
        .btn-secondary{background:white;border:1px solid #E5E7EB;padding:10px 16px;border-radius:4px;cursor:pointer}
        .search-bar{margin-bottom:16px}.search-bar input{width:100%;max-width:400px;padding:10px;border:1px solid #E5E7EB;border-radius:8px}
        .table-container{background:white;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden}
        table{width:100%;border-collapse:collapse}
        th{background:#F9FAFB;padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;color:#6B7280}
        td{padding:12px 16px;border-top:1px solid #E5E7EB}
        .font-medium{font-weight:600}
        .text-muted{color:#6B7280}
        .badge{background:#D1FAE5;color:#065F46;padding:4px 8px;border-radius:999px;font-size:11px}
        .actions{display:flex;gap:8px;justify-content:flex-end}
        .btn-action{background:none;border:none;cursor:pointer;font-weight:600}
        .btn-edit{color:#1A222C}
        .btn-delete{color:#EF4444}
        .modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000}
        .modal{background:white;border-radius:12px;width:100%;max-width:500px}
        .modal-header{display:flex;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #E5E7EB}
        .modal-body{padding:20px}.form-group{margin-bottom:12px}.form-group label{display:block;margin-bottom:4px;font-weight:600}
        .form-group input,.form-group textarea{width:100%;padding:8px;border:1px solid #E5E7EB;border-radius:6px}
        .modal-footer{display:flex;gap:8px;justify-content:flex-end;padding:16px 20px;border-top:1px solid #E5E7EB}
        .btn-cancel{background:white;border:1px solid #E5E7EB;padding:8px 16px;border-radius:4px}
        .btn-submit{background:#1A222C;color:white;border:none;padding:8px 16px;border-radius:4px}
        .close-btn{background:none;border:none;font-size:24px;cursor:pointer}
      `}</style>
    </AdminLayout>
  );
}
