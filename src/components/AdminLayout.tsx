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
  const handleLogout = () => {
    try { localStorage.clear(); sessionStorage.clear(); } catch {}
    try {
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
    } catch {}
    window.location.href = "/";
  };

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
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: var(--font-sans); }
        html, body { height: 100%; margin: 0; padding: 0; }
        body { background-color: var(--bg-color); color: var(--text-main); }
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
              <button onClick={handleLogout} style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer', background: 'transparent', border: '1px solid #ddd', borderRadius: '4px' }}>Logout</button>
            </div>
          </div>
        </header>
        <div className="main-layout">
          <aside className="sidebar">
            <nav className="nav-menu">
              <Link href="/admin" className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Dashboard
              </Link>
              <Link href="/admin/yachts" className={`nav-item ${activePage === 'yachts' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                Yachts
              </Link>
              <Link href="/admin/bookings" className={`nav-item ${activePage === 'bookings' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Bookings
              </Link>
              <Link href="/admin/users" className={`nav-item ${activePage === 'users' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Users
              </Link>
              <Link href="/admin/vendors" className={`nav-item ${activePage === 'vendors' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                Vendors
              </Link>
              <Link href="/admin/vendor-dispatch" className={`nav-item ${activePage === 'vendor-dispatch' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Vendor Dispatch
              </Link>
              <Link href="/admin/categories" className={`nav-item ${activePage === 'categories' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Categories
              </Link>
            </nav>
          </aside>
          <main className="main-content">{children}</main>
        </div>
      </div>
      <style jsx>{`
        .admin-container { min-height: 100vh; background-color: var(--bg-color); }
        .topbar { display: flex; align-items: center; justify-content: space-between; height: 70px; background-color: var(--topbar-bg); border-bottom: 1px solid var(--border-color); padding: 0 30px; position: sticky; top: 0; z-index: 100; }
        .topbar-left { display: flex; align-items: center; gap: 20px; }
        .logo-area { display: flex; flex-direction: column; }
        .logo-title { font-family: var(--font-serif); font-size: 20px; font-weight: 700; color: var(--primary-navy); line-height: 1; }
        .logo-subtitle { font-size: 11px; color: var(--text-muted); margin-top: 2px; letter-spacing: 0.5px; }
        .topbar-right { display: flex; align-items: center; gap: 20px; }
        .user-profile { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; background-color: var(--gold-accent); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px; }
        .user-info { display: flex; flex-direction: column; text-align: right; }
        .user-name { font-size: 14px; font-weight: 600; color: var(--text-main); }
        .user-email { font-size: 12px; color: var(--text-muted); }
        .main-layout { display: flex; min-height: calc(100vh - 70px); }
        .sidebar { width: 260px; background-color: var(--sidebar-bg); border-right: 1px solid var(--border-color); padding: 20px 0; position: sticky; top: 70px; height: calc(100vh - 70px); overflow-y: auto; }
        .nav-menu { display: flex; flex-direction: column; gap: 4px; padding: 0 12px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: var(--text-main); text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 8px; transition: all 0.2s ease; }
        .nav-item:hover { background-color: var(--bg-color); color: var(--primary-navy); }
        .nav-item.active { background-color: var(--active-bg); color: var(--active-text); font-weight: 600; }
        .nav-item svg { flex-shrink: 0; }
        .main-content { flex: 1; padding: 30px; max-width: calc(100vw - 260px); }
        @media (max-width: 1024px) {
          .sidebar { width: 220px; }
          .main-content { max-width: calc(100vw - 220px); padding: 20px; }
        }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main-content { max-width: 100%; }
        }
      `}</style>
    </>
  );
}
