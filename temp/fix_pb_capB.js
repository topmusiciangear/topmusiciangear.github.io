var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var a = 'in</span>boutique</span>';
var b = 'in</span>Boutique</span>';
console.log('build-guides: ' + (s.split(a).length - 1));
s = s.split(a).join(b);
fs.writeFileSync('build-guides.js', s);
var u = fs.readFileSync('temp/_head_sb.js');
var au = Buffer.from(a, 'utf16le'), bu = Buffer.from(b, 'utf16le');
var n = 0, idx = -1;
while ((idx = u.indexOf(au, idx + 1)) >= 0) {
  u = Buffer.concat([u.slice(0, idx), bu, u.slice(idx + au.length)]);
  n++; idx += bu.length - 1;
}
fs.writeFileSync('temp/_head_sb.js', u);
console.log('_head_sb: ' + n);
