"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        document.location.href = '/login';
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('role_id').eq('id', session.user.id).maybeSingle();
      if (profile?.role_id !== 1) {
        document.location.href = '/';
        return;
      }
      setOk(true);
    };
    run();
  }, []);

  if (!ok) return null;
  return <>{children}</>;
}
