// Solo campos ES (claves *_es + title_es/desc_es). Recoge texto ES por guia.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function textoES(o) {
  let acc = [];
  if (typeof o === 'string') return [];
  if (Array.isArray(o)) { o.forEach(v => acc.push(...textoES(v))); return acc; }
  Object.entries(o).forEach(([k, v]) => {
    if (typeof v === 'string' && /_es$/.test(k)) acc.push({ campo: k, texto: v });
    else if (v && typeof v === 'object') textoES(v).forEach(x => acc.push({ campo: k + '.' + x.campo, texto: x.texto }));
  });
  return acc;
}

const PATRONES = JSON.parse(fs.readFileSync(B + 'temp/audit_es_patrones.js', 'utf8'));
console.log('(script de contexto: ver abajo)');
