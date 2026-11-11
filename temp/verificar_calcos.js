const fs = require('fs'), path = require('path');
const raiz = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const archivos = fs.readdirSync(raiz).filter(f => f.endsWith('_es.html'));
const CHEQUEOS = [
  ['punto dulce', /punto dulce/i],
  ['genuinamente', /genuinamente/i],
  ['disruptor', /disruptor/i],
  ['es Rompe (roto)', /es Rompe/],
  ['Impulsado por (restos)', /impulsado por (las redes|redes neuronales|IA)/i],
  ['fonemas duros', /fonemas duros/i],
  ['material fuente', /material fuente/i],
  ['caballo de batalla', /caballo de batalla/i],
  ['sweet spot', /sweet spot/i],
  ['in-your-face', /in-your-face/i],
  ['vale cada centavo', /vale cada centavo/i],
  ['prueba del tiempo', /prueba del tiempo/i],
  ['mas sin tilde', /\bmas\b/],
  ['une la brecha', /une la brecha/i],
  ['mantiene fluyendo', /mantiene fluyendo/i],
  ['elimina del problema', /elimina del problema/i],
  ['Redución (typo)', /Redución/],
  ['basado de', /basado de\b/i],
  ['por tu dinero', /por tu dinero/i],
  ['curva de aprendizaje es real', /curva de aprendizaje es real/i],
  ['sin fisuras', /sin fisuras/i]
];
const restos = {};
archivos.forEach(f => {
  const d = fs.readFileSync(path.join(raiz, f), 'utf8');
  CHEQUEOS.forEach(([n, re]) => {
    const m = d.match(re);
    if (m) { restos[n] = restos[n] || { n: 0, files: [] }; restos[n].n++; if (restos[n].files.length < 3) restos[n].files.push(f); }
  });
});
console.log('Páginas ES escaneadas: ' + archivos.length);
const claves = Object.keys(restos);
if (claves.length === 0) console.log('Restos de calcos corregidos: 0 — TODO LIMPIO');
else claves.forEach(k => console.log('  RESTO ' + k + ': ' + restos[k].n + ' pág → ' + restos[k].files.join(', ')));