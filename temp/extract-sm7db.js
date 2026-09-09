var { execSync } = require('child_process');
var fs = require('fs');
var parent = execSync('git log -1 --format=%H a0587799f0~1', { encoding: 'utf8' }).trim();
console.log('parent:', parent);
var raw = execSync('git show ' + parent + ':data/products.json', { maxBuffer: 64 * 1024 * 1024 }).toString('utf8');
var a = JSON.parse(raw);
console.log('array length:', a.length);
var e = a.filter(function (x) { return x && x.id === 321; });
fs.writeFileSync('temp/_sm7db_entry.json', JSON.stringify(e, null, 2));
console.log('SM7dB entry extracted:', e.length);
if (e.length) {
  console.log('--- keys:', Object.keys(e[0]).join(', '));
}