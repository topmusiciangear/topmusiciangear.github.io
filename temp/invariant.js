// INVARIANTE: featuredProducts (las tarjetas) == columnas de tabla == veredictos
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byTitle = {}; arr.forEach(p => byTitle[p.title] = p);
const byId = {}; arr.forEach(p => byId[p.id] = p);
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const resolve = n => byTitle[n] || arr.find(p => norm(p.title) === norm(n)) || null;

const rows = [];
guides.forEach(g => {
  const feat = (g.featuredProducts || []).map(id => byId[id] ? byId[id].title : 'ID' + id);
  const cols = g.productTable ? g.productTable.columns.map(c => c.title) : null;
  const vps = g.verdictProsCons ? g.verdictProsCons.map(v => v.name || v.title) : null;
  if (!cols && !vps) return;
  const F = new Set(feat);
  const enTablaNoCard = cols ? cols.filter(c => !F.has(c)) : [];
  const cardNoTabla = cols ? feat.filter(t => cols.indexOf(t) < 0) : [];
  const enVpNoCard = vps ? vps.filter(c => !F.has(c)) : [];
  const cardNoVp = vps ? feat.filter(t => vps.indexOf(t) < 0) : [];
  // productos fantasma: nombre en tabla/veredicto que no existe en el catalogo
  const fantasma = (cols || []).concat(vps || []).filter(n => !resolve(n));
  const incognitos = [...new Set(fantasma)];
  if (enTablaNoCard.length || cardNoTabla.length || enVpNoCard.length || cardNoVp.length) {
    rows.push({ g, feat, enTablaNoCard, cardNoTabla, enVpNoCard, cardNoVp, incognitos });
  }
});

console.log('=== INVARIANTE tarjetas == tabla == veredictos ===');
console.log('guias con productoTable o verdictProsCons: ' + guides.filter(g=>g.productTable||g.verdictProsCons).length);
console.log('guias que VIOLAN el invariante: ' + rows.length + '\n');
rows.sort((a,b)=> (b.enVpNoCard.length+b.enTablaNoCard.length)-(a.enVpNoCard.length+a.enTablaNoCard.length));
rows.forEach((r, i) => {
  console.log((i+1) + '. ' + r.g.title_es + '   [' + r.g.id + ']');
  console.log('   tarjetas (' + r.feat.length + '): ' + r.feat.join(' | '));
  if (r.enTablaNoCard.length) console.log('   >> en TABLA pero SIN tarjeta: ' + r.enTablaNoCard.join(' ; '));
  if (r.cardNoTabla.length)  console.log('   >> con tarjeta pero SIN fila en tabla: ' + r.cardNoTabla.join(' ; '));
  if (r.enVpNoCard.length)    console.log('   >> en VEREDICTOS pero SIN tarjeta: ' + r.enVpNoCard.join(' ; '));
  if (r.cardNoVp.length)      console.log('   >> con tarjeta pero SIN veredicto: ' + r.cardNoVp.join(' ; '));
  if (r.incognitos.length)    console.log('   !! NOMBRE QUE NO EXISTE EN EL CATALOGO: ' + [...new Set(r.incognitos)].join(' ; '));
  console.log('');
});
console.log('guardado: temp/invariante.txt');
fs.writeFileSync(BASE+'temp/invariante.txt', rows.map((r,i)=>
  (i+1)+'. '+r.g.id+' | '+r.g.title_es+' | sin tarjeta en tabla: '+(r.enTablaNoCard.join('; ')||'-')+' | sin tarjeta en veredictos: '+(r.enVpNoCard.join('; ')||'-')+' | sin fila: '+(r.cardNoTabla.join('; ')||'-')+' | sin veredicto: '+(r.cardNoVp.join('; ')||'-')+' | inexistentes: '+([...new Set(r.incognitos)].join('; ')||'-')
).join('\n'));