import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data: existing } = await supabase.from('vendors').select('id').eq('business_name', 'Dubai Marina Charters').single();
    if (existing) {
      return NextResponse.json({ data: existing, message: 'exists' });
    }
    
    const { data, error } = await supabase.from('vendors').insert({
      business_name: 'Dubai Marina Charters',
      name: 'Dubai Marina Charters',
      email: 'info@dubaimarinacharters.com',
      phone: '+971501234567',
      whatsapp: '+971501234567',
      type: 'yacht_rental',
      is_active: true
    }).select();
    
    return NextResponse.json({ data, error });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
