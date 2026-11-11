const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,p]));

const topSlugs=[
'best-mic-for-podcasting',
'pro-interfaces',
'best-overdrive-distortion',
'guitar-bass-amps',
'best-synth-vsts',
'precision-vs-jazz',
'best-daw-for-beginners',
'best-beginner-electric-guitar',
'best-plugins',
'mixing-plugins',
'beginner-bass-guitars',
'guitar-pedals',
'best-microphone',
'best-headphones-for-mixing',
'vocal-plugins',
'best-reverb-delay',
'best-audio-repair-plugins',
'best-samplers-drum-computers',
'fender-guide',
'monitor-setup',
'best-guitar-plugins',
'best-bass-amps',
'channel-strip-plugins',
'best-looper-pedals',
'studio-subwoofers-setup',
'fender-bass-guide',
'streaming-interfaces',
'best-ribbon-mics',
'best-synthesizers',
'best-nylon-guitars-for-beginners',
'di-box',
'pro-daw',
'tuners-bass-guitar',
'open-headphones'
];

function getGuide(slug){
  return guides.find(g=>g.id===slug);
}

const report=[];
for(const slug of topSlugs){
  const g=getGuide(slug);
  if(!g){ report.push({slug,found:false}); continue; }
  const ids=new Set();
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(id=>ids.add(id)));
  (g.featuredProducts||[]).forEach(id=>ids.add(id));
  // productTable columns titles -> need mapping via product title
  // We'll just collect ids from sections and featured
  const mismatches=[];
  const missing=[];
  const offTopic=[];
  const guideCat=(g.category||'').toLowerCase();
  for(const id of ids){
    const p=prodMap.get(id);
    if(!p){ missing.push(id); continue; }
    const pCat=(p.category||'').toLowerCase();
    // simple heuristic: guide name contains keyword
    // check if product category is clearly unrelated
    // We'll flag if guide category is plugins and product category is accessories/tuner etc.
    if(guideCat.includes('plugin') && ['accessories','tuners'].includes(pCat)){
      offTopic.push({id,title:p.title,cat:pCat});
    }
    if(guideCat.includes('guitar') && pCat==='daw'){
      offTopic.push({id,title:p.title,cat:pCat});
    }
    if(guideCat.includes('mic') && pCat!=='microphones' && pCat!=='streaming'){
      // allow streaming
    }
  }
  report.push({
    slug,
    title:g.title,
    guideCat,
    distinctProducts:ids.size,
    ids:Array.from(ids),
    missing,
    offTopic
  });
}
console.log(JSON.stringify(report,null,2));
