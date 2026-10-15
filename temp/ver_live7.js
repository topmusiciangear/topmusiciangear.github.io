const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/g2.html', 'utf8');
const prims = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)].filter(m => /data-store="amazon"/.test(m[0]));
const conPrecio = prims.filter(m => /\$[0-9]|£[0-9]|€[0-9]|Aprox\.|Approx\./.test(m[1].replace(/<[^>]+>/g, ' ')));
console.log('best-monitors-for-small-rooms ES en vivo: primarios Amazon ' + prims.length + ', con precio ' + conPrecio.length);
console.log('ej: ' + prims[0][1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60));
