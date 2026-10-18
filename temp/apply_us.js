const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const us = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_US.json', 'utf8'));
const eu = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_RO.json', 'utf8'));

const eurDe = id => { const r = (eu.productos || []).find(x => x.id === id); return r && r.precio ? r.precio.valor : null; };
const usDe = id => { const r = (us.productos || []).find(x => x.id === id); return r && r.precio ? r.precio : null; };

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let cambiados = 0, saltados = [];

(us.productos || []).forEach(p => {
  if (!p.precio || p.precio.simbolo !== '$') { saltados.push(p.id + ' (sin USD)'); return; }
  const usd = p.precio.valor.toFixed(2);
  // actualiza SOLO pbCur.us, conservando pbCur.uk
  const re = new RegExp('(\\n\\s*' + p.id + ': \\{prices:\\{pluginboutique:"[^"]+",?[^}]*\\},?pbCur:\\{us:)"[^"]+"(,uk:)"[^"]+"');
  const m = bg.match(re);
  if (!m) { saltados.push(p.id + ' (patron no encontrado)'); return; }
  const antes = (m[0].match(/us:"([^"]+)"/) || [])[1];
  if (antes === '$' + usd) return;
  bg = bg.replace(m[0], '\n' + m[0].replace(/(us:)"[^"]+"/, '$1$' + usd));
  cambiados++;
  console.log('  ' + String(p.id).padEnd(5) + String(p.title).slice(0, 34).padEnd(35) + (antes || '?') + ' -> $' + usd);
});

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('\npbCur.us actualizados con precio REAL de USA: ' + cambiados);
if (saltados.length) console.log('sin actualizar: ' + saltados.join(', '));