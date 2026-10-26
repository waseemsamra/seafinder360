import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request, { params }: any) {
  const id = params?.id;
  if (!id) {
    return NextResponse.json({ dispatch: null, items: [], vendors: {} }, { headers: { 'Cache-Control': 'no-store' } });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase.from('vendor_dispatches').select('*').eq('id', id);
  const dispatch = data && data[0] ? data[0] : null;
  const { data: items } = await supabase.from('vendor_dispatch_items').select('*').eq('dispatch_id', dispatch?.id || id);
  const vendors: any = {};
  if (items && items.length > 0) {
    const ids = items.map((i:any)=>i.vendor_id);
    const { data: vs } = await supabase.from('vendors').select('*').in('id', ids);
    (vs||[]).forEach((v:any)=>{vendors[v.id]=v;});
  }
  return NextResponse.json({ dispatch, items: items||[], vendors }, { headers: { 'Cache-Control': 'no-store' } });
}
