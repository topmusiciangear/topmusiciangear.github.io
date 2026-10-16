const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function find(re, label, cap = 30) {
  console.log('=== ' + label + ' ===');
  let n = 0;
  guides.forEach(g => {
    const s = JSON.stringify(g);
    let m;
    const rx = new RegExp(re, 'g');
    while ((m = rx.exec(s)) !== null && n < cap) {
      n++;
      console.log(g.id + ': ...' + s.slice(Math.max(0, m.index - 70), m.index + m[0].length + 50).replace(/\\n/g, ' '));
    }
  });
  console.log('total: ' + n);
}
find('GENOME', 'GENOME');
find('REFERENCE 3|Reference 3', 'REFERENCE 3');
find('Melodyne 5 Essential', 'Melodyne 5 Essential');
find('VocAlign 7 Pro', 'VocAlign 7 Pro');
find('RePitch 2 Standard', 'RePitch 2 Standard');
find('Revoice Pro 5', 'Revoice Pro 5');
find('Nectar 4 Advanced', 'Nectar 4 Advanced');
