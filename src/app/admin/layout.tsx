"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.replace('/login');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('role_id').eq('id', session.user.id).single();
      if (profile?.role_id !== 1) {
        window.location.replace('/');
        return;
      }
    })();
  }, []);

  return <>{children}</>;
}
