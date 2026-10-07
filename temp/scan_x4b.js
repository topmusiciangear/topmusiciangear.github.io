const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_116e4ed63001ImiGL57cEOVOB8', 'utf8');
const re = /Image 1: ([^\]]+)\]\((https:[^)\s]+)/;
const m = s.match(re);
console.log(m ? m[1] + ' -> ' + m[2] : 'no Image 1');
const re2 = /# TC Electronic Ditto X4 Dual Track Looper Pedal/;
console.log('title at:', s.search(re2));
