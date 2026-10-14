const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Find ALL occurrences of previolificador with context
let count = 0;
const locations = [];

function search(obj, path, guideId) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.includes('previolificador')) {
      count++;
      locations.push({ path: path, guideId: guideId, text: obj.slice(Math.max(0, obj.indexOf('previolificador') - 50), obj.indexOf('previolificador') + 60) });
    }
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => search(item, path + '[' + i + ']', guideId));
    return;
  }
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      search(obj[key], path ? path + '.' + key : key, guideId);
    });
  }
}

guides.forEach(g => {
  search(g, '', g.id);
});

console.log('Total occurrences:', count);
console.log('Unique paths:');
const paths = new Set();
locations.forEach(l => {
  // Simplify path
  const simplified = l.path.replace(/\[\d+\]/g, '[]');
  paths.add(simplified);
});
Array.from(paths).sort().forEach(p => console.log('  ' + p));

console.log('\nFirst 5 examples:');
locations.slice(0, 5).forEach(l => {
  console.log('  ' + l.guideId + ' ' + l.path);
  console.log('    ...' + l.text.replace(/\n/g, ' ').slice(0, 120) + '...');
});