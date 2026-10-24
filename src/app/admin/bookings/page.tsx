"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import Link from "next/link";

const ITEMS_PER_PAGE = 50;

export default function BookingsPage() {
  const generateBookings = () => {
    const guests = ["Sarah Jenkins", "David Smith", "Ali Hassan", "Michael Chen", "Emma Wilson", "Omar Khalid", "Jessica Lee", "Ahmed Noor", "Sofia Rodriguez", "Thomas Müller", "Fatima Al Zahra", "James Wilson", "Priya Sharma", "Khalid Mahmoud", "Laura Schmidt", "Mohammed Al Farsi", "Anna Petrov", "Hassan Ali", "Maria Garcia", "John Taylor", "Aisha Begum", "Robert Brown", "Nora Al Maktoum", "Daniel Kim", "Layla Hassan", "Chris Evans", "Amira Saeed", "Matthew Johnson", "Rania Mansour", "Kevin O'Brien", "Samira Khan", "Alex Turner", "Yasmin Al Hashimi", "Ryan Cooper", "Mariam Nasser", "Tom Anderson", "Zainab Ahmed", "Lucas Martin", "Hana Al Rashid", "Ben Harrison", "Noor Abdullah", "Nathan Scott", "Amina Yusuf", "Paul Mitchell", "Salma Ibrahim", "Oliver Hughes", "Reem Al Qasimi", "Jack Robinson", "Farah Khalil"];
    const yachts = ["Majestic 120", "Ocean Pearl", "Sea Breeze", "Royal Falcon", "Azure Queen", "Silver Star", "Golden Horizon", "Elite Cruiser", "Paradise Bay", "Diamond Star"];
    const statuses = ["Confirmed", "Pending", "Completed", "Cancelled"];
    
    return Array.from({ length: 50 }, (_, i) => {
      const seed = i * 131542391;
      const rand = (n: number) => ((seed + n) * 1103515245 + 12345) & 0x7fffffff;
      return {
        id: `BK-${8921 - i}`,
        guest: guests[i % guests.length],
        phone: `+971 ${String(rand(1) % 900 + 100).padStart(3,'0')} ${String(rand(2) % 900 + 100).padStart(3,'0')} ${String(rand(3) % 900 + 100).padStart(3,'0')}`,
        yacht: yachts[i % yachts.length],
        date: `Oct ${rand(4) % 30 + 1}, 2026`,
        time: `${rand(5) % 12 + 8}:00 ${rand(6) % 2 === 0 ? 'AM' : 'PM'} - ${rand(7) % 12 + 2}:00 ${rand(8) % 2 === 0 ? 'PM' : 'AM'}`,
        amount: `AED ${(rand(9) % 20000 + 2000).toLocaleString()}`,
        status: statuses[i % 4],
        bookedBy: ["Online", "Staff", "Agent"][i % 3]
      };
    });
  };

  const [bookings, setBookings] = useState(generateBookings());
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedByFilter, setBookedByFilter] = useState("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");

  const tabs = [
    { name: "All", count: bookings.length },
    { name: "Confirmed", count: bookings.filter(b => b.status === "Confirmed").length },
    { name: "Pending", count: bookings.filter(b => b.status === "Pending").length },
    { name: "Completed", count: bookings.filter(b => b.status === "Completed").length }
  ];

  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === "All" || b.status === activeTab;
    const matchesSearch = b.guest.toLowerCase().includes(searchTerm.toLowerCase()) || b.yacht.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || b.date.includes(selectedDate.slice(8));
    const matchesBookedBy = bookedByFilter === "All" || b.bookedBy === bookedByFilter;
    return matchesTab && matchesSearch && matchesDate && matchesBookedBy;
  });

  const startEdit = (booking: any) => {
    setEditingId(booking.id);
    setEditStatus(booking.status);
    setEditDate(booking.date);
  };

  const saveEdit = () => {
    setBookings(bookings.map(b => b.id === editingId ? { ...b, status: editStatus, date: editDate } : b));
    setEditingId(null);
  };

  const getBadgeClass = (status: string) => {
    if (status === "Confirmed") return "badge-confirmed";
    if (status === "Pending") return "badge-pending";
    if (status === "Completed") return "badge-completed";
    if (status === "Cancelled") return "badge-cancelled";
    return "";
  };

  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="bookings">
      <header className="header">
        <div className="header-title">
          <h1>Bookings</h1>
          <p>Manage all charter reservations and schedules</p>
        </div>
        <Link href="/admin/bookings/new" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Booking
        </Link>
      </header>

      <div className="controls-row">
        <div className="tabs">
          {tabs.map(tab => (
            <div key={tab.name} className={`tab ${activeTab === tab.name ? 'active' : ''}`} onClick={() => setActiveTab(tab.name)}>
              {tab.name} <span className="tab-count">{tab.count}</span>
            </div>
          ))}
        </div>
        <div className="filter-group" style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'12px', flexWrap:'nowrap'}}>
          <input type="text" className="search-input" placeholder="Search guest or yacht..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{height:'42px'}} />
          <select className="filter-select" value={bookedByFilter} onChange={(e) => setBookedByFilter(e.target.value)} style={{height:'42px', minWidth:'140px'}}>
            <option value="All">Booked By: All</option>
            <option value="Online">Online</option>
            <option value="Staff">Staff</option>
            <option value="Agent">Agent</option>
          </select>
          <input type="date" className="filter-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{height:'42px'}} />
          {(selectedDate || bookedByFilter !== "All") && <button className="btn-clear" onClick={() => {setSelectedDate(""); setBookedByFilter("All");}}>Clear</button>}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Yacht</th>
              <th>Date & Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Booked By</th>
              <th style={{textAlign:'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="booking-id">{booking.id}</td>
                <td>
                  <div className="font-medium">{booking.guest}</div>
                  <div className="text-muted" style={{fontSize:'12px'}}>{booking.phone}</div>
                </td>
                <td className="font-medium">{booking.yacht}</td>
                <td>
                  {editingId === booking.id ? (
                    <input type="text" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="status-select" />
                  ) : (
                    <>
                      <div className="font-medium">{booking.date}</div>
                      <div className="text-muted" style={{fontSize:'12px'}}>{booking.time}</div>
                    </>
                  )}
                </td>
                <td className="font-medium">{booking.amount}</td>
                <td>
                  {editingId === booking.id ? (
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="status-select">
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`badge ${getBadgeClass(booking.status)}`}><span className="dot"></span> {booking.status}</span>
                  )}
                </td>
                <td className="text-muted">{booking.bookedBy}</td>
                <td>
                  <div className="actions">
                    {editingId === booking.id ? (
                      <>
                        <button className="btn-icon" onClick={saveEdit} title="Save"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                        <button className="btn-icon" onClick={() => setEditingId(null)} title="Cancel"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                      </>
                    ) : (
                      <button className="btn-icon" onClick={() => startEdit(booking)} title="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="page-info">Showing {filteredBookings.length} of {bookings.length} entries</div>
        </div>
      </div>

      <style jsx>{`
        .header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; }
        .header-title h1 { font-family:'Playfair Display',serif; font-size:32px; color:#1A222C; margin-bottom:8px; }
        .header-title p { font-size:14px; color:#6B7280; }
        .btn-primary { display:flex; align-items:center; gap:8px; background:#1A222C; color:white; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:600; text-decoration:none; }
        .btn-clear { padding:10px 16px; border:1px solid #E5E7EB; background:white; border-radius:6px; cursor:pointer; font-size:13px; height:42px; }
        .controls-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
        .tabs { display:flex; gap:8px; background:white; padding:6px; border-radius:8px; border:1px solid #E5E7EB; }
        .tab { padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; color:#6B7280; display:flex; align-items:center; gap:6px; }
        .tab.active { background:#1A222C; color:white; }
        .tab-count { background:rgba(0,0,0,0.1); padding:2px 6px; border-radius:10px; font-size:11px; }
        .tab.active .tab-count { background:rgba(255,255,255,0.2); }
        .filter-group { display:flex; gap:12px; align-items:center; flex-direction:row; flex-wrap:nowrap; }
        .filter-select { padding:10px 16px; border:1px solid #E5E7EB; border-radius:6px; font-size:14px; height:42px; }
        .table-container { background:white; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
        table { width:100%; border-collapse:collapse; }
        th { background:#F9FAFB; padding:16px 24px; font-size:11px; font-weight:600; color:#6B7280; text-transform:uppercase; text-align:left; border-bottom:1px solid #E5E7EB; }
        td { padding:16px 24px; font-size:14px; border-bottom:1px solid #E5E7EB; }
        tr:last-child td { border-bottom:none; }
        .booking-id { font-size:12px; color:#6B7280; }
        .font-medium { font-weight:600; color:#1A222C; }
        .text-muted { color:#6B7280; }
        .badge { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; border-radius:100px; font-size:12px; font-weight:600; }
        .badge-confirmed { background:#D1FAE5; color:#065F46; }
        .badge-pending { background:#FEF3C7; color:#92400E; }
        .badge-completed { background:#F3F4F6; color:#4B5563; }
        .badge-cancelled { background:#FEE2E2; color:#991B1B; }
        .dot { width:6px; height:6px; border-radius:50%; background:currentColor; }
        .actions { display:flex; gap:8px; justify-content:flex-end; }
        .btn-icon { background:none; border:1px solid #E5E7EB; width:32px; height:32px; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#6B7280; }
        .status-select { padding:6px 10px; border:1px solid #E5E7EB; border-radius:6px; font-size:12px; }
        .pagination { padding:16px 24px; border-top:1px solid #E5E7EB; }
        .page-info { font-size:13px; color:#6B7280; }
      `}</style>
    </AdminLayout>
  );
}
