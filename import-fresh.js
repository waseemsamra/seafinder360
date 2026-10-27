const {createClient}=require('@supabase/supabase-js');
const fs=require('fs');
const https=require('https');
const http=require('http');
const ImageKit=require('imagekit');
const env=fs.readFileSync('/Users/apple/Downloads/seafinder360/.env.local','utf8');
const getEnv=(k)=>{const m=env.match(new RegExp(k+'=(.*)'));return m?m[1].trim().replace(/\r/g,''):'';};
const s=createClient(getEnv('NEXT_PUBLIC_SUPABASE_URL'),getEnv('SUPABASE_SERVICE_ROLE_KEY'));
const ik=new ImageKit({publicKey:getEnv('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY'),privateKey:getEnv('IMAGEKIT_PRIVATE_KEY'),urlEndpoint:getEnv('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT')});
function dl(u){return new Promise((res,rej)=>{const cl=u.startsWith('https')?https:http;const r=cl.get(u,{headers:{'User-Agent':'Mozilla/5.0'},timeout:8000},(resp)=>{if(resp.statusCode>=300&&resp.statusCode<400&&resp.headers.location)return dl(resp.headers.location).then(res).catch(rej);if(resp.statusCode!==200)return rej(resp.statusCode);const c=[];resp.on('data',x=>c.push(x));resp.on('end',()=>res(Buffer.concat(c)));});r.on('error',rej);r.on('timeout',()=>{r.destroy();rej('t');});});}
async function run(){
  await s.from('yachts').delete().neq('id',0);
  const csv=fs.readFileSync('/Users/apple/Downloads/yachts_clean.csv','utf8');
  const lines=csv.split(/\r?\n/).filter(l=>l.trim());
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    const parts=[];let cur='';let q=false;
    for(let j=0;j<line.length;j++){
      if(line[j]==='"'){q=!q;continue;}
      if(line[j]===','&&!q){parts.push(cur.trim());cur='';}
      else cur+=line[j];
    }
    parts.push(cur.trim());
    const trackSeq=String(i+1).padStart(3,'0');
    const name=parts[0],price=parts[1],length=parts[2],capacity=parts[3],crew=parts[4],rooms=parts[5],location=parts[6];
    const imageUrls=parts.slice(7).filter(u=>u&&u.startsWith('http'));
    console.log(`[${trackSeq}] ${name} imgs:${imageUrls.length}`);
    const imgs=[];
    for(let k=0;k<Math.min(imageUrls.length,15);k++){
      try{
        const u=imageUrls[k];const up=u.split('?')[0];let ext=up.split('.').pop().toLowerCase();
        if(ext.length>4||!['jpg','jpeg','png','webp','gif','avif'].includes(ext))ext='jpg';
        const fn=`yacht_${trackSeq}_${String(k+1).padStart(2,'0')}.${ext}`;
        const buf=await dl(u);
        const res=await ik.upload({file:buf,fileName:fn,useUniqueFileName:false});
        imgs.push(res.url);
        if((k+1)%5===0) console.log(`  ${k+1} done`);
      }catch(e){}
    }
    const priceNum=parseInt((String(price).match(/\d+/)||['0'])[0])||0;
    const g=String(capacity).match(/\d+/);
    const guests=g?parseInt(g[0]):12;
    const lm=String(length).match(/[\d.]+/);
    const len=lm?parseFloat(lm[0]):70;
    const cm=String(rooms).match(/\d+/);
    const cab=cm?parseInt(cm[0]):3;
    const {error}=await s.from('yachts').insert({name,price:priceNum,type:'Motor Yacht',guests,length:len,length_ft:len,cabins:cab,location:location||'Dubai Harbour',marina:location||'Dubai Harbour',img:imgs[0]||null,amenities:[crew,rooms].filter(Boolean),is_f1:false});
    if(error) console.log('ERR',error.message); else console.log('OK',imgs.length);
  }
  console.log('DONE');
  process.exit(0);
}
run();
