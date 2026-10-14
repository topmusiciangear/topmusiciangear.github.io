const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));

// Sanity: FLOW 8 y ZLX deben seguir presentes tras el restore
const sc = guides.find(x => x.id === 'stream-controllers');
const hasFlow8 = sc && (sc.sections || []).some(s => s && s.products && s.products.includes(671));
const pa = guides.find(x => x.id === 'best-pa-speakers');
const paStr = JSON.stringify(pa);
console.log('FLOW 8 presente:', !!hasFlow8);
console.log('ZLX 1000W presente:', paStr.includes('1000W'), '| 2000W restante:', paStr.includes('2000W'));
console.log('previolificador occurrences:', (JSON.stringify(guides).match(/previolificador/g) || []).length);

// SAFE walker: solo reemplaza strings, nunca toca estructura
let fixes = 0;
function fixStrings(obj) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') return; // manejado por el padre
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string') {
        const orig = obj[i];
        const next = fixOne(orig);
        if (next !== orig) { obj[i] = next; fixes++; }
      } else if (obj[i] !== null && typeof obj[i] === 'object') {
        fixStrings(obj[i]);
      }
    }
    return;
  }
  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === 'string') {
        const next = fixOne(v);
        if (next !== v) { obj[k] = next; fixes++; }
      } else if (v !== null && typeof v === 'object') {
        fixStrings(v);
      }
    }
  }
}

function fixOne(t) {
  let s = t;
  // 1. previolificador -> previo (solo ES; la palabra no existe en EN)
  if (s.includes('previolificador')) {
    s = s.split('previolificadores').join('previos').split('previolificador').join('previo');
  }
  return s;
}

guides.forEach(g => fixStrings(g));
fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('strings corregidos (previo):', fixes);
console.log('previolificador restante:', (JSON.stringify(guides).match(/previolificador/g) || []).length);

// Verificar que no se introdujeron nulos
let nulls = 0;
guides.forEach(g => {
  (g.sections || []).forEach(s => { if (!s) nulls++; });
  (g.verdictProsCons || []).forEach(v => { if (!v) nulls++; });
});
console.log('nulos introducidos:', nulls);