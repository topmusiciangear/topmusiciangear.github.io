const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');
const i = d.indexOf('AUTATHM20X');

// el desplegable que contiene esa URL
const ini = d.lastIndexOf('<div class="shop-more-list"', i);
const fin = d.indexOf('</div>', ini);
const lista = d.slice(ini, fin);
console.log('=== DESPLEGABLE COMPLETO del ATH-M20x ===');
console.log(lista.replace(/style="[^"]*"/g, '').replace(/\s+/g, ' ').replace(/> </g, '>\n<'));

console.log('\n=== BOTON PRIMARIO de la tarjeta ===');
const cardIni = d.lastIndexOf('guide-product-card', i);
const pri = d.slice(cardIni, cardIni + 4000).match(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/);
if (pri) console.log(pri[0].replace(/style="[^"]*"/g, '').replace(/\s+/g, ' '));

console.log('\n=== BOTON "Comparar en" ===');
const more = d.slice(cardIni, cardIni + 4000).match(/<button[^>]*shop-btn-more[^>]*>[\s\S]*?<\/button>/);
if (more) console.log(more[0].replace(/style="[^"]*"/g, '').replace(/\s+/g, ' '));
