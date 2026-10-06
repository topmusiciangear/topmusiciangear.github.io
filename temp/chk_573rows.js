const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos_es.html', 'utf8');
const key = 'guide-section-prod-name">Yamaha Arius YDP-146';
const t = h.indexOf(key);
console.log('card at:', t);
const seg = h.slice(t, t + 25000);
console.log('stores:', (seg.match(/data-store="[a-z]+"/g) || []).join(', '));
console.log('prices:', [...new Set(seg.match(/(€|£|\$)[0-9,.]+/g) || [])].join(' '));
