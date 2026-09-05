const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const e = g.find(x => x && x.id === 'studio-subwoofers-setup');

const patterns = [
  /\b(?:la vía|una vía|es el mejor para)\b/i,
  /\belecci[oó]n\b/i,
  /\bflagship\b/i,
  /\bescal[oó]n\b/i,
  /margen serio/i,
  /se funda\b/i,
  /recorre el proceso/i,
  /deber[ií]an mirar/i,
  /mete gran ingenier/i,
  /\b(?:Seleccion|seleccion|conexion|opcion|informacion|solucion|Version|condicion|razon|frecuencia|grabacion|tambien|inteligencia artificial|via USB|a un DAW|al DAW|en un DAW|sin complicacion)\b/i,
  /\bEs el mejor para\b/i,
  /el mayor paso adelante/i,
  /paso adelante/i,
  /\b(?:IA|iA|ia)\b/,
];

function scanText(text, label) {
  for (const p of patterns) {
    const m = text.match(new RegExp(p.source, p.flags));
    if (m) console.log('HIT [' + p.source + '] ' + label + ': ...' + text.slice(Math.max(0, m.index-40), m.index+60).replace(/\n/g, ' ') + '...');
  }
}

Object.keys(e).forEach(k => {
  if (typeof e[k] !== 'string') return;
  if (/_(es|Es)$/.test(k) || k === 'description') scanText(e[k], k);
});
if (e.featuredSnippet) {
  Object.entries(e.featuredSnippet).forEach(([k,v]) => {
    if (typeof v === 'string' && /_es$/.test(k)) scanText(v, 'featuredSnippet.'+k);
  });
}
if (Array.isArray(e.verdictProsCons)) {
  e.verdictProsCons.forEach((pc,i) => {
    ['pros_es','cons_es'].forEach(k => {
      if (Array.isArray(pc[k])) pc[k].forEach(s => scanText(s, 'proscons['+i+'].'+k));
    });
  });
}
if (Array.isArray(e.sections)) {
  e.sections.forEach((s,i) => {
    if (s && typeof s==='object') Object.entries(s).forEach(([k,v]) => {
      if (typeof v==='string' && /_es$/.test(k)) scanText(v, 'sections['+i+'].'+k);
    });
  });
}
console.log('DONE');