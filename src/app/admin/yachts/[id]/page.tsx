import { Suspense } from "react";
import YachtEditClient from "./yacht-edit-client";

export default function Page() {
  return (
    <Suspense fallback={<div style={{padding:'40px'}}>Loading...</div>}>
      <YachtEditClient />
    </Suspense>
  );
}
