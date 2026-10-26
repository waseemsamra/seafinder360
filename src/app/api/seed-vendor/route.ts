import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data, error } = await supabase.from('vendors').upsert({
      business_name: 'Dubai Marina Charters',
      name: 'Dubai Marina Charters',
      email: 'info@dubaimarinacharters.com',
      phone: '+971501234567',
      whatsapp: '+971501234567',
      type: 'yacht_rental',
      is_active: true
    }, { onConflict: 'email' }).select();
    
    return NextResponse.json({ data, error });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
