// Aplicar: cabeceras ES segun la convencion del sitio (90/90 traducidas),
// primera fila de rol que SI justifique las diferencias de precio,
// y limpiar title_es obsoleto (decia "kit").
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ── COLUMNAS: EN en ingles tecnico, ES traducido (convencion de las 90 guias) ──
g.productTable.columns = [
  { title: 'Budget Essentials Setup', title_es: 'Equipo básico esencial' },
  { title: 'Pro Producer Setup',        title_es: 'Equipo de productor profesional' },
  { title: 'Ultimate Powerhouse Setup',  title_es: 'Equipo definitivo' }
];

// ── FILAS ──
// La primera fila explica QUE HACE CADA MONTAJE, no el rol del producto.
// Asi si justifica por que el precio sube de columna en columna.
g.productTable.rows = [
  {
    label: 'What This Build Is For', label_es: 'Para qué sirve este montaje',
    values: [
      { value: 'Record and back up ideas without spending up', value_es: 'Grabar y respaldar ideas sin gastarte todo' },
      { value: 'Record vocals properly and mix what you capture', value_es: 'Grabar voz en condiciones y mezclar lo que capturas' },
      { value: 'Mix full arrangements with monitors, not headphones', value_es: 'Mezclar arreglos completos con monitores, no con auriculares' }
    ]
  },
  {
    label: 'Interface', label_es: 'Interfaz',
    values: [
      { value: 'Focusrite Scarlett 2i2 4th Gen', value_es: 'Focusrite Scarlett 2i2 4th Gen' },
      { value: 'SSL 2+ MKII',                     value_es: 'SSL 2+ MKII' },
      { value: 'SSL 2+ MKII',                     value_es: 'SSL 2+ MKII' }
    ]
  },
  {
    label: 'Microphone', label_es: 'Micrófono',
    values: [
      { value: 'Shure SM57 (dynamic)',               value_es: 'Shure SM57 (dinámico)' },
      { value: 'Rode NT1 5th Generation (condenser)', value_es: 'Rode NT1 5th Generation (condensador)' },
      { value: 'Rode NT1 Signature (condenser)',     value_es: 'Rode NT1 Signature (condensador)' }
    ]
  },
  {
    label: 'Headphones', label_es: 'Auriculares',
    values: [
      { value: 'Not included — add later', value_es: 'No incluidos — añádelos después' },
      { value: 'Audio-Technica ATH-M50x',   value_es: 'Audio-Technica ATH-M50x' },
      { value: 'Sony MDR-7506',             value_es: 'Sony MDR-7506' }
    ]
  },
  {
    label: 'Studio Monitors', label_es: 'Monitores',
    values: [
      { value: 'Headphones only',       value_es: 'Solo auriculares' },
      { value: 'Headphones only',       value_es: 'Solo auriculares' },
      { value: 'KRK Rokit 7 G5 (pair)', value_es: 'KRK Rokit 7 G5 (par)' }
    ]
  },
  {
    label: 'Accessories', label_es: 'Accesorios',
    values: [
      { value: 'K&M 210/2 stand',       value_es: 'Soporte K&M 210/2' },
      { value: 'Pop filter recommended', value_es: 'Filtro antipop recomendado' },
      { value: 'Pop filter recommended', value_es: 'Filtro antipop recomendado' }
    ]
  },
  {
    label: 'Acoustic Treatment', label_es: 'Tratamiento acústico',
    values: [
      { value: 'G4M Squarewave panels (4-pack)', value_es: 'Paneles G4M Squarewave (4-pack)' },
      { value: 'G4M Squarewave panels (4-pack)', value_es: 'Paneles G4M Squarewave (4-pack)' },
      { value: 'G4M Squarewave panels (4-pack)', value_es: 'Paneles G4M Squarewave (4-pack)' }
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

// ── title_es obsoleto: decia "kit" ──
g.title_es = 'El estudio doméstico de $1.000: tres montajes que encajan';

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ── verificacion ──
console.log('=== COLUMNAS ===');
g.productTable.columns.forEach((c,i)=>console.log('  ' + i + '. ' + c.title.padEnd(28) + ' / ' + c.title_es));

console.log('\n=== FILAS ===');
g.productTable.rows.forEach((r,i)=>{
  const unicos = [...new Set(r.values.map(v=>v.value))].length;
  const todosDistintos = unicos === r.values.length;
  console.log('  ' + i + '. ' + r.label.padEnd(26) + ' / ' + (r.label_es||'').padEnd(24) +
    (todosDistintos ? ' [diferente en cada col]' : ' ['+unicos+' valores distintos]'));
});

console.log('\n=== PRIMERA FILA (justifica el precio) ===');
g.productTable.rows[0].values.forEach((v,i)=>{
  console.log('  ' + g.productTable.columns[i].title);
  console.log('     EN: ' + v.value);
  console.log('     ES: ' + v.value_es);
});

console.log('\n=== INTEGRIDAD ===');
const nc = g.productTable.columns.length;
let des = 0, vacias = 0, sinEs = 0;
g.productTable.rows.forEach(r=>{
  if (r.values.length !== nc) des++;
  r.values.forEach(v=>{ if(!v.value) vacias++; if(!v.value_es) sinEs++; });
});
console.log('celdas desajustadas: ' + des);
console.log('celdas EN vacias:    ' + vacias);
console.log('celdas ES vacias:    ' + sinEs);
const labelsSinEs = g.productTable.rows.filter(r=>!r.label_es || r.label_es===r.label).length;
console.log('cabeceras sin traducir: ' + labelsSinEs + ' (deben ser 0)');
console.log('title_es:    ' + g.title_es);
console.log('titleTag_es: ' + g.titleTag_es);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));