const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// TRUE AI-flavored marketing clichés — verified ones, ES + EN. Neutral natural phrasing excluded.
const cliches = [
  'caballo de batalla',
  'todoterreno',
  'máquina de', 'maquina de',
  'machine of',
  'estándar de la industria', 'estandar de la industria', 'industry standard',
  'sin esfuerzo', 'effortless', 'effortlessly',
  'sin complicaciones', 'hassle-free', 'hassle free',
  'nivel profesional', 'pro-level', 'pro level', 'studio-grade', 'studio grade',
  'no tiene rival', 'unrivaled', 'unrivalled', 'unmatched', 'without equal', 'sin igual',
  'la bestia', 'bestia de', 'the beast', 'beast of', 'monstruo de', 'monster',
  'increíble', 'increible', 'incredible',
  'imprescindible', 'essential',
  'arma definitiva', 'ultimate weapon', 'final weapon',
  'a prueba de balas', 'bulletproof',
  'el rey del presupuesto', 'king of the budget',
  'desbloquea', 'unlock', 'unlocks', 'unlocked',
  'eleva tu', 'elevate your',
  'a otro nivel', 'to the next level',
  'benchmark',
  'workhorse',
  'holy grail', 'santo grial',
  'definitely', 'sin duda',
  'el rey', 'king of ',
];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function langOf(path) { return /_es$/.test(path) ? 'ES' : 'EN'; }

let out = [];
g.forEach(function (gi, i) {
  const name = gi.id || ('g' + i);
  (function walk(o, path) {
    if (o === null || o === undefined) return;
    if (typeof o === 'string') {
      cliches.forEach(function (c) {
        const re = new RegExp(esc(c), 'gi');
        let m;
        while ((m = re.exec(o)) !== null) {
          if (m[0].length === 0) break;
          out.push({ guide: name, path, lang: langOf(path), match: m[0] });
        }
      });
      return;
    }
    if (Array.isArray(o)) o.forEach(function (x, j) { walk(x, path + '[' + j + ']'); });
    else Object.keys(o).forEach(function (k) { walk(o[k], path ? path + '.' + k : k); });
  })(gi, '');
});

const byTerm = {};
out.forEach(function (r) { (byTerm[r.match.toLowerCase()] = byTerm[r.match.toLowerCase()] || []).push(r); });
console.log('TOTAL TRUE-CLICHE MATCHES:', out.length);
console.log('\n--- BY TERM ---');
Object.keys(byTerm).sort((a, b) => byTerm[b].length - byTerm[a].length).forEach(function (t) {
  const es = byTerm[t].filter(r => r.lang === 'ES').length;
  const en = byTerm[t].filter(r => r.lang !== 'ES').length;
  console.log(byTerm[t].length + '\t' + t + '  (ES:' + es + ' / EN:' + en + ')');
});

const byGuide = {};
out.forEach(function (r) { (byGuide[r.guide] = byGuide[r.guide] || []).push(r); });
console.log('\n--- GUIDES with count ---');
const sorted = Object.keys(byGuide).sort((a, b) => byGuide[b].length - byGuide[a].length);
sorted.forEach(function (gid) { console.log(byGuide[gid].length + '\t' + gid); });
fs.writeFileSync('temp/_true_cliche_matches.json', JSON.stringify(out, null, 1));