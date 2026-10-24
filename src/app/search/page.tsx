import { Suspense } from "react";
import SearchClient from "./search-client";

export const metadata = {
  title: "The Dubai Fleet | SeaFinder360",
  description: "Browse the SeaFinder360 yacht fleet in Dubai, available by the hour.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{padding:40, background:'#0a0a0a', color:'#fff', minHeight:'100vh'}}>Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
