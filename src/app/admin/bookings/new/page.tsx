"use client";

import AdminLayout from "@/components/AdminLayout";
import NewBookingForm from "@/components/NewBookingForm";

export default function NewBookingPage() {
  return (
    <AdminLayout user={{ username: 'Admin User' }} activePage="bookings">
      <NewBookingForm backHref="/admin/bookings" />
    </AdminLayout>
  );
}
