import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getClient();
    const { data, error } = await supabase.from('yachts').select('*').order('id', { ascending: true });
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getClient();
    const body = await req.json();
    const payload: any = {
      name: body.name,
      type: body.type,
      guests: body.guests ? Number(body.guests) : null,
      length: body.length_ft ? Number(body.length_ft) : body.length ? Number(body.length) : null,
      length_ft: body.length_ft ? Number(body.length_ft) : null,
      length_m: body.length_m ? Number(body.length_m) : null,
      cabins: body.cabins ? Number(body.cabins) : null,
      location: body.location || body.marina || null,
      marina: body.marina || body.location || null,
      price: body.price ? Number(body.price) : null,
      img: body.img || (Array.isArray(body.gallery) ? body.gallery[0] : null) || null,
      amenities: body.amenities || body.gallery || {},
      is_f1: false,
    };
    if (Array.isArray(body.gallery)) {
      payload.amenities = { ...(typeof payload.amenities === 'object' && !Array.isArray(payload.amenities) ? payload.amenities : {}), gallery: body.gallery, images: body.gallery };
    } else if (body.amenities && typeof body.amenities === 'object') {
      payload.amenities = body.amenities;
    }
    const { data, error } = await supabase.from('yachts').insert([payload]).select().single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
