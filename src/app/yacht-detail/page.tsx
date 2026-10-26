'use client';

import { Suspense } from "react";
import YachtDetailContent from "./yacht-detail-content";

export default function YachtDetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: "200px 5%", textAlign: "center" }}>Loading...</div>}>
      <YachtDetailContent />
    </Suspense>
  );
}
