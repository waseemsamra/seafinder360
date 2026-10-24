"use client";

import AdminLayout from "@/components/AdminLayout";

export default function AdminUsersPage() {
  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="users">
      <header className="header">
        <div className="header-title">
          <h4>User Management</h4>
          <h1>All Users</h1>
          <p>Manage customers, yacht owners, and agents</p>
        </div>
        <button className="btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add User
        </button>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">Demo Customer</td>
              <td className="text-muted">customer@demo.com</td>
              <td><span className="badge badge-user">User</span></td>
              <td>Charterer</td>
              <td style={{ color: '#10B981', fontWeight: 500 }}>Active</td>
              <td className="text-muted">10/11/2026</td>
              <td>
                <div className="actions">
                  <button className="btn-action btn-edit">Edit</button>
                  <button className="btn-action btn-disable">Disable</button>
                  <button className="btn-action btn-delete">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Sam</td>
              <td className="text-muted">info@dhowcruise.com</td>
              <td><span className="badge badge-user">User</span></td>
              <td>Yacht Owner</td>
              <td style={{ color: '#10B981', fontWeight: 500 }}>Active</td>
              <td className="text-muted">9/12/2026</td>
              <td>
                <div className="actions">
                  <button className="btn-action btn-edit">Edit</button>
                  <button className="btn-action btn-disable">Disable</button>
                  <button className="btn-action btn-delete">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-medium">trustagent</td>
              <td className="text-muted">info@agent.com</td>
              <td><span className="badge badge-agent">Agent</span></td>
              <td>Brokerage</td>
              <td style={{ color: '#10B981', fontWeight: 500 }}>Active</td>
              <td className="text-muted">9/8/2026</td>
              <td>
                <div className="actions">
                  <button className="btn-action btn-edit">Edit</button>
                  <button className="btn-action btn-disable">Disable</button>
                  <button className="btn-action btn-delete">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Mohammad</td>
              <td className="text-muted">staff@seafinder360.com</td>
              <td><span className="badge badge-user">User</span></td>
              <td>Marina Staff</td>
              <td style={{ color: '#EF4444', fontWeight: 500 }}>Inactive</td>
              <td className="text-muted">8/24/2026</td>
              <td>
                <div className="actions">
                  <button className="btn-action btn-edit">Edit</button>
                  <button className="btn-action btn-disable">Enable</button>
                  <button className="btn-action btn-delete">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Admin User</td>
              <td className="text-muted">admin@seafinder360.com</td>
              <td><span className="badge badge-admin">Admin</span></td>
              <td>Super Admin</td>
              <td style={{ color: '#10B981', fontWeight: 500 }}>Active</td>
              <td className="text-muted">8/29/2026</td>
              <td>
                <div className="actions">
                  <button className="btn-action btn-edit">Edit</button>
                  <button className="btn-action btn-disable" disabled style={{ opacity: 0.3, cursor: 'not-allowed' }}>Disable</button>
                  <button className="btn-action btn-delete" disabled style={{ opacity: 0.3, cursor: 'not-allowed' }}>Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
        .btn-add {
          background-color: var(--primary-navy);
          color: white;
          border: none;
          padding: 12px 24px;
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
        .table-container {
          background: white;
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
        .badge-user {
          background-color: #F3F4F6;
          color: #4B5563;
        }
        .badge-agent {
          background-color: var(--gold-light);
          color: #92400E;
        }
        .badge-admin {
          background-color: var(--primary-navy);
          color: white;
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
      `}</style>
    </AdminLayout>
  );
}
