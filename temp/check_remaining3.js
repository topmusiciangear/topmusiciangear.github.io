const fs = require('fs');
const d = require('../temp/_nat_chunk1.json');
const mine = ['ableton-vs-fl-studio','apollo-vs-babyface','beginner-guitar','best-bass-under-700','best-digital-pianos','best-headphones','best-live-sound-mixers','best-monitors-for-small-rooms','best-practice-amps','best-wireless-iems','budget-usb-mics','dt770-vs-dt990','fix-clipping-scarlett','jbl-vs-kali','me90-vs-mx5','nx912-vs-pxm12mp','pro-guitars','pro-monitors','scarlett-vs-motu','stage-mics','studio-furniture','xr18-vs-m32r'];
const guides = d.filter(g => mine.includes(g.id));

const enPatterns = [
  'workhorse','gold standard','industry standard','benchmark','hassle-free','pro-level',
  'studio-grade','incredible','unmatched','unrivaled','second to none','bulletproof',
  'ultimate weapon','monster','king of the budget','holy grail','definitive rock machine',
  'ultimate professional Strat','ultimate rock','The definitive rock guitar',
  'world standard','world\'s standard','the tracking standard'
];
const esPatterns = [
  'caballo de batalla','todoterreno','estándar de la industria','sin esfuerzo',
  'sin complicaciones','nivel profesional','imprescindible','máquina de',
  'la bestia','bestia de','monstruo de','no tiene rival','increíble',
  'a prueba de balas','desbloquea','eleva tu','a otro nivel',
  'el rey del presupuesto','arma definitiva','sin igual','el rey de los'
];

function gatherText(obj, enKey, esKey) {
  let en = '', es = '';
  function walk(o) {
    if (typeof o === 'string') return;
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (!o || typeof o !== 'object') return;
    for (const k of Object.keys(o)) {
      if (k.endsWith('_es')) { es += ' ' + (typeof o[k] === 'string' ? o[k] : ''); }
      else { en += ' ' + (typeof o[k] === 'string' ? o[k] : ''); }
    }
  }
  walk(obj);
  return { en, es };
}

for (const g of guides) {
  // Gather ALL text fields, recursively
  const { en: allEn, es: allEs } = gatherText(g);
  
  for (const p of enPatterns) {
    const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = allEn.match(re);
    if (matches) console.log('EN [' + g.id + '] "' + p + '" x' + matches.length);
  }
  for (const p of esPatterns) {
    const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = allEs.match(re);
    if (matches) console.log('ES [' + g.id + '] "' + p + '" x' + matches.length);
  }
}
