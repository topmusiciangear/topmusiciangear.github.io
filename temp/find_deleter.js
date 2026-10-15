// Comparar el mapa TEST_SHOP_BTN antes y despues del commit sospechoso
const { execSync } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function idsDeCommit(commit) {
  const src = execSync(`git show ${commit}:build-guides.js`, { cwd: BASE, encoding: 'utf8', maxBuffer: 50*1024*1024 });
  const lineas = src.split('\n');
  const ini = lineas.findIndex(l => /^const TEST_SHOP_BTN = \{/.test(l));
  if (ini < 0) return null;
  let cierre = -1;
  for (let i = ini+1; i < lineas.length; i++) if (/^\};?\s*$/.test(lineas[i])) { cierre = i; break; }
  const ids = new Set();
  for (let i = ini+1; i < cierre; i++) {
    const m = lineas[i].match(/^\s*(\d+):\s*\{/);
    if (m) ids.add(+m[1]);
  }
  return ids;
}

const commits = execSync('git log --oneline -40 --format=%h -- build-guides.js', { cwd: BASE, encoding: 'utf8' })
  .trim().split('\n');

console.log('=== EVOLUCION DEL MAPA POR COMMIT ===');
console.log('(buscando cuando desaparecieron los ids 13-26)\n');
const objetivo = [13,14,15,16,17,18,19,20,21,22,23,24,25,26];
let previo = null;
for (const c of commits) {
  let ids;
  try { ids = idsDeCommit(c); } catch(e) { continue; }
  if (!ids) { console.log(c + ' : (mapa no encontrado)'); continue; }
  const faltan = objetivo.filter(id=>!ids.has(id));
  const total = ids.size;
  const msg = execSync(`git log -1 --format=%s ${c}`, { cwd: BASE, encoding: 'utf8' }).trim().slice(0,58);
  console.log(c.slice(0,9) + '  total ' + String(total).padStart(4) +
    '  faltan 13-26: ' + String(faltan.length).padStart(2) +
    '  | ' + msg);
  if (previo) {
    const perdidos = [...previo].filter(id=>!ids.has(id));
    if (perdidos.length) console.log('           >>> PERDIDOS en este commit: ' + perdidos.join(', '));
    const nuevos = [...ids].filter(id=>!previo.has(id));
    if (nuevos.length) console.log('           >>> NUEVOS en este commit: ' + nuevos.join(', '));
  }
  previo = ids;
}