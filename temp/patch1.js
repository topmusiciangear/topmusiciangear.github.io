var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
var needle = "if(dispMatch)dispPrice=dispMatch[1];";
if (s.indexOf("if(curStore==='amazon')dispPrice=tmgCheckLabel;") > -1) {
  console.log('already patched');
  process.exit(0);
}
var c = s.split(needle).length - 1;
if (c !== 1) { console.error('EXPECTED 1 MATCH, GOT ' + c); process.exit(1); }
s = s.replace(needle, needle + "if(curStore==='amazon')dispPrice=tmgCheckLabel;");
fs.writeFileSync(f, s);
console.log('patched ' + f);
