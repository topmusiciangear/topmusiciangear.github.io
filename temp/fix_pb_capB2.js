var fs = require('fs');
var raw = fs.readFileSync('temp/_head_sb.js');
var head = raw.slice(0, 3);
var s = raw.slice(3).toString('utf16le');
var m = s.match(/PLUG<span[^>]*>IN<\/span>BOUTIQUE/);
if (!m) { console.log('NOT FOUND'); process.exit(1); }
var b = m[0].replace('PLUG', 'Plug').replace('>IN<', '>in<').replace('BOUTIQUE', 'Boutique');
s = s.split(m[0]).join(b);
fs.writeFileSync('temp/_head_sb.js', Buffer.concat([head, Buffer.from(s, 'utf16le')]));
console.log('done: ' + JSON.stringify(b));
