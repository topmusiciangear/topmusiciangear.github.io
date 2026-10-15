// Las guias "X vs Y" deben tener SOLO los 2 que se comparan.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;

const PLAN = [
  { gid: 'pro-microphones', fuera: [209, 210, 211], quedan: [2, 187] },
  { gid: 'pro-monitors',   fuera: [220, 221, 223, 224], quedan: [180, 181] },
];

PLAN.forEach(({ gid, fuera, quedan }) => {
  const g = guides.find(x => x.id === gid);
  const antes = g.sections.length;
  g.sections = g.sections.filter(s => !(s.products||[]).some(p => fuera.indexOf(p) > -1));
  g.featuredProducts = (g.featuredProducts||[]).filter(id => fuera.indexOf(id) < 0);
  const nv = g.verdictProsCons.length;
  g.verdictProsCons = g.verdictProsCons.filter(v => {
    const p = arr.find(x => x.title === (v.name||v.title));
    return !(p && fuera.indexOf(p.id) > -1);
  });
  console.log(gid + ': secciones ' + antes + ' -> ' + g.sections.length +
    ' | featured ' + JSON.stringify(g.featuredProducts) +
    ' | veredictos ' + nv + ' -> ' + g.verdictProsCons.length);
});

// titulo de tabla mal escrito en pro-microphones
{
  const g = guides.find(x => x.id === 'pro-microphones');
  const f = g.featuredSnippet;
  if (f.name2_en === 'Lewitt LCT 1040') {
    f.name2_en = 'Lewitt LCT1040 Ultimate Microphone System';
    f.name2_es = 'Lewitt LCT1040 Ultimate Microphone System';
    console.log('pro-microphones: titulo de tabla -> "' + f.name2_en + '"');
  }
}

// ---- verificacion ----
console.log('\n--- verificacion ---');
PLAN.forEach(({ gid, quedan }) => {
  const g = guides.find(x => x.id === gid);
  const ids = new Set();
  (g.featuredProducts||[]).forEach(i=>ids.add(i));
  g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
  const sobran = [...ids].filter(i => quedan.indexOf(i) < 0);
  const faltan = quedan.filter(i => !ids.has(i));
  console.log('\n  ' + gid + '  "' + g.title + '"');
  console.log('     productos: ' + ids.size + ' -> ' + [...ids].map(i=>{const p=arr.find(x=>x.id===i);return p?p.title:i;}).join(' | '));
  console.log('     sobran: ' + (sobran.length ? sobran.join(',') : 'ninguno'));
  console.log('     faltan: ' + (faltan.length ? faltan.join(',') : 'ninguno'));
  console.log('     veredictos (' + g.verdictProsCons.length + '): ' + g.verdictProsCons.map(v=>v.name||v.title).join(' | '));
  const f = g.featuredSnippet||{};
  console.log('     tabla vs: ' + (f.name1_en||'-') + ' | ' + (f.name2_en||'-'));
});
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('\nCJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));
fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json escrito');