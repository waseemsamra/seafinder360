export default function DashboardContent() {
  return (
    <>
      <header className="header">
        <div className="header-title">
          <h1>Good morning, Admin</h1>
          <p>Here is what is happening with your fleet today.</p>
        </div>
        <div className="date-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Oct 24, 2026
        </div>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Revenue</div>
          <div className="kpi-value">AED 124,500</div>
          <div className="kpi-trend trend-up">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            +14.5% <span>vs last month</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Active Bookings</div>
          <div className="kpi-value">42</div>
          <div className="kpi-trend trend-up">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            +8.2% <span>vs last week</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Total Fleet</div>
          <div className="kpi-value">156</div>
          <div className="kpi-trend"><span style={{color: '#6B7280'}}>Yachts & Boats</span></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">New Users</div>
          <div className="kpi-value">89</div>
          <div className="kpi-trend trend-down">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
            -2.4% <span>vs last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="section-card">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <button className="btn-link">View All</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Charter</th>
                <th>Yacht</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-medium">Sarah Jenkins</td><td className="text-muted">Majestic 120</td><td className="text-muted">Oct 25, 2026</td><td className="font-medium">AED 8,500</td><td><span className="badge badge-confirmed">Confirmed</span></td></tr>
              <tr><td className="font-medium">David Smith</td><td className="text-muted">Ocean Pearl</td><td className="text-muted">Oct 26, 2026</td><td className="font-medium">AED 4,200</td><td><span className="badge badge-pending">Pending</span></td></tr>
              <tr><td className="font-medium">Ali Hassan</td><td className="text-muted">Sea Breeze</td><td className="text-muted">Oct 24, 2026</td><td className="font-medium">AED 6,000</td><td><span className="badge badge-confirmed">Confirmed</span></td></tr>
              <tr><td className="font-medium">Michael Chen</td><td className="text-muted">Royal Falcon</td><td className="text-muted">Oct 22, 2026</td><td className="font-medium">AED 21,500</td><td><span className="badge badge-completed">Completed</span></td></tr>
            </tbody>
          </table>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
          <div className="section-card">
            <div className="section-header"><h2>Upcoming Today</h2></div>
            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-time">10:00 AM</div>
                <div className="schedule-info"><div className="schedule-title">Majestic 120 Departure</div><div className="schedule-sub">Dubai Marina (GMCO)</div></div>
                <div className="schedule-avatar">SJ</div>
              </div>
              <div className="schedule-item">
                <div className="schedule-time">02:00 PM</div>
                <div className="schedule-info"><div className="schedule-title">Sea Breeze Departure</div><div className="schedule-sub">Dubai Harbour</div></div>
                <div className="schedule-avatar">AH</div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-header"><h2>Fleet Utilization</h2></div>
            <div className="chart-container">
              <div className="chart-row"><div className="chart-labels"><span>Majestic 120</span><span>92%</span></div><div className="bar-bg"><div className="bar-fill" style={{width:'92%'}}></div></div></div>
              <div className="chart-row"><div className="chart-labels"><span>Ocean Pearl</span><span>78%</span></div><div className="bar-bg"><div className="bar-fill" style={{width:'78%'}}></div></div></div>
              <div className="chart-row"><div className="chart-labels"><span>Sea Breeze</span><span>65%</span></div><div className="bar-bg"><div className="bar-fill" style={{width:'65%'}}></div></div></div>
              <div className="chart-row"><div className="chart-labels"><span>Royal Falcon</span><span>45%</span></div><div className="bar-bg"><div className="bar-fill" style={{width:'45%'}}></div></div></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; }
        .header-title h1 { font-family:'Playfair Display',serif; font-size:32px; color:#1A222C; margin-bottom:8px; }
        .header-title p { font-size:14px; color:#6B7280; }
        .date-badge { background:white; border:1px solid #E5E7EB; padding:8px 16px; border-radius:20px; font-size:13px; font-weight:600; color:#1A222C; display:flex; align-items:center; gap:8px; }
        .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-bottom:32px; }
        .kpi-card { background:white; border:1px solid #E5E7EB; border-radius:12px; padding:24px; display:flex; flex-direction:column; gap:12px; }
        .kpi-title { font-size:13px; color:#6B7280; font-weight:500; text-transform:uppercase; letter-spacing:0.5px; }
        .kpi-value { font-family:'Playfair Display',serif; font-size:32px; color:#1A222C; font-weight:700; }
        .kpi-trend { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; }
        .trend-up { color:#10B981; }
        .trend-down { color:#EF4444; }
        .kpi-trend span { color:#6B7280; font-weight:400; }
        .dashboard-grid { display:grid; grid-template-columns:2fr 1fr; gap:24px; }
        .section-card { background:white; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
        .section-header { padding:20px 24px; border-bottom:1px solid #E5E7EB; display:flex; justify-content:space-between; align-items:center; }
        .section-header h2 { font-size:18px; font-weight:700; color:#1A222C; }
        .btn-link { background:none; border:none; color:#C4A87C; font-size:13px; font-weight:600; cursor:pointer; text-decoration:underline; }
        table { width:100%; border-collapse:collapse; }
        th { background:#F9FAFB; padding:12px 24px; font-size:11px; font-weight:600; color:#6B7280; text-transform:uppercase; letter-spacing:1px; text-align:left; border-bottom:1px solid #E5E7EB; }
        td { padding:16px 24px; font-size:14px; border-bottom:1px solid #E5E7EB; }
        tr:last-child td { border-bottom:none; }
        .font-medium { font-weight:600; color:#1A222C; }
        .text-muted { color:#6B7280; }
        .badge { display:inline-block; padding:4px 10px; border-radius:100px; font-size:11px; font-weight:600; }
        .badge-confirmed { background:#D1FAE5; color:#065F46; }
        .badge-pending { background:#FEF3C7; color:#92400E; }
        .badge-completed { background:#F3F4F6; color:#4B5563; }
        .schedule-list { padding:10px 24px; }
        .schedule-item { display:flex; gap:16px; padding:16px 0; border-bottom:1px solid #E5E7EB; align-items:center; }
        .schedule-item:last-child { border-bottom:none; }
        .schedule-time { background:#F9F6F0; color:#92400E; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; min-width:80px; text-align:center; }
        .schedule-info { flex-grow:1; }
        .schedule-title { font-size:14px; font-weight:600; color:#1A222C; }
        .schedule-sub { font-size:12px; color:#6B7280; }
        .schedule-avatar { width:32px; height:32px; border-radius:50%; background:#1A222C; color:white; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; }
        .chart-container { padding:24px; display:flex; flex-direction:column; gap:20px; }
        .chart-row { display:flex; flex-direction:column; gap:8px; }
        .chart-labels { display:flex; justify-content:space-between; font-size:13px; font-weight:500; color:#1A222C; }
        .chart-labels span:last-child { color:#6B7280; font-weight:400; }
        .bar-bg { width:100%; height:8px; background:#F8F9FA; border-radius:4px; overflow:hidden; }
        .bar-fill { height:100%; background:#C4A87C; border-radius:4px; }
        @media (max-width:1200px){ .kpi-grid{grid-template-columns:repeat(2,1fr)} .dashboard-grid{grid-template-columns:1fr} }
      `}</style>
    </>
  );
}
