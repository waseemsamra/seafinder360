"use client";

import AdminLayout from "@/components/AdminLayout";
import DashboardContent from "@/components/DashboardContent";

export default function AdminPage() {
  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="dashboard">
      <DashboardContent />
    </AdminLayout>
  );
}
