const fs = require('fs');

const FILES = ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json'];

// unaccented forms / literal translations (word-boundary, case-insensitive where apt)
const PATTERNS = [
  /\bSeleccion\b/,
  /\bseleccion\b/,
  /\bconexion\b/,
  /\bopcion\b/,
  /\binformacion\b/,
  /\bsolucion\b/,
  /\bVersion\b/,
  /\bcondicion\b/,
  /\brazon\b/,
  /\bfrecuencia\b/,
  /\bgrabacion\b/,
  /\btambién\b/,
  /\bvia\s+USB\b/,
  /\ba\s+un\s+DAW\b/,
  /\bal\s+DAW\b/,
  /\ben\s+un\s+DAW\b/,
  /\bgrabar\s+a\s+un\b/,
  /\bsin\s+complicacion\b/,
  /\bconfiguracion\b/,
  /\bactivacion\b/,
  /\binteligencia artificial\b/,
  /\biA\b/,
  /\bescena\b/,
  /\bmediacion\b/,
  /\bprecision\b/,
  /\bduracion\b/,
  /\bposterior\b/,
  /\baficionados\b/,
  /\bcalidad-precio\b/,
];

const outPath = 'C:\\Users\\Daniel\\AppData\\Local\\Temp\\opencode\\es-accent-out.txt';
try { fs.rmSync(outPath, { force: true }); } catch {}

let hits = 0;
function walk(obj, path) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach((v,i)=>walk(v,path+'['+i+']')); return; }
  for (const [k,v] of Object.entries(obj)) {
    const p = path ? path+'.'+k : k;
    if (typeof v === 'string') {
      if (/_es$/i.test(k)) {
        for (const re of PATTERNS) {
          const m = v.match(re);
          if (m) {
            hits++;
            fs.appendFileSync(outPath, '### ' + p + ' / ' + re.source + '\n' + v.slice(Math.max(0,m.index-80), m.index+90) + '\n\n');
          }
        }
      }
    } else if (v && typeof v === 'object') walk(v, p);
  }
}
for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log('MISSING', f); continue; }
  walk(JSON.parse(fs.readFileSync(f,'utf8')), f);
}
console.log('HITS:', hits);