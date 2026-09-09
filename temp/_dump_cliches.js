const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Only TRUE AI-flavored marketing clichés (ES + EN). Neutral phrases excluded on purpose.
const cliches = [
  'caballo de batalla','es el caballo','el caballo de','son el caballo',
  'todoterreno',
  'máquina de','maquina de','machine of',
  'estándar de la industria','estandar de la industria','industry standard',
  'sin esfuerzo','effortless','effortlessly',
  'sin complicaciones','hassle-free','hassle free',
  'nivel profesional','pro-level','pro level','studio-grade',
  'no tiene rival','unrivaled','unrivalled','unmatched','without equal','sin igual',
  'la bestia','bestia de','the beast','beast of','monstruo de','monster',
  'increíble','increible','incredible',
  'imprescindible','essential','indispensable',
  'arma definitiva','ultimate weapon','final weapon',
  'a prueba de balas','bulletproof','tank-like',
  'el rey del presupuesto','rey de las','king of the budget','budget king',
  'el rey de','king of ',
  'desbloquea','unlock','unlocks','unlock',
  'eleva tu','elevate your','take your workflow',
  'a otro nivel','to the next level','next level',
  'benchmark',
  'workhorse',
  'holy grail','santo grial',
  'definitely',
  'el santo grial',
  'peso pesado','heavyweight',
  'a prueba de','tanto para',
];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function langOf(path) {
  return /_es$/.test(path) ? 'ES' : 'EN';
}

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
          const start = Math.max(0, m.index - 130);
          const end = Math.min(o.length, m.index + m[0].length + 130);
          out.push({
            guide: name,
            path: path,
            lang: langOf(path),
            match: m[0],
            ctx: o.slice(start, end).replace(/\s+/g, ' ').trim()
          });
        }
      });
      return;
    }
    if (Array.isArray(o)) o.forEach(function (x, j) { walk(x, path + '[' + j + ']'); });
    else Object.keys(o).forEach(function (k) { walk(o[k], path ? path + '.' + k : k); });
  })(gi, '');
});

const byGuide = {};
out.forEach(function (r) { (byGuide[r.guide] = byGuide[r.guide] || []).push(r); });

let md = '# AI-CLICHE AUDIT\n\n';
Object.keys(byGuide).sort().forEach(function (gid) {
  md += '\n## ' + gid + ' (' + byGuide[gid].length + ')\n';
  byGuide[gid].forEach(function (r, k) {
    md += '\n### ' + (k + 1) + ' [' + r.lang + '] `' + r.match + '`\n';
    md += 'PATH: `' + r.path + '`\n';
    md += 'CTX: ' + r.ctx + '\n';
    md += 'REPLACED?: no\nNEW: \n';
  });
});

fs.writeFileSync('temp/_cliche_audit.md', md);
console.log('TOTAL:', out.length, 'guides:', Object.keys(byGuide).length);
fs.writeFileSync('temp/_cliche_matches.json', JSON.stringify(out, null, 1));