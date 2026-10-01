const fs = require('fs');
const h = fs.readFileSync('guides/mics-for-creators.html', 'utf8');
const t = '<h3 class="guide-product-card-title">Audio-Technica AT2040USB</h3>';
const i = h.indexOf(t);
const seg = h.slice(i, i + 2500);
const m = seg.match(/Buy at[\s\S]{0,600}/);
console.log(m ? m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 200) : 'NO-BOTON');
