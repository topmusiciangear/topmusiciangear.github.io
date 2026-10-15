// Los 311 botones sin precio: que productos son y por que
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const byId = {}; list.forEach(p=>byId[p.id]=p);
const build = fs.readFileSync(BASE+'build-guides.js','utf8');
const m = build.match(/const TEST_SHOP_BTN = \{([\s\S]*?)\n\};/);
const cuerpo = m[1];
const enMapa = new Set([...cuerpo.matchAll(/^\s*(\d+):\s*\{/gm)].map(x=>+x[1]));

// recorrer las paginas y sacar que boton va sin precio, por ASIN/url
const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html') && !f.includes('_es'));
const sinPrecio = [];
files.forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f,'utf8');
  // cada tarjeta: nombre + boton
  [...d.matchAll(/openReviewModal\((\d+)\)[\s\S]{0,900}?guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].forEach(c=>{
    const id = +c[1];
    const nombre = c[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    // el boton siguiente en la tarjeta
    const seg = d.slice(c.index, c.index + 3000);
    const boton = (seg.match(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/)||[]);
    if (boton[0] && !/data-price=/.test(boton[0])) {
      sinPrecio.push({ guia:f.replace('.html',''), id, nombre, enMapa: enMapa.has(id) });
    }
  });
});
console.log('=== BOTONES SIN PRECIO: ' + sinPrecio.length + ' ===');
const unicos = [...new Map(sinPrecio.map(x=>[x.id,x])).values()];
console.log('productos unicos afectados: ' + unicos.length + '\n');

const conMapa = unicos.filter(x=>x.enMapa);
const sinMapa = unicos.filter(x=>!x.enMapa);
console.log('--- products QUE TIENEN entrada en el mapa pero el boton sale sin precio (' + conMapa.length + ') ---');
conMapa.slice(0,20).forEach(x=>{
  const p = byId[x.id];
  console.log('  id ' + String(x.id).padEnd(5) + x.guia.padEnd(26) + (p?p.title:'??'));
});
console.log('\n--- productos SIN entrada en el mapa (' + sinMapa.length + ') ---');
sinMapa.slice(0,30).forEach(x=>{
  const p = byId[x.id];
  console.log('  id ' + String(x.id).padStart(4) + ' ' + (p?p.title:'NO EN CATALOGO').padEnd(50) + ' ' + (p?p.category:''));
});
if (sinMapa.length>30) console.log('  ... y ' + (sinMapa.length-30) + ' mas');
console.log('\ntotal sin precio: ' + sinPrecio.length + ' instancias, ' + unicos.length + ' productos unicos');