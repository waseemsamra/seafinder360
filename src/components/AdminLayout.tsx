import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: {
    username?: string;
    full_name?: string;
    role_id?: number;
  };
  activePage?: string;
}

export default function AdminLayout({ children, user, activePage = "users" }: AdminLayoutProps) {
  return (
    <>
      <style jsx global>{`
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
          --topbar-bg: #FFFFFF;
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
          background-color: var(--bg-color);
          color: var(--text-main);
        }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      
      <div className="admin-container">
        <header className="topbar">
          <div className="topbar-left">
            <div className="logo-area">
              <div className="logo-title">SeaFinder360</div>
              <div className="logo-subtitle">Management Portal</div>
            </div>
          </div>
          <div className="topbar-right">
          <div className="user-profile">
            <div className="avatar">A</div>
            <div className="user-info">
              <span className="user-name">{user?.username || "Admin User"}</span>
              <span className="user-email">admin@seafinder360.com</span>
            </div>
            <button
              onClick={async () => {
                try {
                  const { createClient } = await import("@/lib/supabase/client");
                  const supabase = createClient();
                  await supabase.auth.signOut({ scope: 'global' });
                } catch (e) {}
                try { localStorage.clear(); } catch(e){}
                try { sessionStorage.clear(); } catch(e){}
                try {
                  document.cookie.split(";").forEach(c => {
                    const eqPos = c.indexOf("=");
                    const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                  });
                } catch(e){}
                window.location.replace('/login');
              }}
              style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer', background: 'transparent', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              Logout
            </button>
            </div>
          </div>
        </header>
        <div className="admin-body">
          <aside className="sidebar">
            <nav className="nav-menu">
              <Link href="/admin" className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <span>Dashboard</span>
              </Link>
              <Link href="/admin/bookings" className={`nav-link ${activePage === 'bookings' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>Bookings</span>
              </Link>
              <Link href="/admin/yachts" className={`nav-link ${activePage === 'yachts' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M2 12h20"></path><path d="M12 2v20"></path><path d="M4.93 4.93l14.14 14.14"></path><path d="M19.07 4.93L4.93 19.07"></path></svg>
                <span>Yacht Fleet</span>
              </Link>
              <Link href="/admin/categories" className={`nav-link ${activePage === 'categories' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                <span>Categories</span>
              </Link>
              <Link href="/admin/users" className={`nav-link ${activePage === 'users' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>Users</span>
              </Link>
              <Link href="/admin/vendors" className={`nav-link ${activePage === 'vendors' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>Vendors</span>
              </Link>
              <Link href="/admin/vendor-dispatch" className={`nav-link ${activePage === 'vendor-dispatch' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>Vendor Dispatch</span>
              </Link>
              <Link href="#" className="nav-link">
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Agents</span>
              </Link>
            </nav>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          background-color: var(--topbar-bg);
          border-bottom: 1px solid var(--border-color);
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .topbar-left .logo-area {
          display: flex;
          flex-direction: column;
        }
        .logo-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--primary-navy);
          letter-spacing: -0.5px;
        }
        .logo-subtitle {
          font-size: 9px;
          text-transform: uppercase;
          color: var(--gold-accent);
          letter-spacing: 1.5px;
          margin-top: 2px;
          font-weight: 600;
        }
        .topbar-right .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar {
          width: 38px;
          height: 38px;
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
        .admin-body {
          display: flex;
          flex: 1;
        }
        .sidebar {
          width: 260px;
          min-width: 260px;
          background-color: var(--sidebar-bg);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 20px 0;
        }
        .nav-menu {
          display: flex;
          flex-direction: column;
          padding: 0 12px;
          gap: 4px;
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
          width: 100%;
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
          padding-left: 9px;
        }
        .nav-link.active svg {
          stroke: var(--gold-accent);
        }
        .nav-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          flex-shrink: 0;
          stroke: var(--text-muted);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .main-content {
          flex: 1;
          padding: 32px 40px;
          background-color: var(--bg-color);
        }
      `}</style>
    </>
  );
}
