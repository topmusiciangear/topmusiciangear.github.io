const fs = require('fs');
const p = require('../data/guides.json');
console.log('slugs found:');
p.forEach(x => { if (x.id && x.id.includes('subwoofers')) console.log(' -', x.id); });
const target = p.find(x => x.id === 'studio-subwoofers-setup');
console.log('TARGET:', target ? target.id : 'none');
if (!target) process.exit(0);
fs.writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/guide-dump.txt', JSON.stringify(target, null, 2), 'utf8');
console.log('keys:', Object.keys(target).join(', '));
