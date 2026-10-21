const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'monitor-setup');

console.log('CLAVES:', Object.keys(g).join(', '));

function walk(obj, path) {
  if (typeof obj === 'string') {
    if (obj.includes('hacia adentro')) console.log('\nPATH: ' + path + '\n' + obj);
    return;
  }
  if (Array.isArray(obj)) { obj.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
  if (obj && typeof obj === 'object') { for (const k of Object.keys(obj)) walk(obj[k], path + '.' + k); }
}
walk(g, 'guide');
