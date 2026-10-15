const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const vp = guia.verdictProsCons;

console.log('tipo: ' + (Array.isArray(vp) ? 'array de ' + vp.length : 'objeto'));
const primero = Array.isArray(vp) ? vp[0] : vp;
console.log('claves del primer elemento: ' + Object.keys(primero).join(', '));
console.log('\nejemplo:\n' + JSON.stringify(primero, null, 1).slice(0, 900));

// donde estan los 250 ohms y el serves
const json = JSON.stringify(vp);
['250 ohms', '250 ohmios', 'serves'].forEach(b => {
  const i = json.indexOf(b);
  if (i < 0) { console.log('\n"' + b + '" NO en verdictProsCons'); return; }
  console.log('\n"' + b + '": ...' + json.slice(Math.max(0, i - 200), i + 200) + '...');
});
