const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const pluginGuides = guides.filter(g => g.category === 'plugins');
console.log('plugin guides:', pluginGuides.map(g => g.id).join(', '));

const file = 'guides/' + (pluginGuides[0] ? pluginGuides[0].id : '') + '.html';
const s = fs.readFileSync(file, 'utf8');
const rows = [...s.matchAll(/<a data-store="(amazon|reverb|zzounds|gear4music|andertons|musicstore)" href="([^"]*)"/g)];
const tally = {};
const home = [];
for (const m of rows) {
  tally[m[1]] = (tally[m[1]] || 0) + 1;
  if (/^https?:\/\/(www\.)?amazon\.com\/?\?tag=/.test(m[2]) || /^https?:\/\/(www\.)?amazon\.com\/?$/.test(m[2])) home.push(m[2]);
}
console.log('\nfile:', file);
console.log('rows by store:', JSON.stringify(tally));
console.log('amazon-home hrefs found:', home.length);
if (home.length) console.log('  e.g.', home[0]);
