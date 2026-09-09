const fs = require('fs');
const d = require('../data/guides.json');
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

for (const g of guides) {
  const allEn = [g.intro, g.conclusion, g.verdict, g.title, g.titleTag, g.description,
    g.featuredSnippet, ...(g.sections||[]).map(s=>(s.body||'')+' '+(s.heading||'')),
    ...(g.productTable||[]).map(p=>(p.body||'')+' '+(p.bodyEn||'')),
    ...(g.featuredProducts||[]).map(p=>(p.body||'')),
    g.verdictProsCons ? g.verdictProsCons.map(p=>p.pro||'').join(' ') : '',
    g.verdictProsCons ? g.verdictProsCons.map(p=>p.con||'').join(' ') : ''
  ].join('\n');
  const allEs = [g.intro_es, g.conclusion_es, g.verdict_es, g.title_es, g.titleTag_es, g.description_es,
    ...(g.sections||[]).map(s=>(s.body_es||'')+' '+(s.heading_es||'')),
    ...(g.productTable||[]).map(p=>(p.body_es||'')),
    ...(g.featuredProducts||[]).map(p=>(p.body_es||''))
  ].join('\n');
  
  for (const p of enPatterns) {
    const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = allEn.match(re);
    if (matches) {
      console.log('EN [' + g.id + '] "' + p + '" x' + matches.length);
    }
  }
  for (const p of esPatterns) {
    const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = allEs.match(re);
    if (matches) {
      console.log('ES [' + g.id + '] "' + p + '" x' + matches.length);
    }
  }
}
