const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const CASOS = [['best-reverb-delay'],['best-looper-pedals'],['best-wireless-iems'],['stream-controllers'],
  ['mixing-plugins'],['best-acoustic-guitars-for-beginners'],['best-drum-machine'],['best-multi-effects-pedals']];
CASOS.forEach(([id]) => {
  const g = guides.find(x => x.id === id);
  console.log('\n### ' + id);
  if (g.productTable) g.productTable.columns.forEach(c =>
    console.log('   ' + String(c.title).padEnd(38) + ' || ES: ' + c.title_es));
  (g.verdictProsCons || []).forEach(v => console.log('   VEREDICTO: ' + (v.name || v.title)));
});