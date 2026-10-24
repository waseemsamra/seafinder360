"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    "Luxury", "Black Yachts", "All yachts", "Standard", "F1", "Jacuzzi Yachts", "Premium", "Party", "Dinner", "Birthday", "Photoshoot", "Family Event", "Proposal", "100+ Guests", "NYE", "Over 80 ft", "Over 100 ft", "Over 120 ft", "Over 150 ft", "Corporate", "Wedding", "Inclusive", "Packages", "Motor Yachts", "5 Bedrooms+", "Vacation", "Yacht for Weekend", "Anniversary", "12 guests", "15 guests", "20 guests", "30 guests", "40 guests", "50 guests", "100 guests", "for a Day", "for 3 Days", "for a Week", "for a Month", "for a Night", "Dubai Marina"
  ]);
  const [newCat, setNewCat] = useState("");
  const [editIdx, setEditIdx] = useState(-1);
  const [editVal, setEditVal] = useState("");

  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories([...categories, newCat.trim()]);
    setNewCat("");
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setEditVal(categories[idx]);
  };

  const saveEdit = () => {
    if (editIdx >= 0) {
      const updated = [...categories];
      updated[editIdx] = editVal.trim();
      setCategories(updated);
      setEditIdx(-1);
    }
  };

  const deleteCat = (idx: number) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((_, i) => i !== idx));
    }
  };

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="categories">
      <header className="header">
        <div className="header-title">
          <h4>Category Management</h4>
          <h1>All Categories</h1>
          <p>Manage yacht categories</p>
        </div>
      </header>

      <div className="add-section">
        <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Add new category" />
        <button onClick={addCategory}>Add Category</button>
      </div>

      <div className="table-container">
        <table>
          <thead><tr><th>Category Name</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx}>
                <td>
                  {editIdx === idx ? (
                    <input value={editVal} onChange={(e) => setEditVal(e.target.value)} />
                  ) : (
                    cat
                  )}
                </td>
                <td>
                  <div className="actions">
                    {editIdx === idx ? (
                      <button className="btn-action" onClick={saveEdit}>Save</button>
                    ) : (
                      <button className="btn-action" onClick={() => startEdit(idx)}>Edit</button>
                    )}
                    <button className="btn-action delete" onClick={() => deleteCat(idx)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .header{margin-bottom:24px}
        .header-title h4{font-size:12px;text-transform:uppercase;color:#C4A87C;letter-spacing:1.5px;margin-bottom:8px}
        .header-title h1{font-family:'Playfair Display',serif;font-size:32px;color:#1A222C}
        .header-title p{color:#6B7280}
        .add-section{display:flex;gap:8px;margin-bottom:16px}
        .add-section input{padding:10px;border:1px solid #E5E7EB;border-radius:8px;flex:1;max-width:300px}
        .add-section button{background:#1A222C;color:white;border:none;padding:10px 16px;border-radius:4px;cursor:pointer}
        .table-container{background:white;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden}
        table{width:100%;border-collapse:collapse}
        th{background:#F9FAFB;padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;color:#6B7280}
        td{padding:12px 16px;border-top:1px solid #E5E7EB}
        .actions{display:flex;gap:12px;justify-content:flex-end}
        .btn-action{background:none;border:none;cursor:pointer;font-weight:600;color:#1A222C}
        .btn-action.delete{color:#EF4444}
      `}</style>
    </AdminLayout>
  );
}
