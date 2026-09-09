const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const terms = ['essential', 'máquina de', 'estándar de la industria', 'industry standard', 'effortless', 'benchmark', 'sin esfuerzo', 'studio-grade', 'imprescindible', 'increíble', 'increible', 'workhorse', 'caballo de batalla', 'incredible', 'unlock', 'unlocks', 'nivel profesional', 'sin complicaciones', 'pro-level', 'todoterreno', 'bulletproof', 'a prueba de balas', 'sin igual', 'unmatched', 'definitely', 'elevate your'];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
const rows = [];
g.forEach(function (gi) {
  const id = gi.id;
  (function walk(o, path) {
    if (o === null || typeof o === 'undefined') return;
    if (typeof o === 'string') {
      terms.forEach(function (c) {
        const re = new RegExp(esc(c), 'gi');
        let m;
        while ((m = re.exec(o)) !== null) {
          const s = Math.max(0, m.index - 80);
          rows.push({ id, path, t: m[0], ctx: o.slice(s, m.index + m[0].length + 90).replace(/\s+/g, ' ').trim() });
        }
      });
      return;
    }
    if (Array.isArray(o)) o.forEach((x, i) => walk(x, path + '[' + i + ']'));
    else Object.keys(o).forEach(k => walk(o[k], path ? path + '.' + k : k));
  })(gi, '');
});

const byT = {};
rows.forEach(r => { (byT[r.t.toLowerCase()] = byT[r.t.toLowerCase()] || []).push(r); });
Object.keys(byT).sort((a, b) => byT[b].length - byT[a].length).forEach(function (t) {
  console.log('\n========== ' + t + ' (' + byT[t].length + ') ==========');
  byT[t].slice(0, 8).forEach(r => {
    console.log('[' + r.id + ' ' + r.path + ']');
    console.log('  ' + r.ctx);
  });
});