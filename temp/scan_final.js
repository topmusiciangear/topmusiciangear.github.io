const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('temp/_nat_chunk6.json', 'utf8'));

const patterns = [
  // EN
  /\bworkhorse(s)?\b/gi,
  /\bindustry standard\b/gi,
  /\bbenchmark(s)?\b/gi,
  /\beffortless(ly)?\b/gi,
  /\bhassle[- ]free\b/gi,
  /\bpro[- ]level\b/gi,
  /\bstudio[- ]grade\b/gi,
  /\bincredib(le|ly)\b/gi,
  /\bunmatched\b/gi,
  /\bunrivaled\b/gi,
  /\bsecond to none\b/gi,
  /\bthe beast\b/gi,
  /\bbeast of\b/gi,
  /\bmonster(s)?\b/gi,
  /\bking of the budget\b/gi,
  /\bholy grail\b/gi,
  /\bbulletproof\b/gi,
  /\bdefinitely\b/gi,
  /\bultimate weapon\b/gi,
  // wait: 'definitiva' used in descriptions as "the ultimate silent wireless rig" etc.
  // ES
  /\bcaballo(s)? de batalla\b/gi,
  /\btodoterreno\b/gi,
  /\b(e|é)st(a|á)ndar de la industria\b/gi,
  /\bsin esfuerzo\b/gi,
  /\bsin complicaciones\b/gi,
  /\bnivel profesional\b/gi,
  /\bimprescindible\b/gi,
  /\bla bestia\b/gi,
  /\bbestia de\b/gi,
  /\bmonstruo(a|s)? de\b/gi,
  /\bno tiene rival\b/gi,
  /\bincre(i|í)ble(s)?\b/gi,
  /\ba prueba de balas\b/gi,
  /\bdesbloquea\b/gi,
  /\beleva tu\b/gi,
  /\ba otro nivel\b/gi,
  /\bel rey del\b/gi,
  /\bel rey de\b/gi,
  /\barma definitiva\b/gi,
  /\bsin igual\b/gi,
  /\b(la|una) m(a|á)quina de (diseño|ritmos|batería|esta |la )\b/gi
];

const results = [];
for (const g of guides) {
  const all = [];
  (function walk(v, path) {
    if (typeof v === 'string') {
      for (const p of patterns) {
        let m;
        p.lastIndex = 0;
        while ((m = p.exec(v)) !== null) {
          const idx = m.index;
          const start = Math.max(0, idx - 70);
          const end = Math.min(v.length, idx + m[0].length + 70);
          all.push(path + ' => [' + m[0] + '] ...' + v.substring(start, end).replace(/\n/g, ' ') + '...');
        }
      }
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => walk(item, path + '[' + i + ']'));
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) if (k !== 'id') walk(x, path + '.' + k);
    }
  })(g, g.id);
  if (all.length) {
    results.push('### ' + g.id.toUpperCase());
    all.forEach(x => results.push('  ' + x));
  }
}

fs.writeFileSync('temp/scan_results2.txt', results.join('\n'), 'utf8');
let hits = 0;
for (const l of results) if (!l.startsWith('###')) hits++;
console.log('Total hit lines (excluding headers):', hits);