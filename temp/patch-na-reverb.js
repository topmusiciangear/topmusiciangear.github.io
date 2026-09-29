var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var old = "+ storeNote + ((k === 'amazon') ? '<span style=\"margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic\">' + t('Verificar precio', 'Check price') + '</span>' : '')";
var nw = "+ storeNote + ((k === 'amazon' || k === 'reverb') ? '<span style=\"margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic\">' + t('Verificar precio', 'Check price') + '</span>' : '')";
if (s.indexOf(old) < 0) { console.error('not found'); process.exit(1); }
fs.writeFileSync('build-guides.js', s.split(old).join(nw));
console.log('patched');