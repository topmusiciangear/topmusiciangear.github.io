const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-multi-effects-pedals.html', 'utf8');
['\u20ac777', '\u00a3649', 'GIT0054641-000', 'boss-gt-1000core-guitar-effects-processor-pedal'].forEach(s => {
  console.log('[' + s.slice(0, 40) + '] = ' + (t.includes(s) ? 'OK' : 'MISSING'));
});
