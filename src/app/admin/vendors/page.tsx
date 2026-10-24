"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

export default function VendorsPage() {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      companyName: "Royal Yachts LLC",
      contactPerson: "Ahmed Al Maktoum",
      email: "contact@royalyachts.ae",
      phone: "+971 50 123 4567",
      category: "Charter Company",
      location: "Dubai Marina",
      status: "Active",
      joined: "10/15/2026"
    },
    {
      id: 2,
      companyName: "Dubai Marina Services",
      contactPerson: "Sarah Johnson",
      email: "info@dxbmarina.com",
      phone: "+971 55 987 6543",
      category: "Marina Services",
      location: "Port Rashid",
      status: "Active",
      joined: "9/20/2026"
    },
    {
      id: 3,
      companyName: "Ocean Prestige Brokers",
      contactPerson: "Mohammed Khan",
      email: "sales@oceanprestige.com",
      phone: "+971 52 456 7890",
      category: "Yacht Sales",
      location: "Jumeirah Beach Residence",
      status: "Pending",
      joined: "10/10/2026"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [pasteData, setPasteData] = useState("");
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

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id));
    }
  };
    e.preventDefault();
    const newVendor = {
      id: vendors.length + 1,
      ...formData,
      joined: new Date().toLocaleDateString()
    };
    setVendors([...vendors, newVendor]);
    setShowAddModal(false);
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      category: "",
      location: "",
      status: "Pending"
    });
  };

  const handleEditVendor = (vendor: any) => {
    setEditingVendor(vendor);
    setFormData({
      companyName: vendor.companyName,
      contactPerson: vendor.contactPerson,
      email: vendor.email,
      phone: vendor.phone,
      category: vendor.category,
      location: vendor.location,
      status: vendor.status
    });
    setShowEditModal(true);
  };

  const handleUpdateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    setVendors(vendors.map(v => v.id === editingVendor.id ? { ...v, ...formData } : v));
    setShowEditModal(false);
    setEditingVendor(null);
  };

  const filteredVendors = vendors.filter(v => 
    v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      if (file.name.endsWith('.csv')) {
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter(line => line.trim());
        if (lines.length === 0) return;
        
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const isHeader = headers.some(h => h.toLowerCase().includes('company') || h.toLowerCase().includes('email') || h.toLowerCase().includes('name'));
        const dataLines = isHeader ? lines.slice(1) : lines;
        
        const importedVendors = dataLines.filter(l => l.trim()).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          if (isHeader) {
            const getVal = (keys: string[]) => {
              for (let k of keys) {
                const idx = headers.findIndex(h => {
                  const hn = h.toLowerCase().replace(/[^a-z0-9]/g, '');
                  return hn.includes(k) || k.includes(hn);
                });
                if (idx >= 0 && values[idx]) return values[idx];
              }
              return '';
            };
            return {
              id: vendors.length + index + 1,
              companyName: getVal(['company', 'companyname', 'name']) || values[1] || values[0] || `Vendor ${vendors.length + index + 1}`,
              contactPerson: getVal(['contact', 'contactperson', 'person']) || '',
              email: getVal(['email']) || values[3] || values[values.length - 1] || '',
              phone: getVal(['phone', 'number', 'mobile', 'contactnumber', 'phoneno']) || values[2] || values[3] || '',
              category: getVal(['category', 'type']) || 'Vendor',
              location: getVal(['location', 'city', 'address']) || '',
              status: getVal(['status']) || 'Active',
              joined: new Date().toLocaleDateString()
            };
          } else {
            return {
              id: vendors.length + index + 1,
              companyName: values[1] || values[0] || `Vendor ${vendors.length + index + 1}`,
              contactPerson: values[1] || '',
              email: values[3] || values[2] || '',
              phone: values[2] || values[3] || '',
              category: 'Vendor',
              location: '',
              status: 'Active',
              joined: new Date().toLocaleDateString()
            };
          }
        });
        
        setVendors([...vendors, ...importedVendors]);
        setShowImportModal(false);
        alert(`${importedVendors.length} vendors imported successfully!`);
      } else {
        const XLSX = (await import('xlsx')).default || await import('xlsx');
        const data = await file.arrayBuffer();
        let workbook;
        try {
          workbook = XLSX.read ? XLSX.read(data, { type: 'array' }) : (XLSX as any).read(data, { type: 'array' });
        } catch (e) {
          workbook = (XLSX as any).read(new Uint8Array(data), { type: 'array' });
        }
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) throw new Error('No sheet found');
        const jsonData = (XLSX.utils || (XLSX as any).utils).sheet_to_json(worksheet, { defval: '' }) as any[];
        
        const importedVendors = jsonData.map((row, index) => {
          const keys = Object.keys(row);
          const findKey = (searchTerms: string[]) => {
            for (let term of searchTerms) {
              const key = keys.find(k => {
                const normalized = k.toLowerCase().replace(/[^a-z0-9]/g, '');
                return normalized.includes(term) || term.includes(normalized);
              });
              if (key) return row[key];
            }
            return '';
          };
          
          return {
            id: vendors.length + index + 1,
            companyName: findKey(['company', 'companyname', 'name']) || row[keys[1]] || row[keys[0]] || `Vendor ${vendors.length + index + 1}`,
            contactPerson: findKey(['contact', 'contactperson', 'person']) || row[keys[1]] || '',
            email: findKey(['email']) || row[keys[keys.length - 1]] || row[keys[3]] || '',
            phone: findKey(['phone', 'number', 'mobile', 'contactnumber', 'phoneno']) || row[keys[2]] || row[keys[3]] || '',
            category: findKey(['category', 'type']) || 'Vendor',
            location: findKey(['location', 'city', 'address']) || '',
            status: findKey(['status']) || 'Active',
            joined: new Date().toLocaleDateString()
          };
        });
        
        setVendors([...vendors, ...importedVendors]);
        setShowImportModal(false);
        alert(`${importedVendors.length} vendors imported successfully!`);
      }
    } catch (error) {
      alert('Error importing file. Please check the file format.');
    }
    e.target.value = '';
  };

  const importFromContactList = async () => {
    try {
      const xlsx = await import('xlsx');
      const XLSX = (xlsx as any).default || xlsx;
      let response = await fetch('/CONTACTLIST.csv');
      if (!response.ok) {
        response = await fetch('/CONTACT LIST.xlsx');
      }
      const text = await response.text();
      if (response.url.includes('.csv') || text.includes(',')) {
        const lines = text.split(/\r?\n/).filter(line => line.trim());
        if (lines.length === 0) return;
        const headers = lines[0].split(',').map(h => h.trim().replace(/\"/g, ''));
        const dataLines = lines.slice(1);
        const importedVendors = dataLines.filter(l => l.trim()).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/\"/g, ''));
          const getVal = (keys) => {
            for (let k of keys) {
              const idx = headers.findIndex(h => h.toLowerCase().replace(/[^a-z0-9]/g, '').includes(k));
              if (idx >= 0 && values[idx] && values[idx] !== '') return values[idx];
            }
            return '';
          };
          const companyName = getVal(['company']) || values[1] || '';
          const phone = getVal(['contact', 'number', 'phone']) || values[2] || values[4] || '';
          const email = getVal(['email']) || values[3] || '';
          if (!companyName && !email) return null;
          return {
            id: vendors.length + index + 1,
            companyName: String(companyName).trim() || (email ? email.split('@')[0] : 'Vendor'),
            contactPerson: '',
            email: email,
            phone: phone,
            category: 'Vendor',
            location: '',
            status: 'Active',
            joined: new Date().toLocaleDateString()
          };
        }).filter(Boolean);
        setVendors(prev => [...prev, ...importedVendors]);
        alert(importedVendors.length + ' vendors imported from CONTACTLIST!');
        return;
      }
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read ? XLSX.read(arrayBuffer) : (xlsx as any).read(arrayBuffer);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = (XLSX.utils || (xlsx as any).utils).sheet_to_json(worksheet, { header: 1 });
      const importedVendors = jsonData.slice(1).filter(row => row && (row[1] || row[2] || row[3])).map((row, index) => {
        const companyName = row[1] || '';
        const phone = row[2] ? String(row[2]).replace(/\t/g, '').trim() : '';
        const email = row[3] ? String(row[3]).trim() : '';
        if (!companyName && !email) return null;
        return {
          id: vendors.length + index + 1,
          companyName: String(companyName).trim() || (email ? email.split('@')[0] : 'Vendor'),
          contactPerson: '',
          email: email,
          phone: phone,
          category: 'Vendor',
          location: '',
          status: 'Active',
          joined: new Date().toLocaleDateString()
        };
      }).filter(Boolean);
      setVendors(prev => [...prev, ...importedVendors]);
      alert(importedVendors.length + ' vendors imported from CONTACT LIST!');
    } catch (error) {
      alert('Error importing CONTACT LIST');
    }
  };

  const handlePasteImport = () => {
    // Try to parse first line as header or data
    const lines = pasteData.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) return;
    
    const parsedVendors = lines.map((line, index) => {
      // Split by tab or multiple spaces
      const parts = line.includes('\t') 
        ? line.split('\t').map(s => s.trim())
        : line.split(/\s{2,}|\t/).map(s => s.trim());
      
      // If no clear split, try comma
      if (parts.length < 2 && line.includes(',')) {
        const commaParts = line.split(',').map(s => s.trim());
        const companyName = commaParts[0] || '';
        const phone = commaParts[1] || commaParts[2] || '';
        if (!companyName) return null;
        return {
          id: vendors.length + index + 1,
          companyName,
          contactPerson: '',
          email: commaParts.find(p => p.includes('@')) || '',
          phone: phone,
          category: 'Vendor',
          location: '',
          status: 'Active',
          joined: new Date().toLocaleDateString()
        };
      }
      
      const companyName = parts[0] || '';
      const phone = parts[1] || '';
      if (!companyName) return null;
      
      // Skip if it's header
      if (companyName.toLowerCase().includes('name') && phone.toLowerCase().includes('number')) return null;
      
      return {
        id: vendors.length + index + 1,
        companyName: companyName.replace(/[?‚Äî]/g, '').trim(),
        contactPerson: '',
        email: '',
        phone: phone === 'Online' || phone === 'Online number' || phone === '‚Äî' ? '' : phone.replace(/[?]/g, '').trim(),
        category: 'Vendor',
        location: '',
        status: 'Active',
        joined: new Date().toLocaleDateString()
      };
    }).filter(Boolean) as any[];
    
    if (parsedVendors.length > 0) {
      setVendors(prev => [...prev, ...parsedVendors]);
      setShowPasteModal(false);
      setPasteData("");
      alert(`${parsedVendors.length} vendors imported!`);
    }
  };

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="vendors">
      <header className="header">
        <div className="header-title">
          <h4>Vendor Management</h4>
          <h1>All Vendors</h1>
          <p>Manage yacht vendors, brokers and service providers</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setVendors([])}>
            Clear Table
          </button>
          <button className="btn-secondary" onClick={importFromContactList}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import CONTACT LIST
          </button>
          <button className="btn-secondary" onClick={() => setShowImportModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import CSV/Excel
          </button>
          <button className="btn-secondary" onClick={() => setShowPasteModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            Paste Details
          </button>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Vendor
          </button>
        </div>
      </header>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search vendors by name, email, phone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="font-medium">{vendor.companyName}</td>
                <td>{vendor.contactPerson}</td>
                <td className="text-muted">{vendor.email}</td>
                <td className="text-muted">{vendor.phone}</td>
                <td>{vendor.category}</td>
                <td className="text-muted">{vendor.location}</td>
                <td>
                  <span className={`badge ${vendor.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="text-muted">{vendor.joined}</td>
                <td>
                  <div className="actions">
                    <button className="btn-action btn-edit" onClick={() => handleEditVendor(vendor)}>Edit</button>
                    <button className="btn-action btn-disable">View</button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(vendor.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Vendor Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Vendor</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <form onSubmit={handleUpdateVendor}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input type="text" required value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" value={formData.contactPerson} onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option value="">Select Category</option>
                      <option value="Charter Company">Charter Company</option>
                      <option value="Yacht Sales">Yacht Sales</option>
                      <option value="Marina Services">Marina Services</option>
                      <option value="Yacht Management">Yacht Management</option>
                      <option value="Brokerage">Brokerage</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Update Vendor</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Vendor</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddVendor}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input type="text" required value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Contact Person *</label>
                    <input type="text" required value={formData.contactPerson} onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option value="">Select Category</option>
                      <option value="Charter Company">Charter Company</option>
                      <option value="Yacht Sales">Yacht Sales</option>
                      <option value="Marina Services">Marina Services</option>
                      <option value="Yacht Management">Yacht Management</option>
                      <option value="Brokerage">Brokerage</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Add Vendor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Import Vendors (CSV/Excel)</h2>
              <button className="close-btn" onClick={() => setShowImportModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="upload-area">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <p className="upload-text">Drop your file here or click to browse</p>
                <p className="upload-hint">Supported format: .CSV, .XLSX, .XLS</p>
                <input type="file" accept=".csv,.xlsx,.xls" onChange={handleCsvImport} style={{ display: 'none' }} id="csvUpload" />
                <button type="button" className="btn-browse" onClick={() => document.getElementById('csvUpload')?.click()}>Browse Files</button>
                {csvFile && <p className="file-name">{csvFile.name}</p>}
              </div>
              <div className="csv-format-info">
                <p className="info-title">Format:</p>
                <p className="info-text">Columns: Company Name, Contact Person, Email, Phone/Contact Number, Category, Location, Status</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => { setShowImportModal(false); setCsvFile(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Paste Details Modal */}
      {showPasteModal && (
        <div className="modal-overlay" onClick={() => setShowPasteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Paste Vendor Details</h2>
              <button className="close-btn" onClick={() => setShowPasteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Paste vendor details (Name and Number, or CSV)</label>
                <textarea 
                  rows={12} 
                  placeholder="Raina	041208 491&#10;Alexander	052 899 6310&#10;Al Faris	Online number&#10;or&#10;Company Name, Email, Phone"
                  value={pasteData}
                  onChange={(e) => setPasteData(e.target.value)}
                />
              </div>
              <div className="paste-hint">
                <p>Each line should contain vendor information separated by commas</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowPasteModal(false)}>Cancel</button>
              <button type="button" className="btn-submit" onClick={handlePasteImport} disabled={!pasteData.trim()}>Import</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }
        .header-title h4 {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--gold-accent);
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .header-title h1 {
          font-family: var(--font-serif);
          font-size: 32px;
          color: var(--primary-navy);
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .header-title p {
          font-size: 14px;
          color: var(--text-muted);
        }
        .header-actions {
          display: flex;
          gap: 12px;
        }
        .btn-add {
          background-color: var(--primary-navy);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
          box-shadow: 0 4px 6px -1px rgba(26, 34, 44, 0.2);
        }
        .btn-add:hover {
          background-color: var(--primary-hover);
        }
        .btn-secondary {
          background-color: white;
          color: var(--primary-navy);
          border: 1px solid var(--border-color);
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background-color: var(--bg-color);
          border-color: var(--gold-accent);
        }
        .search-bar {
          margin-bottom: 24px;
        }
        .search-bar input {
          width: 100%;
          max-width: 400px;
          padding: 10px 16px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 14px;
          font-family: var(--font-sans);
        }
        .table-container {
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th {
          background-color: #F9FAFB;
          padding: 16px 24px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--border-color);
        }
        td {
          padding: 16px 24px;
          font-size: 14px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-main);
          vertical-align: middle;
        }
        tr:last-child td {
          border-bottom: none;
        }
        tr:hover {
          background-color: #F8F9FA;
        }
        .font-medium {
          font-weight: 600;
          color: var(--primary-navy);
        }
        .text-muted {
          color: var(--text-muted);
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .badge-active {
          background-color: #D1FAE5;
          color: #065F46;
        }
        .badge-pending {
          background-color: var(--gold-light);
          color: #92400E;
        }
        .actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .btn-action {
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .btn-edit {
          color: var(--primary-navy);
        }
        .btn-edit:hover { background-color: #F3F4F6; }
        .btn-disable {
          color: var(--gold-hover);
        }
        .btn-disable:hover { background-color: var(--gold-light); }
        .btn-delete {
          color: #EF4444;
        }
        .btn-delete:hover { background-color: #FEF2F2; }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          border-bottom: 1px solid var(--border-color);
        }
        .modal-header h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          color: var(--primary-navy);
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: var(--text-muted);
          line-height: 1;
        }
        .modal-body {
          padding: 32px;
        }
        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 24px 32px;
          border-top: 1px solid var(--border-color);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-group {
          margin-bottom: 16px;
          flex: 1;
        }
        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--primary-navy);
          margin-bottom: 6px;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 14px;
          font-family: var(--font-sans);
        }
        .form-group textarea {
          resize: vertical;
        }
        .btn-cancel {
          background-color: white;
          color: var(--text-main);
          border: 1px solid var(--border-color);
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-submit {
          background-color: var(--primary-navy);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .upload-area {
          border: 2px dashed var(--border-color);
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .upload-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary-navy);
        }
        .upload-hint {
          font-size: 12px;
          color: var(--text-muted);
        }
        .btn-browse {
          background-color: white;
          color: var(--primary-navy);
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .file-name {
          font-size: 13px;
          color: var(--gold-accent);
          font-weight: 600;
        }
        .csv-format-info {
          background-color: var(--gold-light);
          padding: 16px;
          border-radius: 6px;
        }
        .info-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }
        .info-text {
          font-size: 12px;
          color: var(--text-muted);
        }
        .paste-hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 8px;
        }
      `}</style>
    </AdminLayout>
  );
}
