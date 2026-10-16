const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0; const fallos = [];
function swap(de, a, et) {
  const t0 = JSON.stringify(g);
  if (!t0.includes(de)) { fallos.push(et); return; }
  const c = t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(g);
  n += c; console.log('  ok (' + c + ')  ' + et);
}

// 1) best-guitar roto -> best-electric-guitars-2026
swap('/guides/best-guitar.html', '/guides/best-electric-guitars-2026.html', 'URL rota EN');
swap('/guides/best-guitar_es.html', '/guides/best-electric-guitars-2026_es.html', 'URL rota ES');
swap('>Best Electric Guitars</a>', '>Best Electric Guitars: All Styles, All Levels</a>', 'anchor EN');
swap('>Mejores Guitarras Eléctricas</a>', '>Mejores guitarras eléctricas para todos los estilos</a>', 'anchor ES');

// 2) stub best-grooveboxes -> compact-rhythm-devices
swap('/guides/best-grooveboxes.html', '/guides/compact-rhythm-devices.html', 'URL stub EN');
swap('/guides/best-grooveboxes_es.html', '/guides/compact-rhythm-devices_es.html', 'URL stub ES');
swap('>Best Grooveboxes & Compact Drum Machines</a>', '>Top Compact Rhythm Devices & Pocket Samplers</a>', 'anchor groove EN');
swap('>Mejores Grooveboxes y Máquinas de Batería Compactas</a>', '>Mejores dispositivos de ritmo y samplers de bolsillo</a>', 'anchor groove ES');

// 3) texto viejo del conteo
swap('13 Best Budget USB Microphones', 'Best Budget USB Mics Under $110 (Pros & Cons)', 'conteo viejo EN');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\nreemplazos: ' + n + (fallos.length ? '\nFALLAN: ' + fallos.join(' | ') : ''));
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')));
console.log('restos best-guitar.html (sin 2026): ' + (t.match(/best-guitar\.html|best-guitar_es\.html/g) || []).length);
console.log('restos best-grooveboxes: ' + (t.match(/best-grooveboxes/g) || []).length);
console.log('restos "13 Best Budget": ' + (t.match(/13 Best Budget/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
