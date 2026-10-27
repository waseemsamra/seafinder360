import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, yachtName, answers } = body;
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data: vendors } = await supabase.from('vendors').select('id').eq('is_active', true).limit(10);
    
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    
    const guests = parseInt(answers?.find((a: any) => a.step === 2)?.answerText?.match(/\d+/)?.[0] || '0') || null;
    const duration = answers?.find((a: any) => a.step === 1)?.answerText || null;
    const clientName = answers?.find((a: any) => a.step === 7)?.answerText || null;
    
    const { data: dispatch, error } = await supabase.from('vendor_dispatches').insert({
      session_id: null,
      yacht_name: yachtName || 'Yacht',
      client_name: clientName,
      guests: guests,
      duration: duration,
      answers: answers || [],
      preferences: {},
      status: 'pending',
      expires_at: expiresAt,
      dispatched_at: new Date().toISOString()
    }).select().single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (dispatch && vendors && vendors.length > 0) {
      const items = vendors.map((v: any) => ({
        dispatch_id: dispatch.id,
        vendor_id: v.id,
        token: crypto.randomUUID()
      }));
      const {error: itemsErr} = await supabase.from('vendor_dispatch_items').insert(items);
      if(itemsErr) console.error('items err', itemsErr);
    }
    
    return NextResponse.json({ success: true, dispatch });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
