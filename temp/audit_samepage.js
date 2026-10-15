// AUDITORIA FIABLE: comparar la tabla y los veredictos CONTRA LAS TARJETAS DE LA MISMA PAGINA.
// Asi no hay que resolver nombres contra el catalogo (que es donde metia ruido).
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}
const clean = h => String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u00f1\u00d1]/g,'n')
  .toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
// el numero de modelo es lo que identifica: el token mas largo con digitos
const idTok = s => {
  const t = norm(s).split(' ').filter(w => /\d/.test(w) && w.length >= 2);
  return t.sort((a,b)=>b.length-a.length)[0] || null;
};
// dos nombres de la misma pagina son el mismo producto si comparten
// el token identificador, o todos sus tokens significativos
function mismo(a, b) {
  const na = norm(a), nb = norm(b);
  if (na && nb && (na === nb || na.indexOf(nb) > -1 || nb.indexOf(na) > -1)) return true;
  const ta = idTok(a), tb = idTok(b);
  if (ta && tb && ta === tb) return true;
  const wa = na.split(' ').filter(w => w.length > 3), wb = nb.split(' ').filter(w => w.length > 3);
  if (!wa.length || !wb.length) return false;
  const setB = new Set(wb);
  const comunes = wa.filter(w => setB.has(w)).length;
  return comunes >= Math.max(2, Math.ceil(Math.min(wa.length, wb.length) * 0.6));
}

(async()=>{
  const guias = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8')).map(g=>g.id);
  const res = await pool(guias, 8, g => get('https://topmusiciangear.com/guides/'+g+'.html'));
  let leidas = 0;
  const A = [], B = [], C = [];
  res.forEach((d, k) => {
    if (!d) return; leidas++;
    const gid = guias[k];
    const cards = [...new Set([...d.matchAll(/<h3 class="guide-product-card-title">([\s\S]*?)<\/h3>/g)]
      .map(m => clean(m[1]).replace(/\s*\((each|par|set|pareja)\)\s*$/i, '')))];
    if (!cards.length) return;
    const thead = (d.match(/<table class="guide-comp-table"[\s\S]*?<\/thead>/i)||[''])[0];
    const cols = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m=>clean(m[1])).filter(Boolean);
    const vps = [...new Set([...d.matchAll(/<div class="verdict-product-name">([\s\S]*?)<\/div>/gi)].map(m=>clean(m[1])))];
    if (!cols.length && !vps.length) return;
    const h1 = clean((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[,''])[1]);
    // A) columna de tabla que no corresponde a ninguna tarjeta de la pagina
    cols.forEach(c => { if (!cards.some(x=>mismo(x,c))) A.push(h1 + '  |  TABLA: ' + c); });
    // B) veredicto que no corresponde a ninguna tarjeta
    vps.forEach(v => { if (!cards.some(x=>mismo(x,v))) B.push(h1 + '  |  VEREDICTO: ' + v); });
    // C) tarjeta sin columna ni veredicto
    cards.forEach(t => {
      const enCol = cols.some(c=>mismo(t,c)), enVp = vps.some(v=>mismo(t,v));
      if (!enCol && !enVp) C.push(h1 + '  |  TARJETA: ' + t);
    });
  });
  const ver = (t, n) => { console.log('\n### ' + t + ': ' + n.length); n.forEach(x=>console.log('   ' + x)); };
  console.log('paginas leidas: ' + leidas + ' de ' + guias.length);
  ver('A) columnas de tabla que NO son ninguna tarjeta de esa pagina', A);
  ver('B) veredictos que NO son ninguna tarjeta de esa pagina', B);
  ver('C) tarjetas SIN columna de tabla ni veredicto', C);
  console.log('\n=================================');
  const t = A.length+B.length+C.length;
  console.log(t ? 'DESAJUSTES: ' + t : 'TODO COINCIDE');
  fs.writeFileSync(BASE+'temp/tabla_productos.txt',
    'A) columna sin tarjeta:\n'+A.join('\n')+'\n\nB) veredicto sin tarjeta:\n'+B.join('\n')+'\n\nC) tarjeta sin columna ni veredicto:\n'+C.join('\n'));
})();