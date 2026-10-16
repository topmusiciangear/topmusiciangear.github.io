const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const us = (442 / 1.0084).toFixed(2);
const uk = (us * 0.7959).toFixed(2);
console.log('geo: EUR 442 -> USD ' + us + ' -> GBP ' + uk);
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1034: {prices:{pluginboutique:"€442.65",gear4music:"£379.00",andertons:"£319.00",zzounds:"$519.00",musicstore:"€439.00"},pbCur:{us:"$438.96",uk:"£349.37"}},\n';
const newE = '1034: {prices:{pluginboutique:"€442.00",gear4music:"£379.00",andertons:"£319.00",zzounds:"$519.00",musicstore:"€439.00"},pbCur:{us:"$' + us + '",uk:"£' + uk + '"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1034 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1034 PB 442 OK');
