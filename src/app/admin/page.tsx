"use client";

import AdminLayout from "@/components/AdminLayout";

export default function AdminPage() {
  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="dashboard">
      <header className="header">
        <div className="header-title">
          <h4>Dashboard</h4>
          <h1>Overview</h1>
          <p>Welcome to SeaFinder360 Admin</p>
        </div>
      </header>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
        <p>Dashboard content</p>
      </div>
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
      `}</style>
    </AdminLayout>
  );
}
