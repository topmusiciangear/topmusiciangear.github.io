const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const pares = [
  ['the tone knob is a continuous tone control', 'the tone control is continuous'],
  ['plain tone knobs', 'plain tone controls'],
  ['Tone knob + location switch', 'Tone control + location switch'],
  ['Front tone knob runs flat to coloured', 'Front tone control runs flat to coloured'],
  ['Tone knob is not a calibrated room correction', 'Tone control is not a calibrated room correction'],
  ['Tone knob and location switch on the front and rear', 'Tone control and location switch on the front and rear'],

  ['el knob de tono es un control continuo', 'el control de tono es continuo'],
  ['Knob de tono + conmutador de ubicación', 'Control de tono + conmutador de ubicación'],
  ['El knob frontal va de plano a coloreado', 'El control frontal va de una referencia plana a un sonido coloreado'],
  ['El knob de tono no es una corrección de sala calibrada', 'El control de tono no es una corrección de sala calibrada'],
  ['Knob de tono y conmutador de ubicación delante y detrás', 'Control de tono y conmutador de ubicación delante y detrás'],
  ['Referencia plana con el knob del todo a la izquierda', 'Referencia plana con el control del todo a la izquierda']
];

let cuenta = 0;
const faltan = [];
function aplicar(t) { let x = t; for (const [a, b] of pares) if (x.indexOf(a) >= 0) { x = x.split(a).join(b); cuenta++; } return x; }
function recorrer(o) {
  if (typeof o === 'string') return aplicar(o);
  if (Array.isArray(o)) return o.map(recorrer);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = recorrer(o[k]); return s; }
  return o;
}
const limpio = recorrer(g);
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });
const fin = JSON.stringify(g);
pares.forEach(([a, b]) => { if (fin.indexOf(b) < 0) faltan.push(a); });
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('sustituciones: ' + cuenta + ' | no encontrados: ' + faltan.length);
faltan.forEach(f => console.log('   -> ' + f.slice(0, 60)));
const usos = (fin.match(/knob/gi) || []).length;
console.log('');
console.log('quedan usos de "knob" en la guia: ' + usos + (usos === 1 ? ' (1 = "built to be measured", correcto)' : ''));