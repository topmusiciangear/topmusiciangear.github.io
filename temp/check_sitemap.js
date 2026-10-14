const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const sm = fs.readFileSync(BASE + 'sitemap.xml', 'utf8');

const urls = (sm.match(/<loc>[^<]*<\/loc>/g) || []).map(x => x.replace(/<\/?loc>/g, ''));
const mods = (sm.match(/<lastmod>[^<]*<\/lastmod>/g) || []).map(x => x.replace(/<\/?lastmod>/g, ''));

console.log('=== sitemap.xml ===');
console.log('  URLs: ' + urls.length);
console.log('  lastmod distintos: ' + JSON.stringify(Array.from(new Set(mods))));

console.log('\n  ultimas 3 entradas:');
urls.slice(-3).forEach((u, i) => console.log('    ' + (mods[mods.length - 3 + i] || '?') + '  ' + u));

console.log('\n=== tu guia esta en el sitemap? ===');
console.log('  EN: ' + urls.some(u => /best-guitar-home-office\.html$/.test(u)));
console.log('  ES: ' + urls.some(u => /best-guitar-home-office_es\.html$/.test(u)));

console.log('\n=== robots.txt ===');
try {
  const rb = fs.readFileSync(BASE + 'robots.txt', 'utf8');
  console.log(rb.trim());
} catch (e) { console.log('  no hay robots.txt'); }

console.log('\n=== hay sitemap en robots.txt? ===');
try {
  const rb = fs.readFileSync(BASE + 'robots.txt', 'utf8');
  console.log('  ' + (/sitemap/i.test(rb) ? 'SI, declarado' : 'NO — Google no sabria donde buscar el sitemap salvo que se lo indiques en Search Console'));
} catch (e) { console.log('  (sin robots.txt)'); }

console.log('\n=== el sitemap se genera solo en el build? ===');
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const i = b.indexOf('function buildSitemap');
console.log(b.substring(i, i + 700).split('\n').slice(0, 18).join('\n'));

console.log('\n=== fecha de hoy segun el sistema ===');
console.log('  ' + new Date().toISOString().slice(0, 10));