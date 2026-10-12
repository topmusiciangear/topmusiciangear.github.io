var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
// remove orange smile svg from BOTH amazon primary wordmarks, keep amber "Amazon" text
var re = /Amaz' \+ '<svg viewBox=\\'86 114 320 72\\'[\s\S]*?<\/svg><\/span>on<\/span>'/g;
var m = s.match(re);
console.log('smile blocks found: ' + (m ? m.length : 0));
if (!m || m.length !== 2) process.exit(1);
s = s.replace(re, "Amazon</span>'");
fs.writeFileSync(f, s);
console.log('smile removed x2');
