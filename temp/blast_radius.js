const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const byId = {}; list.forEach(p=>byId[p.id]=p);

const IDS = [105,493,106,495,154,494,109,108,152,153,626];
const RENAME = {
  105:'EV ZLX-12P-G2 Active PA Speaker',
  493:'JBL EON712 Active PA Speaker',
  106:'QSC K12.2 Active PA Speaker',
  495:'EV ELX200-15P Active PA Speaker',
  154:'Yamaha DBR12 Active PA Speaker',
  494:'LD Systems ICOA 12 A BT Active PA Speaker',
  109:'JBL PRX ONE Active PA Column',
  108:'Yamaha DXR12mkII Active PA Speaker',
  152:'Yamaha Stagepas 1K MKII Active PA Mixer',
  153:'Alto Professional TS412 Active PA Speaker',
  626:'Electro-Voice EVERSE 12 Active PA Speaker'
};

// donde aparece cada titulo actual, en todo guides.json (incluye featuredProducts)
function occurrences(title){
  const res = [];
  guides.forEach(g=>{
    const s = JSON.stringify(g);
    const n = (s.split('"'+title+'"').length-1);
    if (n) res.push(g.id + ' x' + n);
  });
  return res;
}
console.log('=== ALCANCE DEL RENOMBRADO ===\n');
Object.keys(RENAME).forEach(id=>{
  const p = byId[id];
  if (!p) { console.log('id ' + id + ': NO EXISTE'); return; }
  const occ = occurrences(p.title);
  console.log('id ' + id + '  ' + p.title);
  console.log('   -> ' + RENAME[id]);
  console.log('   en ' + occ.length + ' guia(s): ' + occ.join(', ') + '\n');
});

// tablas y veredictos de las dos guias objetivo, campo por campo
['live-sound-pa','active-vs-passive-pa'].forEach(gid=>{
  const g = guides.find(x=>x.id===gid);
  console.log('=== ' + gid + ' ===');
  if (g.productTable) {
    console.log('columnas EN: ' + g.productTable.columns.map(c=>c.title).join(' | '));
    console.log('columnas ES: ' + g.productTable.columns.map(c=>c.title_es||c.title).join(' | '));
    console.log('filas: ' + g.productTable.rows.map(r=>r.label).join(' | '));
  } else console.log('sin productTable');
  if (g.comparison) console.log('comparison.headers: ' + JSON.stringify(g.comparison.headers));
  console.log('veredictos EN: ' + (g.verdictProsCons||[]).map(v=>v.name).join(' | '));
  console.log('veredictos ES: ' + (g.verdictProsCons||[]).map(v=>v.name_es||v.name).join(' | '));
  console.log('featuredSnippet: ' + (g.featuredSnippet ? (g.featuredSnippet.name1_en+' / '+g.featuredSnippet.name2_en) : 'no'));
  console.log('');
});