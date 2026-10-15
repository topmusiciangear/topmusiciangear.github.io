const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo','acústica','altavoz','activo','bajo','caja','directa','pasiva','estéreo','interfaz','colección','afinador','cromático','edición','controlador'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
const prueba = 'Fender CD-60S Acústica';
console.log('nombre ES : "' + prueba + '"');
console.log('norm      : ' + JSON.stringify(norm(prueba)));
console.log('key       : ' + JSON.stringify(key(prueba)));
console.log('\nproductos que contienen esos tokens en orden:');
arr.forEach(p => {
  const kp = key(p.title);
  let i = -1, ok = true;
  for (const w of key(prueba)) { i = kp.indexOf(w, i + 1); if (i < 0) { ok = false; break; } }
  if (ok) console.log('   ' + p.id + '  ' + p.title);
});
console.log('\ntotal productos: ' + arr.length);
console.log('existe alguno con "cd 60s": ' + arr.filter(p => norm(p.title).indexOf('cd 60s') > -1).length);