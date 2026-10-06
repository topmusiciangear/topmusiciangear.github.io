const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos_es.html', 'utf8');
const t = h.indexOf('Yamaha Arius YDP-166');
const i = h.indexOf('musicstore', t);
console.log(h.slice(i - 100, i + 600).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 500));
const m = h.match(/1[.,]399[^0-9]{0,8}/g);
console.log('1399 variants:', m ? m.slice(0, 6).join(' / ') : 'none');
