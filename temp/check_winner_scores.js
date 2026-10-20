const fs = require('fs');
const path = require('path');
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const WINNERS = require('./winners.js');
const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'guide-scores.js'), 'utf8');
const SCORES = eval('(' + src.replace(/^[\s\S]*?var GUIDE_SCORES\s*=\s*/, '').replace(/;[\s\S]*$/, '') + ')');

const byId = {}; for (const p of products) if (p.id) byId[p.id] = p;

function clean(n) {
  return String(n || '').replace(/^(Guitarra\s+(Eléctrica\s+Inteligente|Inteligente|Parlor\s+Electroacústica|Electroacústica|Parlor|Acústica|acústica)|Bajo|Altavoz\s+(Activo|Pasivo|PA\s+Activo)|Columna\s+PA\s+Activa|Micrófono|Sistema\s+\S+|Controlador\s+DAW|Interfaz\s+Directa\s+Activa|Amplificador\s+\S+)\s+/i, '').trim();
}

let mismatches = [];
for (const g of guides) {
  const ids = [];
  for (const s of (g.sections || [])) for (const id of (s.products || [])) if (typeof id === 'number' && !ids.includes(id)) ids.push(id);
  const map = SCORES[g.id] || {};
  let max = -1, maxName = '';
  for (const id of ids) {
    const p = byId[id]; if (!p) continue;
    const names = [p.title_es, p.title, clean(p.title_es), clean(p.title)];
    let sc = 0;
    for (const n of names) { if (n && map[n] != null) { sc = map[n]; break; } }
    if (sc > max) { max = sc; maxName = p.title_es || p.title; }
  }
  const w = WINNERS[g.id];
  if (!w) continue;
  // score del ganador
  const wp = products.find(p => p.title_es === w || p.title === w);
  let ws = 0;
  if (wp) for (const n of [wp.title_es, wp.title, clean(wp.title_es), clean(wp.title)]) { if (n && map[n] != null) { ws = map[n]; break; } }
  if (ws < max) mismatches.push({ id: g.id, winner: w, ws, max, maxName });
}

console.log('Guías donde el ganador NO tiene la nota más alta:', mismatches.length);
for (const m of mismatches.slice(0, 40)) console.log(`${m.id}: gana ${m.winner} (${m.ws}) pero la nota máxima es ${m.maxName} (${m.max})`);
