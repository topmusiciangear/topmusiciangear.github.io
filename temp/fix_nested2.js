// Ultimo paso: sobra un </p> al final de best-microphone.sections[8] (EN y ES).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');

const fix = (s) => {
  const t = s.trimEnd();
  if (!t.endsWith('</p></p>')) throw new Error('final inesperado: ' + JSON.stringify(t.slice(-12)));
  return t.slice(0, -4);
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

['content', 'content_es'].forEach(k => {
  g.sections[8][k] = fix(g.sections[8][k]);
  const c = check(g.sections[8][k]);
  const ok = c.depth === 0 && c.max === 1;
  console.log(k + ': depthFinal=' + c.depth + ' max=' + c.max + (ok ? '  OK' : '  MAL'));
});

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nEscrito.');
