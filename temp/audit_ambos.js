// AUDIT COMPLETO: precios en primario Y secundario, las 314 paginas
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html') && !f.includes('_es'));

let priTot=0, priOk=0;
let secTot=0, secOk=0;
let conDesplegable=0, desplegableVacio=0;
const guiasSinSec = [];

files.forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f,'utf8');

  // ── PRIMARIO ──
  const pri = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
  pri.forEach(m=>{
    priTot++;
    if (/data-price=|data-pb-|data-hu-/.test(m[0])) priOk++;
  });

  // ── SECUNDARIO: filas dentro de shop-more-list ──
  const lista = d.match(/<div class="shop-more-list"[\s\S]*?<\/div>\s*(?:<\/div>)?/);
  const btnMore = (d.match(/shop-btn-more/g)||[]).length;
  if (btnMore > 0) conDesplegable++;

  if (lista) {
    const filas = [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    if (filas.length === 0) { desplegableVacio++; }
    filas.forEach(m=>{
      secTot++;
      if (/data-price=|data-pb-|data-hu-/.test(m[0])) secOk++;
    });
  }
  // contar filas "Verificar precio" / "Check price" en todo el documento
  const checkPrice = (d.match(/Check price/g)||[]).length + (d.match(/Verificar precio/g)||[]).length;
  const totalBotones = pri.length + secTot;
  if (checkPrice > 0) guiasSinSec.push({ f, checkPrice, pri: pri.length });
});

const pct = (a,b) => b ? Math.round(a/b*100) : 0;
console.log('='.repeat(68));
console.log('  PRECIOS EN LOS 2 TIPOS DE BOTON — ' + files.length + ' guias');
console.log('='.repeat(68));
console.log('\n  PRIMARIO');
console.log('    total:      ' + priTot);
console.log('    con precio: ' + priOk + '  (' + pct(priOk,priTot) + '%)');
console.log('    sin precio: ' + (priTot-priOk));
console.log('\n  SECUNDARIO (filas del desplegable)');
console.log('    total:      ' + secTot);
console.log('    con precio: ' + secOk + '  (' + pct(secOk,secTot) + '%)');
console.log('    sin precio: ' + (secTot-secOk));
console.log('\n  DESPLEGABLES');
console.log('    paginas con boton "Comparar en": ' + conDesplegable);
console.log('    desplegables VACIOS (0 filas):  ' + desplegableVacio);
console.log('\n  "Check price" / "Verificar precio" por pagina (top 10):');
guiasSinSec.sort((a,b)=>b.checkPrice-a.checkPrice).slice(0,10).forEach(x=>
  console.log('    ' + String(x.checkPrice).padStart(3) + 'x  ' + x.f));
console.log('\n  paginas con algun "Check price": ' + guiasSinSec.length + ' de ' + files.length);