const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

const BRANDS = ['rode','shure','sennheiser','audio-technica','sony','jbl','yamaha','behringer','mackie','presonus','tascam','fifine','maono','tonor','razer','hyperx','blue','elgato','tc helicon','roland','røde','allen','heath','soundcraft','qsc','ev','electro-voice','evox','akg','neumann','beyerdynamic','audix','telefunken','squier','fender','epiphone','takamine','taylor','martin','gibson','ibanez','esp','strandberg','tascam','korg','midas','alesis','akai','arturia','enzo','enya','samson','fender','mxr','boss','earthquaker','strymon','tcelectronic','tc','electronic','dunlop','mxr','marshall','vox','orange','supro','blackstar','positive','grid','spark','yamaha','pioneer','denon','numark','reloop','traktor','serato','rane','mixars','gemini','roland','alesis','presonus','audient','focusrite','solid','state','logic','universal','audio','motu','rme','apogee','antelope','steinberg','avid','reason'];
function core(s) {
  return (s || '').toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w && !BRANDS.includes(w)).join('');
}
const catCores = arr.map(p => ({ id: p.id, title: p.title, c: core(p.title) }));
const byTitle = {};
arr.forEach(p => { byTitle[(p.title || '').toLowerCase()] = p.id; });
function titleToId(t) {
  if (!t) return null;
  const k = (t || '').toLowerCase().trim();
  if (byTitle[k] !== undefined) return byTitle[k];
  // fallback: titulo normalizado contenido en titulo de catalogo (o al reves)
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const nk = norm(t);
  if (nk.length >= 6) {
    const hits = arr.filter(p => { const n = norm(p.title); return n.includes(nk) || nk.includes(n); });
    const ids = [...new Set(hits.map(p => p.id))];
    if (ids.length === 1) return ids[0];
    if (ids.length > 1) return 'AMBIGUO:' + ids.map(id => id + '=' + idToTitle[id]).join('|');
  }
  const c = core(t);
  if (c.length < 2) return null;
  // exact core match
  let hits = catCores.filter(x => x.c === c);
  if (hits.length === 1) return hits[0].id;
  // containment (either direction), longest core wins
  hits = catCores.filter(x => x.c.includes(c) || c.includes(x.c));
  if (hits.length === 1) return hits[0].id;
  if (hits.length > 1) {
    // desambiguar: el de core mas largo que contenga
    hits.sort((a, b) => b.c.length - a.c.length);
    if (hits[0].c.length > (hits[1] ? hits[1].c.length : 0)) return hits[0].id;
    return 'AMBIGUO:' + hits.map(h => h.id + '=' + h.title).join('|');
  }
  return null;
}
const idToTitle = {};
arr.forEach(p => { idToTitle[p.id] = p.title; });

const rows = [];
guides.forEach(g => {
  const tIds = [], tUn = [];
  (g.productTable?.columns || []).forEach(c => {
    const id = titleToId(c.title);
    if (id === null) tUn.push(c.title);
    else if (typeof id === 'string') tUn.push(c.title + ' [' + id + ']');
    else tIds.push(id);
  });
  const vIds = [], vUn = [];
  (g.verdictProsCons || []).forEach(v => {
    if (!v) return;
    const id = titleToId(v.name);
    if (id === null) vUn.push(v.name);
    else if (typeof id === 'string') vUn.push(v.name + ' [' + id + ']');
    else vIds.push(id);
  });
  const tSet = new Set(tIds), vSet = new Set(vIds);
  const onlyV = [...vSet].filter(x => !tSet.has(x));
  const onlyT = [...tSet].filter(x => !vSet.has(x));
  const nT = (g.productTable?.columns || []).length;
  if (onlyV.length || onlyT.length || tUn.length || vUn.length) {
    rows.push({ id: g.id, nT, nV: (g.verdictProsCons || []).length, onlyV, onlyT, tUn, vUn });
  }
});
console.log('Guias con alguna diferencia: ' + rows.length + ' / ' + guides.length);
rows.forEach(r => {
  console.log('\n=== ' + r.id + ' [tabla:' + r.nT + ' veredictos:' + r.nV + ']');
  if (r.onlyV.length) console.log('  solo veredictos: ' + r.onlyV.map(x => idToTitle[x]).join(' | '));
  if (r.onlyT.length) console.log('  solo tabla: ' + r.onlyT.map(x => idToTitle[x]).join(' | '));
  if (r.tUn.length) console.log('  tabla sin match: ' + r.tUn.join(' | '));
  if (r.vUn.length) console.log('  veredicto sin match: ' + r.vUn.join(' | '));
});