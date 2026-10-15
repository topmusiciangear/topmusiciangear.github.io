// 1) Corregir cabeceras de columna y veredictos que faltan pasivo/activo
// 2) Añadir 3 columnas (ZLX-12P-G2, K12.2, DBR12) a active-vs-passive-pa
// 3) Corregir FL Studio en ableton-vs-fl-studio
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// === 1) active-vs-passive-pa: cabeceras de tabla ===
const g = guides.find(x=>x.id==='active-vs-passive-pa');
const HEADER_FIX = {
  'JBL JRX215':       { en: 'JBL JRX215 Passive Speaker',       es: 'Altavoz Pasivo JBL JRX215' },
  'Mackie SRT215':    { en: 'Mackie SRT215 Active PA Speaker',  es: 'Altavoz Activo Mackie SRT215' },
  'Yamaha CBR12':     { en: 'Yamaha CBR12 Passive Speaker',     es: 'Altavoz Pasivo Yamaha CBR12' },
  'EV ELX200-12':     { en: 'EV ELX200-12 Passive Speaker',    es: 'Altavoz Pasivo EV ELX200-12' }
};
let n = 0;
g.productTable.columns.forEach((c,i)=>{
  const fix = HEADER_FIX[c.title];
  if (fix) {
    console.log('  fix col ' + i + ': "' + c.title + '" -> "' + fix.en + '"');
    c.title = fix.en;
    c.title_es = fix.es;
    n++;
  }
});
// tambien fix en veredictos
const VERDICT_FIX = {
  'JBL JRX215':       { en: 'JBL JRX215 Passive Speaker',       es: 'Altavoz Pasivo JBL JRX215' },
  'Mackie SRT215':    { en: 'Mackie SRT215 Active PA Speaker',  es: 'Altavoz Activo Mackie SRT215' },
  'Yamaha CBR12':     { en: 'Yamaha CBR12 Passive Speaker',     es: 'Altavoz Pasivo Yamaha CBR12' },
  'EV ELX200-12':     { en: 'EV ELX200-12 Passive Speaker',    es: 'Altavoz Pasivo EV ELX200-12' }
};
g.verdictProsCons.forEach(v=>{
  const fix = VERDICT_FIX[v.name];
  if (fix) {
    console.log('  fix verdict: "' + v.name + '" -> "' + fix.en + '"');
    v.name = fix.en;
    v.name_es = fix.es;
    n++;
  }
});

// === 2) Añadir 3 columnas con specs ===
// Specs extraidos de live-sound-pa (ZLX, K12.2) y budget-pa-systems (DBR12)
const NEW_COLS = [
  {
    title: 'EV ZLX-12P-G2 Active PA Speaker',
    title_es: 'Altavoz Activo EV ZLX-12P-G2',
    specs: [
      { v: 'Mobile DJs and solo performers', ve: 'DJs móviles y solistas' },
      { v: 'Powered PA speaker', ve: 'Altavoz PA autoamplificado' },
      { v: '1000W Class-D', ve: '1000W en Clase-D' },
      { v: '12" WECA2128 + 1.4" titanium DECA2516', ve: '12" WECA2128 + titanio de 1.4" DECA2516' },
      { v: '54 Hz – 18.5 kHz (-3 dB) / 48 Hz – 20 kHz (-10 dB)', ve: '54 Hz – 18.5 kHz (-3 dB) / 48 Hz – 20 kHz (-10 dB)' },
      { v: '127 dB peak', ve: '127 dB de pico' },
      { v: '90° x 60°', ve: '90° x 60°' },
      { v: 'DSP presets (music/live/voice)', ve: 'Presets DSP (music/live/voice)' },
      { v: 'Mic/line XLR, RCA, Bluetooth (ZLX-12P-G2)', ve: 'Mic/line XLR, RCA, Bluetooth (ZLX-12P-G2)' },
      { v: '32.67 lb (14.82 kg)', ve: '32.67 lb (14.82 kg)' }
    ]
  },
  {
    title: 'QSC K12.2 Active PA Speaker',
    title_es: 'Altavoz Activo QSC K12.2',
    specs: [
      { v: 'Pro bands and DJs, the reference standard', ve: 'Bandas y DJs pro, el estándar de referencia' },
      { v: 'Powered PA speaker', ve: 'Altavoz PA autoamplificado' },
      { v: '2000W (peak)', ve: '2000W (pico)' },
      { v: '12" + 1.4" HF', ve: '12" + 1.4" HF' },
      { v: '50 Hz – 20 kHz', ve: '50 Hz – 20 kHz' },
      { v: '132 dB', ve: '132 dB' },
      { v: '75° axisymmetric', ve: '75° axisimétrico' },
      { v: 'Intrinsic Correction DSP + presets', ve: 'DSP Intrinsic Correction + presets' },
      { v: '2x XLR/combo + 3.5mm + XLR thru', ve: '2x XLR/combo + 3,5 mm + XLR thru' },
      { v: '39 lb (17.7 kg)', ve: '39 lb (17,7 kg)' }
    ]
  },
  {
    title: 'Yamaha DBR12 Active PA Speaker',
    title_es: 'Altavoz Activo Yamaha DBR12',
    specs: [
      { v: 'Compact clear-sounding budget PA', ve: 'PA económico compacto y claro' },
      { v: 'Powered PA speaker', ve: 'Altavoz PA autoamplificado' },
      { v: '1000W dynamic (800W LF + 200W)', ve: '1000W dinámicos (800W LF + 200W)' },
      { v: '12" + 1.4" HF', ve: '12" + 1.4" HF' },
      { v: '52 Hz – 20 kHz (-10 dB)', ve: '52 Hz – 20 kHz (-10 dB)' },
      { v: '131 dB peak', ve: '131 dB de pico' },
      { v: '90° x 60°', ve: '90° x 60°' },
      { v: 'DSP presets', ve: 'Presets DSP' },
      { v: '2x XLR/combo + XLR out', ve: '2x XLR/combo + salida XLR' },
      { v: '34.8 lb (15.8 kg)', ve: '34.8 lb (15,8 kg)' }
    ]
  }
];

NEW_COLS.forEach(nc=>{
  g.productTable.columns.push({ title: nc.title, title_es: nc.title_es });
  g.productTable.rows.forEach((r,i)=>{
    r.values.push({ value: nc.specs[i].v, value_es: nc.specs[i].ve });
  });
  n++;
  console.log('  + columna añadida: ' + nc.title);
});
console.log('active-vs-passive-pa: ' + n + ' cambios en tabla/veredictos');

// === 3) ableton-vs-fl-studio ===
const g3 = guides.find(x=>x.id==='ableton-vs-fl-studio');
let n3 = 0;
function fixFL(obj, es) {
  if (typeof obj === 'string') {
    if (obj === 'FL Studio All Plugins Edition') {
      n3++;
      return es ? 'FL Studio Producer Edition' : 'FL Studio Producer Edition';
    }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(x=>fixFL(x, es));
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => { o[k] = fixFL(obj[k], /_es$/i.test(k)); });
    return o;
  }
  return obj;
}
const fixed3 = fixFL(g3, false);
console.log('ableton-vs-fl-studio: ' + n3 + ' referencias a FL Studio All Plugins Edition');

// escribir
fs.writeFileSync(BASE+'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');

// verificar
const G = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const gv = G.find(x=>x.id==='active-vs-passive-pa');
console.log('\ncolumnas finales (' + gv.productTable.columns.length + '):');
gv.productTable.columns.forEach((c,i)=>console.log('  '+(i)+'. ' + c.title + ' / ' + c.title_es));
let des = 0;
gv.productTable.rows.forEach(r=>{ if(r.values.length!==gv.productTable.columns.length) des++; });
console.log('filas desajustadas: ' + des);
const g3v = G.find(x=>x.id==='ableton-vs-fl-studio');
console.log('ableton-vs-fl-studio columnas: ' + g3v.productTable.columns.map(c=>c.title).join(' | '));