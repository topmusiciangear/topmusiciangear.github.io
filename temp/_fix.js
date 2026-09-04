const fs = require('fs');
const fp = 'build-guides.js';
let s = fs.readFileSync(fp, 'utf8');
const GB = '\u00a3', EUR = '\u20ac';

const startMarker = '461: {prices:{amazon:"$169.00",gear4music:"' + GB + '155.00"},oos:["zzounds"]}';
const start = s.indexOf(startMarker);
const end = s.indexOf('function shopButtonsTest', start);
if (start === -1 || end === -1) { console.error('markers not found; start=', start, 'end=', end); process.exit(1); }

const cleanBlock =
  '  461: {prices:{amazon:"$169.00",gear4music:"' + GB + '155.00"},oos:["zzounds"]},\n' +
  '  462: {prices:{gear4music:"' + GB + '159.00",amazon:"$249.99",zzounds:"$219.99",andertons:"' + GB + '159.00"}},\n' +
  '  463: {prices:{gear4music:"' + GB + '199.00",andertons:"' + GB + '209.00",musicstore:"' + EUR + '211.00",zzounds:"$229.99"}},\n' +
  '  464: {prices:{gear4music:"' + GB + '439.00",andertons:"' + GB + '399.00",zzounds:"$549.99",amazon:"$539.99"}}\n' +
  '  };';

s = s.slice(0, start) + cleanBlock + s.slice(end);
fs.writeFileSync(fp, s, 'utf8');
console.log('repaired. now parsing check...');

// validate
try { new Function(s); console.log('build-guides.js parses OK'); } catch (e) { console.error('STILL BROKEN:', e.message); process.exit(1); }
