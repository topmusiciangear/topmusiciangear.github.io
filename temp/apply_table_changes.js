// 1) Columnas en terminologia tecnica internacional (EN + ES)
// 2) Primera fila "Signal Chain Role"
// 3) Limpiar title_es obsoleto (dice "kit" cuando la guia ya no lista kits)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ═══ 1) COLUMNAS: mismo nombre tecnico en ambos idiomas ═══
// Se usan los terminos que el lector ya encuentra en las specs del sitio
// (Setup, Signal Chain, Acoustic Treatment) para que la tabla hable el
// mismo idioma que las celdas.
const COLS = [
  { title: 'Budget Essentials Setup', title_es: 'Budget Essentials Setup' },
  { title: 'Pro Producer Setup',        title_es: 'Pro Producer Setup' },
  { title: 'Ultimate Powerhouse Setup',  title_es: 'Ultimate Powerhouse Setup' }
];
g.productTable.columns = COLS;

// ═══ 2) FILAS ═══
// primera fila: el rol en la cadena, que justifica por que cambia el precio
const ROWS = [
  {
    label: 'Signal Chain Role', label_es: 'Signal Chain Role',
    values: [
      { value: 'Capture',   value_es: 'Capture' },
      { value: 'Capture',   value_es: 'Capture' },
      { value: 'Capture',   value_es: 'Capture' }
    ]
  },
  {
    label: 'Interface', label_es: 'Interface',
    values: [
      { value: 'Focusrite Scarlett 2i2 4th Gen', value_es: 'Focusrite Scarlett 2i2 4th Gen' },
      { value: 'SSL 2+ MKII',                     value_es: 'SSL 2+ MKII' },
      { value: 'SSL 2+ MKII',                     value_es: 'SSL 2+ MKII' }
    ]
  },
  {
    label: 'Microphone', label_es: 'Microphone',
    values: [
      { value: 'Shure SM57 (dynamic)',               value_es: 'Shure SM57 (dynamic)' },
      { value: 'Rode NT1 5th Generation (condenser)', value_es: 'Rode NT1 5th Generation (condenser)' },
      { value: 'Rode NT1 Signature (condenser)',     value_es: 'Rode NT1 Signature (condenser)' }
    ]
  },
  {
    label: 'Headphones', label_es: 'Headphones',
    values: [
      { value: 'Not included — add later', value_es: 'Not included — add later' },
      { value: 'Audio-Technica ATH-M50x',   value_es: 'Audio-Technica ATH-M50x' },
      { value: 'Sony MDR-7506',             value_es: 'Sony MDR-7506' }
    ]
  },
  {
    label: 'Studio Monitors', label_es: 'Studio Monitors',
    values: [
      { value: 'Headphones only',       value_es: 'Headphones only' },
      { value: 'Headphones only',       value_es: 'Headphones only' },
      { value: 'KRK Rokit 7 G5 (pair)', value_es: 'KRK Rokit 7 G5 (pair)' }
    ]
  },
  {
    label: 'Accessories', label_es: 'Accessories',
    values: [
      { value: 'K&M 210/2 stand',       value_es: 'K&M 210/2 stand' },
      { value: 'Pop filter recommended', value_es: 'Pop filter recommended' },
      { value: 'Pop filter recommended', value_es: 'Pop filter recommended' }
    ]
  },
  {
    label: 'Acoustic Treatment', label_es: 'Acoustic Treatment',
    values: [
      { value: 'G4M Squarewave panels (4-pack)', value_es: 'G4M Squarewave panels (4-pack)' },
      { value: 'G4M Squarewave panels (4-pack)', value_es: 'G4M Squarewave panels (4-pack)' },
      { value: 'G4M Squarewave panels (4-pack)', value_es: 'G4M Squarewave panels (4-pack)' }
    ]
  },
  {
    label: 'Total', label_es: 'Total',
    values: [
      { value: '~$426', value_es: '~$426' },
      { value: '~$816', value_es: '~$816' },
      { value: '~$905', value_es: '~$905' }
    ]
  }
];
g.productTable.rows = ROWS;

// ═══ 3) title_es obsoleto: decia "kit" ═══
g.title_es = 'El estudio doméstico de $1.000: tres montajes que encajan';

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

console.log('=== COLUMNAS ===');
g.productTable.columns.forEach((c,i)=>console.log('  ' + i + '. ' + c.title + '  /  ' + c.title_es));
console.log('\n=== FILAS ===');
g.productTable.rows.forEach((r,i)=>{
  console.log('  ' + i + '. ' + r.label + '  /  ' + r.label_es);
  r.values.forEach((v,j)=>{
    console.log('       col' + j + ': ' + v.value + '  /  ' + v.value_es);
  });
});
console.log('\ntitle_es: ' + g.title_es);
console.log('titleTag_es: ' + g.titleTag_es);

// integridad
let des = 0;
g.productTable.rows.forEach(r=>{ if(r.values.length !== g.productTable.columns.length) des++; });
console.log('\nceldas desajustadas: ' + des);
const vacias = [];
g.productTable.rows.forEach(r=>r.values.forEach((v,i)=>{ if(!v.value || !v.value_es) vacias.push(r.label+' col'+i); }));
console.log('celdas vacias: ' + vacias.length);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));