const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/g4m_de.html', 'utf8');

const t = (s.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
console.log('titulo: ' + (t || '').trim().slice(0, 100));

const og = (s.match(/property="og:price:amount"[^>]+content="([^"]+)"/i) || [])[1];
const cur = (s.match(/property="og:price:currency"[^>]+content="([^"]+)"/i) || [])[1];
console.log('og:price: ' + (og || '-') + ' ' + (cur || ''));

const ld = (s.match(/"price"\s*:\s*"?([\d.]+)/) || [])[1];
console.log('JSON-LD price: ' + (ld || '-'));

const p2 = [...new Set(s.match(/£[\d,]+\.\d\d/g) || [])];
console.log('precios GBP en la pagina: ' + p2.slice(0, 8).join('  '));

const eur = [...new Set(s.match(/€[\d,]+\.\d\d/g) || [])];
console.log('precios EUR: ' + eur.slice(0, 6).join('  '));

//规格 de la ficha
const spec = (s.match(/"description"\s*:\s*"([\s\S]{0,1500})"/) || [])[1];
if (spec) console.log('\ndescripcion: ' + spec.replace(/\\u[0-9a-f]{4}/gi, ' ').replace(/\s+/g, ' ').slice(0, 700));
