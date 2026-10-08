const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'guitar-bass-amps');
d.verdictProsCons.forEach(v => {
  ['pros', 'cons', 'pros_es', 'cons_es'].forEach(k => {
    if (Array.isArray(v[k])) v[k] = v[k].map(t => t.replace(/the Rumble 200 V3 \(15"\) handles it cleanly/, 'the RB-115 (15") handles it cleanly'));
  });
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
const s = JSON.stringify(d);
console.log('leftovers:', ['RB-210', 'Rumble 200', 'Spark LIVE'].map(n => n + '=' + s.includes(n)).join(' '));
