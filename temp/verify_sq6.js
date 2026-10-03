const fs = require('fs');
const h = fs.readFileSync('guides/best-32-channel-digital-mixers.html', 'utf8');
const noScripts = h.replace(/<script[\s\S]*?<\/script>/g, '');
['SQ-6+', 'RackUltra', '9-inch', '44-bus', 'ALLAHSQ6PLUS', 'YAMTF3', 'PRSSLIIISE32R'].forEach(k => {
  console.log((noScripts.indexOf(k) > -1 ? 'ok ' : 'FALTA ') + k);
});
console.log('bare SQ-6 visible:', (noScripts.match(/SQ-6(?!\+)/g) || []).length);