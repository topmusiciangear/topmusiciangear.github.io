// Extraer las 16 entradas completas del bloque antigo (formato multilinea)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const lineas = fs.readFileSync(BASE+'temp/mapa_perdido.txt','utf8').split('\n');

const PERDIDOS = [13,14,15,16,17,18,19,20,21,22,23,24,25,26,29];
const resultado = {};

PERDIDOS.forEach(id=>{
  const i = lineas.findIndex(l => new RegExp('^\\s*' + id + ':\\s*\\{').test(l));
  if (i < 0) { console.log(id + ': NO ENCONTRADA'); return; }
  // acumular hasta cerrar llaves
  let depth = 0, out = [], j = i;
  for (; j < lineas.length; j++) {
    out.push(lineas[j]);
    for (const ch of lineas[j]) { if (ch === '{') depth++; else if (ch === '}') depth--; }
    if (depth === 0) break;
  }
  const bloque = out.join('\n').trim().replace(/,$/,'').replace(/,$/, '');
  resultado[id] = bloque;
  // extraer los precios para revision
  const precios = (bloque.match(/prices:\s*\{([\s\S]*?)\}/)||[])[1] || '';
  console.log('id ' + id + ': ' + precios.replace(/\s+/g,' ').trim().slice(0,150));
});

fs.writeFileSync(BASE+'temp/entradas_perdidas.json', JSON.stringify(resultado, null, 2), 'utf8');
console.log('\nguardadas ' + Object.keys(resultado).length + ' entradas en temp/entradas_perdidas.json');