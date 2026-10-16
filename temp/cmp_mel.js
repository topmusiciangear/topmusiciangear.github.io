const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/vocal-plugins.html', 'utf8');
const body = h.slice(h.indexOf('<body'));
const i = body.indexOf('CEEMDESSENTIAL5');
const seg = body.slice(Math.max(0, i - 6000), i + 2000);
const txt = seg.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, '|').replace(/\|+/g, '|').replace(/\s+/g, ' ');
console.log('120 en vocal-plugins:' + txt.slice(-900));
