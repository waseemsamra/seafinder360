import Link from "next/link";

interface AdminDashboardProps {
  user?: {
    username?: string;
    full_name?: string;
    role_id?: number;
  };
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <>
      <style jsx global>{`
        /* --- SEAFINDER360 DESIGN SYSTEM --- */
        :root {
          --primary-navy: #1A222C;
          --primary-hover: #2A3543;
          --gold-accent: #C4A87C;
          --gold-light: #F9F6F0;
          --gold-hover: #b0956a;
          
          --sidebar-bg: #FFFFFF;
          --bg-color: #F8F9FA;
          --text-main: #1F2937;
          --text-muted: #6B7280;
          --border-color: #E5E7EB;
          
          --active-bg: #F9F6F0;
          --active-text: #1A222C;
          
          --font-sans: 'Inter', sans-serif;
          --font-serif: 'Playfair Display', serif;
        }

          * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-sans);
        }

        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-color);
          color: var(--text-main);
        }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-title">SeaFinder360</div>
          <div className="logo-subtitle">Management Portal</div>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link href="/admin" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M2 12h20"></path><path d="M12 2v20"></path><path d="M4.93 4.93l14.14 14.14"></path><path d="M19.07 4.93L4.93 19.07"></path></svg>
              Yacht Fleet
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/users" className="nav-link active">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Vendors
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Agents
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">A</div>
            <div className="user-info">
              <span className="user-name">{user?.username || user?.full_name || 'Admin User'}</span>
              <span className="user-email">admin@seafinder360.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
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
      </main>

      <style jsx>{`
        /* --- Sidebar Styles --- */
        .sidebar {
          width: 260px;
          min-width: 260px;
          background-color: var(--sidebar-bg);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          overflow-y: auto;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .logo-area {
          padding: 0 24px 24px 24px;
          margin-bottom: 10px;
        }

        .logo-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-navy);
          letter-spacing: -0.5px;
        }

        .logo-subtitle {
          font-size: 10px;
          text-transform: uppercase;
          color: var(--gold-accent);
          letter-spacing: 1.5px;
          margin-top: 4px;
          font-weight: 600;
        }

        .nav-menu {
          list-style: none;
          padding: 0 12px;
          flex-grow: 1;
        }

        .nav-item {
          margin-bottom: 4px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          text-decoration: none;
          color: var(--text-muted);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .nav-link:hover {
          background-color: var(--bg-color);
          color: var(--primary-navy);
        }

        .nav-link.active {
          background-color: var(--active-bg);
          color: var(--active-text);
          font-weight: 600;
          border-left: 3px solid var(--gold-accent);
          border-radius: 0 8px 8px 0;
        }

        .nav-link.active svg {
          stroke: var(--gold-accent);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          stroke: var(--text-muted);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .sidebar-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background-color: var(--primary-navy);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary-navy);
        }

        .user-email {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* --- Main Content Styles --- */
        .main-content {
          flex: 1 1 auto;
          padding: 40px 48px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

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

        /* --- Table Styles --- */
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

        /* Badges */
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

        /* Action Buttons */
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
    </>
  );
}
