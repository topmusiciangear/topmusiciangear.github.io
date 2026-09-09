const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const terms = [
  ['caballo de batalla', 'workhorse'],
  ['todoterreno', 'all-rounder|all arounder|do-it-all'],
  ['la máquina de|máquina de', 'machine of|machine for|groove machine'],
  ['sin esfuerzo', 'effortless|effortlessly'],
  ['sin complicaciones', 'hassle-free|hassle free|trouble-free'],
  ['nivel profesional', 'pro level|professional level|studio-grade|pro-grade'],
  ['estándar de la industria', 'industry standard|industry benchmark'],
  ['benchmark', null],
  ['no tiene rival', "unrivaled|unrivalled|no rival|second to none"],
  ['sin igual', 'unmatched|without equal'],
  ['la bestia|bestia de|bestia del|bestia,', 'beast of|the beast'],
  ['monstruo de|es un monstruo', 'monster of|monster '],
  ['imprescindible', 'essential|must-have|must have'],
  ['increíble', 'incredible'],
  ['impresionante', 'impressive|stunning'],
  ['a otro nivel', 'to another level|next level|another level'],
  ['a prueba de balas', 'bulletproof'],
  ['el santo grial', 'holy grail'],
  ['arma definitiva', 'ultimate weapon|final weapon'],
  ['desbloquea', 'unlock'],
  ['eleva tu', 'elevate your|take your'],
  ['el rey|Rey de|rey del|rey de', 'king of|the king'],
  ['sin lugar a dudas', 'without a doubt|no doubt about it'],
  ['definitivamente', 'definitely'],
  ['sin duda', 'surely|undoubtedly'],
  ['sin igual', 'unmatched'],
  ['ya sea', 'whether you'],
  ['depende de', 'depends on|depends how'],
  ['al final', 'in the end|at the end of the day'],
  ['en última instancia', 'ultimately|in the final analysis'],
  ['encontrar el equilibrio|equilibrio perfecto|equilibrio entre', 'balance between|sweet spot'],
  ['hazlo bien', 'do it right'],
  ['el término medio', 'middle ground'],
  ['lo que realmente importa', 'what really matters'],
  ['no solo', 'not just|not only'],
  ['es la opción', 'is the choice|is the option'],
  ['la elección', 'the choice'],
  ['dentro de tu presupuesto', 'within your budget|in your budget'],
  ['según tu presupuesto', 'depending on your budget'],
  ['bajo presupuesto|presupuesto ajustado', 'tight budget|budget'],
  ['sin importar', 'regardless of|no matter'],
  ['lo convierten en', 'make it the|making it the'],
  ['lo que lo convierte', 'which makes it'],
  ['en el corazón de', 'at the heart of'],
  ['el corazón de', 'the heart of'],
];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

let rows = [];
g.forEach(function (gi, giIdx) {
  const name = gi.id || ('g' + giIdx);
  function walk(o, path) {
    if (o === null || o === undefined) return;
    if (typeof o === 'string') {
      terms.forEach(function (pair) {
        const esRe = new RegExp(esc(pair[0]), 'gi');
        const enRe = pair[1] ? new RegExp(esc(pair[1]), 'gi') : null;
        const isEs = /_es$/.test(path) || (path.indexOf('title_es') > -1);
        const re = isEs || (path === 'intro_es') ? esRe : (enRe || esRe);
        let m;
        while ((m = re.exec(o)) !== null && m[0] !== '') {
          const start = Math.max(0, m.index - 70);
          rows.push({
            guide: name,
            path,
            term: m[0].toLowerCase(),
            lang: /_es$/.test(path) ? 'ES' : (/^\w+$/.test(path) ? 'ES?' : 'EN'),
            snippet: o.slice(start, m.index + m[0].length + 90).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
          });
        }
      });
      return;
    }
    if (Array.isArray(o)) o.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
    else Object.keys(o).forEach(function (k) { walk(o[k], path ? path + '.' + k : k); });
  }
  walk(gi, '');
});

const byTerm = {};
rows.forEach(function (r) {
  if (!byTerm[r.term]) byTerm[r.term] = [];
  byTerm[r.term].push(r);
});

console.log('TOTAL MATCHES:', rows.length);
console.log('\n--- BY TERM ---');
Object.keys(byTerm).sort((a, b) => byTerm[b].length - byTerm[a].length).forEach(function (t) {
  const es = byTerm[t].filter(r => r.lang === 'ES').length;
  const en = byTerm[t].filter(r => r.lang !== 'ES').length;
  console.log((byTerm[t].length) + '\t' + t + '  (ES:' + es + ' / EN:' + en + ')');
});

fs.writeFileSync('temp/_ai_phrase_matches.json', JSON.stringify(rows, null, 2));
console.log('\nFull dump -> temp/_ai_phrase_matches.json');