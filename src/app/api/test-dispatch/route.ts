import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data: vendors } = await supabase.from('vendors').select('id').eq('is_active', true);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const { data: dispatch, error } = await supabase.from('vendor_dispatches').insert({
      yacht_name: 'Test Yacht',
      client_name: 'Test Client',
      guests: 10,
      duration: '4 hours',
      answers: [],
      preferences: {},
      status: 'pending',
      expires_at: expiresAt,
      dispatched_at: new Date().toISOString()
    }).select().single();
    
    if (dispatch && vendors && vendors.length > 0) {
      const items = vendors.map((v: any) => ({
        dispatch_id: dispatch.id,
        vendor_id: v.id,
        token: crypto.randomUUID()
      }));
      await supabase.from('vendor_dispatch_items').insert(items);
    }
    
    return NextResponse.json({ dispatch, vendors, error });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
