// Limpieza final: reemplazar los strings exactos que quedaron en el idioma incorrecto.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

// En campos EN: strings en español que quedaron -> su forma EN correcta
const FIX_EN = {
  'Altavoz Activo LD Systems ICOA 12 A BT':      'LD Systems ICOA 12 A BT Active PA Speaker',
  'Columna PA Activa JBL PRX ONE':               'JBL PRX ONE Active PA Column',
  'Altavoz Activo Yamaha DXR12mkII':              'Yamaha DXR12mkII Active PA Speaker',
  'Mezclador PA Activo Yamaha Stagepas 1K MKII':  'Yamaha Stagepas 1K MKII Active PA Mixer',
  'Altavoz Activo Alto Professional TS412':       'Alto Professional TS412 Active PA Speaker',
  'Altavoz Activo Electro-Voice EVERSE 12':       'Electro-Voice EVERSE 12 Active PA Speaker',
  'Altavoz Activo Yamaha DBR12':                  'Yamaha DBR12 Active PA Speaker',
  'QSC K12.2 Altavoz Activo':                     'QSC K12.2 Active PA Speaker',
  'JBL EON712 Altavoz Activo':                    'JBL EON712 Active PA Speaker',
  'EV ZLX-12P-G2 Altavoz Activo':                 'EV ZLX-12P-G2 Active PA Speaker',
  'EV ELX200-15P Altavoz Activo':                 'EV ELX200-15P Active PA Speaker'
};
// En campos ES: strings en ingles que quedaron -> su forma ES correcta
const FIX_ES = {
  'QSC K12.2 Active PA Speaker':                   'Altavoz Activo QSC K12.2',
  'JBL EON712 Active PA Speaker':                  'Altavoz Activo JBL EON712'
};

let nEN = 0, nES = 0;
function clean(obj, campoEs) {
  if (typeof obj === 'string') {
    if (!campoEs && FIX_EN[obj]) { nEN++; return FIX_EN[obj]; }
    if (campoEs && FIX_ES[obj]) { nES++; return FIX_ES[obj]; }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(x => clean(x, campoEs));
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => {
      const es = /_es$/i.test(k) || k === 'comparison_es';
      o[k] = clean(obj[k], es);
    });
    return o;
  }
  return obj;
}

const fixed = clean(guides, false);
fs.writeFileSync(gf, JSON.stringify(fixed, null, 2), 'utf8');
console.log('campos EN corregidos: ' + nEN + ' | campos ES corregidos: ' + nES);

// --- verificacion de las dos guias ---
['live-sound-pa','active-vs-passive-pa'].forEach(gid => {
  const g = fixed.find(x => x.id === gid);
  console.log('\n=== ' + gid + ' ===');
  if (g.productTable) {
    console.log('columnas EN: ' + g.productTable.columns.map(c=>c.title).join(' | '));
    console.log('columnas ES: ' + g.productTable.columns.map(c=>c.title_es||c.title).join(' | '));
  }
  if (g.comparison) {
    const ch = g.comparison.headers || [];
    console.log('comparison headers: ' + ch.map(h=>h.title||h.name||JSON.stringify(h)).join(' | '));
  }
  console.log('veredictos EN: ' + g.verdictProsCons.map(v=>v.name).join(' | '));
  console.log('veredictos ES: ' + g.verdictProsCons.map(v=>v.name_es||v.name).join(' | '));
});

// --- quedan strings en el idioma incorrecto? ---
let quedanEN = 0, quedanES = 0;
function audit(obj, campoEs, gid) {
  if (typeof obj === 'string') {
    if (!campoEs && FIX_EN[obj]) { quedanEN++; console.log('  EN mal en ' + gid + ': ' + obj); }
    if (campoEs && FIX_ES[obj]) { quedanES++; console.log('  ES mal en ' + gid + ': ' + obj); }
    return;
  }
  if (Array.isArray(obj)) return obj.forEach(x => audit(x, campoEs, gid));
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(k => audit(obj[k], /_es$/i.test(k)||k==='comparison_es', gid));
  }
}
fixed.forEach(g => audit(g, false, g.id));
console.log('\ncampos EN aun en espanol: ' + quedanEN + ' | campos ES aun en ingles: ' + quedanES);

let desajuste = 0;
fixed.forEach(x => { if (x.productTable) { const nc=x.productTable.columns.length; x.productTable.rows.forEach(r=>{ if(r.values.length!==nc) desajuste++; }); } });
console.log('celdas desajustadas: ' + desajuste);
const cjk = (JSON.stringify(fixed).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));