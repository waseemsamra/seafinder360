import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileName = (formData.get('fileName') as string) || file?.name || 'image.jpg';
    
    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const result = await imagekit.upload({
      file: buffer,
      fileName: fileName.replace(/[^a-zA-Z0-9.-]/g, '_'),
      useUniqueFileName: true,
    });
    
    return NextResponse.json({ url: result.url, fileId: result.fileId, name: result.name });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
