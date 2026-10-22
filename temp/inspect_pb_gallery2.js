const fs = require('fs');
const h = fs.readFileSync('temp/mixvault_pb.html', 'utf8');
const i = h.indexOf('MIXVAULT%20HERO');
console.log('idx', i);
console.log(h.slice(i - 2500, i + 1500));
