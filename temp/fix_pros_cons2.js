const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));

// 1. budget-mics / Shure SM57: añadir 1 pro_es
const bm = g.find(x => x.id === 'budget-mics');
if (bm && bm.verdictProsCons) {
  const sm57 = bm.verdictProsCons.find(x => x.name_es === 'Shure SM57');
  if (sm57 && sm57.pros_es && sm57.pros_es.length === 3) {
    sm57.pros_es.push('Mic legendario usado en miles de discos célebres, desde voces hasta cajas de batería');
    console.log('✓ Añadido pro a Shure SM57 en budget-mics');
  }
}

// 2. best-studio-monitors-under-150: añadir 1 con_es a 5 productos
const bsm = g.find(x => x.id === 'best-studio-monitors-under-150');
if (bsm && bsm.verdictProsCons) {
  const targets = ['Mackie CR4.5', 'M-Audio BX4', 'Behringer Truth 3.5 BT', 'PreSonus Eris 3.5 2nd Gen', 'Mackie CR3.5'];
  targets.forEach(name => {
    const item = bsm.verdictProsCons.find(x => x.name_es === name);
    if (item && item.cons_es && item.cons_es.length === 3) {
      const extra = {
        'Mackie CR4.5': 'El control de tono no está calibrado para corrección de sala',
        'M-Audio BX4': 'El precio supera al Mackie CR4.5 con más graves',
        'Behringer Truth 3.5 BT': 'Los 70 Hz son el grave más débil de esta lista',
        'PreSonus Eris 3.5 2nd Gen': 'La extensión de graves es la más limitada de esta guía',
        'Mackie CR3.5': 'El grave de unos 80 Hz solo sirve para editar, no mezclar'
      }[name];
      item.cons_es.push(extra);
      console.log('✓ Añadido contra a ' + name);
    }
  });
}

try {
  fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
  console.log('✓ data/guides.json actualizado con JSON.stringify');
} catch (e) {
  console.error('✗ Error: ' + e.message);
}
