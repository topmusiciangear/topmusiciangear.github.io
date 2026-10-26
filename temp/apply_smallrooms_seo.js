const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');

// 1. Title / description
gu.title='Best Studio Monitors for Small & Untreated Rooms';
gu.title_es='Mejores monitores de estudio para salas pequeñas y sin tratar';
gu.description='Neumann KH 80 DSP is my top pick. Mixing in a small untreated room is one of the biggest challenges for home studio producers.';
gu.description_es='Neumann KH 80 DSP es mi elección principal. Mezclar en una sala pequeña y sin tratar es uno de los mayores desafíos para los productores de home studio.';
gu.featuredSnippet.title_en='Best Studio Monitors for Small & Untreated Rooms';
gu.featuredSnippet.title_es='Mejores monitores de estudio para salas pequeñas y sin tratar';

// 2. FAQ fixes
const fsn=gu.featuredSnippet;
fsn.faq_a1_en='5 to 6.5 inch woofers are best for small rooms. Larger woofers reach lower frequencies that excite room modes. Avoid adding a subwoofer in an untreated small room; rely on front-ported monitors or DSP correction instead.';
fsn.faq_a1_es='Woofers de 5 a 6,5 pulgadas son los mejores para salas pequeñas. Los woofers más grandes alcanzan frecuencias más bajas que excitan los modos de la sala. Evita añadir un subwoofer en una sala pequeña sin tratar; mejor usa monitores con puerto frontal o corrección DSP.';
fsn.faq_a2_en='Treatment helps, but if you cannot treat the room, choose front-ported monitors or DSP-corrected models (Neumann, iLoud) and use boundary EQ to tame bass build-up.';
fsn.faq_a2_es='El tratamiento ayuda, pero si no puedes tratar la sala, elige monitores con puerto frontal o con corrección DSP (Neumann, iLoud) y usa el boundary EQ para controlar la acumulación de graves.';
fsn.faq_a3_en='Front-ported monitors (like the Kali LP-6 V2) are excellent for small rooms because their ports fire forward, avoiding wall reflections. Rear-ported monitors like the JBL 305P MkII need 30-45 cm (12-18 inches) of clearance from an untreated wall, or boundary EQ engaged.';
fsn.faq_a3_es='Los monitores con puerto frontal (como Kali LP-6 V2) son excelentes para salas pequeñas porque el puerto dispara hacia adelante, evitando reflexiones en la pared. Los de puerto trasero como JBL 305P MkII necesitan 30-45 cm de separación de una pared sin tratar, o el boundary EQ activado.';
fsn.faq_a5_en='You can, but bass decisions will be unreliable. Use DSP/front-ported monitors and cross-check on headphones and reference systems before finalizing.';
fsn.faq_a5_es='Se puede, pero las decisiones de graves serán poco fiables. Usa monitores con DSP o puerto frontal y contrasta en auriculares y sistemas de referencia antes de finalizar.';

// 3. Reorder productTable columns
const newOrder=['iLoud Micro Monitor Pro','Kali Audio LP-6 V2','Neumann KH 80 DSP','iLoud MTM MKII','KRK Rokit 5 G5','Genelec 8010A','ADAM Audio D3V','Kali Audio LP-UNF','PreSonus Eris Studio 5','Genelec 8030C','JBL 305P MkII','ADAM Audio T5V','Yamaha HS5'];
const cols=gu.productTable.columns;
const idxMap=newOrder.map(name=>cols.findIndex(c=>c.title===name));
if (idxMap.includes(-1)) throw new Error('column not found');
gu.productTable.columns=newOrder.map(name=>cols.find(c=>c.title===name));
gu.productTable.title='Best Monitors for Small & Untreated Rooms Compared in This Guide';
gu.productTable.title_es='Comparativa de los mejores monitores para salas pequeñas y sin tratar en esta guía';
// reorder rows values
gu.productTable.rows.forEach(row=>{
  row.values=newOrder.map((name,i)=>row.values[idxMap[i]]);
});

// 4. Update Best For row values
const bestForLabels={
 'iLoud Micro Monitor Pro':{en:'Best for Untreated Desks via Auto-Calibration',es:'Mejor para escritorios sin tratar con autocorrección'},
 'Kali Audio LP-6 V2':{en:'Best Budget Choice for Untreated Rooms (Front Port)',es:'Mejor opción económica para salas sin tratar (puerto frontal)'},
 'Neumann KH 80 DSP':{en:'Best Premium Choice for Untreated Rooms',es:'Mejor opción premium para salas sin tratar'},
 'iLoud MTM MKII':{en:'Best Low-End Accuracy without Acoustic Treatment',es:'Mayor precisión en graves sin tratamiento acústico'},
 'KRK Rokit 5 G5':{en:'Best Budget DSP Controls for Untreated Spaces',es:'Mejores controles DSP económicos para espacios sin tratar'},
 'Genelec 8010A':{en:'Reference-grade nearfield mixing (Rear port - needs space)',es:'Mezcla nearfield de referencia (puerto trasero - necesita espacio)'},
 'ADAM Audio D3V':{en:'Best Portless Desktop Choice for Bare Walls',es:'Mejor opción sin puerto para paredes desnudas'},
 'Kali Audio LP-UNF':{en:'Best Ultra-Nearfield for Untreated Desktops',es:'Mejor ultracercano para escritorios sin tratar'},
 'PreSonus Eris Studio 5':{en:'Best Budget Wide Sweet Spot (Front Ported)',es:'Mejor relación calidad-precio con sweet spot amplio (puerto frontal)'},
 'Genelec 8030C':{en:'Professional reference monitoring (Best with built-in dip switches engaged)',es:'Monitoreo de referencia profesional (mejor con dip switches activados)'},
 'JBL 305P MkII':{en:'Industry-standard translation (Requires >40cm from untreated walls)',es:'Traducción estándar de la industria (requiere >40cm de paredes sin tratar)'},
 'ADAM Audio T5V':{en:'Affordable ribbon tweeter (Rear port - needs space)',es:'Tweeter ribbon asequible (puerto trasero - necesita espacio)'},
 'Yamaha HS5':{en:'Industry-standard mix translation (Rear port - needs space)',es:'Traducción estándar de la industria (puerto trasero - necesita espacio)'}
};
const bfRow=gu.productTable.rows.find(r=>r.label==='Best For');
if (bfRow) {
  bfRow.values=newOrder.map(name=>({value:bestForLabels[name].en, value_es:bestForLabels[name].es}));
}

fs.writeFileSync(B+'data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('JSON updated');

// 3. Update guide-scores.js
const gsPath=B+'js/guide-scores.js';
let gs=fs.readFileSync(gsPath,'utf8');
const newScores={
 'JBL 305P MkII': 8.7,
 'Yamaha HS5': 8.4,
 'ADAM Audio D3V': 8.9,
 'Kali Audio LP-UNF': 8.9,
 'Kali Audio LP-6 V2': 9.5,
 'IK Multimedia iLoud Micro Monitor Pro': 9.6,
 'Neumann KH 80 DSP': 9.8,
 'IK Multimedia iLoud MTM MKII': 9.3,
 'Genelec 8010A': 9.4,
 'ADAM Audio T5V': 8.6,
 'Genelec 8030C': 9.0,
 'KRK Rokit 5 G5': 9.2,
 'PreSonus Eris Studio 5': 8.8
};
const start=gs.indexOf(' "best-monitors-for-small-rooms": {');
const end=gs.indexOf(' },', start)+3;
const block=' "best-monitors-for-small-rooms": {\n'+Object.keys(newScores).map(k=>'  "'+k+'": '+newScores[k]+',').join('\n')+'\n }';
gs=gs.slice(0,start)+block+gs.slice(end);
fs.writeFileSync(gsPath, gs, 'utf8');
console.log('guide-scores updated');