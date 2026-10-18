const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const pares = [
  // "play loud" / "tocas fuerte" se leen como tocar el instrumento, no subir el volumen de los monitores
  ['If you play loud, take the Behringer Truth 3.5 BT instead',
   'If you mix at high volume, take the Behringer Truth 3.5 BT instead'],
  ['Si tocas fuerte, el Behringer Truth 3.5 BT:',
   'Si mezclas a volumen alto, el Behringer Truth 3.5 BT:'],
  ['The Behringer is the pick if you play loud or work in an untreated room.',
   'The Behringer is the pick if you mix at high volume or work in an untreated room.'],
  ['El Behringer es la opción si tocas fuerte o trabajas en una sala sin tratar.',
   'El Behringer es la opción si mezclas a volumen alto o trabajas en una sala sin tratar.'],
  ['plays at mixing level without the thin, strained quality small speakers develop when you push them',
   'plays at a normal mixing level without the thin, strained quality small speakers develop when you push them'],
  ['suena a volumen de mezcla sin esa cualidad fina y forzada que desarrollan los altavoces pequeños cuando los fuerzas',
   'suena a un volumen de mezcla normal sin esa cualidad fina y forzada que desarrollan los altavoces pequeños cuando los fuerzas']
];

let cuenta = 0;
function aplicar(txt) {
  let x = txt;
  for (const par of pares) {
    while (x.indexOf(par[0]) >= 0) { x = x.split(par[0]).join(par[1]); cuenta++; }
  }
  return x;
}
function recorrer(o) {
  if (typeof o === 'string') return aplicar(o);
  if (Array.isArray(o)) return o.map(recorrer);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = recorrer(o[k]); return s; }
  return o;
}
const limpio = recorrer(g);
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('sustituciones: ' + cuenta);
const fin = JSON.stringify(g);
console.log('\nplay loud: ' + (fin.split('play loud').length - 1) + ' | tocas fuerte: ' + (fin.split('tocas fuerte').length - 1));
console.log('"mezclas a volumen alto": ' + (fin.split('mezclas a volumen alto').length - 1) + ' | "mix at high volume": ' + (fin.split('mix at high volume').length - 1));
