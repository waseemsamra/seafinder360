const {createClient}=require('@supabase/supabase-js');
const fs=require('fs');
const https=require('https');
const http=require('http');
const ImageKit=require('imagekit');
const env=fs.readFileSync('/Users/apple/Downloads/seafinder360/.env.local','utf8');
const getEnv=(k)=>{const m=env.match(new RegExp(k+'=(.*)'));return m?m[1].trim().replace(/\r/g,''):'';};
const s=createClient(getEnv('NEXT_PUBLIC_SUPABASE_URL'),getEnv('SUPABASE_SERVICE_ROLE_KEY'));
const ik=new ImageKit({publicKey:getEnv('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY'),privateKey:getEnv('IMAGEKIT_PRIVATE_KEY'),urlEndpoint:getEnv('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT')});
function dl(u){return new Promise((res,rej)=>{const cl=u.startsWith('https')?https:http;const r=cl.get(u,{headers:{'User-Agent':'Mozilla/5.0'},timeout:5000},(resp)=>{if(resp.statusCode>=300&&resp.statusCode<400&&resp.headers.location)return dl(resp.headers.location).then(res).catch(rej);if(resp.statusCode!==200)return rej(resp.statusCode);const c=[];resp.on('data',x=>c.push(x));resp.on('end',()=>res(Buffer.concat(c)));});r.on('error',rej);r.on('timeout',()=>{r.destroy();rej('t');});});}
(async()=>{
  const csv=fs.readFileSync('/Users/apple/Downloads/yachts_clean.csv','utf8');
  const lines=csv.split(/\r?\n/).filter(l=>l.trim());
  for(let i=1;i<Math.min(lines.length, 25);i++){
    const line=lines[i];
    const parts=[];let cur='';let q=false;
    for(let j=0;j<line.length;j++){if(line[j]==='"'){q=!q;continue;}if(line[j]===','&&!q){parts.push(cur.trim());cur='';}else cur+=line[j];}
    parts.push(cur.trim());
    const trackSeq=String(i+1).padStart(3,'0');
    const name=parts[0];
    const imageUrls=parts.slice(7).filter(u=>u&&u.startsWith('http'));
    const imgs=[];
    for(let k=0;k<Math.min(imageUrls.length,5);k++){
      try{
        const u=imageUrls[k];const up=u.split('?')[0];let ext=up.split('.').pop().toLowerCase();if(ext.length>4||!['jpg','jpeg','png','webp','gif','avif'].includes(ext))ext='jpg';
        const fn=`yacht_${trackSeq}_${String(k+1).padStart(2,'0')}.${ext}`;
        const buf=await dl(u);
        const res=await ik.upload({file:buf,fileName:fn,useUniqueFileName:false});
        imgs.push(res.url);
      }catch(e){}
    }
    if(imgs.length>0){
      const {data}=await s.from('yachts').select('id').eq('name',name).order('id',{ascending:false}).limit(1).maybeSingle();
      if(data){await s.from('yachts').update({img:imgs[0]}).eq('id',data.id); console.log(trackSeq, imgs.length);}
    }
  }
  console.log('done');
  process.exit(0);
})();
