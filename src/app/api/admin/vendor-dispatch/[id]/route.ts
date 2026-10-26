import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve((context as any).params);
    const id = resolvedParams?.id;

    if (!id || id === 'undefined' || id === 'null') {
      return NextResponse.json({ dispatch: null, items: [], vendors: {} });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: dispatch, error: dispatchError } = await supabase
      .from('vendor_dispatches')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (dispatchError) {
      console.error('[vendor-dispatch:id] dispatch error:', dispatchError);
    }

    const { data: items, error: itemsError } = await supabase
      .from('vendor_dispatch_items')
      .select('*')
      .eq('dispatch_id', id);

    if (itemsError) {
      console.error('[vendor-dispatch:id] items error:', itemsError);
    }

    const vendors: Record<string, any> = {};
    if (items && items.length > 0) {
      const vendorIds = items.map((i: any) => i.vendor_id).filter(Boolean);
      if (vendorIds.length > 0) {
        const { data: vs } = await supabase.from('vendors').select('*').in('id', vendorIds);
        (vs || []).forEach((v: any) => {
          vendors[v.id] = v;
        });
      }
    }

    return NextResponse.json(
      { dispatch: dispatch || null, items: items || [], vendors },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e: any) {
    console.error('[vendor-dispatch:id] exception:', e);
    return NextResponse.json({ dispatch: null, items: [], vendors: {} });
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve((context as any).params);
    const id = resolvedParams?.id;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (body.action === 'approve') {
      const approvedItemId = body.approvedItemId;
      const { data: existing } = await supabase
        .from('vendor_dispatches')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!existing) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      await supabase
        .from('vendor_dispatches')
        .update({ status: 'approved', approved_item_id: approvedItemId, approved_at: new Date().toISOString() })
        .eq('id', id);

      if (approvedItemId) {
        await supabase
          .from('vendor_dispatch_items')
          .update({ status: 'approved' })
          .eq('id', approvedItemId);
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch (e: any) {
    console.error('[vendor-dispatch:id] POST exception:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
