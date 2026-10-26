import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data: dispatch } = await supabase
      .from('vendor_dispatches')
      .select('*')
      .eq('id', params.id)
      .single();
    
    const { data: items } = await supabase
      .from('vendor_dispatch_items')
      .select('*')
      .eq('dispatch_id', params.id);
    
    let vendors: any = {};
    if (items && items.length > 0) {
      const vendorIds = items.map((i: any) => i.vendor_id);
      const { data: vs } = await supabase.from('vendors').select('*').in('id', vendorIds);
      (vs || []).forEach((v: any) => { vendors[v.id] = v; });
    }
    
    return NextResponse.json({ dispatch, items: items || [], vendors });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    if (body.action === 'approve') {
      await supabase.from('vendor_dispatches').update({ status: 'approved', approved_at: new Date().toISOString() }).eq('id', params.id);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
