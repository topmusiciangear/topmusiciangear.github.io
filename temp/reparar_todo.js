const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const st = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function desbalance(c) {
  const a = (c.match(/<p>/g) || []).length, b = (c.match(/<\/p>/g) || []).length;
  return a !== b;
}

function reparar(c) {
  const a = (c.match(/<p>/g) || []).length, b = (c.match(/<\/p>/g) || []).length;
  if (a === 0 && b > 0) {
    // solo hay cierres: envolver todo
    const limpio = c.split('</p>').map(x => x.trim()).filter(Boolean)[0] || '';
    return '<p>' + limpio + '</p>';
  }
  const cuerpos = c.split('</p>').join('').split('<p>').map(x => x.trim()).filter(Boolean);
  return cuerpos.map(x => '<p>' + x + '</p>').join('');
}

const objetivos = [
  ['best-monitors-for-small-rooms', 'conclusion'],
  ['budget-mics', 'sections[15].content'],
  ['fx-plugins', 'sections[0].content'],
  ['fx-plugins', 'sections[0].content_es'],
  ['vocalign-vs-revoice-pro', 'sections[1].content'],
  ['wireless-intercom-systems', 'sections[0].content'],
  ['wireless-intercom-systems', 'sections[0].content_es']
];

objetivos.forEach(([gid, ruta]) => {
  const g = guides.find(x => x.id === gid);
  const m = ruta.match(/^(.*?)\[(.+)\]\.(.+)$/);
  let obj, campo;
  if (m) {
    const sec = g.sections[parseInt(m[2], 10)];
    obj = sec; campo = m[3];
  } else { obj = g; campo = ruta; }
  const antes = obj[campo];
  if (typeof antes !== 'string') { console.log('NO ENCONTRADO ' + gid + '.' + ruta); return; }
  const a = (antes.match(/<p>/g) || []).length, b = (antes.match(/<\/p>/g) || []).length;
  console.log('\n########## ' + gid + '  ' + ruta + '   <p>=' + a + ' </p>=' + b);
  console.log('  TEXTO: ' + st(antes).slice(0, 200));
  obj[campo] = reparar(antes);
  const A = (obj[campo].match(/<p>/g) || []).length, Bb = (obj[campo].match(/<\/p>/g) || []).length;
  console.log('  CRUDA ANTES: ' + JSON.stringify(antes).slice(0, 150));
  console.log('  CRUDA DESPUES: ' + JSON.stringify(obj[campo]).slice(0, 150));
  console.log('  -> <p>=' + A + ' </p>=' + Bb + (A === Bb ? '  OK' : '  SIGUE ROTA'));
});

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('');
console.log('=== VERIFICACION GLOBAL ===');
const g2 = JSON.parse(fs.readFileSync(rg, 'utf8'));
let malas = 0;
g2.forEach(x => {
  ['intro', 'conclusion', 'verdict', 'description', 'intro_es', 'conclusion_es', 'verdict_es', 'description_es']
    .forEach(k => { if (typeof x[k] === 'string' && desbalance(x[k])) { malas++; console.log('  ROTA ' + x.id + '.' + k); } });
  (x.sections || []).forEach((s, i) => ['content', 'content_es'].forEach(k => {
    if (typeof s[k] === 'string' && desbalance(s[k])) { malas++; console.log('  ROTA ' + x.id + '.sec' + i + '.' + k); }
  }));
  (x.faq || []).forEach((f, i) => ['a', 'a_es'].forEach(k => {
    if (typeof f[k] === 'string' && desbalance(f[k])) { malas++; console.log('  ROTA ' + x.id + '.faq' + i + '.' + k); }
  }));
});
console.log('  campos rotos ahora: ' + malas);