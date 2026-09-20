const p = require('../../data/products.json');
const arr = Array.isArray(p) ? p : (p.products || []);
const probes = [
  'Apollo x16', 'Apollo Twin X', 'Neumann MT 48', 'MT 48', 'RME Babyface Pro FS',
  'Babyface Pro FS', 'Apollo x8p Gen 2', 'Apollo x8p', 'RME Fireface UFX III',
  'UFX III', 'Apogee Symphony I/O', 'Symphony I/O', 'Audient ORIA', 'ORIA',
  'Lynx Aurora-n', 'Aurora-n', 'Apollo Twin X Gen 2', 'Apollo x16 Gen 2',
];
for (const q of probes) {
  const hits = arr.filter(x => x && x.name && x.name.toLowerCase().includes(q.toLowerCase()));
  console.log('[' + q + '] -> ' + hits.length);
  for (const h of hits) {
    const prices = h.prices || {};
    console.log('   id=' + h.id + ' | name=' + h.name + ' | cat=' + h.category +
      ' | prices=' + JSON.stringify(prices) +
      ' | hrefs=' + (h.hrefs ? Object.keys(h.hrefs).join(',') : ''));
  }
}
console.log('total products:', arr.length);
