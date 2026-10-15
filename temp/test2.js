const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u00f1\u00d1]/g,'n')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo','acustica','altavoz','activo','bajo','caja','directa','pasiva','estereo','interfaz','coleccion','afinador','cromatico','edicion','controlador','microfono','soportes','soporte','inalambrico','personas','teclado','definitivo','generacion','unidad','par','filtro','antipop','cable','paneles','tratamiento','aislamiento','pads','compresor','avanzado','ultimo','aislar','ruido'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
const CASOS = [
  ['Soportes de Monitor K&M 26722 (Unidad)', 'K&M 26722 Monitor Stands (Each)'],
  ['Controlador DAW SSL UF8', 'SSL UF8 DAW Controller'],
  ['Caja Directa Activa Radial J48 MK2', 'Radial J48 MK2 Active Direct Box'],
  ['Soporte de Micrófono K&M 210/2', 'K&M 210/2 Mic Stand'],
];
CASOS.forEach(([es, en]) => {
  console.log('\nES "' + es + '"  ->  key ' + JSON.stringify(key(es)));
  console.log('EN "' + en + '"  ->  key ' + JSON.stringify(key(en)));
  const ke = key(es), kp = key(en);
  let i = -1, ok = true;
  for (const w of ke) { i = kp.indexOf(w, i + 1); if (i < 0) { ok = false; console.log('   FALTA el token "' + w + '"'); } }
  console.log('   -> ' + (ok ? 'COINCIDE' : 'no coincide (orden de palabras)'));
});
console.log('\n--- productos K&M / UF8 / J48 en el catalogo ---');
arr.filter(p => /26722|210\/2|UF8|J48 MK2|LCT1040|Whirlwind|LR Baggs|Walrus|e 604/i.test(p.title)).forEach(p => console.log('  id ' + p.id + '  ' + p.title));