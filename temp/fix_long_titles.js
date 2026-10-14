const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Titulos que siguen pasado de 60 chars y necesitan reescritura manual.
// Se edita title/titleTag/title_es/titleTag_es de forma explicita.
const FIX = {
  'monitor-setup': {
    title: 'How to Set Up Studio Monitors So Mixes Translate',
    titleTag: 'How to Set Up Studio Monitors So Mixes Translate',
    title_es: 'Cómo configurar monitores de estudio para que suene igual',
    titleTag_es: 'Cómo configurar monitores de estudio para que suene igual'
  },
  'slg200s-vs-gs-mini': {
    title: 'Yamaha SLG200S vs Taylor GS Mini: Which to Buy?',
    titleTag: 'Yamaha SLG200S vs Taylor GS Mini: Which to Buy?',
    title_es: 'Yamaha SLG200S vs Taylor GS Mini: cuál comprar',
    titleTag_es: 'Yamaha SLG200S vs Taylor GS Mini: cuál comprar'
  },
  'best-stage-keyboards': {
    title_es: 'Mejores teclados para directo',
    titleTag_es: 'Mejores teclados para directo'
  },
  'best-guitar-home-office': {
    title_es: 'Mejores guitarras para trabajar desde casa',
    titleTag_es: 'Mejores guitarras para trabajar desde casa'
  },
  'best-live-sound-mixers': {
    title_es: 'Mejores mezcladores de sonido para bandas y eventos',
    titleTag_es: 'Mejores mezcladores de sonido para bandas y eventos'
  },
  'budget-usb-mics': {
    title_es: 'Los 13 mejores micrófonos USB por menos de $110',
    titleTag_es: 'Los 13 mejores micrófonos USB por menos de $110'
  },
  'best-monitors-for-small-rooms': {
    title_es: 'Mejores monitores de estudio para salas pequeñas',
    titleTag_es: 'Mejores monitores de estudio para salas pequeñas'
  },
  'budget-headphones': {
    title_es: 'Mejores auriculares de estudio por menos de $150',
    titleTag_es: 'Mejores auriculares de estudio por menos de $150'
  },
  'budget-interfaces': {
    title_es: 'Mejores interfaces de audio por menos de $300',
    titleTag_es: 'Mejores interfaces de audio por menos de $300'
  },
  'best-bass-home-office': {
    title_es: 'Mejores bajos para home office y viajes',
    titleTag_es: 'Mejores bajos para home office y viajes'
  }
};

let n = 0;
Object.keys(FIX).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log('[!!] guia no encontrada: ' + id); return; }
  Object.keys(FIX[id]).forEach(function (k) {
    const before = g[k];
    if (typeof before === 'string' && before !== FIX[id][k]) {
      g[k] = FIX[id][k];
      n++;
      console.log('  [' + id + '] ' + k);
      console.log('      ' + before.length + ': ' + JSON.stringify(before));
      console.log('   -> ' + FIX[id][k].length + ': ' + JSON.stringify(FIX[id][k]));
    }
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ncampos de titulo reescritos: ' + n);