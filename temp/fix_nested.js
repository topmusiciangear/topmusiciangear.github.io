// El passthrough de fix_p_balance.js ya resolvio el parrafo 1->2.
// Queda separar el parrafo 3 ("SM7B or SM7dB?") del 2.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');

const EN_2 = 'it removes the single biggest SM7B headache at the source.';
const ES_2 = 'elimina de raíz el mayor dolor de cabeza del SM7B.';

const fix = (s, fin2) => {
  const b = s.indexOf(fin2);
  if (b < 0) throw new Error('ancla no encontrada');
  const after = s.slice(b + fin2.length, b + fin2.length + 4);
  if (after !== '<p><') throw new Error('fin2 no seguido de <p><: ' + JSON.stringify(after));
  return s.slice(0, b + fin2.length) + '</p>' + s.slice(b + fin2.length);
};

function check(s) {
  let depth = 0, max = 0;
  const re = /<(\/?)p(\s[^>]*)?>/gi;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m[1] === '/') depth--;
    else { depth++; max = Math.max(max, depth); }
  }
  return { depth, max };
}

g.sections[8].content = fix(g.sections[8].content, EN_2);
g.sections[8].content_es = fix(g.sections[8].content_es, ES_2);

['content', 'content_es'].forEach(k => {
  const c = check(g.sections[8][k]);
  const ok = c.depth === 0 && c.max === 1;
  console.log(k + ': depthFinal=' + c.depth + ' max=' + c.max + (ok ? '  OK' : '  MAL'));
  g.sections[8][k].split('</p>').filter(x => x.trim()).forEach((par, i) => {
    console.log('   parrafo ' + (i + 1) + ': ' + par.trim().slice(0, 65).replace(/\s+/g, ' ') + '...');
  });
});

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nEscrito.');
