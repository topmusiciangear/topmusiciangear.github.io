const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/compact-rhythm-devices.html', 'utf8');
['1035415', 'YAMSEQTRAK', 'SYN0008890', '66QJ', '445'].forEach(n => console.log(n, h.includes(n) ? 'PRESENT' : 'ABSENT'));
