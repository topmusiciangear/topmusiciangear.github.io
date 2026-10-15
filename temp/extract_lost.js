// Extraer las 16 entradas perdidas del commit 797a408de (antes del borrado)
const { execSync } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function bloqueDe(commit) {
  const src = execSync(`git show ${commit}:build-guides.js`, { cwd: BASE, encoding: 'utf8', maxBuffer: 50*1024*1024 });
  const lineas = src.split('\n');
  const ini = lineas.findIndex(l => /^const TEST_SHOP_BTN = \{/.test(l));
  let cierre = -1;
  for (let i = ini+1; i < lineas.length; i++) if (/^\};?\s*$/.test(lineas[i])) { cierre = i; break; }
  return lineas.slice(ini, cierre+1);
}

const antes = bloqueDe('797a408de');   // tenia 576
console.log('bloque antes: lineas ' + antes.length);

// localizar las entradas de los ids perdidos
const PERDIDOS = [13,14,15,16,17,18,19,20,21,22,23,24,25,26,29];
console.log('\n=== ENTRADAS PERDIDAS (a restaurar) ===');
PERDIDOS.forEach(id=>{
  const i = antes.findIndex(l => new RegExp('^\\s*' + id + ':\\s*\\{').test(l));
  if (i < 0) { console.log(id + ': NO ENCONTRADA'); return; }
  console.log('  ' + antes[i].trim().slice(0,160));
});

// volcar el bloque para restaurarlo
const fs = require('fs');
fs.writeFileSync(BASE+'temp/mapa_perdido.txt', antes.join('\n'), 'utf8');
console.log('\nbloque guardado en temp/mapa_perdido.txt (' + antes.length + ' lineas)');