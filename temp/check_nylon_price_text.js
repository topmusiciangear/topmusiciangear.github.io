const fs = require('fs');
const a = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(a) ? a : a.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const blob = JSON.stringify(g);
const nums = blob.match(/\$\s?\d[\d,\.]*|€\s?\d[\d,\.]*|£\s?\d[\d,\.]*|\b\d{2,4}\s?(?:dollars|euros|pounds)\b/g) || [];
console.log([...new Set(nums)].join(' | '));
// print sentences containing prices
const texts = [];
function walk(o, path) {
  if (typeof o === 'string') { if (/\$\d|€\d|£\d/.test(o)) texts.push(path + ': ' + o.replace(/<[^>]+>/g, '').slice(0, 300)); }
  else if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k], path + '.' + k));
}
walk(g, 'g');
texts.slice(0, 30).forEach(t => console.log('\n' + t));
