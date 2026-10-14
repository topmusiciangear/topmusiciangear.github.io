const fs = require('fs');
const h = fs.readFileSync('guides/best-microphone.html', 'utf8');
// ¿Cómo aparecen los precios de tiendas?
const m = h.match(/249[^<]{0,30}/g);
console.log('contextos 249:', m ? m.slice(0, 8).join(' || ') : 'ninguno');
const m2 = h.match(/229[^<]{0,30}/g);
console.log('contextos 229:', m2 ? m2.slice(0, 5).join(' || ') : 'ninguno');
// viejo: ¿es del 240 PRO?
const i = h.indexOf('around $149');
console.log('around $149 es 240PRO:', i > -1 ? h.slice(Math.max(0, i - 120), i).includes('LCT 240') || h.slice(Math.max(0, i - 200), i).includes('clip mount') : 'no existe');
