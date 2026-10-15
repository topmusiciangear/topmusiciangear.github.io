// INVARIANTE EN VIVO: tarjetas == tabla == veredictos, en el HTML publicado
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(n)).replace(/\s+/g,' ').trim();
const norm = s => clean(s).toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','ii','iii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','guide','black','white','model','original','classic','digital'];
function key(s){ return norm(s).split(' ').filter(w=>w.length>1 && IGN.indexOf(w)<0); }
// a es "b" si comparten al menos la mitad de los tokens significativos
function mismo(a, b) {
  const ka = key(a), kb = key(b);
  if (!ka.length || !kb.length) return false;
  const inter = ka.filter(w=>kb.indexOf(w)>-1).length;
  return inter >= Math.ceil(Math.min(ka.length, kb.length) * 0.7) && inter >= 2
      || (inter >= 2 && inter >= ka.length - 1 && inter >= kb.length - 1);
}
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}

(async()=>{
  const guias = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const res = await pool(guias, 8, g => get('https://topmusiciangear.com/guides/'+g+'.html'));
  const filas = [];
  res.forEach((d, k) => {
    if (!d) return;
    const cards = [...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/gi)].map(m=>clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i,'')))];
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    const h1 = clean((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[,''])[1]);
    const sinTarjeta = cols.filter(c => !cards.some(x=>mismo(x,c)));
    const sinFila = cards.filter(c => !cols.some(x=>mismo(x,c)));
    const sinVeredicto = vps.filter(v => !cards.some(x=>mismo(x,v)));
    const sinPros = cards.filter(c => !vps.some(x=>mismo(x,c)));
    if (sinTarjeta.length || sinFila.length || sinVeredicto.length || sinPros.length)
      filas.push({ gid: guias[k], h1, nCards: cards.length, nCols: cols.length, nVp: vps.length, sinTarjeta, sinFila, sinVeredicto, sinPros });
  });
  console.log('===== INVARIANTE EN VIVO: tarjetas == tabla == veredictos =====');
  console.log('guias con productoTable o verdictProsCons: ' + guides.length);
  console.log('guias que violan el invariante: ' + filas.length + '\n');
  filas.sort((a,b)=> (b.sinTarjeta.length+b.sinVeredicto.length)-(a.sinTarjeta.length+a.sinVeredicto.length));
  filas.forEach((r,i)=>{
    console.log((i+1)+'. '+r.h1+'   ['+r.gid+']   tarjetas '+r.nCards+' | tabla '+r.nCols+' | veredictos '+r.nVp);
    if (r.sinTarjeta.length)  console.log('   >> en TABLA pero SIN tarjeta (no existe en la guia): '+r.sinTarjeta.join(' ; '));
    if (r.sinFila.length)     console.log('   >> con tarjeta pero SIN fila en la tabla: '+r.sinFila.join(' ; '));
    if (r.sinVeredicto.length)console.log('   >> en VEREDICTOS pero SIN tarjeta: '+r.sinVeredicto.join(' ; '));
    if (r.sinPros.length)     console.log('   >> con tarjeta pero SIN veredicto 4+4: '+r.sinPros.join(' ; '));
    console.log('');
  });
  fs.writeFileSync(BASE+'temp/invariante_live.txt', filas.map((r,i)=>
    (i+1)+'. '+r.gid+' | '+r.h1+' | tablaSinTarjeta: '+(r.sinTarjeta.join('; ')||'-')+' | tarjetaSinFila: '+(r.sinFila.join('; ')||'-')+' | veredictoSinTarjeta: '+(r.sinVeredicto.join('; ')||'-')+' | tarjetaSinVeredicto: '+(r.sinPros.join('; ')||'-')
  ).join('\n'));
  console.log('guardado: temp/invariante_live.txt');
})();